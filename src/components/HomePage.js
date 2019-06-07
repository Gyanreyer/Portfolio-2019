import projects from "../constants/projects.js";
import History from "../app/history.js";
import { smoothScroll } from "../utils/view.js";

import { getForwardArrowIcon } from "../constants/svg_icons.js";

class ProjectThumbnail {
  constructor(project) {
    this.project = project;

    this.render = this.render.bind(this);
    this.getProjectLinkElement = this.getProjectLinkElement.bind(this);
    this.getThumbnailImage = this.getThumbnailImage.bind(this);
    this.getProjectTitle = this.getProjectTitle.bind(this);
    this.getTechnologiesList = this.getTechnologiesList.bind(this);
  }

  getProjectLinkElement() {
    const projectPath = `/projects/${this.project.name}`;

    const linkElement = document.createElement("a");
    linkElement.href = projectPath;
    linkElement.setAttribute("title", `Read more about ${this.project.displayName}`);

    linkElement.addEventListener("click", event => {
      // Prevent the default browser behavior so that we don't hard load the next url,
      // and instead manipulate the browser history so that we can keep this an SPA
      event.preventDefault();

      History.push(
        projectPath,
        {
          project: this.project.name
        },
        `Ryan Geyer | ${this.project.displayName}`
      );
    });

    return linkElement;
  }

  getThumbnailImage() {
    const thumbnailImage = new Image();
    thumbnailImage.src = this.project.image.src;
    thumbnailImage.srcset = this.project.image.srcSet;
    thumbnailImage.alt = `${this.project.displayName} thumbnail`;

    return thumbnailImage;
  }

  getProjectTitle() {
    const projectTitle = document.createElement("h3");
    projectTitle.innerText = this.project.displayName;

    return projectTitle;
  }

  getTechnologiesList() {
    const technologiesUsedDescription = document.createElement("p");
    technologiesUsedDescription.appendChild(
      document.createTextNode("Technologies used: ")
    );

    this.project.technologies.forEach((technology, index) => {
      technologiesUsedDescription.appendChild(
        document.createTextNode(
          `${index > 0 ? ", " : ""}${technology.text || technology}`
        )
      );
    });

    return technologiesUsedDescription;
  }

  render() {
    // If the thumbnail has already been rendered, we don't need to do anything again
    if (this.cachedThumbnailElement) return;

    // Get element for display list that we want to render to
    const projectDisplayList = document.getElementById("projects");

    const thumbnailElement = document.createElement("li");
    thumbnailElement.className = this.project.name;

    const imageWrapperLink = this.getProjectLinkElement();
    imageWrapperLink.className = `thumbnail ${this.project.name} no-underline`;
    imageWrapperLink.appendChild(this.getThumbnailImage());

    thumbnailElement.appendChild(imageWrapperLink);

    thumbnailElement.appendChild(this.getProjectTitle());

    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = this.project.shortDesc;
    thumbnailElement.appendChild(projectDescription);

    if (this.project.technologies) {
      thumbnailElement.appendChild(this.getTechnologiesList());
    }

    const readMoreLink = this.getProjectLinkElement();

    readMoreLink.className = "text-link";
    readMoreLink.innerText = "Read more";
    readMoreLink.appendChild(getForwardArrowIcon());
    readMoreLink.addEventListener("mouseenter", () => {
      imageWrapperLink.classList.add("hovered");
    });
    readMoreLink.addEventListener("mouseleave", () => {
      imageWrapperLink.classList.remove("hovered");
    });

    thumbnailElement.appendChild(readMoreLink);

    this.cachedThumbnailElement = thumbnailElement;

    // Append the thumbnail to the project display list
    projectDisplayList.appendChild(thumbnailElement);
  }
}

export default class HomePage {
  constructor() {
    const onClickScrollToProjects = () =>
      smoothScroll(document.getElementById("projects").offsetTop);

    document.querySelectorAll(".project-link").forEach(projectLink => {
      projectLink.addEventListener("click", onClickScrollToProjects);
    });

    document.getElementById("contact-link").addEventListener("click", event => {
      // Prevent the default browser behavior so that we don't hard load the next url,
      // and instead manipulate the browser history so that we can keep this an SPA
      event.preventDefault();

      History.push(
        "/contact",
        {
          page: "contact"
        },
        `Ryan Geyer | Contact`
      );
    });

    document.getElementById("about-link").addEventListener("click", event => {
      event.preventDefault();

      History.push(
        "/about",
        {
          page: "about"
        },
        `Ryan Geyer | About Me`
      );
    });

    this.thumbnailComponents = projects.map(
      project => new ProjectThumbnail(project)
    );

    this.render = this.render.bind(this);
  }

  render() {
    // We only want to render these thumbnails once since we aren't removing them from the page afterwards
    if (this.hasRendered) return;

    this.thumbnailComponents.forEach(thumbnailComponent =>
      thumbnailComponent.render()
    );

    this.hasRendered = true;
  }
}

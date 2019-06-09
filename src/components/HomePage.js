import "./HomePage.scss";
import projects from "../constants/projects.js";
import { smoothScroll } from "../utils/view.js";

import makeRouterLink, { onClickRouterLink } from "./RouterLink.js";
import { getForwardArrowIcon } from "../constants/svg_icons.js";

class ProjectThumbnail {
  constructor(project) {
    this.project = project;
    this.projectPath = `/projects/${this.project.name}`;

    this.render = this.render.bind(this);
    this.getThumbnailImage = this.getThumbnailImage.bind(this);
    this.getProjectTitle = this.getProjectTitle.bind(this);
    this.getTechnologiesList = this.getTechnologiesList.bind(this);
  }

  getThumbnailImage() {
    const thumbnailImage = new Image();
    thumbnailImage.src = this.project.image.src;
    thumbnailImage.srcset = this.project.image.srcSet;
    thumbnailImage.sizes = "(max-width: 600px) 80vw, (max-width: 900px) 39vw, 26vw"
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

    const thumbnailElementWrapper = document.createElement("li");
    thumbnailElementWrapper.className = this.project.name;

    const thumbnailElement = document.createElement("figure");

    const imageWrapperLink = makeRouterLink(this.projectPath);
    imageWrapperLink.className = `thumbnail ${this.project.name} no-underline`;
    imageWrapperLink.appendChild(this.getThumbnailImage());

    thumbnailElement.appendChild(imageWrapperLink);

    const thumbnailCaption = document.createElement("figcaption");

    thumbnailCaption.appendChild(this.getProjectTitle());

    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = this.project.shortDesc;
    thumbnailCaption.appendChild(projectDescription);

    if (this.project.technologies) {
      thumbnailCaption.appendChild(this.getTechnologiesList());
    }

    const readMoreLink = makeRouterLink(this.projectPath);

    readMoreLink.className = "text-link";
    readMoreLink.innerText = "Read more";
    readMoreLink.appendChild(getForwardArrowIcon());
    readMoreLink.addEventListener("mouseenter", () => {
      imageWrapperLink.classList.add("hovered");
    });
    readMoreLink.addEventListener("mouseleave", () => {
      imageWrapperLink.classList.remove("hovered");
    });

    thumbnailCaption.appendChild(readMoreLink);

    thumbnailElement.appendChild(thumbnailCaption);

    thumbnailElementWrapper.appendChild(thumbnailElement);

    this.cachedThumbnailElement = thumbnailElementWrapper;

    // Append the thumbnail to the project display list
    projectDisplayList.appendChild(thumbnailElementWrapper);
  }
}

export default class HomePage {
  constructor() {
    const onClickScrollToProjects = event => {
      event.preventDefault();
      smoothScroll(document.getElementById("projects").offsetTop);
    };

    document.querySelectorAll(".project-link").forEach(projectLink => {
      projectLink.addEventListener("click", onClickScrollToProjects);
    });

    document
      .querySelectorAll(".about-link")
      .forEach(aboutLink =>
        aboutLink.addEventListener("click", onClickRouterLink)
      );

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

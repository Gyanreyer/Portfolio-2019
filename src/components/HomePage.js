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
    this.getThumbnailVideoElement = this.getThumbnailVideoElement.bind(this);
    this.getProjectTitle = this.getProjectTitle.bind(this);
    this.getTechnologiesList = this.getTechnologiesList.bind(this);
    this.startPlayingVideo = this.startPlayingVideo.bind(this);
    this.hideVideo = this.hideVideo.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  getThumbnailImage() {
    const thumbnailImage = new Image();
    thumbnailImage.src = this.project.image.src;
    thumbnailImage.srcset = this.project.image.srcSet;
    thumbnailImage.sizes =
      "(max-width: 600px) 80vw, (max-width: 900px) 39vw, 26vw";
    thumbnailImage.alt = `${this.project.displayName} thumbnail`;

    return thumbnailImage;
  }

  getThumbnailVideoElement() {
    this.video = document.createElement("video");
    this.video.className = "thumbnail-video";
    this.video.setAttribute("preload", "none");
    this.video.setAttribute("muted", true);
    this.video.setAttribute("loop", true);
    this.video.setAttribute("playsinline", true);

    this.project.videos.forEach(video => {
      const source = document.createElement("source");
      source.src = video.src;
      source.type = video.type;

      this.video.appendChild(source);
    });

    return this.video;
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

  // Start playing the preview video and fade it in
  startPlayingVideo() {
    // If the preview video doesn't exist or is already being shown, don't do anything
    if (!this.video || this.video.classList.contains("playing-preview")) return;

    // Kick off playing the video and fade it in once it starts
    this.video.play().then(() => this.video.classList.add("playing-preview"));
  }

  // Hide the video preview by fading it out
  hideVideo() {
    this.video.classList.remove("playing-preview");
  }

  onScroll() {
    // Only check scroll events if we have a video element and we're on mobile
    if (!this.video || window.innerWidth > 600) return;

    // Use a timeout to debounce scroll events so that we'll only start
    // playing after the user has stayed scrolled over the video for .5 seconds
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      const videoElementBoundingRect = this.video.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (
        videoElementBoundingRect.top > 0 &&
        videoElementBoundingRect.bottom < windowHeight * 0.7
      ) {
        this.startPlayingVideo();
      } else {
        this.hideVideo();
      }
    }, 500);
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
    imageWrapperLink.title = `Read more about ${this.project.displayName}`;
    imageWrapperLink.appendChild(this.getThumbnailImage());
    imageWrapperLink.appendChild(this.getThumbnailVideoElement());

    imageWrapperLink.addEventListener("mouseenter", () => {
      imageWrapperLink.classList.add("hovering");
      this.startPlayingVideo();
    });
    imageWrapperLink.addEventListener("mouseleave", () => {
      imageWrapperLink.classList.remove("hovering");
      this.hideVideo();
    });

    thumbnailElement.appendChild(imageWrapperLink);

    const thumbnailCaption = document.createElement("figcaption");

    thumbnailCaption.appendChild(this.getProjectTitle());

    const projectDescription = document.createElement("p");
    projectDescription.innerText = this.project.shortDesc;
    thumbnailCaption.appendChild(projectDescription);

    if (this.project.technologies) {
      thumbnailCaption.appendChild(this.getTechnologiesList());
    }

    const readMoreLink = makeRouterLink(this.projectPath);

    readMoreLink.className = "text-link";
    readMoreLink.innerText = "Read more";
    readMoreLink.title = `Read more about ${this.project.displayName}`;
    readMoreLink.tabIndex = -1;
    readMoreLink.appendChild(getForwardArrowIcon());
    readMoreLink.addEventListener("mouseenter", () => {
      imageWrapperLink.classList.add("hovering");
      this.startPlayingVideo();
    });
    readMoreLink.addEventListener("mouseleave", () => {
      imageWrapperLink.classList.remove("hovering");
      this.hideVideo();
    });

    thumbnailCaption.appendChild(readMoreLink);

    thumbnailElement.appendChild(thumbnailCaption);

    thumbnailElementWrapper.appendChild(thumbnailElement);

    this.cachedThumbnailElement = thumbnailElementWrapper;

    // Append the thumbnail to the project display list
    projectDisplayList.appendChild(thumbnailElementWrapper);

    window.addEventListener("scroll", this.onScroll, {
      passive: true
    });

    this.onScroll();
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

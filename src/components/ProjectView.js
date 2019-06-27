import { getGithubIcon, getLinkIcon } from "../constants/svg_icons.js";
import ViewComponent from "./ViewComponent.js";

import "./ProjectView.scss";

export default class ProjectView extends ViewComponent {
  constructor(project) {
    super();

    this.project = project;
  }

  getVideoElement() {
    const videoElement = document.createElement("video");
    videoElement.id = "project-video";
    videoElement.setAttribute("poster", this.project.image.src);
    videoElement.setAttribute("autoplay", true);
    videoElement.setAttribute("muted", true);
    videoElement.setAttribute("loop", true);
    // Allows video to play on iOS without needing to take fullscreen
    videoElement.setAttribute("playsinline", true);

    // Add source element for each project video source
    this.project.videos.forEach(projectVideo => {
      const source = document.createElement("source");
      source.src = projectVideo.src;
      source.type = projectVideo.type;

      videoElement.appendChild(source);
    });

    videoElement.play().catch(() => {
      // If the play promise was rejected, show controls on the video
      // so the user can start it themselves
      videoElement.setAttribute("controls", true);

      // When the video starts playing, remove the controls
      videoElement.addEventListener("playing", () => {
        videoElement.removeAttribute("controls");
      });
    });

    return videoElement;
  }

  getProjectLinks() {
    const projectLinks = document.createElement("div");
    projectLinks.className = "project-links";

    if (this.project.primaryLink) {
      const primaryLink = document.createElement("a");
      primaryLink.appendChild(getLinkIcon());
      primaryLink.href = this.project.primaryLink;
      primaryLink.target = "_blank";
      primaryLink.rel = "noopener noreferrer";

      primaryLink.appendChild(document.createTextNode("Check it out"));

      projectLinks.appendChild(primaryLink);
    }

    if (this.project.githubLink) {
      const githubLink = document.createElement("a");
      githubLink.className = "github-link";
      githubLink.appendChild(getGithubIcon());
      githubLink.href = this.project.githubLink;
      githubLink.target = "_blank";
      githubLink.rel = "noopener noreferrer";

      githubLink.appendChild(document.createTextNode("GitHub repo"));

      projectLinks.appendChild(githubLink);
    }

    return projectLinks;
  }

  getProjectTechnologiesList() {
    const projectTechnologiesList = document.createElement("p");
    projectTechnologiesList.className = "technologies-list";
    projectTechnologiesList.innerText = "Technologies used: ";

    for (
      let i = 0, numTechnologies = this.project.technologies.length;
      i < numTechnologies;
      i++
    ) {
      const technology = this.project.technologies[i];

      if (technology.url) {
        const technologyLink = document.createElement("a");
        technologyLink.href = technology.url;
        technologyLink.target = "_blank";
        technologyLink.rel = "noopener noreferrer";
        technologyLink.innerText = technology.text;

        projectTechnologiesList.appendChild(technologyLink);
      } else {
        projectTechnologiesList.appendChild(
          document.createTextNode(technology)
        );
      }

      if (i < numTechnologies - 1) {
        projectTechnologiesList.appendChild(document.createTextNode(", "));
      }
    }

    return projectTechnologiesList;
  }

  getViewElement() {
    const projectViewElement = document.createElement("article");
    projectViewElement.id = "project-view";
    projectViewElement.classList.add("view");
    projectViewElement.style.backgroundColor = this.project.primaryColor;

    if (this.project.textTheme === "light") {
      projectViewElement.classList.add("light-text");
    }

    // Header of page displays project name
    const projectTitle = document.createElement("h1");
    projectTitle.innerText = this.project.displayName;
    projectViewElement.appendChild(projectTitle);

    // Video element which plays preview
    projectViewElement.appendChild(this.getVideoElement());

    // Website/github links for checking the project out
    projectViewElement.appendChild(this.getProjectLinks());

    // Description paragraph for project
    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = this.project.desc;
    projectViewElement.appendChild(projectDescription);

    // List of technologies used for project
    projectViewElement.appendChild(this.getProjectTechnologiesList());

    return projectViewElement;
  }

  render() {
    super.render();
    document.documentElement.style.backgroundColor = this.project.primaryColor;
  }

  unmount() {
    super.unmount();
    document.documentElement.style.backgroundColor = null;
  }
}

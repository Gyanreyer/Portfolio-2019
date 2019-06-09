import history from "../app/history.js";

import { getGithubIcon, getLinkIcon } from "../constants/svg_icons.js";
import { lockScrolling, unlockScrolling } from "../utils/view.js";
import { makeBackButton } from "./RouterLink.js";

import "./ProjectView.scss";

export default class ProjectView {
  constructor(project) {
    this.project = project;

    this.getVideoElement = this.getVideoElement.bind(this);
    this.ensureVideoIsPlaying = this.ensureVideoIsPlaying.bind(this);
    this.getProjectLinks = this.getProjectLinks.bind(this);
    this.getProjectTechnologiesList = this.getProjectTechnologiesList.bind(
      this
    );
    this.getProjectViewElement = this.getProjectViewElement.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.render = this.render.bind(this);
  }

  getVideoElement() {
    this.video = document.createElement("video");
    this.video.id = "project-video";
    this.video.setAttribute("poster", this.project.image.src);
    this.video.setAttribute("autoplay", true);
    this.video.setAttribute("muted", true);
    this.video.setAttribute("loop", true);

    this.project.videos.forEach(video => {
      const source = document.createElement("source");
      source.src = video.src;
      source.type = video.type;

      this.video.appendChild(source);
    });

    return this.video;
  }

  ensureVideoIsPlaying() {
    if (this.video.paused || this.video.ended || this.video.scrubbing) {
      const playVideoPromise = this.video.play();

      if (playVideoPromise !== undefined) {
        playVideoPromise.catch(() => {
          // If the play promise was rejected, show controls on the video
          // so the user can start it themselves
          this.video.setAttribute("controls", true);

          // When the video starts playing, remove the controls
          this.video.addEventListener("playing", () => {
            this.video.removeAttribute("controls");
          });
        });
      }
    }
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

  getProjectViewElement() {
    this.projectViewElement = document.createElement("article");
    this.projectViewElement.id = "project-view";
    this.projectViewElement.classList.add("view");
    this.projectViewElement.style.backgroundColor = this.project.primaryColor;

    if (this.project.textTheme === "light") {
      this.projectViewElement.classList.add("light-text");
    }

    // Back button returns to home
    this.projectViewElement.appendChild(makeBackButton());

    // Header of page displays project name
    const projectTitle = document.createElement("h1");
    projectTitle.innerText = this.project.displayName;
    this.projectViewElement.appendChild(projectTitle);

    // Video element which plays preview
    this.projectViewElement.appendChild(this.getVideoElement());
    this.ensureVideoIsPlaying();

    // Website/github links for checking the project out
    this.projectViewElement.appendChild(this.getProjectLinks());

    // Description paragraph for project
    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = this.project.desc;
    this.projectViewElement.appendChild(projectDescription);

    // List of technologies used for project
    this.projectViewElement.appendChild(this.getProjectTechnologiesList());

    if (history.isInitialPage) {
      this.projectViewElement.classList.add("visible");
      // Hide the primary contents hidden under the view so they don't interfere with tabbing focus
      document.body.querySelector("main").style.visibility = "hidden";
    } else {
      // Delay applying the visibility styling so we can trigger a CSS transition
      // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
      // way to ensure we'll force the styles to re-calculate.
      // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
      requestAnimationFrame(() => {
        this.projectViewElement.classList.remove("visible");

        setTimeout(() => {
          this.projectViewElement.classList.add("visible");

          setTimeout(() => {
            document.body.querySelector("main").style.visibility = "hidden";
          }, 300);
        });
      });
    }

    return this.projectViewElement;
  }

  onKeyDown(event) {
    if (event.key === "Escape") {
      history.push("/");

      document.querySelector(`.thumbnail.${this.project.name}`).focus();
    }
  }

  render() {
    lockScrolling();

    document.body.appendChild(this.getProjectViewElement());

    document.documentElement.style.backgroundColor = this.project.primaryColor;

    // Add event listener to close the project view when escape is pressed
    window.addEventListener("keydown", this.onKeyDown);
  }

  unmount() {
    unlockScrolling();

    document.documentElement.style.backgroundColor = null;

    this.projectViewElement.classList.remove("visible");
    document.body.querySelector("main").style.visibility = "visible";

    window.removeEventListener("keydown", this.onKeyDown);

    // Remove the project view element from the DOM
    setTimeout(() => {
      this.projectViewElement.remove();
      this.projectViewElement = null;
    }, 300);
  }
}

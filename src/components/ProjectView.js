import History from "../app/history.js";

import {
  getGithubIcon,
  getLinkIcon
} from "../constants/svg_icons.js";
import { lockScrolling, unlockScrolling } from "../utils/view.js";
import BackButton from './BackButton.js';

const projectViewComponentCache = {};

const getProjectViewElement = project => {
  let projectViewElement;

  if (projectViewComponentCache[project.name]) {
    projectViewElement = projectViewComponentCache[project.name];
  } else {
    projectViewElement = document.createElement("section");
    projectViewElement.id = "project-view";
    if (project.textTheme === "light") {
      projectViewElement.classList.add("light-text");
    }

    projectViewElement.style.backgroundColor = project.primaryColor;

    const projectViewContentsWrapper = document.createElement("div");
    projectViewContentsWrapper.className = "contents-wrapper";

    const closeButton = BackButton.render(projectViewElement);
    projectViewContentsWrapper.appendChild(closeButton);

    const projectTitle = document.createElement("h1");
    projectTitle.innerText = project.displayName;
    projectViewContentsWrapper.appendChild(projectTitle);

    const video = document.createElement("video");
    video.id = "project-video";
    video.setAttribute("src", project.video);
    video.setAttribute("poster", project.image.src);
    video.setAttribute("autoplay", true);
    video.setAttribute("muted", true);
    video.setAttribute("loop", true);

    projectViewContentsWrapper.appendChild(video);

    const projectLinks = document.createElement("div");
    projectLinks.className = "project-links";

    if (project.primaryLink) {
      const primaryLink = document.createElement("a");
      primaryLink.appendChild(getLinkIcon());
      primaryLink.href = project.primaryLink;
      primaryLink.target = "_blank";
      primaryLink.rel = "noopener noreferrer";

      primaryLink.appendChild(document.createTextNode("Check it out"));

      projectLinks.appendChild(primaryLink);
    }
    if (project.githubLink) {
      const githubLink = document.createElement("a");
      githubLink.className = "github-link";
      githubLink.appendChild(getGithubIcon());
      githubLink.href = project.githubLink;
      githubLink.target = "_blank";
      githubLink.rel = "noopener noreferrer";

      githubLink.appendChild(document.createTextNode("GitHub repo"));

      projectLinks.appendChild(githubLink);
    }

    projectViewContentsWrapper.appendChild(projectLinks);

    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = project.desc;

    projectViewContentsWrapper.appendChild(projectDescription);

    const numTechnologies = project.technologies.length;

    const projectTechnologiesList = document.createElement("p");
    projectTechnologiesList.innerText = "Technologies used: ";

    project.technologies.forEach((technology, index) => {
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

      if (index < numTechnologies - 1) {
        projectTechnologiesList.appendChild(document.createTextNode(", "));
      }
    });

    projectViewContentsWrapper.appendChild(projectTechnologiesList);

    projectViewElement.appendChild(projectViewContentsWrapper);

    // Cache our newly built project view so that we don't have to re-construct it if the user tries to open it again
    projectViewComponentCache[project.name] = projectViewElement;
  }

  if (History.isInitialPage) {
    projectViewElement.classList.add("visible");
  } else {
    // Delay applying the visibility styling so we can trigger a CSS transition
    // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
    // way to ensure we'll force the styles to re-calculate.
    // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
    requestAnimationFrame(() => {
      projectViewElement.classList.remove("visible");

      setTimeout(() => {
        projectViewElement.classList.add("visible");
      });
    });
  }

  return projectViewElement;
};

export const getProjectViewComponent = project => ({
  render: () => {
    const projectViewElement = getProjectViewElement(project);
    document.body.appendChild(projectViewElement);

    const openingProjectThumbnail = document.querySelector(
      `.thumbnail.${project.name}`
    );

    if (openingProjectThumbnail) {
      openingProjectThumbnail.classList.add("opening");
    }

    document.documentElement.style.backgroundColor = project.primaryColor;

    const projectVideo = projectViewElement.querySelector("video");

    if (projectVideo.paused || projectVideo.ended || projectVideo.scrubbing) {
      const playVideoPromise = projectVideo.play();

      if (playVideoPromise !== undefined) {
        playVideoPromise.catch(() => {
          // If the play promise was rejected, show controls on the video
          // so the user can start it themselves
          projectVideo.setAttribute("controls", true);

          // When the video starts playing, remove the controls
          projectVideo.addEventListener("playing", () => {
            projectVideo.removeAttribute("controls");
          });
        });
      }
    }

    lockScrolling();
  },
  unmount: () => {
    unlockScrolling();

    const openingProjectThumbnail = document.querySelector(
      `.thumbnail.${project.name}.opening`
    );

    if (openingProjectThumbnail) {
      openingProjectThumbnail.classList.remove("opening");
    }

    document.documentElement.style.backgroundColor = null;

    const projectViewElement = document.getElementById("project-view");

    if (projectViewElement) {
      projectViewElement.classList.remove("visible");

      // Remove the project view element from the DOM
      setTimeout(() => {
        projectViewElement.remove();
      }, 300);
    }
  }
});

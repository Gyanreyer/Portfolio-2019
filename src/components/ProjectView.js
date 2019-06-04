import History from "../app/history.js";

import { getBackArrowIcon } from "../constants/svg_icons.js";
import { lockScrolling, unlockScrolling } from "../utils/view.js";

const projectViewComponentCache = {};

const getProjectViewBackButtonElement = project => {
  const isInitialPage = History.isInitialPage;

  const backButton = document.createElement("a");
  backButton.href = "/";

  backButton.className = `back-button`;
  backButton.addEventListener("click", () => {
    event.preventDefault();

    History.push(backButton.href);
  });

  backButton.appendChild(getBackArrowIcon());

  backButton.appendChild(
    document.createTextNode(isInitialPage ? "Home" : "Back")
  );

  return backButton;
};

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

    const closeButton = getProjectViewBackButtonElement(project);
    projectViewContentsWrapper.appendChild(closeButton);

    const projectTitle = document.createElement("h1");
    projectTitle.innerText = project.displayName;
    projectViewContentsWrapper.appendChild(projectTitle);

    const video = document.createElement("video");
    video.setAttribute("poster", project.image.src);
    // TODO: set the video src
    projectViewContentsWrapper.appendChild(video);

    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = project.desc;

    projectViewContentsWrapper.appendChild(projectDescription);

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

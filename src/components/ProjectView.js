import History from "../app/history.js";

// Adding "!svg-inline-loader!" so that we can get the compiled result for the svg
import BackButtonIconHTML from "!svg-inline-loader!../images/icons/back_arrow.svg";
import { lockScrolling, unlockScrolling } from "../utils/view.js";

const projectViewComponentCache = {};

const getProjectViewBackButtonElement = project => {
  const isInitialPage = History.isInitialPage;

  const backButton = document.createElement("a");
  backButton.href = `/${isInitialPage ? "#projects" : ""}`;

  backButton.className = `back-button`;
  backButton.addEventListener("click", () => {
    event.preventDefault();

    History.push(backButton.href);
  });

  backButton.innerHTML = BackButtonIconHTML;

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

    const closeButton = getProjectViewBackButtonElement(project);
    projectViewElement.appendChild(closeButton);

    const projectTitle = document.createElement("h1");
    projectTitle.innerText = project.displayName;
    projectViewElement.appendChild(projectTitle);

    const video = document.createElement("video");
    video.setAttribute("poster", project.image.src);
    // TODO: set the video src
    projectViewElement.appendChild(video);

    const projectDescription = document.createElement("p");
    projectDescription.className = "description";
    projectDescription.innerText = project.desc;

    projectViewElement.appendChild(projectDescription);

    // Cache our newly built project view so that we don't have to re-construct it if the user tries to open it again
    projectViewComponentCache[project.name] = projectViewElement;
  }

  if (History.isInitialPage) {
    projectViewElement.classList.add("IsVisible");
  } else {
    // Delay applying the visibility styling so we can trigger a CSS transition
    // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
    // way to ensure we'll force the styles to re-calculate.
    // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
    requestAnimationFrame(() => {
      projectViewElement.classList.remove("IsVisible");

      setTimeout(() => {
        projectViewElement.classList.add("IsVisible");
      });
    });
  }

  return projectViewElement;
};

export const getProjectViewComponent = project => ({
  render: () => {
    const projectViewElement = getProjectViewElement(project);
    document.body.appendChild(projectViewElement);

    // Hide the main page contents
    document.querySelector("main").classList.add("hidden");
    document.documentElement.style.backgroundColor = project.primaryColor;
    // document.body.style.backgroundColor = project.primaryColor;

    lockScrolling();
  },
  unmount: () => {
    // Show main page contents again
    document.querySelector("main").classList.remove("hidden");
    unlockScrolling();

    const projectViewElement = document.getElementById("project-view");

    if (projectViewElement) {
      projectViewElement.classList.remove("IsVisible");

      document.documentElement.style.backgroundColor = null;

      // Remove the project view element from the DOM
      setTimeout(() => {
        projectViewElement.remove();
      }, 300);
    }
  }
});

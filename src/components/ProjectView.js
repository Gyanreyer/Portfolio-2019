import History from "../app/history.js";

// Adding "!svg-inline-loader!" so that we can get the compiled result for the svg
import BackButtonIconHTML from "!svg-inline-loader!../images/icons/back_arrow.svg";

const projectViewComponentCache = {};

const getProjectViewBackButtonElement = project => {
  const isInitialPage = History.isInitialPage;

  const backButton = document.createElement("a");
  backButton.href = `/${isInitialPage ? "#projects" : ""}`;
  backButton.style.color = project.secondaryThemeColor;
  backButton.className = "back-button";
  backButton.addEventListener("click", () => {
    event.preventDefault();

    History.push(backButton.href);
  });

  backButton.innerHTML = BackButtonIconHTML;
  // Get the element for the SVg we just added
  const backButtonIcon = backButton.querySelector("svg");
  backButtonIcon.style.fill = project.secondaryThemeColor;

  backButton.appendChild(
    document.createTextNode(isInitialPage ? "Home" : "Back")
  );

  const backButtonLinkUnderline = document.createElement("span");
  backButtonLinkUnderline.className = "underline";
  backButton.appendChild(backButtonLinkUnderline);

  return backButton;
};

const getProjectViewElement = project => {
  let projectViewElement;

  if (projectViewComponentCache[project.name]) {
    projectViewElement = projectViewComponentCache[project.name];
  } else {
    projectViewElement = document.createElement("section");
    projectViewElement.id = "project-view";
    projectViewElement.style.color = project.secondaryThemeColor;

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
    projectViewElement.className = "IsVisible";
  } else {
    // Delay applying the visibility styling so we can trigger a CSS transition
    // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
    // way to ensure we'll force the styles to re-calculate.
    // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
    requestAnimationFrame(() => {
      projectViewElement.className = null;

      setTimeout(() => {
        projectViewElement.className = "IsVisible";
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
    document.querySelector("main").className = "hidden";
    document.documentElement.style.backgroundColor = project.primaryThemeColor;
    document.body.style.backgroundColor = project.primaryThemeColor;
  },
  unmount: () => {
    // Show main page contents again
    document.querySelector("main").className = null;

    const projectViewElement = document.getElementById("project-view");

    if (projectViewElement) {
      projectViewElement.className = null;

      document.documentElement.style.backgroundColor = null;
      document.body.style.backgroundColor = null;
      document.body.style.color = null;

      // Remove the project view element from the DOM
      setTimeout(() => {
        projectViewElement.remove();
      }, 300);
    }
  }
});

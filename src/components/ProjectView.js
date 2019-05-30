import history from "../utils/history.js";

const makeProjectViewElement = project => {
  const projectViewElement = document.createElement("section");
  projectViewElement.id = "project";
  projectViewElement.style.color = project.secondaryThemeColor;
  projectViewElement.style.backgroundColor = project.primaryThemeColor;

  if (history.isInitialPage()) {
    projectViewElement.className = "ShouldShowOpenAnimation";
  }

  document.documentElement.style.backgroundColor = project.primaryThemeColor;
  document.body.style.backgroundColor = project.primaryThemeColor;

  const closeButton = document.createElement("a");
  closeButton.href = "/";
  closeButton.innerText = "Back";
  closeButton.className = "CloseButton";
  closeButton.addEventListener("click", () => {
    event.preventDefault();

    history.push(
      "/",
      {
        page: "home"
      },
      `Ryan Geyer | Creative Web Developer in Detroit`
    );
  });
  projectViewElement.appendChild(closeButton);

  const projectTitle = document.createElement("h1");
  projectTitle.innerText = project.displayName;
  projectViewElement.appendChild(projectTitle);

  const video = document.createElement("video");
  video.setAttribute("poster", project.image.src);

  projectViewElement.appendChild(video);

  const projectDescription = document.createElement("p");
  projectDescription.className = "description";
  projectDescription.innerText = project.desc;

  projectViewElement.appendChild(projectDescription);

  return projectViewElement;
};

export const getProjectViewComponent = project => ({
  render: () => {
    const projectViewElement = makeProjectViewElement(project);
    document.body.appendChild(projectViewElement);
  },
  unmount: () => {
    const projectViewElement = document.getElementById("project");

    if (projectViewElement) {
      projectViewElement.className = "FadingOut";

      // TODO: Do animation stuff here
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

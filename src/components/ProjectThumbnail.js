import projects from "../constants/projects.js";
import History from "../app/history.js";

const makeProjectLinkElement = project => {
  const linkElement = document.createElement("a");

  const projectPath = `/projects/${project.name}`;

  linkElement.href = projectPath;

  linkElement.addEventListener("click", event => {
    // Prevent the default browser behavior so that we don't hard load the next url,
    // and instead manipulate the browser history so that we can keep this an SPA
    event.preventDefault();

    History.push(
      projectPath,
      {
        project: project.name
      },
      `Ryan Geyer | ${project.displayName}`
    );
  });

  return linkElement;
};

const makeThumbnailElement = project => {
  const thumbnailElement = document.createElement("li");

  const imageWrapperLink = makeProjectLinkElement(project);

  const thumbnailImage = new Image();
  thumbnailImage.src = project.image.src;
  thumbnailImage.srcset = project.image.srcSet;

  imageWrapperLink.appendChild(thumbnailImage);
  thumbnailElement.appendChild(imageWrapperLink);

  const imageDescription = document.createElement("p");
  imageDescription.innerText = project.shortDesc;

  thumbnailElement.appendChild(imageDescription);

  return thumbnailElement;
};

let hasRendered = false;

export default {
  render: () => {
    // We only want to render these thumbnails once since we aren't removing them from the page afterwards
    if (hasRendered) return;

    const projectDisplayList = document.getElementById("projects");

    for (let i = 0, numProjects = projects.length; i < numProjects; i++) {
      const thumbnailElement = makeThumbnailElement(projects[i]);

      projectDisplayList.appendChild(thumbnailElement);
    }

    hasRendered = true;
  }
};

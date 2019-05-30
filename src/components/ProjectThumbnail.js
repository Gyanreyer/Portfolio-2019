import projects from "../constants/projects.js";
import history from "../utils/history.js";

const makeProjectLinkElement = project => {
  const linkElement = document.createElement("a");

  const projectPath = `/projects/${project.name}`;

  linkElement.href = projectPath;

  linkElement.addEventListener("click", event => {
    // Prevent the default browser behavior so that we don't hard load the next url,
    // and instead manipulate the browser history so that we can keep this an SPA
    event.preventDefault();

    history.push(
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

export default {
  render: () => {
    const projectDisplayList = document.getElementById("HomepageProjectList");

    for (let i = 0, numProjects = projects.length; i < numProjects; i++) {
      const thumbnailElement = makeThumbnailElement(projects[i]);

      projectDisplayList.appendChild(thumbnailElement);
    }
  },
};

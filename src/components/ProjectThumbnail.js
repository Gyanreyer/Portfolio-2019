import projects from "../constants/projects.js";
import History from "../app/history.js";

import { getForwardArrowIcon } from "../constants/svg_icons.js";

const makeProjectLinkElement = project => {
  const linkElement = document.createElement("a");
  linkElement.className = "thumbnail";
  linkElement.setAttribute("title", `Read more about ${project.displayName}`);

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
  imageWrapperLink.classList.add("no-underline");

  const thumbnailImage = new Image();
  thumbnailImage.src = project.image.src;
  thumbnailImage.srcset = project.image.srcSet;
  thumbnailImage.alt = `${project.displayName} thumbnail`;

  imageWrapperLink.appendChild(thumbnailImage);
  thumbnailElement.appendChild(imageWrapperLink);

  const projectTitle = document.createElement("h3");
  projectTitle.innerText = project.displayName;
  thumbnailElement.appendChild(projectTitle);

  const projectDescription = document.createElement("p");
  projectDescription.className = "description";
  projectDescription.innerText = project.shortDesc;
  thumbnailElement.appendChild(projectDescription);

  if (project.technologies) {
    const technologiesUsedDescription = document.createElement("p");
    technologiesUsedDescription.appendChild(
      document.createTextNode("Technologies used: ")
    );

    project.technologies.forEach((technology, index) => {
      if (typeof technology === "string" || technology instanceof String) {
        technologiesUsedDescription.appendChild(
          document.createTextNode(
            `${index > 0 ? ", " : ""}${technology.text || technology}`
          )
        );
      }
    });

    thumbnailElement.appendChild(technologiesUsedDescription);
  }

  const readMoreLink = makeProjectLinkElement(project);

  readMoreLink.className = "text-link";
  readMoreLink.innerText = "Read more";
  readMoreLink.appendChild(getForwardArrowIcon());

  thumbnailElement.appendChild(readMoreLink);

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

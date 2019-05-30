import ProjectThumbnail from "../components/ProjectThumbnail.js";
import { getProjectViewComponent } from "../components/ProjectView.js";
import projects from "../constants/projects.js";

const registeredPaths = {
  "/": {
    component: ProjectThumbnail,
    shouldRenderOnce: true
  }
};

for (let i = 0, numProjects = projects.length; i < numProjects; i++) {
  const project = projects[i];

  registeredPaths[`/projects/${project.name}`] = {
    component: getProjectViewComponent(project)
  };
}

const getSanitizedPathname = (pathname = window.location.pathname) => {
  // Remove trailing slash from pathname if present
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
};

// For when you need to protect your passwords with a lisp
let lastPath = null;
let currentPath = getSanitizedPathname();

const render = () => {
  // If the path didn't change, don't do anything since there's nothing
  // new to render
  if (lastPath === currentPath) return;

  if (lastPath) {
    const lastRegisteredPath = registeredPaths[lastPath];

    if (
      lastRegisteredPath &&
      lastRegisteredPath.component &&
      lastRegisteredPath.component.unmount
    ) {
      lastRegisteredPath.component.unmount();
    }
  }

  const registeredPath = registeredPaths[currentPath];

  if (
    registeredPath &&
    registeredPath.component &&
    (!registeredPath.shouldRenderOnce || !registeredPath.hasRendered)
  ) {
    registeredPath.component.render();
    registeredPath.hasRendered = true;
  }
};

const pop = () => {
  lastPath = currentPath;
  currentPath = window.location.pathname;
  render();
};

window.addEventListener("popstate", pop);

const push = (pathname, state = {}, newTitle = null) => {
  // If this browser supports the HTML5 history API, let's add an event
  // listener which intercepts the link's click event and manipulates the path name
  // so that we don't do a hard load
  // This way, we can do fancy transition animations for opening projects and keep this as a nice SPA!
  if (window.history && window.history.pushState) {
    lastPath = getSanitizedPathname();
    currentPath = getSanitizedPathname(pathname);

    window.history.pushState(state, newTitle, pathname);
    render();
  } else {
    // If history manipulation isn't supported, directly set the path name - this will trigger a hard load
    window.location.pathname = pathname;
  }
};

const replace = (pathname, state = {}, newTitle = null) => {
  if (window.history && window.history.replaceState) {
    lastPath = getSanitizedPathname();
    currentPath = getSanitizedPathname(pathname);

    window.history.replaceState(state, newTitle, pathname);
    render();
  } else {
    // If history manipulation isn't supported, directly set the path name - this will trigger a hard load
    window.location.pathname = pathname;
  }
};

const isInitialPage = () => lastPath != null;

export default {
  push,
  replace,
  render,
  isInitialPage
};

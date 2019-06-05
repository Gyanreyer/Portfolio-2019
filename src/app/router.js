import { getSanitizedPathname } from "../utils/urls.js";

import projects from "../constants/projects.js";

// Components
import DynamicHomepageContents from "../components/HomePage.js";
import { getProjectViewComponent } from "../components/ProjectView.js";
import ContactView from "../components/ContactView.js";

export class Router {
  constructor() {
    // Set up our registered route paths
    this.registeredPaths = {
      "/": {
        component: DynamicHomepageContents,
        title: "Ryan Geyer | Creative Web Developer in Detroit"
      },
      "/contact": {
        component: ContactView,
        title: "Ryan Geyer | Contact"
      }
    };

    for (let i = 0, numProjects = projects.length; i < numProjects; i++) {
      const project = projects[i];

      this.registeredPaths[`/projects/${project.name}`] = {
        component: getProjectViewComponent(project),
        title: `Projects | ${project.displayName}`
      };
    }
  }

  render(currentPath = getSanitizedPathname(), lastPath) {
    // If the path didn't change, don't do anything since there's nothing
    // new to render
    if (lastPath === currentPath) return;

    // If we have a previous path we're navigating away from, do any
    // work we need to do to tear down that view
    if (lastPath) {
      const lastRegisteredPath = this.registeredPaths[lastPath];

      if (
        lastRegisteredPath &&
        lastRegisteredPath.component &&
        lastRegisteredPath.component.unmount
      ) {
        lastRegisteredPath.component.unmount();
      }
    }

    const registeredPath = this.registeredPaths[currentPath];

    if (!registeredPath) return;

    if (registeredPath.component) {
      registeredPath.component.render();
    }

    // Update the document title if the registered path has a title we should use
    if (registeredPath.title) {
      document.title = registeredPath.title;
    }
  }
}

export default new Router();

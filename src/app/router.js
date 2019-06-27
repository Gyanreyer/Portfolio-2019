import { getSanitizedPathname } from "../utils/urls.js";

import projects from "../constants/projects.js";

// Components
import ProjectView from "../components/ProjectView.js";
import HomePage from "../components/HomePage.js";
import AboutView from "../components/AboutView.js";
import ErrorView from "../components/ErrorView.js";

class Router {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.errorViewComponent = new ErrorView();
  }

  initialize() {
    // Set up our registered route paths
    this.registeredPaths = {
      "/": {
        component: new HomePage(),
        title: "Ryan Geyer | Creative Web Developer in Detroit",
        description:
          "Hi, I'm Ryan Geyer. I'm a web developer based in Detroit with a passion for building things that look and feel good."
      },
      "/about": {
        component: new AboutView(),
        title: "Ryan Geyer | About Me",
        description:
          "Hi, I'm Ryan Geyer. I'm a web developer based in Detroit with a passion for building things that look and feel good."
      }
    };

    for (let i = 0, numProjects = projects.length; i < numProjects; i++) {
      const project = projects[i];

      this.registeredPaths[`/projects/${project.name}`] = {
        component: new ProjectView(project),
        title: `Projects | ${project.displayName}`,
        description: project.shortDesc
      };
    }

    this.render();
  }

  render(currentPath = getSanitizedPathname(), lastPath) {
    // If the path didn't change, don't do anything since there's nothing
    // new to render
    if (lastPath === currentPath) return;

    // If we have a previous path we're navigating away from, do any
    // work we need to do to tear down that view
    if (lastPath) {
      const lastRegisteredPath = this.registeredPaths[lastPath];

      if (!lastRegisteredPath) {
        // If the last path exists but doesn't correspond to a registered path,
        // it was an error page so we should unmount the error view
        this.errorViewComponent.unmount();
      } else if (lastRegisteredPath.component.unmount) {
        lastRegisteredPath.component.unmount();
      }
    }

    const registeredPath = this.registeredPaths[currentPath];

    if (!registeredPath) {
      // Render an error view to indicate that this is an invalid path
      this.errorViewComponent.render();
    } else {
      registeredPath.component.render();

      // Update the document title for the registered path
      document.title = registeredPath.title;

      // Update the meta description for the registered path
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", registeredPath.description);
    }
  }
}

export default new Router();

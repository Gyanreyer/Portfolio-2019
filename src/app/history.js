import { getSanitizedPathname } from "../utils/urls.js";
import Router from "./router.js";

class History {
  constructor() {
    // For when you need to protect your passwords with a lisp
    this.lastPath = null;
    this.currentPath = getSanitizedPathname();

    // Set up event listener to handle when the browser's history is popped by clicking the back button
    window.addEventListener("popstate", () => {
      // Save the now-previous path and get the new one from the window location
      this.lastPath = this.currentPath;
      this.currentPath = window.location.pathname;
      // Trigger a re-render with our new current path
      Router.render(this.currentPath, this.lastPath);
    });
  }

  get isInitialPage() {
    // If we don't have a previous path stored, this must be the very first path that the user hit upon loading the site
    return this.lastPath == null;
  }

  // Pushes a new path onto browser history and re-renders
  push(pathname, state) {
    const newSanitizedPath = getSanitizedPathname(pathname);

    // Return early if the paths are the same
    if (newSanitizedPath === this.currentPath) return;

    // If this browser supports the HTML5 history API, let's add an event
    // listener which intercepts the link's click event and manipulates the path name
    // so that we don't do a hard load
    // This way, we can do fancy transition animations for opening projects and keep this as a nice SPA!
    if (window.history && window.history.pushState) {
      this.lastPath = getSanitizedPathname();
      this.currentPath = newSanitizedPath;

      window.history.pushState(
        state || {
          page: pathname
        },
        "Ryan Geyer | Creative Web Developer in Detroit",
        pathname
      );
      Router.render(this.currentPath, this.lastPath);
    } else {
      // If history manipulation isn't supported, directly set the path name - this will trigger a hard load
      window.location.pathname = pathname;
    }
  }
}

// Export a singleton instance of history
export default new History();

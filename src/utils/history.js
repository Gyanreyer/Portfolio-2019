import { init as initProjectThumbnails } from "../ProjectThumbnail.js";

const registeredPaths = {
  "/": {
    func: initProjectThumbnails
  }
};

// For when you need to protect your passwords with a lisp
let lastPath = null;

const render = () => {
  const { pathname } = window.location;

  // If the path didn't change, don't do anything since there's nothing
  // new to render
  if (lastPath === pathname) return;

  const registeredPath = registeredPaths[pathname];

  if (registeredPath && !registeredPath.complete && registeredPath.func) {
    registeredPath.func();
    registeredPath.complete = true;
  }
};

window.addEventListener("popstate", render);

const push = (pathname, state = {}, newTitle = null) => {
  // If this browser supports the HTML5 history API, let's add an event
  // listener which intercepts the link's click event and manipulates the path name
  // so that we don't do a hard load
  // This way, we can do fancy transition animations for opening projects and keep this as a nice SPA!
  if (window.history && window.history.pushState) {
    lastPath = window.location.pathname;
    window.history.pushState(state, newTitle, pathname);
    render();
  } else {
    window.location.pathname = pathname;
  }
};

export default {
  push,
  render
};

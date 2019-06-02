// Import all of our JavaScript to be bundled
import Router from "./app/router.js";

// Import CSS files for webpack build
import "./style.scss";

const onDocumentLoaded = () => {
  document.querySelector(".Loading").className = null;

  // Do an initial render for our current route
  Router.render();
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", onDocumentLoaded);
} else {
  onDocumentLoaded();
}

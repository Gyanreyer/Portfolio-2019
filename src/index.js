// Import all of our JavaScript to be bundled
import Router from "./app/router.js";

// Import CSS files for webpack build
import "./app.scss";

const onDocumentLoaded = () => {
  document.querySelector(".loading").classList.remove("loading");

  // Set up our router and do an initial render
  Router.initialize();
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", onDocumentLoaded);
} else {
  onDocumentLoaded();
}

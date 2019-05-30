// Import all of our JavaScript to be bundled
import history from "./utils/history.js";

// Import CSS files for webpack build
import "./style.scss";

const onDocumentLoaded = () => {
  document.querySelector(".Loading").className = null;

  history.render();
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", onDocumentLoaded);
} else {
  onDocumentLoaded();
}

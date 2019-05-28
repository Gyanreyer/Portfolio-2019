// Import all of our JavaScript to be bundled
import history from "./utils/history.js";

// Import CSS files for webpack build
import "./style.scss";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", history.render);
} else {
  history.render();
}

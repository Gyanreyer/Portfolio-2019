import History from "../app/history.js";
import { getBackArrowIcon } from "../constants/svg_icons.js";

class BackButton {
  render(parentNode) {
    const backButton = document.createElement("a");
    backButton.href = "/";

    backButton.className = `back-button`;
    backButton.addEventListener("click", () => {
      event.preventDefault();

      History.push(backButton.href);
    });

    backButton.appendChild(getBackArrowIcon());

    backButton.appendChild(
      document.createTextNode(History.isInitialPage ? "Home" : "Back")
    );

    return backButton;
  }
}

export default new BackButton();

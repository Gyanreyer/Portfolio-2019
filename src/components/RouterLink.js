import history from "../app/history.js";
import { getBackArrowIcon } from "../constants/svg_icons.js";

// OnClick event that manipulates history so we don't have to manually construct them for every link element
export function onClickRouterLink(event) {
  // Prevent the default browser behavior so that we don't hard load the next url,
  // and instead manipulate the browser history so that we can keep this an SPA
  event.preventDefault();

  if (this.href) {
    history.push(this.href);
  }
}

export default function makeRouterLink(href) {
  const linkElement = document.createElement("a");
  linkElement.href = href;
  linkElement.addEventListener("click", onClickRouterLink);

  return linkElement;
}

export function makeBackButton() {
  const buttonWrapper = document.createElement("p");
  buttonWrapper.className = `back-button`;

  const backButton = makeRouterLink();
  backButton.href = "/";

  backButton.appendChild(getBackArrowIcon());
  backButton.appendChild(
    document.createTextNode(history.isInitialPage ? "Home" : "Back")
  );

  buttonWrapper.appendChild(backButton);

  return buttonWrapper;
}

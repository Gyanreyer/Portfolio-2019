import { lockScrolling, unlockScrolling } from "../utils/view.js";
import history from "../app/history.js";
import { makeBackButton } from "./RouterLink.js";

export default class ViewComponent {
  constructor() {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.render = this.render.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  getViewElement(){
    return null;
  }

  onKeyDown(event) {
    if (event.key === "Escape") {
      history.push("/");

      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    }
  }

  render() {
    lockScrolling();
    clearTimeout(this.removeElementTimeout);

    if (document.activeElement) {
      this.lastFocusedElement = document.activeElement;
    }

    if (!this.viewElement) {
      this.viewElement = this.getViewElement();
      this.viewElement.insertBefore(
        makeBackButton(),
        this.viewElement.firstChild
      );
    }
    document.body.appendChild(this.viewElement);

    if (history.isInitialPage) {
      this.viewElement.classList.add("visible");
      const mainElement = document.body.querySelector("main");
      mainElement.setAttribute("aria-hidden", true);
      mainElement.style.visibility = "hidden";
    } else {
      // Delay applying the visibility styling so we can trigger a CSS transition
      // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
      // way to ensure we'll force the styles to re-calculate.
      // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
      requestAnimationFrame(() => {
        this.viewElement.classList.remove("visible");

        setTimeout(() => {
          this.viewElement.classList.add("visible");

          setTimeout(() => {
            const mainElement = document.body.querySelector("main");
            mainElement.setAttribute("aria-hidden", true);
            mainElement.style.visibility = "hidden";
          }, 300);
        });
      });
    }

    // Add event listener to close the about view when escape is pressed
    window.addEventListener("keydown", this.onKeyDown);
  }

  unmount() {
    unlockScrolling();

    if (this.viewElement) {
      this.viewElement.classList.remove("visible");
      // Remove the project view element from the DOM
      clearTimeout(this.removeElementTimeout);
      this.removeElementTimeout = setTimeout(() => {
        this.viewElement.remove();
        this.viewElement = null;
      }, 300);
    }

    const mainElement = document.body.querySelector("main");
    mainElement.setAttribute("aria-hidden", false);
    mainElement.style.visibility = "visible";

    // Remove onKeyDown event listener since we no longer need it
    window.removeEventListener("keydown", this.onKeyDown);
  }
}

import "./ErrorView.scss";
import errorImage from "../resources/images/error.jpg";
import ViewComponent from "./ViewComponent.js";

export default class ErrorView extends ViewComponent {
  getViewElement() {
    const errorViewElement = document.createElement("section");
    errorViewElement.classList.add("view");
    errorViewElement.id = "error-view";

    const pageTitle = document.createElement("h1");
    pageTitle.innerText = "Uh oh, there's nothing here.";

    errorViewElement.appendChild(pageTitle);

    const subTitle = document.createElement("p");
    subTitle.className = "subtitle";
    subTitle.innerText =
      "Sometimes the things we want the most are just out of reach.";
    errorViewElement.appendChild(subTitle);

    const errorImageElement = new Image();
    errorImageElement.src = errorImage.src;
    errorImageElement.srcset = errorImage.srcSet;
    errorImageElement.sizes = "(max-width: 600px) 80vw, 640px";
    errorImageElement.alt = "A dog staring longingly at a ball out of reach";
    errorViewElement.appendChild(errorImageElement);

    return errorViewElement;
  }
}

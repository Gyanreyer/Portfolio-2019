import "./AboutView.scss";
import { lockScrolling, unlockScrolling } from "../utils/view.js";
import { makeBackButton } from "./RouterLink.js";
import pictureOfMe from "../resources/images/ryan.jpg";
import history from "../app/history.js";

const contentParagraphs = [
  "I'm Ryan, pleased to meet you. I'm a web developer with a passion for making things that look and feel good.",
  "I studied Game Design and Development at RIT and I'm a member of Hacker Fellows, a fellowship program which matches talented folks with Michigan-based tech startups.",
  "I'm currently working as a full-stack software engineer at Waymark. It's pretty cool, you should check it out."
];

const tidbits = [
  "Favorite game: The Witness",
  "Currently reading: The Shock Doctrine by Naomi Klein",
  "Go-to cocktail: Whiskey sour"
];

export default class AboutView {
  constructor() {
    this.getImage = this.getImage.bind(this);
    this.getAboutViewElement = this.getAboutViewElement.bind(this);
    this.render = this.render.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  getImage() {
    const image = new Image();
    image.src = pictureOfMe.src;
    image.srcset = pictureOfMe.srcSet;
    image.alt = "A picture of me";

    return image;
  }

  getAboutViewElement() {
    this.aboutViewElement = document.createElement("article");
    this.aboutViewElement.classList.add("view");
    this.aboutViewElement.id = "about-view";

    this.aboutViewElement.appendChild(makeBackButton());

    const contentsWrapper = document.createElement("div");
    contentsWrapper.className = "contents-wrapper";

    const textContents = document.createElement("div");

    const pageTitle = document.createElement("h1");
    pageTitle.innerText = `Hello ${String.fromCodePoint(0x1f44b)}`;
    textContents.appendChild(pageTitle);

    contentParagraphs.forEach(paragraphText => {
      const paragraph = document.createElement("p");
      paragraph.innerText = paragraphText;
      textContents.appendChild(paragraph);
    });

    contentsWrapper.appendChild(textContents);
    contentsWrapper.appendChild(this.getImage());

    this.aboutViewElement.appendChild(contentsWrapper);

    if (history.isInitialPage) {
      this.aboutViewElement.classList.add("visible");
    } else {
      // Delay applying the visibility styling so we can trigger a CSS transition
      // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
      // way to ensure we'll force the styles to re-calculate.
      // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
      requestAnimationFrame(() => {
        this.aboutViewElement.classList.remove("visible");

        setTimeout(() => {
          this.aboutViewElement.classList.add("visible");
        });
      });
    }

    return this.aboutViewElement;
  }

  render() {
    lockScrolling();

    document.body.appendChild(this.getAboutViewElement());
  }

  unmount() {
    unlockScrolling();

    this.aboutViewElement.classList.remove("visible");

    setTimeout(() => {
      this.aboutViewElement.remove();
      this.aboutViewElement = null;
    }, 300);
  }
}

import "./AboutView.scss";
import pictureOfMe from "../resources/images/ryan.jpg";
import ViewComponent from "./ViewComponent.js";

const contentParagraphs = [
  "I'm Ryan, pleased to meet you. I'm a web developer in Detroit with a passion for making things that look and feel good.",
  "I studied Game Design and Development at RIT and I'm a member of Hacker Fellows, a fellowship program which matches talented folks with Michigan-based tech startups.",
  "I'm currently working as a full-stack software engineer at Waymark. It's pretty cool, you should check it out."
];

const funFacts = [
  "Favorite game: The Witness",
  "Currently reading: The Shock Doctrine by Naomi Klein",
  "Go-to cocktail: Whiskey sour"
];

export default class AboutView extends ViewComponent {
  getExternalLink(href, text) {
    // Need to wrap in a paragraph so that the link can have display: block without
    // making our actual anchor tag fill the full with of the page
    const link = document.createElement("a");
    link.href = href;
    link.innerText = text;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
  }

  getTopListenedTrackElement() {
    if (this.topListenedTrackElement) return this.topListenedTrackElement;

    this.topListenedTrackElement = document.createElement("p");
    this.topListenedTrackElement.innerText = `Most listened song this week: `;

    const loadingAnimation = document.createElement("span");
    for (let i = 0; i < 3; i++) {
      const loadingDot = document.createElement("span");
      loadingDot.className = "loading-dot";
      loadingDot.innerText = ".";
      loadingAnimation.appendChild(loadingDot);
    }

    this.topListenedTrackElement.appendChild(loadingAnimation);

    // Element which will display the top played track as soon as we receive our API response
    const trackDisplayElement = document.createElement("span");
    trackDisplayElement.className = "top-track";
    this.topListenedTrackElement.appendChild(trackDisplayElement);

    // Make a request for my most-listened track from
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        loadingAnimation.remove();

        trackDisplayElement.classList.add("loaded");
        trackDisplayElement.innerText = xhr.responseText;
      }
    });
    xhr.responseType = "text";
    xhr.open(
      "GET",
      "https://us-central1-portfolio-9102c.cloudfunctions.net/topTrack",
      true
    );
    xhr.send();

    return this.topListenedTrackElement;
  }

  getViewElement() {
    const aboutViewElement = document.createElement("article");
    aboutViewElement.classList.add("view");
    aboutViewElement.id = "about-view";

    const contentsWrapper = document.createElement("div");
    contentsWrapper.className = "contents-wrapper";

    const textContents = document.createElement("div");
    textContents.className = "text-contents";

    const pageTitle = document.createElement("h1");
    pageTitle.innerText = "Hello";

    const titleWavingEmoji = document.createElement("span");
    titleWavingEmoji.className = "waving-emoji";
    titleWavingEmoji.innerText = String.fromCodePoint(0x1f44b);

    pageTitle.appendChild(titleWavingEmoji);

    textContents.appendChild(pageTitle);

    contentParagraphs.forEach(paragraphText => {
      const paragraph = document.createElement("p");
      paragraph.innerText = paragraphText;
      textContents.appendChild(paragraph);
    });

    const aboutLinks = document.createElement("p");
    aboutLinks.className = "about-links";

    aboutLinks.appendChild(
      this.getExternalLink(
        "/Ryan_Geyer_Resume.pdf",
        `Resum${String.fromCodePoint(233)}`
      )
    );
    aboutLinks.appendChild(
      this.getExternalLink("mailto:ryan@geyer.dev", "Email")
    );
    aboutLinks.appendChild(
      this.getExternalLink("https://waymark.com", "Waymark")
    );
    aboutLinks.appendChild(
      this.getExternalLink("https://github.com/Gyanreyer", "GitHub")
    );
    aboutLinks.appendChild(
      this.getExternalLink("https://www.linkedin.com/in/gyanreyer", "LinkedIn")
    );

    textContents.appendChild(aboutLinks);

    const funFactsTitle = document.createElement("p");
    funFactsTitle.className = "fun-facts-title";
    funFactsTitle.innerText = "Fun facts";

    textContents.appendChild(funFactsTitle);

    textContents.appendChild(this.getTopListenedTrackElement());

    funFacts.forEach(facts => {
      const factDisplayElement = document.createElement("p");
      factDisplayElement.innerText = facts;

      textContents.appendChild(factDisplayElement);
    });

    contentsWrapper.appendChild(textContents);

    const myImage = new Image();
    myImage.className = "my-image";
    myImage.src = pictureOfMe.src;
    myImage.srcset = pictureOfMe.srcSet;
    myImage.sizes = "24vw";
    myImage.alt = "A picture of me";

    contentsWrapper.appendChild(myImage);

    // If the image isn't loaded, add a class to hide it
    // which will be removed once it's done
    if (!myImage.complete) {
      myImage.classList.add("loading");
      myImage.addEventListener("load", () =>
        myImage.classList.remove("loading")
      );
    }

    aboutViewElement.appendChild(contentsWrapper);

    return aboutViewElement;
  }
}

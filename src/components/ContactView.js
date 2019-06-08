import history from "../app/history.js";
import { lockScrolling, unlockScrolling } from "../utils/view.js";
import { makeBackButton } from "./RouterLink.js";

export default class ContactView {
  constructor() {
    this.getContactViewElement = this.getContactViewElement.bind(this);
    this.render = this.render.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  getContactViewElement() {
    const contactViewElement = document.createElement("section");
    contactViewElement.id = "contact-view";

    contactViewElement.appendChild(makeBackButton());

    const pageTitle = document.createElement("h1");
    pageTitle.innerText = "We'll be in touch.";

    contactViewElement.appendChild(pageTitle);

    const subTitle = document.createElement("p");
    subTitle.className = "subheader";
    subTitle.innerText = "I’m looking forward to meeting you. ";
    // Add a handshake emoji to the subtitle
    subTitle.appendChild(
      document.createTextNode(String.fromCodePoint(0x1f91d))
    );

    contactViewElement.appendChild(subTitle);

    const resumeLinkWrapper = document.createElement("p");
    resumeLinkWrapper.className = "contact-view-link";
    const resumeLink = document.createElement("a");
    resumeLink.innerText = `Resum${String.fromCodePoint(233)}`;
    resumeLink.href = "/Ryan_Geyer_Resume.pdf";
    resumeLink.target = "_blank";
    resumeLink.rel = "noopener noreferrer";

    resumeLinkWrapper.appendChild(resumeLink);
    contactViewElement.appendChild(resumeLinkWrapper);

    const emailLinkWrapper = document.createElement("p");
    emailLinkWrapper.className = "contact-view-link";
    const emailLink = document.createElement("a");
    emailLink.innerText = "Email";
    emailLink.href = "mailto:ryan@geyer.dev";
    emailLink.target = "_blank";
    emailLink.rel = "noopener noreferrer";

    emailLinkWrapper.appendChild(emailLink);
    contactViewElement.appendChild(emailLinkWrapper);

    const linkedinLinkWrapper = document.createElement("p");
    linkedinLinkWrapper.className = "contact-view-link";
    const linkedinLink = document.createElement("a");
    linkedinLink.innerText = "LinkedIn";
    linkedinLink.href = "https://www.linkedin.com/in/gyanreyer";
    linkedinLink.target = "_blank";
    linkedinLink.rel = "noopener noreferrer";

    linkedinLinkWrapper.appendChild(linkedinLink);
    contactViewElement.appendChild(linkedinLinkWrapper);

    if (history.isInitialPage) {
      contactViewElement.classList.add("visible");
    } else {
      // Delay applying the visibility styling so we can trigger a CSS transition
      // We have to use this weird requestAnimationFrame + setTimeout combo as it seems to be the most effective cross-browser
      // way to ensure we'll force the styles to re-calculate.
      // Source: https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
      requestAnimationFrame(() => {
        setTimeout(() => {
          contactViewElement.classList.add("visible");
        });
      });
    }

    this.cachedContactViewElement = contactViewElement;

    return contactViewElement;
  }

  render() {
    lockScrolling();

    const contactViewElement = this.getContactViewElement();
    document.body.appendChild(contactViewElement);
  }

  unmount() {
    unlockScrolling();

    this.cachedContactViewElement.classList.remove("visible");

    setTimeout(() => {
      this.cachedContactViewElement.remove();
      this.cachedContactViewElement = null;
    }, 300);
  }
}

const getContactViewElement = () => {
  const contactViewElement = document.createElement("section");
  contactViewElement.id = "contact";

  const pageTitle = document.createElement("h1");
  pageTitle.innerText = "We'll be in touch.";

  contactViewElement.appendChild(pageTitle);

  const subTitle = document.createElement("p");
  subTitle.innerText = "I’m looking forward to meeting you. ";
  subTitle.appendChild(document.createTextNode(String.fromCodePoint(0x1f91d)));

  contactViewElement.appendChild(subTitle);

  return contactViewElement;
};

export default {
  render: () => {
    const contactViewElement = getContactViewElement();
    document.body.appendChild(contactViewElement);
  },
  unmount: () => {
    const contactViewElement = document.getElementById("contact");

    if (contactViewElement) {
      contactViewElement.classList.remove("visible");

      setTimeout(() => {
        contactViewElement.remove();
      }, 300);
    }
  }
};

import backArrowSVG from "!svg-inline-loader!../resources/icons/back_arrow.svg";
import forwardArrowSVG from "!svg-inline-loader!../resources/icons/forward_arrow.svg";
import githubSVG from "!svg-inline-loader!../resources/icons/github.svg";
import linkSVG from "!svg-inline-loader!../resources/icons/link.svg";

const makeIconElement = svgString => {
  const wrapperSpan = document.createElement("span");
  wrapperSpan.innerHTML = svgString;

  return wrapperSpan.firstChild;
};

export const getBackArrowIcon = () => makeIconElement(backArrowSVG);

export const getForwardArrowIcon = () => makeIconElement(forwardArrowSVG);

export const getGithubIcon = () => makeIconElement(githubSVG);

export const getLinkIcon = () => makeIconElement(linkSVG);

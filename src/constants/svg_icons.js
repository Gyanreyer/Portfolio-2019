import backArrowSVG from "!svg-inline-loader!../resources/icons/back_arrow.svg";
import forwardArrowSVG from "!svg-inline-loader!../resources/icons/forward_arrow.svg";

export const getBackArrowIcon = () => {
  const backArrowIconWrapper = document.createElement("span");
  backArrowIconWrapper.innerHTML = backArrowSVG;

  return backArrowIconWrapper;
};

export const getForwardArrowIcon = () => {
  const forwardArrowIconWrapper = document.createElement("span");
  forwardArrowIconWrapper.innerHTML = forwardArrowSVG;

  return forwardArrowIconWrapper;
};

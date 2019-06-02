let previousScrollPos;

export const lockScrolling = () => {
  previousScrollPos = window.scrollY;

  document.body.style.maxHeight = "100vh";
  document.body.style.overflow = "hidden";
};

export const unlockScrolling = () => {
  document.body.style.maxHeight = null;
  document.body.style.overflow = null;

  window.scrollTo(0, previousScrollPos || 0);
};

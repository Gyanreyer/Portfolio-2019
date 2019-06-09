let previousScrollPos;

export const lockScrolling = () => {
  previousScrollPos = window.scrollY;

  document.documentElement.style.maxHeight = "100vh";
  document.documentElement.style.overflow = "hidden";
};

export const unlockScrolling = () => {
  document.documentElement.style.maxHeight = null;
  document.documentElement.style.overflow = null;

  window.scrollTo(0, previousScrollPos || 0);
};

const easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

// Smoothly scrolls window to a target y position using a quadratic easing function
export const smoothScroll = (
  targetYPos,
  duration = 300,
  initialYPos = window.scrollY,
  startTime = performance.now(),
  currentTime = performance.now()
) => {
  const elapsed = currentTime - startTime;

  window.scroll(
    0,
    easeInOutQuad(elapsed, initialYPos, targetYPos - initialYPos, duration)
  );

  if (elapsed < duration) {
    requestAnimationFrame(newCurrentTime =>
      smoothScroll(targetYPos, duration, initialYPos, startTime, newCurrentTime)
    );
  }
};

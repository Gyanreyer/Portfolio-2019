// Util function to sanitize urls so they'll interface properly with the router
export const getSanitizedPathname = (pathname = window.location.pathname) => {
  const parsedURLObject = new URL(pathname, window.origin);

  let sanitizedPathname = parsedURLObject.pathname;

  // Remove trailing slash from pathname if present
  if (sanitizedPathname.length > 1 && sanitizedPathname.endsWith("/")) {
    sanitizedPathname = sanitizedPathname.slice(0, -1);
  }

  return sanitizedPathname;
};

const appBaseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_DEV_SERVER_URL;

const commonRoutes = {
  loginRedirectTo: `${appBaseURL}/`,
  authPrefix: "/auth",
  logoutRedirectTo: "/",
};

/**
 * App Routes Dictionary
 */
const routes = {
  login: "/login",
  signup: "/signup",
  landing: "/",
  projectEditor: (projectId: string) => `/editor/${projectId}`,
};

const PROTECTED_ROUTES = [/\/editor(\/[a-zA-Z0-9]+)?$/, /\/$/];
const AUTH_ROUTES = ["/login", "/signup"];

export { commonRoutes, routes, AUTH_ROUTES, PROTECTED_ROUTES };

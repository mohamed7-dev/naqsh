const appBaseURL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

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

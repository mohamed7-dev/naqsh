const commonRoutes = {
  loginRedirectTo: "/",
  authPrefix: "/auth",
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

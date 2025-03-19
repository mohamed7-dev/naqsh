import { NextResponse } from "next/server";
import {
  AUTH_ROUTES,
  commonRoutes,
  PROTECTED_ROUTES,
  routes,
} from "./config/routes";
import { auth } from "./features/auth/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLogged = Boolean(req.auth);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isNextAuthRoute = nextUrl.pathname.startsWith(commonRoutes.authPrefix);

  const isProtectedRoute = PROTECTED_ROUTES.some((item) => {
    return item.test(nextUrl.pathname);
  });

  //allow all nextauth routes
  if (isNextAuthRoute) return;

  //if user is logged in and the route is auth
  //route redirect to LOGIN_REDIRECT
  if (isAuthRoute) {
    if (isLogged) {
      return NextResponse.redirect(
        new URL(commonRoutes.loginRedirectTo, nextUrl)
      );
    }
    return;
  }

  //if user is not logged in and tries to access
  //protected route redirect to login page
  if (isProtectedRoute) {
    if (!isLogged) {
      return NextResponse.redirect(new URL(routes.login, nextUrl));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

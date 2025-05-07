import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getCompaniesList } from "./shared/api/getData";
import { AUTH_COOKIE_NAME } from "./shared/constants/constants";

const isAuthenticated = (request: NextRequest) => {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  return !!token;
};

// Get the allowed hosts from environment variables.
// These are the expected hosts for the two sites: rekrutai and jobsite.
const rekrutaiHost = process.env.NEXT_PUBLIC_REKRUTAI_HOST || "";
const jobsiteHost = process.env.NEXT_PUBLIC_JOBSITE_HOST || "";

// Mapping of available hosts to their corresponding route prefixes to avoid multiple condition blocks in the middleware
type HostMapping = {
  [key: string]: string;
};
const hostMapping: HostMapping = {
  [rekrutaiHost]: "/rekrutai",
  [jobsiteHost]: "/jobsite",
};

/**
 * Helper gets host from request, using cookie or headers
 * @param {NextRequest} request
 * @returns {string|undefined}
 */

const getReqOrigin = (request: NextRequest): string | undefined => {
  //Get origin host from cookie if exitsts
  const originHostFromCookie = request.cookies.get("origin-host")?.value;

  // Get the forwarded host from the request headers.
  const headerHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  // Purify the obtained host by removing the port number if it exists.
  // This is done using a regular expression that matches a colon followed by one or more digits, and removes it.
  const normalized = headerHost?.replace(/:\d+$/, "");

  return originHostFromCookie || normalized;
};

/**
 * This helper persists origin host in cookies (muatate response object)
 * @param {NextRequest}request
 * @param {NextResponse} response
 * @param {string|undefined} headerValue
 */
const persistOriginHost = (
  request: NextRequest,
  response: NextResponse,
  headerValue: string | undefined
): void => {
  if (!request.cookies.has("origin-host") && headerValue) {
    response.cookies.set({
      name: "origin-host",
      value: headerValue,
      path: "/",
      sameSite: "lax",
    });
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  //get origin host from cookie or headers
  const originHost = getReqOrigin(request);
  // Clone the URL from the request to manipulate it.
  const url = request.nextUrl.clone();

  /*--------------------------------------------*/

  // List of forbidden route names (top-level segments) for different spaces
  const forbiddenRouteNames = Object.values(hostMapping);
  // Get the first segment of the pathname
  const firstSegment = pathname.split("/")[1];
  // Check if the first segment matches any forbidden route name (e.g., '/rekrutai', '/jobsite')
  if (forbiddenRouteNames.includes(`/${firstSegment}`)) {
    // In development environment, throw an error to notify the developer
    if (process.env.NODE_ENV === "development") {
      throw new Error(
        `Routing violation: The route prefix "${firstSegment}" cannot be used as a top-level segment in any of the spaces.`
      );
    } else {
      console.error("prod 404");
      // In production, return a 404 response if an invalid top-level route is accessed
      return new NextResponse("Page Not Found", { status: 404 });
    }
  }

  /*--------------------------------------------*/

  // First authentication checking
  if (pathname.includes("/dashboard")) {
    if (!isAuthenticated(request)) {
      const redirectResponse = NextResponse.redirect(new URL("/", request.url));
      persistOriginHost(request, redirectResponse, originHost);
      return redirectResponse;
    }
  }

  /*--------------------------------------------*/

  //Get prefix coresponding to the origin host
  const routePrefix = originHost ? hostMapping[originHost] : undefined;
  //Check if the pathname includes
  //Add prefixt to the pathname and redirect to coresponding route
  if (routePrefix && !url.pathname.startsWith(routePrefix)) {
    url.pathname = `${routePrefix}${url.pathname}`;
    const rewriteRespons = NextResponse.rewrite(url);
    persistOriginHost(request, rewriteRespons, originHost);
    return rewriteRespons;
  }

  const response = NextResponse.next();
  persistOriginHost(request, response, originHost);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff)$).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCompaniesList } from "./shared/api/getData";
import { AUTH_COOKIE_NAME } from "./shared/constants/constants";

// This function can be marked `async` if using `await` inside

const isAuthenticated = (request: NextRequest) => {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  return !!token;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/dashboard") {
      const { data: companies } = await getCompaniesList({});
      if (companies?.length) {
        return NextResponse.redirect(
          new URL(`/dashboard/${companies[0].id}`, request.url)
        );
      }
    }

    return NextResponse.next();
  }

  // if (request.nextUrl.pathname === "/dashboard") {
  //   const { data: companies } = await getCompaniesList({});

  //   if (companies.length) {
  //     return NextResponse.redirect(
  //       new URL(`/dashboard/${companies[0].id}`, request.url)
  //     );
  //   }
  // }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*"],
};

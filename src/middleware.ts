import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCompaniesList } from "./shared/api/getData";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/dashboard") {
    const { data: companies } = await getCompaniesList({});

    if (companies.length) {
      return NextResponse.redirect(
        new URL(`/dashboard/${companies[0].id}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard",
};

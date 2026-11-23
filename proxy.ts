import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Permanent redirects for the capitalized URLs that shipped before the route
 * rename. `next.config` redirect sources match case-insensitively, so a
 * `/Blog -> /blog` rule would also match `/blog` and loop; match exact casing
 * here instead.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/Blog" || pathname === "/Work") {
    return NextResponse.redirect(
      new URL(pathname.toLowerCase(), request.url),
      308,
    );
  }

  if (pathname.startsWith("/Blog/")) {
    return NextResponse.redirect(
      new URL(`/blog/${pathname.slice("/Blog/".length)}`, request.url),
      308,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Blog", "/Blog/:path*", "/Work"],
};

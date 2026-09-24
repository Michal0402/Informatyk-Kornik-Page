import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "sgk_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.AUTH_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

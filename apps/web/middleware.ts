import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PROTECTED_ROUTES, AUTH_ROUTES } from "@/lib/middleware/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const authToken = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!authToken;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};

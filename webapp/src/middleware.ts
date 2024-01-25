import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    !request.cookies.get(process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt") &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !!request.cookies.get(process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt") &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|pwa|admin).*)",
  ],
};

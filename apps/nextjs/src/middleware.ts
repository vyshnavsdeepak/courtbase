import { auth } from "@court-base/auth";
import { NextResponse } from "next/server";

const protectedPaths = ["/x", "/join"];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    if (!req.auth) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

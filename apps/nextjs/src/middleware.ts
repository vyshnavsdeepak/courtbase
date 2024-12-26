import { NextResponse } from "next/server";

import { headerKeys } from "@court-base/api/constants";
import { auth } from "@court-base/auth";

import { routes } from "~/config/routes";

const protectedPaths = ["/x", routes.join];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    if (!req.auth) {
      const url = req.nextUrl.clone();
      url.pathname = routes.login;
      url.search = "";
      const callbackPath = req.nextUrl.toString();
      url.searchParams.set("callbackUrl", callbackPath);
      return NextResponse.redirect(url);
    }

    const segments = path.split("/");
    if (segments.includes("x")) {
      const orgId = segments[segments.indexOf("x") + 1];
      if (orgId) {
        const headers = new Headers(req.headers);
        headers.set(headerKeys.orgId, orgId);
        return NextResponse.next({
          request: {
            headers,
          },
        });
      }
    }
  }
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

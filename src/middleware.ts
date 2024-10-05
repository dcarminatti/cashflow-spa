import { NextRequest, NextResponse } from "next/server";
import type { AuthUser } from "./lib/types/auth";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("user");
  if (!cookie) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl).toString());
  }

  const user = JSON.parse(cookie.value) as AuthUser;
  if (!user.token) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl).toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/banks"],
};

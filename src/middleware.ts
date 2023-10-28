import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {jwtVerify} from "jose";

export async function middleware(request: NextRequest) {
  const unverifiedToken = request.cookies.get("jwt")?.value;
  if (unverifiedToken) {
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const {payload } = await jwtVerify(unverifiedToken, jwtSecret);
      const { userID } = payload;

      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('userID', userID as string)

      const response = NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      })

      return response
    } catch (error) {
      console.error(error);
      
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/profile/:userID?", "/api/posts", "/api/users"],
};

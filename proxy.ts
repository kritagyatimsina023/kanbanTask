// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// import { Role } from "./generated/prisma/enums";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not configured");
// }

// const secret = new TextEncoder().encode(JWT_SECRET);

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const token = request.cookies.get("kanban_session")?.value;

//   if (pathname === "/login") {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   let payload;
//   try {
//     const result = await jwtVerify(token, secret);
//     payload = result.payload;
//   } catch {
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("kanban_session");
//     return response;
//   }
//   const role = payload.role as Role;
//   if (pathname.startsWith("/admin")) {
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }
//   const response = NextResponse.next();
//   response.headers.set("x-user-session", JSON.stringify(payload));
//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|demo).*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { Role } from "./generated/prisma/enums";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("kanban_session")?.value;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let payload;

  try {
    const result = await jwtVerify(token, secret);
    payload = result.payload;
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete("kanban_session");

    return response;
  }

  const role = payload.role as Role;

  if (role === "ADMIN") {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (pathname.startsWith("/member")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (role === "MEMBER") {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const response = NextResponse.next();

  response.headers.set("x-user-session", JSON.stringify(payload));

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|demo).*)"],
};

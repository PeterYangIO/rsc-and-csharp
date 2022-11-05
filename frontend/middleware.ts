import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.nextUrl);
    
    // if (request.nextUrl.pathname === "/api/login") {
    //     const response = NextResponse.next();
    //     console.log(response);
    
    //     return response;
    // }

    // if (request.nextUrl.pathname === "/api/logout") {
    //     const response = NextResponse.next();
    //     response.cookies.delete("token");
    
    //     return response;
    // }

    // if (request.nextUrl.pathname.startsWith("/api/")) {
    //     const token = request.cookies.get("token");
    //     const requestHeaders = new Headers(request.headers);
    //     requestHeaders.set("Authorization", `Bearer ${token}`);
    // }
}

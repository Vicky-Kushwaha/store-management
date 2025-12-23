import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (!token){ 
  	
  	return NextResponse.redirect(new URL("/", req.url));
    // return NextResponse.json({message : "Token is invalid or expire"})
  }

  return NextResponse.next();
}

export const config = {
	 matcher: ["/user/:path*", "/api/products:path*", "/api/user:path*"]
}
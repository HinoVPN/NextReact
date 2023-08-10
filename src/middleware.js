import { NextResponse } from 'next/server'
 
export function middleware(req, res) {  
  if(req.cookies.has('accessToken') && req.cookies.has('userId') && req.cookies.has('role') && req.cookies.has('username')) {
    return NextResponse.next()
  }else{
    return NextResponse.rewrite(new URL("/login",req.url))
  }
}

export const config = {
  matcher: ['/user/:path*','/blog/:path*',],
}
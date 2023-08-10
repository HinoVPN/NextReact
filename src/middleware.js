import { NextResponse } from 'next/server'
import { useCookies } from 'react-cookie'
 
export function middleware(req, res) {
  const [cookies] = useCookies()
  if(cookies.get('userId') && cookies.get('role') && cookies.get('accessToken') && cookies.get('username')) {
    return NextResponse.next()
  }else{
    return NextResponse.rewrite(new URL("/login",req.url))
  }
}

export const config = {
  matcher: '/user/:path*',
}
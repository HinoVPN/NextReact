import { NextResponse } from 'next/server'
import{ withAuth }from 'next-auth/middleware'
 
export default withAuth(
  function middleware(req, res) {
    if(req.nextUrl.pathname.startsWith('/user') && req.nextauth.token?.role =="user" || req.nextauth.token?.role =="admin") {
      return NextResponse.next()
    }else{
      return NextResponse.rewrite(new URL("/login",req.url))
    }
  },
  { callbacks: { authorized: ({ req, token }) => !!token } }
)
 
export const config = {
  matcher: '/user/:path*',
}
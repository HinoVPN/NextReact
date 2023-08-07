import { NextResponse } from 'next/server'
 
export function middleware(request) {
    console.log('123')
    console.log(request.headers["Authorization"])
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}
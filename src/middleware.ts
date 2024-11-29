import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth'
 
// 1. Specify protected and public routes
const protectedRoutes = '/admin'
 
export async function middleware(req: NextRequest) {
 
  // 3. Decrypt the session from the cookie
  const session = await getSession()
 
  // 5. Redirect to /login if the user is not authenticated
  if (req.nextUrl.pathname.startsWith(protectedRoutes) && !session?.data) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  if (req.nextUrl.pathname.startsWith(protectedRoutes) && (session?.data.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/','/admin/:path*'],
}
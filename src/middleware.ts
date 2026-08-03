import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect platform_admin away from /dashboard to /admin (Phase 3)
    if (token?.role === 'platform_admin' && path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // center_admin can only access /dashboard
    if (token?.role === 'center_admin' && path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

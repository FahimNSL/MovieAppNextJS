import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simulate authentication by checking for a session cookie
function isAuthenticated(request: NextRequest) {
  return request.cookies.has('session');
}

export function middleware(request: NextRequest) {
  // Get the theme preference from cookies
  const theme = request.cookies.get('theme')?.value || 'system';
  
  // Protected routes that require authentication
  const protectedPaths = ['/watchlist'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Check authentication for protected routes
  if (isProtectedPath && !isAuthenticated(request)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Clone the response and set the theme class on the HTML element
  const response = NextResponse.next();
  response.headers.set('x-theme', theme);

  // Add security headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https://image.tmdb.org data:; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
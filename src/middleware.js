import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|img|models|video|favicon.ico|sitemap.xml|robots.txt|song_V2.mp3|manifest.webmanifest).*)',
  ],
};

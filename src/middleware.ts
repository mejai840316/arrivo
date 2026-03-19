import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware ultra-simple para pruebas de despliegue
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

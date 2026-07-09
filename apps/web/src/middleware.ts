import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// AUTH TEMPORARILY DISABLED — restore the logic below when ready to implement auth
export function middleware(_request: NextRequest) {
    return NextResponse.next();
}

// --- Original auth logic (re-enable when ready) ---
// export function middleware(request: NextRequest) {
//     const token = request.cookies.get('auth-token')?.value;
//     const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
//     const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
//
//     if (!token && isDashboardRoute) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
//
//     if (token && isAuthRoute) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//
//     return NextResponse.next();
// }

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge-Safe Middleware
 * Faqat cookie borligini tekshiradi, database validation Server Component'da
 */
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Public routes that don't require authentication
    const publicRoutes = [
        "/",
        "/auth/login",
        "/auth/signup",
        "/auth/verify",
        "/test/ai", // AI demo page
    ];

    // Check if current path is public
    const isPublicRoute = publicRoutes.some((route) =>
        pathname === route || pathname.startsWith(route)
    );

    // API routes that don't require auth
    const publicApiRoutes = ["/api/auth/", "/api/ai/"];
    const isPublicApiRoute = publicApiRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Allow public routes
    if (isPublicRoute || isPublicApiRoute) {
        return NextResponse.next();
    }

    // Public invitation pages (dynamic slug-based routes)
    // Format: /event-slug-123
    if (pathname.match(/^\/[a-z0-9-]+$/)) {
        return NextResponse.next();
    }

    // Check for auth session cookie (lightweight, no database call)
    const sessionCookie = request.cookies.get("auth_session");

    if (!sessionCookie) {
        // No session cookie → redirect to login
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Cookie exists → allow request
    // Actual session validation happens in Server Components (layout.tsx)
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets (images, fonts, etc.)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)",
    ],
};

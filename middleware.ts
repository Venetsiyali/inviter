import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Edge-safe middleware:
 * 1. /dashboard/* → login required
 * 2. /dashboard/create → PRO plan required
 * 3. /i/[slug] → always public
 * 4. /api/auth/* → always public
 */
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ─── Always public routes ───────────────────────
    const publicPrefixes = [
        "/",
        "/pricing",
        "/about",
        "/privacy",
        "/terms",
        "/login",
        "/signup",
        "/i/",
        "/api/auth",
        "/api/payment",
        "/api/gift",
        "/api/photo",
        "/api/invitation/public",
    ];

    // Exact match for "/" or prefix match for others
    if (pathname === "/") return NextResponse.next();
    if (publicPrefixes.some((p) => p !== "/" && pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // ─── Auth check for /dashboard and /api/* ───────
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
        // Not logged in → redirect to login
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ─── PRO plan check for /dashboard/create ───────
    if (pathname.startsWith("/dashboard/create")) {
        const plan = token.plan as string;
        const planExpiry = token.planExpiry as string | null;

        const isPro =
            plan === "PRO" &&
            planExpiry &&
            new Date(planExpiry) > new Date();

        // FREE users can create 1 invitation (checked in API)
        // But allow access to the create page for everyone
        // The API will enforce the limit
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|ico)$).*)",
    ],
};

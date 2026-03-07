import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import NextAuth from "next-auth";

// Edge-compatible config without Prisma
const edgeConfig = {
    providers: [],
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
};
const { auth } = NextAuth(edgeConfig);

/**
 * Edge-safe middleware
 */
export default auth((req) => {
    const pathname = req.nextUrl.pathname;


    // ─── Auth check for /dashboard and /api/* ───────
    if (!req.auth) {
        // Not logged in → redirect to login
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ─── PRO plan check for /dashboard/create ───────
    if (pathname.startsWith("/dashboard/create")) {
        const plan = (req.auth.user as any)?.plan as string;
        const planExpiry = (req.auth.user as any)?.planExpiry as string | null;

        const isPro =
            plan === "PRO" &&
            planExpiry &&
            new Date(planExpiry) > new Date();

        // FREE users can create 1 invitation (checked in API)
        // But allow access to the create page for everyone
        // The API will enforce the limit
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|ico)$).*)",
    ],
};

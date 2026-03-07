import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ─── 1. Har doim ochiq sahifalar ───────────────────────
    const publicPrefixes = [
        "/",
        "/pricing",
        "/about",
        "/privacy",
        "/terms",
        "/login",
        "/signup",
        "/i/",
        "/api/",
    ];

    if (pathname === "/") return NextResponse.next();

    // Agar route public bo'lsa (lekin /api/admin yoki shaxsiy API lar emas) o'tkazaveramiz
    // /api/auth albatta public bo'lishi shart, callbacklar ishlashi uchun.
    if (publicPrefixes.some((p) => p !== "/" && pathname.startsWith(p))) {
        // Himoyalangan API larni bloklash uchun qo'shimcha mantiq
        if (pathname.startsWith("/api/admin")) {
            // Yoki alohida admin check
        } else {
            return NextResponse.next();
        }
    }

    // ─── 2. Auth JWT Tokenni Tekshirish (Edge-safe) ────────
    // MUHIM: Vercel Edge Runtime xatosini bermasligi uchun 
    // NextAuth() dan "auth" ni import QILMAYMIZ. Faqat JWT o'qiymiz.
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production", // Production da xavfsiz cookie kutamiz
    });

    // ─── 3. Dashboard Himoyasi ─────────────────────────────
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
        if (!token) {
            // Kirilmagan → login ga qaytarish
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // ─── /dashboard/create dagi PRO limitlar ───────────
        if (pathname.startsWith("/dashboard/create")) {
            const plan = token.plan as string;
            const planExpiry = token.planExpiry as string | null;

            const isPro = plan === "PRO" && planExpiry && new Date(planExpiry) > new Date();
            // Erkin kirishga ruxsat, API to'sadi
        }

        // ─── Admin sahifasi himoyasi ───────────────────────
        if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|ico)$).*)",
    ],
};

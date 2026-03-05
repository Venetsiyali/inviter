import { NextRequest, NextResponse } from "next/server";
import { google } from "@/lib/auth/oauth";
import { lucia } from "@/lib/auth/lucia";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { decodeIdToken, type OAuth2Tokens } from "arctic";

interface GoogleUserInfo {
    sub: string;
    email: string;
    name: string;
    picture?: string;
    email_verified?: boolean;
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieStore = cookies();
    const storedState = cookieStore.get("google_oauth_state")?.value;
    const codeVerifier = cookieStore.get("google_code_verifier")?.value;

    // Validate state and code verifier
    if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
        return NextResponse.json({ error: "OAuth state mismatch" }, { status: 400 });
    }

    let tokens: OAuth2Tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (error) {
        console.error("Google token exchange failed:", error);
        return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", request.url));
    }

    // Decode the ID token to get user info
    let googleUser: GoogleUserInfo;
    try {
        const claims = decodeIdToken(tokens.idToken());
        googleUser = claims as unknown as GoogleUserInfo;
    } catch (error) {
        console.error("Failed to decode Google ID token:", error);
        return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", request.url));
    }

    if (!googleUser.email) {
        return NextResponse.redirect(new URL("/auth/login?error=no_email", request.url));
    }

    // Find or create user
    let user = await prisma.user.findFirst({
        where: {
            OR: [
                { googleId: googleUser.sub },
                { email: googleUser.email.toLowerCase() },
            ],
        },
    });

    if (!user) {
        // Create new user via Google OAuth
        user = await prisma.user.create({
            data: {
                email: googleUser.email.toLowerCase(),
                name: googleUser.name || null,
                googleId: googleUser.sub,
                emailVerified: googleUser.email_verified ?? true,
                plan: "FREE",
                role: "USER",
            },
        });
    } else if (!user.googleId) {
        // Link existing email account to Google
        user = await prisma.user.update({
            where: { id: user.id },
            data: {
                googleId: googleUser.sub,
                emailVerified: true,
            },
        });
    }

    // Create Lucia session
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // Clear OAuth cookies
    cookieStore.delete("google_oauth_state");
    cookieStore.delete("google_code_verifier");

    return NextResponse.redirect(new URL("/dashboard", request.url));
}

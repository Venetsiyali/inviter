import { NextRequest, NextResponse } from "next/server";
import { google } from "@/lib/auth/oauth";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, [
        "openid",
        "profile",
        "email",
    ]);

    const response = NextResponse.redirect(url);

    response.cookies.set("google_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10, // 10 minutes
        path: "/",
        sameSite: "lax",
    });

    response.cookies.set("google_code_verifier", codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
        path: "/",
        sameSite: "lax",
    });

    return response;
}

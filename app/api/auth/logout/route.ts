import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth/lucia";
import { cookies } from "next/headers";

export async function POST() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

    if (sessionId) {
        await lucia.invalidateSession(sessionId);
    }

    const sessionCookie = lucia.createBlankSessionCookie();

    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), {
        headers: {
            "Set-Cookie": sessionCookie.serialize(),
        },
    });
}

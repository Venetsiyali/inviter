import { NextRequest, NextResponse } from "next/server";
import { verifyEmailCode } from "@/lib/auth/email-verification";
import { lucia } from "@/lib/auth/lucia";

export async function POST(request: NextRequest) {
    try {
        const { email, code } = await request.json();

        if (!email || !code) {
            return NextResponse.json(
                { error: "Email va kod talab qilinadi" },
                { status: 400 }
            );
        }

        // Verify code
        const result = await verifyEmailCode(email, code);

        if (!result.valid || !result.userId) {
            return NextResponse.json(
                { error: "Kod noto'g'ri yoki muddati tugagan" },
                { status: 400 }
            );
        }

        // Create session
        const session = await lucia.createSession(result.userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        return NextResponse.json(
            { success: true },
            {
                status: 200,
                headers: {
                    "Set-Cookie": sessionCookie.serialize(),
                },
            }
        );
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}

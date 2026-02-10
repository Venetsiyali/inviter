import { NextRequest, NextResponse } from "next/server";
import { generateInvitation, InvitationInput } from "@/lib/ai/gemini";
import { getUser } from "@/lib/auth/get-user";

/**
 * Server-side API Route - Xavfsiz Gemini integratsiya
 * Client-side dan API kaliti ko'rinmaydi
 */
export async function POST(request: NextRequest) {
    try {
        // Foydalanuvchini tekshirish
        const user = await getUser();
        if (!user) {
            return NextResponse.json(
                { error: "Autentifikatsiya talab qilinadi" },
                { status: 401 }
            );
        }

        // Request body
        const input: InvitationInput = await request.json();

        // Validatsiya
        if (!input.eventType || !input.basicInfo) {
            return NextResponse.json(
                { error: "To'liq ma'lumot talab qilinadi" },
                { status: 400 }
            );
        }

        // AI generatsiyasi (server-side, xavfsiz)
        const invitation = await generateInvitation(input);

        return NextResponse.json({
            success: true,
            invitation,
        });
    } catch (error: any) {
        console.error("Invitation generation error:", error);
        return NextResponse.json(
            {
                error: "Generatsiya xatoligi",
                details: error.message,
            },
            { status: 500 }
        );
    }
}

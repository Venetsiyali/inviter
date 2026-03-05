import { NextRequest, NextResponse } from "next/server";
import { generateInvitationPrompts } from "@/lib/ai/groq";

export async function POST(request: NextRequest) {
    try {
        const { userDescription, eventType } = await request.json();

        if (!userDescription || !eventType) {
            return NextResponse.json(
                { error: "Tavsif va marosim turi talab qilinadi" },
                { status: 400 }
            );
        }

        if (userDescription.trim().length < 5) {
            return NextResponse.json(
                { error: "Iltimos, taklifnoma haqida ko'proq ma'lumot yozing" },
                { status: 400 }
            );
        }

        const prompts = await generateInvitationPrompts(userDescription, eventType);

        return NextResponse.json({ success: true, prompts });
    } catch (error: any) {
        console.error("Groq AI error:", error);
        return NextResponse.json(
            { error: "AI xatoligi yuz berdi. Iltimos qayta urinib ko'ring." },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST: Create a gift entry (from guest page)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { invitationId, guestName, guestPhone, message, amount } = body;

        if (!invitationId || !guestName || !amount) {
            return NextResponse.json(
                { error: "Ism, summa va taklifnoma ID kiritish shart" },
                { status: 400 }
            );
        }

        if (amount < 1000) {
            return NextResponse.json(
                { error: "Minimal summa 1,000 so'm" },
                { status: 400 }
            );
        }

        // Verify invitation exists and has gifts enabled
        const invitation = await prisma.invitation.findUnique({
            where: { id: invitationId },
            select: { id: true, giftEnabled: true, isPublished: true },
        });

        if (!invitation || !invitation.isPublished) {
            return NextResponse.json({ error: "Taklifnoma topilmadi" }, { status: 404 });
        }

        if (!invitation.giftEnabled) {
            return NextResponse.json({ error: "Bu taklifnomada hadya qabul qilinmaydi" }, { status: 403 });
        }

        // Create gift record (status: PENDING until payment confirms)
        const gift = await prisma.gift.create({
            data: {
                invitationId,
                guestName,
                guestPhone: guestPhone || null,
                message: message || null,
                amount: Math.round(amount * 100), // Store in tiyin (cents)
                status: "PENDING",
                provider: "MANUAL", // Will be CLICK or PAYME when payment is integrated
            },
        });

        // TODO: In Sprint 5, generate Click/Payme payment link here
        // For now, mark as completed (manual gift tracking)
        await prisma.gift.update({
            where: { id: gift.id },
            data: { status: "COMPLETED" },
        });

        return NextResponse.json({
            success: true,
            giftId: gift.id,
            message: "Hadyangiz qabul qilindi! Rahmat! 🎉",
        });
    } catch (error: any) {
        console.error("Gift error:", error);
        return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
    }
}

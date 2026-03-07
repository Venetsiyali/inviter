import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { generateClickPaymentUrl, generatePaymePaymentUrl } from "@/lib/payments";

// POST: Create a payment for PRO purchase
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Tizimga kiring" }, { status: 401 });
        }

        const { provider } = await request.json(); // "click" or "payme"
        const userId = session.user.id;
        const amount = 100000; // 100,000 so'm

        // Check if already PRO
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.plan === "PRO" && user.planExpiry && user.planExpiry > new Date()) {
            return NextResponse.json({ error: "Siz allaqachon PRO rejasiz" }, { status: 400 });
        }

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                userId,
                amount: amount * 100, // Store in tiyin
                status: "PENDING",
                provider: provider === "payme" ? "PAYME" : "CLICK",
                description: "PRO_PURCHASE",
            },
        });

        // Generate payment URL
        let paymentUrl: string;
        if (provider === "payme") {
            paymentUrl = generatePaymePaymentUrl({
                amount: amount * 100, // tiyin
                orderId: payment.id,
            });
        } else {
            paymentUrl = generateClickPaymentUrl({
                amount,
                merchantTransId: payment.id,
                returnUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=success`,
            });
        }

        return NextResponse.json({
            success: true,
            paymentUrl,
            paymentId: payment.id,
        });
    } catch (error: any) {
        console.error("Create payment error:", error);
        return NextResponse.json({ error: "Xatolik" }, { status: 500 });
    }
}

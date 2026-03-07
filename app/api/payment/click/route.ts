// ─── Click.uz Payment Webhook ───────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

const CLICK_SECRET_KEY = process.env.CLICK_SECRET_KEY || "";

export async function POST(request: NextRequest) {
    try {
        const body = await request.formData();

        const clickTransId = body.get("click_trans_id") as string;
        const serviceId = body.get("service_id") as string;
        const merchantTransId = body.get("merchant_trans_id") as string;
        const amount = parseFloat(body.get("amount") as string);
        const action = parseInt(body.get("action") as string);
        const signTime = body.get("sign_time") as string;
        const signString = body.get("sign_string") as string;
        const error = parseInt(body.get("error") as string);

        // Verify signature
        const expectedSign = crypto
            .createHash("md5")
            .update(
                `${clickTransId}${serviceId}${CLICK_SECRET_KEY}${merchantTransId}${amount}${action}${signTime}`
            )
            .digest("hex");

        if (signString !== expectedSign) {
            return NextResponse.json({ error: -1, error_note: "SIGN CHECK FAILED!" });
        }

        if (action === 0) {
            // PREPARE
            const payment = await prisma.payment.findUnique({ where: { id: merchantTransId } });
            if (!payment) return NextResponse.json({ error: -5, error_note: "Payment not found" });
            if (payment.status === "COMPLETED") return NextResponse.json({ error: -4, error_note: "Already paid" });

            return NextResponse.json({
                click_trans_id: clickTransId, merchant_trans_id: merchantTransId,
                merchant_prepare_id: payment.id, error: 0, error_note: "Success",
            });
        }

        if (action === 1) {
            // COMPLETE
            if (error < 0) {
                await prisma.payment.update({ where: { id: merchantTransId }, data: { status: "FAILED" } });
                return NextResponse.json({ error: -9, error_note: "Transaction cancelled" });
            }

            const payment = await prisma.payment.update({
                where: { id: merchantTransId },
                data: { status: "COMPLETED", transactionId: clickTransId, provider: "CLICK" },
            });

            if (payment.description === "PRO_PURCHASE") {
                const expiryDate = new Date();
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                await prisma.user.update({
                    where: { id: payment.userId },
                    data: { plan: "PRO", planExpiry: expiryDate },
                });
            }

            return NextResponse.json({
                click_trans_id: clickTransId, merchant_trans_id: merchantTransId,
                merchant_confirm_id: payment.id, error: 0, error_note: "Success",
            });
        }

        return NextResponse.json({ error: -3, error_note: "Action not found" });
    } catch (err: any) {
        console.error("Click webhook error:", err);
        return NextResponse.json({ error: -8, error_note: "Internal error" });
    }
}

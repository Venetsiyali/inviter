// ─── Payme JSON-RPC Webhook ─────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PAYME_SECRET_KEY = process.env.PAYME_SECRET_KEY || "";

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization") || "";
        const expectedAuth = `Basic ${Buffer.from(`Paycom:${PAYME_SECRET_KEY}`).toString("base64")}`;

        if (authHeader !== expectedAuth) {
            return NextResponse.json({ error: { code: -32504, message: "Auth failed" }, id: null });
        }

        const body = await request.json();
        const { method, params, id } = body;

        switch (method) {
            case "CheckPerformTransaction": {
                const payment = await prisma.payment.findUnique({ where: { id: params.account?.order_id } });
                if (!payment) return NextResponse.json({ error: { code: -31050, message: "Order not found" }, id });
                return NextResponse.json({ result: { allow: true }, id });
            }

            case "CreateTransaction": {
                await prisma.payment.update({
                    where: { id: params.account?.order_id },
                    data: { transactionId: params.id, status: "PENDING" },
                });
                return NextResponse.json({ result: { create_time: Date.now(), transaction: params.account?.order_id, state: 1 }, id });
            }

            case "PerformTransaction": {
                const payment = await prisma.payment.findFirst({ where: { transactionId: params.id } });
                if (!payment) return NextResponse.json({ error: { code: -31003, message: "Transaction not found" }, id });

                await prisma.payment.update({ where: { id: payment.id }, data: { status: "COMPLETED", provider: "PAYME" } });

                if (payment.description === "PRO_PURCHASE") {
                    const expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                    await prisma.user.update({ where: { id: payment.userId }, data: { plan: "PRO", planExpiry: expiryDate } });
                }

                return NextResponse.json({ result: { transaction: payment.id, perform_time: Date.now(), state: 2 }, id });
            }

            case "CancelTransaction": {
                const payment = await prisma.payment.findFirst({ where: { transactionId: params.id } });
                if (payment) await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
                return NextResponse.json({ result: { transaction: payment?.id, cancel_time: Date.now(), state: -1 }, id });
            }

            default:
                return NextResponse.json({ error: { code: -32601, message: "Method not found" }, id });
        }
    } catch (err: any) {
        console.error("Payme webhook error:", err);
        return NextResponse.json({ error: { code: -32400, message: "Internal error" }, id: null });
    }
}

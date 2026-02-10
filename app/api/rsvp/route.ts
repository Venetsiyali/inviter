import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST - Submit RSVP
export async function POST(request: NextRequest) {
    try {
        const { eventId, name, phone, message, rsvpStatus } = await request.json();

        // Validate
        if (!eventId || !name || !rsvpStatus) {
            return NextResponse.json(
                { error: "Event ID, nom va status talab qilinadi" },
                { status: 400 }
            );
        }

        // Check if event exists
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Tadbir topilmadi" },
                { status: 404 }
            );
        }

        // Create guest/RSVP
        const guest = await prisma.guest.create({
            data: {
                eventId,
                name,
                phone: phone || null,
                message: message || null,
                rsvpStatus,
                rsvpAt: new Date(),
            },
        });

        console.log("✅ RSVP created:", guest.id, rsvpStatus);

        return NextResponse.json({
            success: true,
            guestId: guest.id,
            message: "RSVP qabul qilindi!",
        });
    } catch (error: any) {
        console.error("❌ RSVP error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}

// GET - Get RSVPs for an event (requires auth eventually)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get("eventId");

        if (!eventId) {
            return NextResponse.json(
                { error: "Event ID talab qilinadi" },
                { status: 400 }
            );
        }

        const guests = await prisma.guest.findMany({
            where: { eventId },
            orderBy: { rsvpAt: "desc" },
        });

        const stats = {
            total: guests.length,
            confirmed: guests.filter((g) => g.rsvpStatus === "confirmed").length,
            declined: guests.filter((g) => g.rsvpStatus === "declined").length,
            maybe: guests.filter((g) => g.rsvpStatus === "maybe").length,
        };

        return NextResponse.json({ guests, stats });
    } catch (error: any) {
        console.error("❌ Get RSVPs error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}

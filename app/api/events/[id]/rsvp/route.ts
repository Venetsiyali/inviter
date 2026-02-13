import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const eventId = params.id;
        const body = await request.json();

        const { name, email, phone, rsvpStatus, message } = body;

        // Validate required fields
        if (!name || !rsvpStatus) {
            return NextResponse.json(
                { error: "Name and RSVP status are required" },
                { status: 400 }
            );
        }

        // Check if event exists
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // Create or update RSVP
        const guest = await prisma.guest.create({
            data: {
                eventId,
                name,
                email: email || null,
                phone: phone || null,
                rsvpStatus,
                message: message || null,
                rsvpAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            guest,
        });
    } catch (error) {
        console.error("RSVP creation error:", error);
        return NextResponse.json(
            { error: "Failed to save RSVP" },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch RSVPs for an event
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const eventId = params.id;

        const guests = await prisma.guest.findMany({
            where: { eventId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ guests });
    } catch (error) {
        console.error("RSVP fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch RSVPs" },
            { status: 500 }
        );
    }
}

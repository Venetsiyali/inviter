import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth/get-user";
import { generateInvitationDesign } from "@/lib/ai/design-generator";

// Create Event
export async function POST(request: NextRequest) {
    try {
        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Tizimga kirish talab qilinadi" },
                { status: 401 }
            );
        }

        const { eventType, title, date, location, description } =
            await request.json();

        // Validate input
        if (!eventType || !title || !date || !location) {
            return NextResponse.json(
                { error: "Barcha maydonlarni to'ldiring" },
                { status: 400 }
            );
        }

        // Check plan limits (Free = 1 event, Premium = unlimited)
        if (user.plan === "FREE") {
            const eventCount = await prisma.event.count({
                where: { userId: user.id },
            });

            if (eventCount >= 1) {
                return NextResponse.json(
                    {
                        error: "Bepul foydalanuvchilar faqat 1 ta tadbir yarata oladi. Premium ga o'tkazib oling!",
                    },
                    { status: 403 }
                );
            }
        }

        console.log("🎨 Generating AI design for:", eventType, title);

        // Generate AI design (this will take ~30 seconds)
        const aiDesign = await generateInvitationDesign({
            eventType,
            title,
            date: new Date(date),
            location,
            description: description || "",
        });

        console.log("✅ AI design generated successfully");

        // Create event in database
        const event = await prisma.event.create({
            data: {
                userId: user.id,
                type: eventType,  // Schema uses 'type' not 'eventType'
                title,
                date: new Date(date),
                location,
                description,
                contentJson: JSON.stringify({
                    title,
                    date,
                    location,
                    description,
                }),
                designConfig: JSON.stringify(aiDesign),
                isPublished: false,
            },
        });

        console.log("✅ Event created:", event.id);

        return NextResponse.json({
            success: true,
            eventId: event.id,
            message: "Tadbir muvaffaqiyatli yaratildi!",
        });
    } catch (error: any) {
        console.error("❌ Event creation error:", error);
        return NextResponse.json(
            {
                error: "Xatolik yuz berdi",
                details:
                    process.env.NODE_ENV === "development"
                        ? error.message
                        : undefined,
            },
            { status: 500 }
        );
    }
}

// Get User Events
export async function GET(request: NextRequest) {
    try {
        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Tizimga kirish talab qilinadi" },
                { status: 401 }
            );
        }

        const events = await prisma.event.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { guests: true },
                },
            },
        });

        return NextResponse.json({ events });
    } catch (error: any) {
        console.error("❌ Fetch events error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}

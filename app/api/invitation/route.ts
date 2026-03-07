import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { generateInvitationHTML } from "@/lib/generate-invitation";

// POST: Create invitation
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Tizimga kiring" }, { status: 401 });
        }

        const userId = session.user.id;
        const plan = (session.user as any).plan || "FREE";

        const body = await request.json();
        const {
            eventType, brideGroom, eventDate, eventTime,
            venue, venueAddress, venueLat, venueLng,
            phone, templateId, primaryColor, secondaryColor,
            giftEnabled, photoEnabled,
        } = body;

        // Validate required fields
        if (!eventType || !brideGroom || !eventDate) {
            return NextResponse.json(
                { error: "Marosim turi, ism va sana kiritish shart" },
                { status: 400 }
            );
        }

        // FREE plan: max 1 invitation
        if (plan === "FREE") {
            const count = await prisma.invitation.count({ where: { userId } });
            if (count >= 1) {
                return NextResponse.json(
                    { error: "Bepul rejada faqat 1 ta taklifnoma yaratish mumkin. PRO xarid qiling!" },
                    { status: 403 }
                );
            }
        }

        // Generate HTML from template
        const { htmlContent, templateId: resolvedTemplateId } = generateInvitationHTML(
            {
                brideGroom,
                eventType,
                eventDate,
                eventTime,
                venue,
                venueAddress,
                venueLat: venueLat ? parseFloat(venueLat) : undefined,
                venueLng: venueLng ? parseFloat(venueLng) : undefined,
                phone,
                primaryColor: primaryColor || "#1E3A5F",
                secondaryColor: secondaryColor || "#C9A96E",
                slug: "", // Will be set after creation
                giftEnabled: giftEnabled || false,
                photoEnabled: photoEnabled || false,
            },
            templateId
        );

        // Create invitation
        const invitation = await prisma.invitation.create({
            data: {
                userId,
                eventType,
                brideGroom,
                eventDate: new Date(eventDate),
                eventTime: eventTime || null,
                venue: venue || null,
                venueAddress: venueAddress || null,
                venueLat: venueLat ? parseFloat(venueLat) : null,
                venueLng: venueLng ? parseFloat(venueLng) : null,
                phone: phone || null,
                templateId: resolvedTemplateId,
                primaryColor: primaryColor || "#1E3A5F",
                secondaryColor: secondaryColor || "#C9A96E",
                htmlContent,
                giftEnabled: giftEnabled || false,
                photoEnabled: photoEnabled || false,
                isPublished: false,
            },
        });

        // Re-generate HTML with the real slug
        const { htmlContent: finalHtml } = generateInvitationHTML(
            { ...body, slug: invitation.slug, primaryColor: primaryColor || "#1E3A5F", secondaryColor: secondaryColor || "#C9A96E" },
            resolvedTemplateId
        );

        await prisma.invitation.update({
            where: { id: invitation.id },
            data: { htmlContent: finalHtml },
        });

        return NextResponse.json({
            success: true,
            invitationId: invitation.id,
            slug: invitation.slug,
            message: "Taklifnoma yaratildi!",
        });
    } catch (error: any) {
        console.error("Create invitation error:", error);
        return NextResponse.json(
            { error: `Xatolik: ${error.message || "Tizim xatosi"}` },
            { status: 500 }
        );
    }
}

// GET: List user's invitations
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Tizimga kiring" }, { status: 401 });
        }

        const invitations = await prisma.invitation.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                slug: true,
                eventType: true,
                brideGroom: true,
                eventDate: true,
                venue: true,
                templateId: true,
                isPublished: true,
                viewCount: true,
                createdAt: true,
                _count: { select: { gifts: true, photos: true } },
            },
        });

        return NextResponse.json({ invitations });
    } catch (error: any) {
        console.error("List invitations error:", error);
        return NextResponse.json({ error: "Xatolik" }, { status: 500 });
    }
}

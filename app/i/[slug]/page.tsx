import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import InvitationRenderer from "@/components/InvitationRenderer";
import { generateInvitationHTML } from "@/lib/generate-invitation";

// ─── OG Meta Tags (for WhatsApp/Telegram preview) ────────
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const invitation = await prisma.invitation.findUnique({
        where: { slug: params.slug },
        select: { brideGroom: true, eventType: true, eventDate: true, venue: true },
    });

    if (!invitation) return { title: "Taklifnoma — inviter.uz" };

    const eventTypeLabels: Record<string, string> = {
        WEDDING: "To'y", OSH: "Osh", BIRTHDAY: "Tug'ilgan kun",
        ENGAGEMENT: "Unashtiruv", SUNNAT: "Sunnat to'yi", OTHER: "Marosim",
    };

    const label = eventTypeLabels[invitation.eventType] || "Marosim";
    const date = new Date(invitation.eventDate).toLocaleDateString("uz-UZ", {
        day: "numeric", month: "long", year: "numeric",
    });

    return {
        title: `${invitation.brideGroom} — ${label}`,
        description: `${invitation.brideGroom} ${label.toLowerCase()}iga taklif! ${date}${invitation.venue ? ` • ${invitation.venue}` : ""}`,
        openGraph: {
            title: `${invitation.brideGroom} — ${label}`,
            description: `${date}${invitation.venue ? ` | ${invitation.venue}` : ""}`,
            type: "website",
        },
    };
}

// ─── Guest Page ──────────────────────────────────────────
export default async function GuestPage({
    params,
}: {
    params: { slug: string };
}) {
    const invitation = await prisma.invitation.findUnique({
        where: { slug: params.slug },
    });

    if (!invitation || !invitation.isPublished) {
        notFound();
    }

    // Increment view count (non-blocking)
    prisma.invitation.update({
        where: { id: invitation.id },
        data: { viewCount: { increment: 1 } },
    }).catch(() => { });

    let finalHtml = invitation.htmlContent;

    // Fallback if htmlContent is missing for an old invitation
    if (!finalHtml) {
        const generated = generateInvitationHTML({
            brideGroom: invitation.brideGroom,
            eventType: invitation.eventType,
            eventDate: invitation.eventDate.toISOString(),
            eventTime: invitation.eventTime || undefined,
            venue: invitation.venue || undefined,
            venueAddress: invitation.venueAddress || undefined,
            venueLat: invitation.venueLat || undefined,
            venueLng: invitation.venueLng || undefined,
            phone: invitation.phone || undefined,
            primaryColor: invitation.primaryColor,
            secondaryColor: invitation.secondaryColor,
            coverImageUrl: invitation.coverImageUrl || undefined,
            giftEnabled: invitation.giftEnabled,
            photoEnabled: invitation.photoEnabled,
            slug: invitation.slug,
        }, invitation.templateId);
        finalHtml = generated.htmlContent;
    }

    return (
        <main className="min-h-screen">
            <InvitationRenderer
                htmlContent={finalHtml}
                invitationId={invitation.id}
                primaryColor={invitation.primaryColor}
                secondaryColor={invitation.secondaryColor}
            />
        </main>
    );
}

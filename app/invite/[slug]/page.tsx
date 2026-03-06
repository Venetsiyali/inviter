import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import GuestPageClient from "@/components/guest/GuestPageClient";

export default async function PublicInvitationPage({
    params,
}: {
    params: { slug: string };
}) {
    const event = await prisma.event.findUnique({
        where: {
            slug: params.slug,
            isPublished: true,
        },
        include: {
            mediaUploads: {
                orderBy: { createdAt: "desc" },
                take: 50,
            },
        },
    });

    if (!event) {
        notFound();
    }

    // Parse event content and design config
    const content = JSON.parse(event.contentJson as string || "{}");
    const design = JSON.parse(event.designConfig as string || "{}");

    // Format date and time
    const formattedDate = new Date(event.date).toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Extract venue info — prefer DB fields, fallback to contentJson
    const venueName = event.location || content?.venue?.name;
    const venueAddress = event.venueAddress || content?.venue?.address || event.location;
    const latitude = event.venueLat || content?.venue?.coordinates?.lat;
    const longitude = event.venueLng || content?.venue?.coordinates?.lng;

    // Extract gift info
    const cardNumber = content?.giftInfo?.cardNumber;
    const cardHolder = content?.giftInfo?.cardHolder;
    const hostName = content?.hostName || event.title;

    return (
        <GuestPageClient
            event={event}
            formattedDate={formattedDate}
            venueName={venueName}
            venueAddress={venueAddress}
            latitude={latitude}
            longitude={longitude}
            hostName={hostName}
            cardNumber={cardNumber}
            cardHolder={cardHolder}
            content={content}
            design={design}
        />
    );
}

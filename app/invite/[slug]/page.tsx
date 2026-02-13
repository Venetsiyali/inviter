import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getInvitationUrl } from "@/utils/getUrl";
import MilliyTemplate from "@/components/templates/MilliyTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import RSVPBlock from "@/components/guest/RSVPBlock";
import LocationBlock from "@/components/guest/LocationBlock";
import GiftBlock from "@/components/guest/GiftBlock";
import MediaGallery from "@/components/guest/MediaGallery";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import ShareButtons from "@/components/ShareButtons";

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
    const content = JSON.parse(event.contentJson as string);
    const design = JSON.parse(event.designConfig as string);

    // Format date and time
    const formattedDate = new Date(event.date).toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const inviteUrl = getInvitationUrl(event.slug);

    // Extract venue info from content
    const venueName = content?.venue?.name || event.location;
    const venueAddress = content?.venue?.address || event.location;
    const latitude = content?.venue?.coordinates?.lat;
    const longitude = content?.venue?.coordinates?.lng;

    // Extract gift info
    const cardNumber = content?.giftInfo?.cardNumber;
    const cardHolder = content?.giftInfo?.cardHolder;
    const hostName = content?.hostName || event.title;

    // Determine template (default to Modern)
    const template = content?.template || "modern";

    // Template wrapper component
    const TemplateWrapper = ({ children }: { children: React.ReactNode }) => {
        const props = {
            eventTitle: event.title,
            eventDate: formattedDate,
            eventTime: event.time || undefined,
        };

        switch (template) {
            case "milliy":
                return <MilliyTemplate {...props}>{children}</MilliyTemplate>;
            case "minimalist":
                return <MinimalistTemplate {...props}>{children}</MinimalistTemplate>;
            case "modern":
            default:
                return <ModernTemplate {...props}>{children}</ModernTemplate>;
        }
    };

    return (
        <TemplateWrapper>
            {/* Event Description */}
            {event.description && (
                <div className="bg-white/50 rounded-2xl p-8 text-center">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {event.description}
                    </p>
                </div>
            )}

            {/* QR Code Section */}
            <div className="flex justify-center">
                <QRCodeDisplay
                    value={inviteUrl}
                    size={200}
                    title="QR Kod"
                />
            </div>

            {/* RSVP Form */}
            <RSVPBlock eventId={event.id} eventTitle={event.title} />

            {/* Location */}
            {(venueName || venueAddress) && (
                <LocationBlock
                    venueName={venueName}
                    address={venueAddress}
                    latitude={latitude}
                    longitude={longitude}
                />
            )}

            {/* Gift Contribution */}
            <GiftBlock
                hostName={hostName}
                cardNumber={cardNumber}
                cardHolder={cardHolder}
            />

            {/* Media Gallery */}
            <MediaGallery
                eventId={event.id}
                initialPhotos={event.mediaUploads.map((m) => ({
                    id: m.id,
                    imageUrl: m.imageUrl,
                    uploaderName: m.uploaderName,
                    caption: m.caption || undefined,
                }))}
            />

            {/* Share Section */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Do&apos;stlaringizga Ulashing
                </h3>
                <ShareButtons
                    url={inviteUrl}
                    title={event.title}
                    date={formattedDate}
                    location={event.location || ""}
                />
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 py-4">
                <p>
                    Powered by{" "}
                    <a
                        href="https://inviter.uz"
                        className="text-blue-600 hover:underline font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Invite.uz
                    </a>
                    {" "}— AI bilan professional taklifnomalar
                </p>
            </div>
        </TemplateWrapper>
    );
}

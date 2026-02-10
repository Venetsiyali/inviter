import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import InvitationCard from "@/components/InvitationCard";
import RSVPForm from "@/components/RSVPForm";
import ShareButtons from "@/components/ShareButtons";
import { DesignConfig } from "@/lib/ai/design-generator";

export default async function PublicInvitationPage({
    params,
}: {
    params: { slug: string };
}) {
    const event = await prisma.event.findUnique({
        where: {
            slug: params.slug,
            isPublished: true, // Only show published invitations
        },
    });

    if (!event) {
        notFound();
    }

    const design: DesignConfig = JSON.parse(event.designConfig as string);

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${event.slug}`;

    const formattedDate = new Date(event.date).toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            className="min-h-screen py-8 px-4"
            style={{
                background: `linear-gradient(to bottom, ${design.colorPalette.background} 0%, #f9fafb 100%)`,
            }}
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Invitation Card */}
                <div className="animate-fade-in-up">
                    <InvitationCard event={event} design={design} />
                </div>

                {/* RSVP Form */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <RSVPForm eventId={event.id} eventTitle={event.title} />
                </div>

                {/* Share Buttons */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Do'stlaringizga ulashing
                        </h3>
                        <ShareButtons
                            url={inviteUrl}
                            title={event.title}
                            date={formattedDate}
                            location={event.location || ""}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 py-4">
                    <p>
                        Powered by{" "}
                        <a
                            href="https://invite.uz"
                            className="text-blue-600 hover:underline"
                        >
                            Invite.uz
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

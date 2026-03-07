import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

    const eventTypeLabels: Record<string, string> = {
        WEDDING: "nikoh to'yiga", OSH: "osh marosimiga", BIRTHDAY: "tug'ilgan kuniga",
        ENGAGEMENT: "unashtiruv marosimiga", SUNNAT: "sunnat to'yiga", OTHER: "marosimiga",
    };

    const eventTypeEmojis: Record<string, string> = {
        WEDDING: "💒", OSH: "🍽️", BIRTHDAY: "🎂",
        ENGAGEMENT: "💍", SUNNAT: "👶", OTHER: "🎉",
    };

    const inviteLabel = eventTypeLabels[invitation.eventType] || "marosimiga";
    const emoji = eventTypeEmojis[invitation.eventType] || "🎉";

    const formattedDate = new Date(invitation.eventDate).toLocaleDateString("uz-UZ", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    const mapUrl = invitation.venueLat && invitation.venueLng
        ? `https://www.google.com/maps?q=${invitation.venueLat},${invitation.venueLng}`
        : null;

    const yandexMapUrl = invitation.venueLat && invitation.venueLng
        ? `https://yandex.uz/maps/?pt=${invitation.venueLng},${invitation.venueLat}&z=16&l=map`
        : null;

    return (
        <div className="min-h-screen" style={{ background: invitation.primaryColor }}>
            <div className="max-w-[480px] mx-auto min-h-screen relative overflow-hidden"
                style={{ background: `linear-gradient(180deg, ${invitation.primaryColor} 0%, ${invitation.primaryColor}ee 60%, ${invitation.primaryColor} 100%)` }}
            >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 right-0 h-40 opacity-20"
                    style={{ background: `radial-gradient(circle at 30% 0%, ${invitation.secondaryColor}44 0%, transparent 70%)` }}
                />

                {/* Hero */}
                <div className="relative z-10 pt-16 pb-10 px-8 text-center">
                    <div className="text-5xl mb-6">{emoji}</div>
                    <p className="text-sm uppercase tracking-[4px] mb-6 opacity-60" style={{ color: invitation.secondaryColor }}>
                        Hurmatli mehmon
                    </p>
                    <div className="w-12 h-0.5 mx-auto mb-6 rounded-full" style={{ background: invitation.secondaryColor }} />
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white" style={{ fontFamily: "serif" }}>
                        {invitation.brideGroom}
                    </h1>
                    <p className="text-base text-white/70">
                        {inviteLabel} taklif etamiz
                    </p>
                </div>

                {/* Info Cards */}
                <div className="relative z-10 px-6 space-y-3">
                    {/* Date */}
                    <div className="rounded-2xl p-5 flex items-center gap-4"
                        style={{ background: `${invitation.secondaryColor}10`, border: `1px solid ${invitation.secondaryColor}20` }}
                    >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                            style={{ background: `${invitation.secondaryColor}15` }}
                        >📅</div>
                        <div>
                            <p className="text-[11px] uppercase tracking-[2px] font-semibold mb-1" style={{ color: `${invitation.secondaryColor}cc` }}>
                                Sana va vaqt
                            </p>
                            <p className="text-base font-semibold text-white">{formattedDate}</p>
                            {invitation.eventTime && (
                                <p className="text-sm text-white/60 mt-0.5">Soat {invitation.eventTime}</p>
                            )}
                        </div>
                    </div>

                    {/* Venue */}
                    {invitation.venue && (
                        <div className="rounded-2xl p-5 flex items-center gap-4"
                            style={{ background: `${invitation.secondaryColor}10`, border: `1px solid ${invitation.secondaryColor}20` }}
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                                style={{ background: `${invitation.secondaryColor}15` }}
                            >📍</div>
                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] font-semibold mb-1" style={{ color: `${invitation.secondaryColor}cc` }}>
                                    Manzil
                                </p>
                                <p className="text-base font-semibold text-white">{invitation.venue}</p>
                                {invitation.venueAddress && (
                                    <p className="text-sm text-white/60 mt-0.5">{invitation.venueAddress}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Phone */}
                    {invitation.phone && (
                        <a href={`tel:${invitation.phone}`}
                            className="rounded-2xl p-5 flex items-center gap-4 block hover:opacity-90 transition-opacity"
                            style={{ background: `${invitation.secondaryColor}10`, border: `1px solid ${invitation.secondaryColor}20` }}
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                                style={{ background: `${invitation.secondaryColor}15` }}
                            >📞</div>
                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] font-semibold mb-1" style={{ color: `${invitation.secondaryColor}cc` }}>
                                    Aloqa
                                </p>
                                <p className="text-base font-semibold text-white">{invitation.phone}</p>
                            </div>
                        </a>
                    )}
                </div>

                {/* Map Buttons */}
                {(mapUrl || yandexMapUrl) && (
                    <div className="relative z-10 px-6 mt-6">
                        {/* Map iframe */}
                        {invitation.venueLat && invitation.venueLng && (
                            <div className="rounded-2xl overflow-hidden mb-3 border"
                                style={{ borderColor: `${invitation.secondaryColor}30` }}
                            >
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${invitation.venueLng}!3d${invitation.venueLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1`}
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        )}
                        <div className="flex gap-2">
                            {mapUrl && (
                                <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 py-3.5 rounded-xl text-center text-sm font-semibold transition-all hover:opacity-90"
                                    style={{ background: invitation.secondaryColor, color: invitation.primaryColor }}
                                >
                                    🗺 Google Maps
                                </a>
                            )}
                            {yandexMapUrl && (
                                <a href={yandexMapUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 py-3.5 rounded-xl text-center text-sm font-semibold border transition-all hover:opacity-80"
                                    style={{ borderColor: `${invitation.secondaryColor}44`, color: invitation.secondaryColor }}
                                >
                                    🗺 Yandex Maps
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="relative z-10 mt-12 pb-8 text-center">
                    <div className="w-8 h-0.5 mx-auto mb-4 rounded-full opacity-30" style={{ background: invitation.secondaryColor }} />
                    <p className="text-xs text-white/20">
                        <a href="https://inviter.uz" className="hover:text-white/40 transition-colors" style={{ color: `${invitation.secondaryColor}66` }}>
                            inviter.uz
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

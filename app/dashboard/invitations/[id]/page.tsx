import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export default async function InvitationDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const invitation = await prisma.invitation.findUnique({
        where: { id: params.id },
        include: {
            _count: { select: { gifts: true, photos: true } },
            gifts: {
                where: { status: "COMPLETED" },
                orderBy: { createdAt: "desc" },
                take: 10,
            },
        },
    });

    if (!invitation || invitation.userId !== session.user.id) {
        notFound();
    }

    const inviteUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/i/${invitation.slug}`;

    const eventTypeLabels: Record<string, string> = {
        WEDDING: "To'y", OSH: "Osh", BIRTHDAY: "Tug'ilgan kun",
        ENGAGEMENT: "Unashtiruv", SUNNAT: "Sunnat to'yi", OTHER: "Boshqa",
    };

    const formattedDate = new Date(invitation.eventDate).toLocaleDateString("uz-UZ", {
        day: "numeric", month: "long", year: "numeric",
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back */}
            <Link href="/dashboard" className="text-sm text-white/40 hover:text-white/60 transition-colors mb-4 block">
                ← Bosh sahifa
            </Link>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-white">{invitation.brideGroom}</h1>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${invitation.isPublished
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-white/5 text-white/40"
                            }`}>
                            {invitation.isPublished ? "Ommaviy" : "Qoralama"}
                        </span>
                    </div>
                    <p className="text-sm text-white/40">
                        {eventTypeLabels[invitation.eventType]} • {formattedDate}
                    </p>
                </div>

                <div className="flex gap-2">
                    <PublishButton invitationId={invitation.id} isPublished={invitation.isPublished} />
                    <a
                        href={inviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors"
                    >
                        👁 Ko'rish
                    </a>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{invitation.viewCount}</div>
                    <div className="text-xs text-white/40 mt-1">Ko'rishlar</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{invitation._count.gifts}</div>
                    <div className="text-xs text-white/40 mt-1">Hadyalar</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{invitation._count.photos}</div>
                    <div className="text-xs text-white/40 mt-1">Suratlar</div>
                </div>
            </div>

            {/* Share Link */}
            <div className="glass rounded-2xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">🔗 Taklifnoma havolasi</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        readOnly
                        value={inviteUrl}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 focus:outline-none"
                    />
                    <CopyButton text={inviteUrl} />
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                    <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(`${invitation.brideGroom} - Taklifnoma`)}`}
                        target="_blank"
                        className="px-3 py-1.5 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                    >
                        📤 Telegram
                    </a>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(`${invitation.brideGroom} - Taklifnoma\n${inviteUrl}`)}`}
                        target="_blank"
                        className="px-3 py-1.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                    >
                        📱 WhatsApp
                    </a>
                </div>
            </div>

            {/* Details */}
            <div className="glass rounded-2xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-white mb-4">📋 Ma'lumotlar</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-white/40">Sana</span><span className="text-white/80">{formattedDate}</span></div>
                    {invitation.eventTime && <div className="flex justify-between"><span className="text-white/40">Vaqt</span><span className="text-white/80">{invitation.eventTime}</span></div>}
                    {invitation.venue && <div className="flex justify-between"><span className="text-white/40">Joy</span><span className="text-white/80">{invitation.venue}</span></div>}
                    {invitation.venueAddress && <div className="flex justify-between"><span className="text-white/40">Manzil</span><span className="text-white/80 text-right max-w-[200px]">{invitation.venueAddress}</span></div>}
                    {invitation.phone && <div className="flex justify-between"><span className="text-white/40">Telefon</span><span className="text-white/80">{invitation.phone}</span></div>}
                    <div className="flex justify-between"><span className="text-white/40">Shablon</span><span className="text-white/80">{invitation.templateId}</span></div>
                </div>
            </div>

            {/* Recent Gifts */}
            {invitation.gifts.length > 0 && (
                <div className="glass rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-4">🎁 Oxirgi hadyalar</h3>
                    <div className="space-y-2">
                        {invitation.gifts.map((gift) => (
                            <div key={gift.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <div>
                                    <span className="text-sm text-white/80">{gift.guestName}</span>
                                    {gift.message && <p className="text-xs text-white/30 mt-0.5">{gift.message}</p>}
                                </div>
                                <span className="text-sm font-semibold text-emerald-400">
                                    {(gift.amount / 100).toLocaleString()} so'm
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Client Components ──────────────────────────────────
function CopyButton({ text }: { text: string }) {
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(text); }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
            Nusxa
        </button>
    );
}

function PublishButton({ invitationId, isPublished }: { invitationId: string; isPublished: boolean }) {
    return (
        <form action={`/api/invitation/${invitationId}/publish`} method="POST">
            <button
                type="submit"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isPublished
                        ? "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                        : "gradient-btn !py-2 !rounded-xl"
                    }`}
            >
                {isPublished ? "Yopish" : "🚀 Nashr qilish"}
            </button>
        </form>
    );
}

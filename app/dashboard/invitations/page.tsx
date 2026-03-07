import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function InvitationsListPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const invitations = await prisma.invitation.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { gifts: true, photos: true } },
        },
    });

    const eventTypeLabels: Record<string, string> = {
        WEDDING: "To'y", OSH: "Osh", BIRTHDAY: "Tug'ilgan kun",
        ENGAGEMENT: "Unashtiruv", SUNNAT: "Sunnat to'yi", OTHER: "Boshqa",
    };

    const eventTypeEmojis: Record<string, string> = {
        WEDDING: "💒", OSH: "🍽️", BIRTHDAY: "🎂",
        ENGAGEMENT: "💍", SUNNAT: "👶", OTHER: "🎉",
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Taklifnomalar</h1>
                    <p className="text-sm text-white/40 mt-1">{invitations.length} ta taklifnoma</p>
                </div>
                <Link href="/dashboard/create" className="gradient-btn !py-2.5 !px-5 !text-[13px]">
                    + Yangi
                </Link>
            </div>

            {invitations.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Hali taklifnoma yo'q</h3>
                    <p className="text-sm text-white/40 mb-6">Birinchi taklifnomangizni yarating!</p>
                    <Link href="/dashboard/create" className="gradient-btn !py-3 !px-8 !text-sm">
                        + Yaratish
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {invitations.map((inv) => {
                        const inviteUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/i/${inv.slug}`;
                        return (
                            <Link
                                key={inv.id}
                                href={`/dashboard/invitations/${inv.id}`}
                                className="glass rounded-2xl p-5 flex items-start gap-4 hover:bg-white/[0.06] transition-colors group block"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl shrink-0">
                                    {eventTypeEmojis[inv.eventType] || "🎉"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base font-semibold text-white truncate">
                                            {inv.brideGroom}
                                        </h3>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${inv.isPublished
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : "bg-white/5 text-white/30 border border-white/5"
                                            }`}>
                                            {inv.isPublished ? "Ommaviy" : "Qoralama"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/40">
                                        {eventTypeLabels[inv.eventType]} • {new Date(inv.eventDate).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
                                        <span>👁 {inv.viewCount}</span>
                                        <span>🎁 {inv._count.gifts}</span>
                                        <span>📸 {inv._count.photos}</span>
                                        {inv.venue && <span className="truncate max-w-[120px]">📍 {inv.venue}</span>}
                                    </div>
                                </div>
                                <span className="text-white/10 group-hover:text-white/40 transition-colors text-xl mt-2">→</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

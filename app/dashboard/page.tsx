import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const userId = session.user.id;
    const plan = (session.user as any).plan || "FREE";

    // Fetch stats
    const [invitationCount, totalViews, totalGifts, recentInvitations] = await Promise.all([
        prisma.invitation.count({ where: { userId } }),
        prisma.invitation.aggregate({
            where: { userId },
            _sum: { viewCount: true },
        }),
        prisma.gift.count({
            where: { invitation: { userId }, status: "COMPLETED" },
        }),
        prisma.invitation.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                slug: true,
                brideGroom: true,
                eventType: true,
                eventDate: true,
                isPublished: true,
                viewCount: true,
                createdAt: true,
                _count: { select: { gifts: true, photos: true } },
            },
        }),
    ]);

    const stats = [
        {
            label: "Taklifnomalar",
            value: invitationCount,
            icon: "📋",
            color: "from-violet-500/20 to-purple-500/20",
            border: "border-violet-500/20",
        },
        {
            label: "Ko'rishlar",
            value: totalViews._sum.viewCount || 0,
            icon: "👁",
            color: "from-blue-500/20 to-cyan-500/20",
            border: "border-blue-500/20",
        },
        {
            label: "Hadyalar",
            value: totalGifts,
            icon: "💰",
            color: "from-amber-500/20 to-yellow-500/20",
            border: "border-amber-500/20",
        },
    ];

    const eventTypeLabels: Record<string, string> = {
        WEDDING: "To'y",
        OSH: "Osh",
        BIRTHDAY: "Tug'ilgan kun",
        ENGAGEMENT: "Unashtiruv",
        SUNNAT: "Sunnat to'yi",
        OTHER: "Boshqa",
    };

    const eventTypeEmojis: Record<string, string> = {
        WEDDING: "💒",
        OSH: "🍽️",
        BIRTHDAY: "🎂",
        ENGAGEMENT: "💍",
        SUNNAT: "👶",
        OTHER: "🎉",
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Salom, {session.user.name || "Foydalanuvchi"} 👋
                    </h1>
                    <p className="text-white/40 text-sm mt-1">
                        Taklifnomalaringiz va statistika
                    </p>
                </div>
                <Link
                    href="/dashboard/create"
                    className="gradient-btn !py-3 !px-6 !text-sm"
                >
                    + Yangi taklifnoma
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className={`rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${s.color} border ${s.border}`}
                    >
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                        <div className="text-xs sm:text-sm text-white/50 mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Plan Banner (FREE only) */}
            {plan === "FREE" && (
                <div className="mb-8 rounded-2xl p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-amber-400 font-semibold text-sm">Bepul rejada faqat 1 ta taklifnoma 📌</p>
                        <p className="text-white/40 text-xs mt-1">PRO reja bilan cheksiz taklifnoma yarating</p>
                    </div>
                    <Link href="/pricing" className="text-xs font-semibold px-4 py-2 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-colors">
                        PRO ga o'tish →
                    </Link>
                </div>
            )}

            {/* Recent Invitations */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">So'nggi taklifnomalar</h2>
                    {invitationCount > 5 && (
                        <Link href="/dashboard/invitations" className="text-sm text-[var(--color-secondary)] hover:underline">
                            Barchasi →
                        </Link>
                    )}
                </div>

                {recentInvitations.length === 0 ? (
                    <div className="glass rounded-2xl p-10 text-center">
                        <div className="text-5xl mb-4">📭</div>
                        <p className="text-white/60 font-medium mb-2">Hali taklifnoma yo'q</p>
                        <p className="text-white/30 text-sm mb-6">Birinchi taklifnomangizni yarating!</p>
                        <Link href="/dashboard/create" className="gradient-btn !py-3 !px-6 !text-sm">
                            + Yaratish
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentInvitations.map((inv) => (
                            <Link
                                key={inv.id}
                                href={`/dashboard/invitations/${inv.id}`}
                                className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/[0.06] transition-colors group block"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl shrink-0">
                                    {eventTypeEmojis[inv.eventType] || "🎉"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-white truncate">
                                            {inv.brideGroom}
                                        </h3>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${inv.isPublished
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-white/5 text-white/40"
                                            }`}>
                                            {inv.isPublished ? "Ommaviy" : "Qoralama"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        {eventTypeLabels[inv.eventType] || "Marosim"} • {new Date(inv.eventDate).toLocaleDateString("uz")}
                                    </p>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 text-xs text-white/40 shrink-0">
                                    <span>👁 {inv.viewCount}</span>
                                    <span>🎁 {inv._count.gifts}</span>
                                    <span>📸 {inv._count.photos}</span>
                                </div>
                                <span className="text-white/20 group-hover:text-white/50 transition-colors">→</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

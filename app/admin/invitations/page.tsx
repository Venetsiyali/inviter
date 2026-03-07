import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminInvitationsPage() {
    const invitations = await prisma.invitation.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true, email: true } },
            _count: { select: { gifts: true, photos: true } },
        },
    });

    const eventTypeEmojis: Record<string, string> = {
        WEDDING: "💒", OSH: "🍽️", BIRTHDAY: "🎂",
        ENGAGEMENT: "💍", SUNNAT: "👶", OTHER: "🎉",
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Taklifnomalar</h1>
                    <p className="text-sm text-white/40 mt-1">{invitations.length} ta taklifnoma</p>
                </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left py-3 px-4 text-white/40 font-medium">Taklifnoma</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Yaratuvchi</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium">Status</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium">Ko'rishlar</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Sana</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations.map((inv) => (
                            <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{eventTypeEmojis[inv.eventType] || "🎉"}</span>
                                        <div>
                                            <Link href={`/i/${inv.slug}`} target="_blank" className="text-white/80 hover:text-white font-medium">
                                                {inv.brideGroom}
                                            </Link>
                                            <p className="text-[11px] text-white/30">{inv.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-white/50 hidden sm:table-cell">
                                    {inv.user.name || inv.user.email}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${inv.isPublished
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-white/5 text-white/30"
                                        }`}>
                                        {inv.isPublished ? "Ommaviy" : "Qoralama"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-white/50">
                                    👁 {inv.viewCount} • 🎁 {inv._count.gifts}
                                </td>
                                <td className="py-3 px-4 text-white/40 text-xs hidden sm:table-cell">
                                    {new Date(inv.eventDate).toLocaleDateString("uz")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

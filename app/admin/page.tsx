import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
    const [userCount, proCount, invitationCount, publishedCount, giftCount, totalViews] =
        await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { plan: "PRO" } }),
            prisma.invitation.count(),
            prisma.invitation.count({ where: { isPublished: true } }),
            prisma.gift.count({ where: { status: "COMPLETED" } }),
            prisma.invitation.aggregate({ _sum: { viewCount: true } }),
        ]);

    const stats = [
        { label: "Foydalanuvchilar", value: userCount, icon: "👥", color: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/20" },
        { label: "PRO foydalanuvchilar", value: proCount, icon: "⭐", color: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/20" },
        { label: "Taklifnomalar", value: invitationCount, icon: "📋", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
        { label: "Nashr qilingan", value: publishedCount, icon: "🚀", color: "from-emerald-500/20 to-green-500/20", border: "border-emerald-500/20" },
        { label: "Hadyalar", value: giftCount, icon: "🎁", color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/20" },
        { label: "Jami ko'rishlar", value: totalViews._sum.viewCount || 0, icon: "👁", color: "from-indigo-500/20 to-blue-500/20", border: "border-indigo-500/20" },
    ];

    // Recent users
    const recentUsers = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, name: true, email: true, plan: true, createdAt: true },
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-sm text-white/40 mb-8">Platforma statistikasi va boshqaruv</p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                {stats.map((s) => (
                    <div key={s.label} className={`rounded-2xl p-4 bg-gradient-to-br ${s.color} border ${s.border}`}>
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <div className="text-2xl font-bold text-white">{s.value.toLocaleString()}</div>
                        <div className="text-xs text-white/50 mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Users */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Oxirgi foydalanuvchilar</h2>
                <div className="glass rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-3 px-4 text-white/40 font-medium">Ism</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Email</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium">Reja</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Sana</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 last:border-0">
                                    <td className="py-3 px-4 text-white/80">{user.name || "—"}</td>
                                    <td className="py-3 px-4 text-white/50 hidden sm:table-cell">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${user.plan === "PRO"
                                                ? "bg-amber-500/10 text-amber-400"
                                                : "bg-white/5 text-white/40"
                                            }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-white/40 hidden sm:table-cell">
                                        {new Date(user.createdAt).toLocaleDateString("uz")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

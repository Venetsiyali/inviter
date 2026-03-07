import { prisma } from "@/lib/db";

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { invitations: true } },
        },
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Foydalanuvchilar</h1>
                    <p className="text-sm text-white/40 mt-1">{users.length} ta foydalanuvchi</p>
                </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left py-3 px-4 text-white/40 font-medium">Ism</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium">Email</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium">Reja</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Taklifnomalar</th>
                            <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Ro'yxatdan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                                        </div>
                                        <span className="text-white/80 truncate max-w-[120px]">{user.name || "—"}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-white/50 truncate max-w-[180px]">{user.email}</td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${user.plan === "PRO"
                                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                            : "bg-white/5 text-white/30"
                                        }`}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-white/50 hidden sm:table-cell">{user._count.invitations}</td>
                                <td className="py-3 px-4 text-white/40 text-xs hidden sm:table-cell">
                                    {new Date(user.createdAt).toLocaleDateString("uz")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

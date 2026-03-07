import { prisma } from "@/lib/db";

export default async function AdminPaymentsPage() {
    const payments = await prisma.payment.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true, email: true } },
        },
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">To'lovlar</h1>
                    <p className="text-sm text-white/40 mt-1">{payments.length} ta to'lov</p>
                </div>
            </div>

            {payments.length === 0 ? (
                <div className="glass rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-4">💳</div>
                    <p className="text-white/50">Hali to'lovlar yo'q</p>
                </div>
            ) : (
                <div className="glass rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-3 px-4 text-white/40 font-medium">Foydalanuvchi</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium">Summa</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium">Status</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium">Provider</th>
                                <th className="text-left py-3 px-4 text-white/40 font-medium hidden sm:table-cell">Sana</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p) => (
                                <tr key={p.id} className="border-b border-white/5 last:border-0">
                                    <td className="py-3 px-4 text-white/70">{p.user.name || p.user.email}</td>
                                    <td className="py-3 px-4 text-white font-semibold">{(p.amount / 100).toLocaleString()} so'm</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400" :
                                                p.status === "PENDING" ? "bg-amber-500/10 text-amber-400" :
                                                    "bg-red-500/10 text-red-400"
                                            }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-white/50">{p.provider || "—"}</td>
                                    <td className="py-3 px-4 text-white/40 text-xs hidden sm:table-cell">
                                        {new Date(p.createdAt).toLocaleDateString("uz")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

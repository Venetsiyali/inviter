import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const plan = (session.user as any).plan || "FREE";

    return (
        <div className="min-h-screen bg-[#0a0a14]">
            {/* Top Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/5 backdrop-blur-xl bg-[#0a0a14]/80">
                <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-lg font-bold">
                            <span className="gradient-text">inviter</span>
                            <span className="text-white/40">.uz</span>
                        </Link>
                        <div className="hidden sm:flex items-center gap-1">
                            <Link
                                href="/dashboard"
                                className="px-3 py-1.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                Bosh sahifa
                            </Link>
                            <Link
                                href="/dashboard/invitations"
                                className="px-3 py-1.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                Taklifnomalar
                            </Link>
                            <Link
                                href="/dashboard/create"
                                className="px-3 py-1.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                + Yaratish
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {plan === "FREE" && (
                            <Link
                                href="/pricing"
                                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/20"
                            >
                                PRO ga o'tish
                            </Link>
                        )}
                        {plan === "PRO" && (
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                PRO ✓
                            </span>
                        )}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-white/5 bg-[#0a0a14]/95 backdrop-blur-xl">
                <div className="flex items-center justify-around h-14">
                    <Link href="/dashboard" className="flex flex-col items-center gap-0.5 text-white/50 hover:text-white transition-colors">
                        <span className="text-lg">📊</span>
                        <span className="text-[10px]">Bosh</span>
                    </Link>
                    <Link href="/dashboard/invitations" className="flex flex-col items-center gap-0.5 text-white/50 hover:text-white transition-colors">
                        <span className="text-lg">📋</span>
                        <span className="text-[10px]">Barcha</span>
                    </Link>
                    <Link href="/dashboard/create" className="flex flex-col items-center gap-0.5">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-black text-lg font-bold -mt-4 shadow-lg shadow-amber-500/30">+</span>
                    </Link>
                    <Link href="/dashboard/profile" className="flex flex-col items-center gap-0.5 text-white/50 hover:text-white transition-colors">
                        <span className="text-lg">👤</span>
                        <span className="text-[10px]">Profil</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-14 pb-20 sm:pb-8">
                {children}
            </main>
        </div>
    );
}

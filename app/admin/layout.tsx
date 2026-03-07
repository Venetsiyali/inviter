import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role;

    if (!session?.user || role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#0a0a14]">
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-red-500/10 backdrop-blur-xl bg-[#0a0a14]/80">
                <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-lg font-bold">
                            <span className="text-red-400">Admin</span>
                            <span className="text-white/30"> Panel</span>
                        </Link>
                        <div className="hidden sm:flex items-center gap-1">
                            <Link href="/admin" className="px-3 py-1.5 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/admin/users" className="px-3 py-1.5 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                Foydalanuvchilar
                            </Link>
                            <Link href="/admin/invitations" className="px-3 py-1.5 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                Taklifnomalar
                            </Link>
                            <Link href="/admin/payments" className="px-3 py-1.5 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                To'lovlar
                            </Link>
                        </div>
                    </div>
                    <Link href="/dashboard" className="text-xs text-white/30 hover:text-white/50 transition-colors">
                        ← Dashboard
                    </Link>
                </div>
            </nav>
            <main className="pt-14 pb-8">{children}</main>
        </div>
    );
}

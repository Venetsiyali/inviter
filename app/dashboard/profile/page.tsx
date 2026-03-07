"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session } = useSession();
    const user = session?.user;
    const plan = (user as any)?.plan || "FREE";
    const planExpiry = (user as any)?.planExpiry;

    return (
        <div className="max-w-lg mx-auto px-4 py-8">
            <Link href="/dashboard" className="text-sm text-white/40 hover:text-white/60 transition-colors mb-4 block">
                ← Bosh sahifa
            </Link>

            <h1 className="text-2xl font-bold text-white mb-8">Profil</h1>

            {/* Avatar + Info */}
            <div className="glass rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                        {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">{user?.name || "Foydalanuvchi"}</h2>
                        <p className="text-sm text-white/40">{user?.email}</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Reja</span>
                        <span className={`font-semibold ${plan === "PRO" ? "text-emerald-400" : "text-white/60"}`}>
                            {plan === "PRO" ? "PRO ✓" : "Bepul"}
                        </span>
                    </div>
                    {planExpiry && (
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-white/40">PRO muddati</span>
                            <span className="text-white/70">{new Date(planExpiry).toLocaleDateString("uz-UZ")}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            {plan === "FREE" && (
                <Link
                    href="/pricing"
                    className="gradient-btn w-full justify-center !py-3.5 !text-sm mb-4"
                >
                    ⭐ PRO ga o'tish
                </Link>
            )}

            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full py-3 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/5 transition-colors"
            >
                Chiqish
            </button>
        </div>
    );
}

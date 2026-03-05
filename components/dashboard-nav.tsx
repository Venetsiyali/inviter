"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    CalendarDays,
    LayoutGrid,
    Sparkles,
    Crown,
    User,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/dashboard", label: "Bosh sahifa", icon: Home },
    { href: "/dashboard/events", label: "Taklifnomalarim", icon: CalendarDays },
    { href: "/dashboard/ai-create", label: "Shablonlar", icon: LayoutGrid },
    { href: "/dashboard/ai-create", label: "AI Yaratish", icon: Sparkles },
    { href: "/pricing", label: "Premium", icon: Crown },
];

export function DashboardNav({ userName }: { userName: string }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Desktop left sidebar */}
            <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/80 shadow-xl z-40 p-6">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2 mb-10">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-sm">I</span>
                    </div>
                    <span className="font-extrabold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        Inviter.uz
                    </span>
                </Link>

                {/* Nav links */}
                <nav className="flex-1 space-y-1">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all group ${active
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                                {label}
                                {href === "/dashboard/ai-create" && (
                                    <span className="ml-auto text-[10px] bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded-full">AI</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User card */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow">
                            {userName?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">{userName}</p>
                            <p className="text-xs text-gray-500">Bepul plan</p>
                        </div>
                    </div>
                    <form action="/api/auth/logout" method="POST">
                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <LogOut className="w-4 h-4" />
                            Chiqish
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile top bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm">
                <div className="flex items-center justify-between px-4 h-16">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-black text-xs">I</span>
                        </div>
                        <span className="font-extrabold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            Inviter.uz
                        </span>
                    </Link>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl hover:bg-gray-100 transition">
                        {mobileOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>
                {mobileOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl p-4 space-y-1">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                            const active = pathname === href;
                            return (
                                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${active ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {label}
                                </Link>
                            );
                        })}
                        <div className="pt-3 mt-3 border-t border-gray-100">
                            <form action="/api/auth/logout" method="POST">
                                <button className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-sm text-red-600 hover:bg-red-50 font-medium transition">
                                    <LogOut className="w-4 h-4" /> Chiqish
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

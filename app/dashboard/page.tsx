import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import Link from "next/link";
import {
    Sparkles,
    Plus,
    Wand2,
    LayoutGrid,
    ArrowRight,
    Crown,
    CalendarDays,
    Clock,
    ChevronRight,
} from "lucide-react";

// Free templates gallery data
const FREE_TEMPLATES = [
    {
        id: "uzbek-gold",
        name: "O'zbek Oltin",
        category: "Nikoh to'yi",
        emoji: "💍",
        imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400&h=600&fit=crop&q=80",
        color: "from-amber-900 to-yellow-700",
        free: true,
    },
    {
        id: "floral-elegance",
        name: "Oq Gullar",
        category: "Unashtiruv",
        emoji: "💐",
        imageUrl: "https://images.unsplash.com/photo-1487530811015-780f2f5e3f87?w=400&h=600&fit=crop&q=80",
        color: "from-pink-300 to-rose-200",
        free: true,
    },
    {
        id: "blue-royal",
        name: "Ko'k Zafarlik",
        category: "Osh marosimi",
        emoji: "🍲",
        imageUrl: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=400&h=600&fit=crop&q=80",
        color: "from-blue-900 to-indigo-700",
        free: true,
    },
    {
        id: "rose-gold",
        name: "Atirgul Oltin",
        category: "Tug'ilgan kun",
        emoji: "🎂",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=80",
        color: "from-rose-400 to-pink-500",
        free: true,
    },
    {
        id: "green-nature",
        name: "Yashil Tabiiy",
        category: "Nikoh to'yi",
        emoji: "🌿",
        imageUrl: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=400&h=600&fit=crop&q=80",
        color: "from-green-800 to-emerald-600",
        free: true,
    },
    {
        id: "luxury-dark",
        name: "Tunga Hashamat",
        category: "Yubiley",
        emoji: "🥂",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=80",
        color: "from-stone-900 to-zinc-700",
        free: true,
    },
    {
        id: "cream-minimal",
        name: "Krem Minimal",
        category: "Unashtiruv",
        emoji: "✨",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=600&fit=crop&q=80",
        color: "from-amber-100 to-stone-200",
        free: true,
    },
    {
        id: "purple-royal",
        name: "Binafsha Qirol",
        category: "Sunnat to'yi",
        emoji: "👑",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80",
        color: "from-purple-900 to-violet-700",
        free: true,
    },
];

const QUICK_ACTIONS = [
    {
        href: "/dashboard/ai-create",
        icon: Sparkles,
        label: "AI bilan yaratish",
        desc: "Tasvirlab bersangiz — yangi dizayn",
        gradient: "from-violet-600 to-indigo-600",
        badge: "AI ✨",
    },
    {
        href: "/dashboard/ai-create",
        icon: LayoutGrid,
        label: "Shablondan boshlash",
        desc: "Tayyor dizaynni tahrirlash",
        gradient: "from-pink-500 to-rose-500",
        badge: "Bepul",
    },
    {
        href: "/events/create",
        icon: Plus,
        label: "Bo'sh shakldan",
        desc: "Noldan o'zingiz yarating",
        gradient: "from-emerald-500 to-teal-500",
        badge: null,
    },
];

export default async function DashboardPage() {
    const user = await getUser();
    if (!user) redirect("/auth/login");

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Xayrli tong" : hour < 17 ? "Xayrli kun" : "Xayrli kech";

    return (
        <div className="min-h-screen">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* ===== HERO / WELCOME ===== */}
                <section className="mb-10">
                    <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 rounded-3xl px-7 py-10 text-white shadow-2xl">
                        {/* Decorative blobs */}
                        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-400/20 rounded-full blur-2xl" />

                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <p className="text-violet-200 font-medium text-sm mb-1">{greeting}, 👋</p>
                                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                                    {user.name}!
                                </h1>
                                <p className="text-violet-100 max-w-sm">
                                    Bugun qanday taklifnoma yaratmoqchisiz? Bir necha soniyada tayyor!
                                </p>
                            </div>
                            <Link href="/dashboard/ai-create"
                                className="shrink-0 flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                Hozir boshlash
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ===== QUICK ACTIONS ===== */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Nima qilmoqchisiz?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {QUICK_ACTIONS.map(({ href, icon: Icon, label, desc, gradient, badge }) => (
                            <Link key={href + label} href={href}
                                className="group relative bg-white border border-gray-200 hover:border-transparent rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Hover gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />

                                <div className="relative z-10">
                                    {badge && (
                                        <span className="inline-block text-[11px] font-bold px-2.5 py-1 bg-yellow-400 text-black rounded-full mb-3">
                                            {badge}
                                        </span>
                                    )}
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors mb-1">{label}</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">{desc}</p>
                                </div>

                                <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-300 group-hover:text-white/70 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ===== FREE TEMPLATES GALLERY ===== */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Bepul shablonlar</h2>
                            <p className="text-gray-500 text-sm mt-0.5">Tayyor dizaynni tanlang va tahrirlang</p>
                        </div>
                        <Link href="/dashboard/ai-create"
                            className="text-sm font-semibold text-violet-600 hover:text-violet-800 flex items-center gap-1 transition-colors"
                        >
                            Barchasi <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Scrollable grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {FREE_TEMPLATES.map((template) => (
                            <Link key={template.id} href={`/dashboard/ai-create?template=${template.id}`}
                                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-violet-400"
                            >
                                {/* 3:4 aspect ratio portrait card */}
                                <div className="relative" style={{ paddingBottom: "133%" }}>
                                    <img
                                        src={template.imageUrl}
                                        alt={template.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                    />
                                    {/* Dark overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Free badge */}
                                    <span className="absolute top-3 left-3 text-[11px] font-bold bg-green-400 text-black px-2 py-0.5 rounded-full">
                                        Bepul
                                    </span>

                                    {/* Hover Use button */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white text-gray-900 font-bold px-4 py-2 rounded-2xl text-sm shadow-lg flex items-center gap-1">
                                            <Wand2 className="w-4 h-4 text-violet-600" />
                                            Ishlatish
                                        </span>
                                    </div>

                                    {/* Bottom info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-base">{template.emoji}</span>
                                            <p className="text-white font-bold text-sm">{template.name}</p>
                                        </div>
                                        <p className="text-white/70 text-xs">{template.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* AI Generate Card */}
                        <Link href="/dashboard/ai-create"
                            className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-dashed border-violet-300 hover:border-violet-500 bg-violet-50"
                        >
                            <div className="relative" style={{ paddingBottom: "133%" }}>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-violet-50 to-indigo-50 group-hover:from-violet-100 group-hover:to-indigo-100 transition-colors">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                        <Sparkles className="w-7 h-7 text-white" />
                                    </div>
                                    <p className="font-bold text-gray-800 text-center text-sm">AI bilan noyob dizayn</p>
                                    <p className="text-gray-500 text-xs text-center mt-1">Tasavvuringizni yozing</p>
                                    <span className="mt-3 text-[11px] font-bold bg-yellow-400 text-black px-2.5 py-1 rounded-full">Bepul ✨</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* ===== PREMIUM BANNER ===== */}
                <section className="mb-10">
                    <div className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 rounded-3xl p-6 shadow-xl">
                        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Crown className="w-5 h-5 text-white" />
                                    <span className="text-white font-bold">Premium rejaga o'ting</span>
                                </div>
                                <p className="text-white/90 text-sm max-w-sm">
                                    Cheksiz shablonlar, maxsus domenlar, AI avlod va ko'proq imkoniyatlar!
                                </p>
                            </div>
                            <Link href="/pricing"
                                className="shrink-0 bg-white text-orange-600 font-bold px-6 py-3 rounded-2xl hover:bg-orange-50 transition-all hover:scale-105 shadow-lg whitespace-nowrap text-sm"
                            >
                                Batafsil ko'rish →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ===== RECENT EVENTS (empty state) ===== */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">So'nggi taklifnomalarim</h2>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-sm">
                        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <CalendarDays className="w-8 h-8 text-violet-400" />
                        </div>
                        <h3 className="font-bold text-gray-700 mb-1">Hali taklifnomalar yo'q</h3>
                        <p className="text-gray-400 text-sm mb-6">Birinchi taklifnomangizni yarating va mehmonlaringizni taklif qiling!</p>
                        <Link href="/dashboard/ai-create"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
                        >
                            <Sparkles className="w-4 h-4" />
                            Birinchisini yaratish
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
    Sparkles,
    Smartphone,
    Globe,
    Share2,
    ArrowRight,
    Check,
    Wand2,
    Play,
    Star,
    ChevronRight,
    Zap,
    Lock,
    Palette,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TEMPLATES = [
    {
        id: 1,
        name: "O'zbek Oltin",
        tag: "Nikoh to'yi",
        img: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400&h=600&fit=crop&q=80",
        color: "from-amber-400 to-yellow-600",
    },
    {
        id: 2,
        name: "Oq Gullar",
        tag: "Unashtiruv",
        img: "https://images.unsplash.com/photo-1487530811015-780f2f5e3f87?w=400&h=600&fit=crop&q=80",
        color: "from-pink-300 to-rose-400",
    },
    {
        id: 3,
        name: "Ko'k Zafarlik",
        tag: "Osh marosimi",
        img: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=400&h=600&fit=crop&q=80",
        color: "from-blue-500 to-indigo-700",
    },
    {
        id: 4,
        name: "Atirgul Oltin",
        tag: "Tug'ilgan kun",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=80",
        color: "from-rose-400 to-pink-600",
    },
    {
        id: 5,
        name: "Yashil Tabiiy",
        tag: "Nikoh to'yi",
        img: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=400&h=600&fit=crop&q=80",
        color: "from-emerald-500 to-green-700",
    },
    {
        id: 6,
        name: "Qirollik Uslubi",
        tag: "Yubiley",
        img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=80",
        color: "from-stone-700 to-zinc-900",
    },
];

const FEATURES = [
    {
        icon: Wand2,
        title: "AI bilan yaratish",
        desc: "O'zbek tilida tasvirlab bering — AI professional inglizcha promptga aylantiradi va 4 ta noyob dizayn taklif qiladi.",
        badge: "Bepul",
        badgeColor: "bg-green-100 text-green-700",
        gradient: "from-violet-500 to-purple-600",
        large: true,
    },
    {
        icon: Palette,
        title: "100+ Shablon",
        desc: "Milliy va zamonaviy shablonlar to'plami — bir bosish bilan tahrirlang.",
        badge: null,
        gradient: "from-pink-500 to-rose-500",
        large: false,
    },
    {
        icon: Smartphone,
        title: "Mobil optimallashgan",
        desc: "Har qanday qurilmada mukammal ko'rinadi.",
        badge: null,
        gradient: "from-sky-500 to-blue-600",
        large: false,
    },
    {
        icon: Share2,
        title: "1 bosish bilan ulashing",
        desc: "WhatsApp, Telegram orqali darhol jo'nating.",
        badge: null,
        gradient: "from-emerald-500 to-teal-600",
        large: false,
    },
    {
        icon: Globe,
        "title": "O'zbek tilidagi interfeys",
        desc: "Platforma to'liq o'zbek tilida, mahalliy marosimlar uchun mo'ljallangan.",
        badge: null,
        gradient: "from-amber-500 to-orange-600",
        large: false,
    },
];

const STEPS = [
    { num: "01", title: "Marosim turini tanlang", desc: "Nikoh, osh, tug'ilgan kun yoki boshqa marosim.", icon: "💍" },
    { num: "02", title: "Shablonni tanlang yoki AI bilan yarating", desc: "Tayyor dizayn yoki o'z tasavvuringizni AI'ga tasvirlab bering.", icon: "🎨" },
    { num: "03", title: "Ma'lumotlarni kiriting", desc: "Ism, sana, manzil va boshqa tafsilotlarni qo'shing.", icon: "✍️" },
    { num: "04", title: "Ulashing!", desc: "Havolani nusxalab, mehmonlaringizga jo'nating.", icon: "🚀" },
];

const TESTIMONIALS = [
    { name: "Shahlo Nazarova", role: "1000+ mehmon to'yi", img: "SN", text: "Juda qulay! 10 daqiqada ajoyib taklifnoma yaratdim. Mehmonlarim hayron qoldi.", stars: 5 },
    { name: "Bobur Karimov", role: "Osh marosimi", img: "BK", text: "AI yordamida unique dizayn yasadim. Bepul user sozlamalar hammasi bor!", stars: 5 },
    { name: "Malika Yusupova", role: "Tug'ilgan kun tadbiri", img: "MY", text: "Canva'dan ham oson! O'zbek tilida platforma juda yaxshi fikr.", stars: 5 },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        fetch("/api/user/profile")
            .then(res => setIsLoggedIn(res.ok))
            .catch(() => setIsLoggedIn(false))
            .finally(() => setIsLoadingUser(false));
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

            {/* ═══ NAVBAR ══════════════════════════════════════════════════════ */}
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mt-3 flex items-center justify-between bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <span className="text-white font-black text-sm">I</span>
                            </div>
                            <span className="font-extrabold text-xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                Inviter.uz
                            </span>
                        </Link>

                        {/* Nav links - desktop */}
                        <nav className="hidden md:flex items-center gap-8">
                            {[
                                { label: "Shablonlar", href: "/dashboard/ai-create" },
                                { label: "Narxlar", href: "/pricing" },
                                { label: "Loyiha haqida", href: "/about" },
                            ].map((l) => (
                                <Link key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors font-medium">
                                    {l.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-3">
                            {!isLoadingUser && (
                                isLoggedIn ? (
                                    <Link href="/dashboard"
                                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:scale-105 active:scale-95"
                                    >
                                        Boshqaruv paneli
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/auth/login" className="hidden sm:block text-sm text-white/70 hover:text-white font-medium transition-colors px-3 py-1.5">
                                            Kirish
                                        </Link>
                                        <Link href="/auth/signup"
                                            className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:scale-105 active:scale-95"
                                        >
                                            Bepul boshlash
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ═══ HERO ════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">

                {/* Animated background mesh */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse delay-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
                    {/* Grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl mx-auto px-4">

                    {/* AI Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/15 border border-violet-500/30 text-violet-300 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        Sun'iy intellekt bilan ishlaydi
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                            Tadbirlaringiz
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            mukammal boshlansin
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Nikoh, osh, tug'ilgan kun va boshqa marosimlar uchun{" "}
                        <span className="text-white/80">professional raqamli taklifnomalar</span> yarating.
                        AI yordamida bir necha daqiqada — bepul.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link href={isLoggedIn ? "/dashboard" : "/auth/signup"}
                            className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-violet-500/30 transition-all hover:scale-105 active:scale-95 hover:shadow-violet-500/50"
                        >
                            <Sparkles className="w-5 h-5" />
                            {isLoggedIn ? "Boshqaruv paneli" : "Bepul taklifnoma yarat"}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/dashboard/ai-create"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all backdrop-blur-sm"
                        >
                            <Play className="w-4 h-4" />
                            Shablonlarni ko'rish
                        </Link>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {["SN", "BK", "MY", "AH"].map((initials) => (
                                    <div key={initials} className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 border-2 border-[#0a0a0f] flex items-center justify-center text-[9px] font-bold text-white">
                                        {initials}
                                    </div>
                                ))}
                            </div>
                            <span>5,000+ foydalanuvchi</span>
                        </div>
                        <span className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                            <span>4.9/5 baho</span>
                        </div>
                        <span className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span>Kredit karta talab qilinmaydi</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ FLOATING TEMPLATE PREVIEW ════════════════════════════════ */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">Shablonlar kutubxonasi</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Minglab variant ichidan
                            <br />
                            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">o'zingiznikini tanlang</span>
                        </h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Bepul professional shablonlar — tahrirlang, va darhol ulashing
                        </p>
                    </motion.div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {TEMPLATES.map((tpl, i) => (
                            <motion.div
                                key={tpl.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl"
                                style={{ aspectRatio: "2/3" }}
                            >
                                <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                {/* Free badge */}
                                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-green-400 text-black px-2 py-0.5 rounded-full">
                                    Bepul
                                </span>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                                    <Link href="/auth/signup"
                                        className="bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded-xl shadow-xl flex items-center gap-1.5 hover:bg-violet-50 transition-colors"
                                    >
                                        <Wand2 className="w-3.5 h-3.5 text-violet-600" />
                                        Ishlatish
                                    </Link>
                                </div>

                                {/* Bottom label */}
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white font-bold text-sm leading-tight">{tpl.name}</p>
                                    <p className="text-white/50 text-xs">{tpl.tag}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <Link href="/auth/signup"
                            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                        >
                            Barcha shablonlarni ko'rish <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══ BENTO FEATURES ══════════════════════════════════════════════ */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">Imkoniyatlar</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Taklifnoma yaratishning
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">eng oson yo'li</span>
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Large card - AI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/20 group hover:border-violet-500/40 transition-all"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl group-hover:bg-violet-500/30 transition-all" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/30">
                                <Wand2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="inline-block text-xs font-bold bg-green-400/20 text-green-400 border border-green-400/30 px-3 py-1 rounded-full mb-4">Bepul</span>
                            <h3 className="text-2xl font-black text-white mb-3">AI bilan taklifnoma yarating</h3>
                            <p className="text-white/50 text-base max-w-md">
                                O'zbek tilida "Ko'k va oltin rangda nikoh taklifnomasi" deb yozing — AI professional dizayn yaratadi. 4 ta variant, 20 soniyada.
                            </p>
                            <div className="mt-6 p-4 bg-black/30 rounded-2xl border border-white/10 text-sm font-mono text-white/60">
                                <span className="text-violet-400">AI:</span> "Ko'k va oltin rangda zamonaviy nikoh taklifnomasi..."
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-sky-900/40 to-blue-900/40 border border-sky-500/20 group hover:border-sky-500/40 transition-all"
                    >
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-500/15 rounded-full blur-3xl" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-4 shadow-md">
                            <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Mobil moslashuvchan</h3>
                        <p className="text-white/50 text-sm">Telefon, planshet, kompyuter — har qanday ekranda mukammal ko'rinadi.</p>
                    </motion.div>

                    {/* Share */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 group hover:border-emerald-500/40 transition-all"
                    >
                        <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-md">
                            <Share2 className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">1 bosish bilan ulashing</h3>
                        <p className="text-white/50 text-sm">WhatsApp, Telegram yoki SMS orqali cheksiz ulashing. Qog'oz xarajat yo'q.</p>
                    </motion.div>

                    {/* Uzbek */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-500/20 group hover:border-amber-500/40 transition-all"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-md">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">O'zbek tilidagi platforma</h3>
                        <p className="text-white/50 text-sm">Mahalliy marosimlar: nikoh, osh, sunnat, unashtiruv uchun maxsus shablonlar.</p>
                    </motion.div>

                    {/* Security */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-pink-900/40 to-rose-900/40 border border-pink-500/20 group hover:border-pink-500/40 transition-all"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 shadow-md">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">20 soniyada tayyor</h3>
                        <p className="text-white/50 text-sm">Tez yarating, tez ulashing. Marosimga yaqinlashib qoldi? Hammasi yetib olasiz.</p>
                    </motion.div>
                </div>
            </section>

            {/* ═══ HOW IT WORKS ════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">Jarayon</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            4 qadamda <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">tayyor</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-8 left-[calc(100%+12px)] w-full h-px bg-gradient-to-r from-white/20 to-transparent z-10" />
                                )}
                                <div className="bg-white/5 hover:bg-white/8 border border-white/10 hover:border-violet-500/30 rounded-3xl p-6 transition-all h-full">
                                    <div className="text-3xl mb-4">{step.icon}</div>
                                    <span className="text-5xl font-black text-white/10 leading-none block mb-3">{step.num}</span>
                                    <h3 className="font-bold text-white mb-2 text-lg leading-tight">{step.title}</h3>
                                    <p className="text-white/40 text-sm">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TESTIMONIALS ════════════════════════════════════════════════ */}
            <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">Sharhlar</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Foydalanuvchilar nima deydi?
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 hover:border-violet-500/20 transition-all"
                        >
                            <div className="flex items-center gap-1 mb-5">
                                {[...Array(t.stars)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-white/70 mb-6 leading-relaxed italic">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                                    {t.img}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{t.name}</p>
                                    <p className="text-white/40 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══ FINAL CTA ═══════════════════════════════════════════════════ */}
            <section className="py-20 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-indigo-700 to-purple-800" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10 text-center py-20 px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                                <Lock className="w-3.5 h-3.5" />
                                Kredit karta talab qilinmaydi
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
                                Birinchi taklifnomangizni
                                <br />
                                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    bugun yarating
                                </span>
                            </h2>
                            <p className="text-white/60 text-xl mb-10 max-w-xl mx-auto">
                                5,000+ foydalanuvchi ishonadi. Bepul boshlang, xohlasangiz Premium'ga o'ting.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href={isLoggedIn ? "/dashboard" : "/auth/signup"}
                                    className="group flex items-center gap-2 bg-white text-violet-700 font-bold px-10 py-4 rounded-2xl text-lg shadow-2xl hover:bg-violet-50 transition-all hover:scale-105 active:scale-95"
                                >
                                    <Sparkles className="w-5 h-5 text-violet-600" />
                                    {isLoggedIn ? "Boshqaruv paneliga o'tish" : "Bepul ro'yxatdan o'tish"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <p className="mt-6 text-white/30 text-sm">Bepul plan bilan boshlang • Premium imkoniyatlar ham bor</p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ═══ FOOTER ══════════════════════════════════════════════════════ */}
            <footer className="border-t border-white/5 py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-black text-xs">I</span>
                        </div>
                        <span className="font-bold text-white/70">Inviter.uz</span>
                    </Link>

                    <div className="flex items-center gap-8 text-sm text-white/30">
                        {["Loyiha haqida", "Narxlar", "Blog"].map((l) => (
                            <Link key={l} href="#" className="hover:text-white/60 transition-colors">{l}</Link>
                        ))}
                    </div>

                    <p className="text-white/20 text-sm">© 2026 Inviter.uz. Barcha huquqlar himoyalangan.</p>
                </div>
            </footer>
        </div>
    );
}

"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { useRef, useState, useEffect } from "react";
import {
    Sparkles, ArrowRight, Check, Star, ChevronDown, ChevronRight,
    Menu, X, MapPin, Camera, Gift, QrCode, Cpu, Zap, Play,
    Mail, MessageCircle, CreditCard, Shield,
} from "lucide-react";
import {
    fadeUp, staggerContainer, fadeUpItem, wordContainer, wordItem, viewportOnce,
} from "@/lib/animations";

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
    { label: "Shablonlar", href: "#templates" },
    { label: "Narxlar", href: "#pricing" },
    { label: "Savollar", href: "#faq" },
];

const FEATURES = [
    { icon: Cpu, emoji: "🤖", title: "AI Dizayn", desc: "Tasvirlab bering, AI professional taklifnoma yaratadi. 4 variant, 20 soniyada.", color: "from-violet-500 to-purple-600" },
    { icon: QrCode, emoji: "📱", title: "QR Kod", desc: "Mehmonlar QR kodni skanerlab to'yxona GPS manzilini darhol ochadi.", color: "from-blue-500 to-cyan-600" },
    { icon: Gift, emoji: "💝", title: "Online Hadya", desc: "Mehmonlar Click yoki Payme orqali to'yingizga hadya yuborishadi.", color: "from-amber-500 to-orange-600" },
    { icon: Camera, emoji: "📸", title: "Rasm Galereyasi", desc: "To'ydagi rasmlarni mehmonlar yuklaydi — hammasi bir joyda.", color: "from-pink-500 to-rose-600" },
    { icon: MapPin, emoji: "🗺️", title: "GPS Navigatsiya", desc: "Google Maps va Yandex Maps bilan to'yxonaga yo'l ko'rsatadi.", color: "from-emerald-500 to-teal-600" },
    { icon: Zap, emoji: "⚡", title: "60 Soniyada", desc: "Ro'yxatdan o'ting, to'ldiring, ulashing. Hech qanday dizayn bilimi shart emas.", color: "from-orange-500 to-red-500" },
];

const STEPS = [
    { num: "01", title: "Ro'yxatdan o'ting", desc: "Email kiriting va 30 soniyada akkaunt yarating — bepul.", emoji: "✍️" },
    { num: "02", title: "Marosimni tanlang", desc: "Nikoh, osh, tug'ilgan kun yoki boshqa marosimni belgilang.", emoji: "💍" },
    { num: "03", title: "AI dizayn yarating", desc: "Tasvirlab bering — AI professional taklifnoma yaratadi.", emoji: "🎨" },
    { num: "04", title: "Ulashing!", desc: "QR kod yoki havola bilan do'stlaringizga darhol yuboring.", emoji: "🚀" },
];

const TESTIMONIALS = [
    { name: "Shahlo Nazarova", role: "1000+ mehmon to'yi", initials: "SN", text: "Juda qulay! 10 daqiqada ajoyib taklifnoma yaratdim. Mehmonlarim hayron qoldi.", stars: 5 },
    { name: "Bobur Karimov", role: "Osh marosimi", initials: "BK", text: "AI yordamida unique dizayn yasadim. Bepul sozlamalar hammasi bor!", stars: 5 },
    { name: "Malika Yusupova", role: "Tug'ilgan kun", initials: "MY", text: "Canva'dan ham oson! O'zbek tilida platforma juda yaxshi fikr.", stars: 5 },
    { name: "Akbar Rakhimov", role: "Nikoh to'yi", initials: "AR", text: "QR kod funksiyasi juda foydali. Mehmonlarim skanerlab, to'yxonaga GPS orqali kelishdi.", stars: 5 },
    { name: "Dilnoza Ergasheva", role: "Sunnat to'yi", initials: "DE", text: "O'g'limning sunnat to'yi uchun ishlatdim. Ajoyib natija — barcha mehmonlar maqtadi.", stars: 5 },
    { name: "Jasur Toshmatov", role: "Unashtiruv", initials: "JT", text: "Unashtiruv marosimi uchun ishlatdim. Oilamiz juda xursand bo'ldi. Rahmat!", stars: 5 },
    { name: "Nodira Karimova", role: "Nikoh to'yi", initials: "NK", text: "Premium xarid qildim — cheksiz taklifnomalar va online hadya tizimi zo'r ishladi!", stars: 5 },
    { name: "Sardor Umarov", role: "Osh marosimi", initials: "SU", text: "Oddiy va tushunarli interfeys. Ota-onam ham hech qiyinchiliksiz ishlatishdi.", stars: 5 },
];

const FAQ_ITEMS = [
    { q: "AI qanday ishlaydi?", a: "Siz marosim turini va xohishingizni o'zbek tilida yozasiz. AI (Sun'iy Intellekt) professional dizaynni avtomatik yaratadi. Natija yoqmasa qayta generatsiya qilishingiz mumkin." },
    { q: "To'lov xavfsizmi?", a: "Ha, barcha to'lovlar Click va Payme xavfsiz tizimi orqali amalga oshiriladi. Biz sizning karta ma'lumotlaringizni saqlamaymiz." },
    { q: "Rasmlarni kim ko'ra oladi?", a: "Faqat taklifnoma havolasiga ega bo'lgan mehmonlar ko'rishi mumkin. Rasmlar xavfsiz serverda saqlanadi." },
    { q: "QR kod qanday ishlaydi?", a: "Har bir taklifnoma uchun noyob QR kod yaratiladi. Mehmonlar skanerlab, barcha ma'lumotlarni — sana, vaqt, GPS manzil — darhol ko'radi." },
    { q: "Taklifnomani o'chirsam bo'ladimi?", a: "Ha, istalgan vaqtda boshqaruv panelidan o'chirishingiz mumkin. Barcha ma'lumotlar va rasmlar ham o'chadi." },
    { q: "Pulim qaytariladimi?", a: "Ha, sotib olganingizdan keyin 7 kun ichida to'liq qaytarib beramiz. Hech qanday savol yo'q." },
    { q: "Mobil qurilmada ishlaydi?", a: "Ha! Platforma 100% mobil qurilmalarga moslashtirilgan. Telefon, planshet va kompyuterda mukammal ko'rinadi." },
    { q: "Yordam kerak bo'lsa nima qilaman?", a: "Telegram @inviter_uz kanalimizga yozing yoki info@inviter.uz ga email yuboring. 24 soat ichida javob beramiz." },
];

const TEMPLATES = [
    { id: 1, name: "O'zbek Oltin", tag: "Nikoh to'yi", img: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400&h=600&fit=crop&q=80", badge: "Bepul" },
    { id: 2, name: "Oq Gullar", tag: "Unashtiruv", img: "https://images.unsplash.com/photo-1487530811015-780f2f5e3f87?w=400&h=600&fit=crop&q=80", badge: "Bepul" },
    { id: 3, name: "Ko'k Zafarlik", tag: "Osh marosimi", img: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=400&h=600&fit=crop&q=80", badge: "Bepul" },
    { id: 4, name: "Atirgul Oltin", tag: "Tug'ilgan kun", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=80", badge: "Pro" },
    { id: 5, name: "Yashil Tabiiy", tag: "Nikoh to'yi", img: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=400&h=600&fit=crop&q=80", badge: "Bepul" },
    { id: 6, name: "Qirollik Uslubi", tag: "Yubiley", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=80", badge: "Pro" },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [navScrolled, setNavScrolled] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        fetch("/api/user/profile")
            .then(res => setIsLoggedIn(res.ok))
            .catch(() => setIsLoggedIn(false))
            .finally(() => setIsLoadingUser(false));
    }, []);

    // Scroll detection for navbar
    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const ctaHref = isLoggedIn ? "/dashboard" : "/auth/signup";
    const ctaText = isLoggedIn ? "Boshqaruv paneli" : "Bepul Taklifnoma Yarat";

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

            {/* ═══════════════════════════════════════════════════════════════════
                1. NAVBAR
                ═══════════════════════════════════════════════════════════════════ */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled ? "bg-[#0a0a0f]/80 backdrop-blur-xl shadow-lg shadow-black/10" : ""}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                <span className="text-white font-black text-sm">I</span>
                            </div>
                            <span className="font-extrabold text-xl text-white">inviter<span className="text-amber-400">.uz</span></span>
                        </Link>

                        {/* Center Nav - desktop */}
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map(l => (
                                <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors font-medium">
                                    {l.label}
                                </a>
                            ))}
                        </nav>

                        {/* Right CTA */}
                        <div className="flex items-center gap-3">
                            {!isLoadingUser && (
                                isLoggedIn ? (
                                    <Link href="/dashboard" className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95">
                                        Dashboard <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/auth/login" className="hidden sm:block text-sm text-white/70 hover:text-white font-medium transition-colors px-3 py-2">
                                            Kirish
                                        </Link>
                                        <Link href="/auth/signup" className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95">
                                            Bepul Boshlash
                                        </Link>
                                    </>
                                )
                            )}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white/70 hover:text-white p-2">
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden overflow-hidden border-t border-white/10"
                            >
                                <div className="py-4 space-y-2">
                                    {NAV_LINKS.map(l => (
                                        <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-white/70 hover:text-white font-medium transition-colors">
                                            {l.label}
                                        </a>
                                    ))}
                                    <div className="pt-3 space-y-2">
                                        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-white/70 hover:text-white font-medium text-center border border-white/10 rounded-xl">
                                            Kirish
                                        </Link>
                                        <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-center bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl">
                                            Bepul Boshlash
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════════════
                2. HERO
                ═══════════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
                {/* Animated background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-navy via-[#0a0a0f] to-[#0a0a0f]" />
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    {/* Floating geometric shapes */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-amber-400/20 rotate-45"
                            style={{
                                top: `${15 + i * 15}%`,
                                left: `${10 + i * 14}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.5, 0.2],
                                rotate: [45, 90, 45],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl mx-auto px-4">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        O&apos;zbekistondagi #1 taklifnoma platformasi
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </motion.div>

                    {/* Headline — word-by-word stagger */}
                    <motion.h1
                        variants={wordContainer}
                        initial="initial"
                        animate="animate"
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-7"
                    >
                        {"To'yingiz uchun".split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordItem} className="inline-block mr-[0.3em] text-white">
                                {word}
                            </motion.span>
                        ))}
                        <br />
                        {"eng chiroyli taklifnoma".split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordItem} className="inline-block mr-[0.3em] bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p {...fadeUp} className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                        AI yordamida <span className="text-white/80">60 soniyada</span> professional raqamli taklifnoma.
                        QR kod, GPS manzil, online hadya va rasm galereyasi — <span className="text-white/80">hammasi bir joyda.</span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Link href={ctaHref}
                            className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 animate-glow-pulse"
                        >
                            <Sparkles className="w-5 h-5" />
                            {ctaText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#templates"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all backdrop-blur-sm"
                        >
                            <Play className="w-4 h-4" />
                            Demo Ko&apos;rish
                        </a>
                    </motion.div>

                    {/* Trust bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-white/40"
                    >
                        <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-green-400" />
                            Kredit karta talab qilinmaydi
                        </div>
                        <span className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-green-400" />
                            60 soniyada tayyor
                        </div>
                        <span className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-green-400" />
                            5,000+ foydalanuvchi
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint"
                >
                    <ChevronDown className="w-6 h-6 text-white/30" />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                3. SOCIAL PROOF BAR
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-8 bg-[#111118] border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { num: "5,000+", label: "Foydalanuvchi" },
                            { num: "12,000+", label: "Taklifnoma" },
                            { num: "4.9★", label: "Baho" },
                            { num: "98%", label: "Mamnunlik" },
                        ].map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportOnce}
                                transition={{ delay: i * 0.08 }}
                            >
                                <p className="text-2xl md:text-3xl font-black text-white">{s.num}</p>
                                <p className="text-sm text-white/40 mt-1">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                4. FEATURES
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">Imkoniyatlar</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Nima uchun <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">inviter.uz</span>?
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">Taklifnoma yaratishning eng oson va professional yo&apos;li</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={viewportOnce}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {FEATURES.map((f) => (
                            <motion.div
                                key={f.title}
                                variants={fadeUpItem}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="glass-card p-7 hover:bg-white/[0.08] hover:border-white/20 transition-all group cursor-default"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <f.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                5. TEMPLATE SHOWCASE
                ═══════════════════════════════════════════════════════════════════ */}
            <section id="templates" className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        className="text-center mb-14"
                    >
                        <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">Shablonlar</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Minglab variant ichidan<br />
                            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">o&apos;zingiznikini tanlang</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {TEMPLATES.map((tpl, i) => (
                            <motion.div
                                key={tpl.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportOnce}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl"
                                style={{ aspectRatio: "2/3" }}
                            >
                                {/* @ts-ignore */}
                                <NextImage src={tpl.img} alt={tpl.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover transition-transform group-hover:scale-110 duration-700" unoptimized />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${tpl.badge === "Pro" ? "bg-gradient-to-r from-amber-400 to-orange-400 text-black" : "bg-green-400 text-black"}`}>
                                    {tpl.badge}
                                </span>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                                    <Link href="/auth/signup" className="bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded-xl shadow-xl hover:bg-amber-50 transition-colors">
                                        Ishlatish
                                    </Link>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white font-bold text-sm leading-tight">{tpl.name}</p>
                                    <p className="text-white/50 text-xs">{tpl.tag}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce} className="text-center mt-10">
                        <Link href="/auth/signup" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                            Barcha shablonlarni ko&apos;rish <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                6. HOW IT WORKS
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="text-center mb-16">
                        <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">Jarayon</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            4 qadamda <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">tayyor</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {/* Connection line */}
                        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-amber-500/30 via-amber-500/50 to-amber-500/30" />

                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportOnce}
                                transition={{ delay: i * 0.12 }}
                                className="text-center relative"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center mx-auto mb-5 text-3xl relative z-10 bg-[#0a0a0f]">
                                    {step.emoji}
                                </div>
                                <span className="text-xs font-bold text-amber-400/50 uppercase tracking-wider">Qadam {step.num}</span>
                                <h3 className="font-bold text-white text-lg mt-2 mb-2">{step.title}</h3>
                                <p className="text-white/40 text-sm">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                7. TESTIMONIALS
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-[#0a0a0f] via-[#111118] to-[#0a0a0f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">Sharhlar</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            Foydalanuvchilar <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">nima deydi?</span>
                        </h2>
                    </motion.div>

                    {/* Carousel */}
                    <div className="relative">
                        <div className="absolute -top-8 -left-4 text-8xl text-amber-500/10 font-serif">&ldquo;</div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                                className="glass-card p-8 md:p-12 text-center"
                            >
                                <div className="flex items-center justify-center gap-1 mb-6">
                                    {[...Array(TESTIMONIALS[activeTestimonial].stars)].map((_, j) => (
                                        <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic mb-8 font-serif">
                                    &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-sm font-bold">
                                        {TESTIMONIALS[activeTestimonial].initials}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-semibold">{TESTIMONIALS[activeTestimonial].name}</p>
                                        <p className="text-white/40 text-sm">{TESTIMONIALS[activeTestimonial].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Dots */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTestimonial(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? "w-6 bg-amber-400" : "bg-white/20 hover:bg-white/40"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                8. PRICING
                ═══════════════════════════════════════════════════════════════════ */}
            <section id="pricing" className="py-20 md:py-28">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">Narxlar</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            Oddiy va <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Shaffof Narxlar</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* FREE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportOnce}
                            className="glass-card p-8 flex flex-col"
                        >
                            <h3 className="text-2xl font-bold text-white mb-1">Bepul</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-white">0</span>
                                <span className="text-white/40">so&apos;m</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                {["3 ta taklifnoma", "Asosiy shablonlar", "QR kod", "WhatsApp/Telegram ulashish"].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-white/60 text-sm">
                                        <Check className="w-4 h-4 text-green-400 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/auth/signup" className="block text-center py-3.5 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-colors">
                                Bepul Boshlash
                            </Link>
                        </motion.div>

                        {/* PRO */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportOnce}
                            transition={{ delay: 0.1 }}
                            className="relative rounded-2xl p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 flex flex-col animate-glow-pulse"
                        >
                            <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                                Eng mashhur ⭐
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Pro</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-lg text-white/30 line-through">200,000</span>
                                <span className="text-4xl font-black text-amber-400">100,000</span>
                                <span className="text-white/40">so&apos;m / yil</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                {[
                                    "Cheksiz taklifnomalar",
                                    "AI dizayn generatsiyasi",
                                    "QR kod + GPS manzil",
                                    "Online hadya (Click/Payme)",
                                    "Rasm galereyasi",
                                    "Premium shablonlar",
                                    "Statistika (ko'rishlar, kliklar)",
                                    "Ustuvor qo'llab-quvvatlash",
                                ].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-white/70 text-sm">
                                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/auth/signup" className="block text-center py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-colors shadow-lg shadow-amber-500/20">
                                Pro ni Olish — 100,000 so&apos;m
                            </Link>
                            <p className="text-center text-white/30 text-xs mt-3 flex items-center justify-center gap-2">
                                <CreditCard className="w-3.5 h-3.5" />
                                Click, Payme, UzCard qabul qilinadi
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                9. FAQ
                ═══════════════════════════════════════════════════════════════════ */}
            <section id="faq" className="py-20 md:py-28 bg-[#111118]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">Savollar</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            Ko&apos;p beriladigan <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">savollar</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-3">
                        {FAQ_ITEMS.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportOnce}
                                transition={{ delay: i * 0.05 }}
                                className="glass-card overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-amber-400" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                10. FOOTER
                ═══════════════════════════════════════════════════════════════════ */}
            <footer className="bg-[#080810] border-t border-white/5 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                        {/* Logo column */}
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <span className="text-white font-black text-xs">I</span>
                                </div>
                                <span className="font-bold text-white">inviter<span className="text-amber-400">.uz</span></span>
                            </Link>
                            <p className="text-white/30 text-sm leading-relaxed">
                                O&apos;zbekistondagi #1 raqamli taklifnoma platformasi. AI yordamida professional taklifnomalar.
                            </p>
                        </div>

                        {/* Sahifalar */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Sahifalar</h4>
                            <ul className="space-y-2.5 text-sm">
                                {[
                                    { label: "Bosh sahifa", href: "/" },
                                    { label: "Narxlar", href: "/pricing" },
                                    { label: "Blog", href: "/blog" },
                                    { label: "Loyiha haqida", href: "/about" },
                                ].map(l => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="text-white/30 hover:text-white/60 transition-colors">{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Yordam */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Yordam</h4>
                            <ul className="space-y-2.5 text-sm">
                                {[
                                    { label: "Maxfiylik siyosati", href: "/privacy" },
                                    { label: "Foydalanish shartlari", href: "/terms" },
                                    { label: "FAQ", href: "#faq" },
                                ].map(l => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="text-white/30 hover:text-white/60 transition-colors">{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Aloqa */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Aloqa</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <a href="mailto:info@inviter.uz" className="text-white/30 hover:text-white/60 transition-colors flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" /> info@inviter.uz
                                    </a>
                                </li>
                                <li>
                                    <a href="https://t.me/inviter_uz" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors flex items-center gap-2">
                                        <MessageCircle className="w-3.5 h-3.5" /> @inviter_uz
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/20 text-sm">© 2026 inviter.uz — Barcha huquqlar himoyalangan.</p>
                        <div className="flex items-center gap-4 text-white/20 text-xs">
                            <div className="flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5" />
                                <span>Click</span>
                                <span>•</span>
                                <span>Payme</span>
                                <span>•</span>
                                <span>UzCard</span>
                                <span>•</span>
                                <span>Visa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

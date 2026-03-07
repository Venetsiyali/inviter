import Link from "next/link";

const EVENT_TYPES = [
    { emoji: "💒", label: "To'y", desc: "Nikoh to'yi" },
    { emoji: "🍽️", label: "Osh", desc: "Osh marosimi" },
    { emoji: "🎂", label: "Tug'ilgan kun", desc: "Bayram" },
    { emoji: "💍", label: "Unashtiruv", desc: "Fotiha to'yi" },
    { emoji: "👶", label: "Sunnat to'yi", desc: "Marosim" },
    { emoji: "🎉", label: "Boshqa", desc: "Har qanday" },
];

const FEATURES = [
    {
        icon: "🎨",
        title: "Chiroyli shablonlar",
        desc: "15+ professional dizayn - to'y, osh, tug'ilgan kun uchun tayyor",
    },
    {
        icon: "📱",
        title: "QR kod bilan ulashing",
        desc: "Bir skanerlashda taklifnoma ochiladi. Chop eting yoki ulashing",
    },
    {
        icon: "🗺",
        title: "GPS xarita",
        desc: "Google Maps, Yandex Maps — mehmon yo'lni tez topadi",
    },
    {
        icon: "💰",
        title: "Online hadya",
        desc: "Click va Payme orqali mehmonlar hadya yuborishi mumkin",
    },
    {
        icon: "📸",
        title: "Rasm galereyasi",
        desc: "Mehmonlar rasm yuklaydi — barcha suratlar bir joyda",
    },
    {
        icon: "📊",
        title: "Dashboard",
        desc: "Ko'rishlar soni, hadyalar, RSVP — barcha statistika real-time",
    },
];

const STEPS = [
    { num: "01", title: "Ro'yxatdan o'ting", desc: "Email yoki Google orqali 30 soniyada" },
    { num: "02", title: "Ma'lumot kiriting", desc: "Ism, sana, manzil — 2 daqiqada tayyor" },
    { num: "03", title: "Taklifnoma tayyor!", desc: "QR kod oling, ulashing, bayram qiling 🎉" },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {/* ─── NAVBAR ──────────────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
                <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between backdrop-blur-xl bg-[var(--color-bg)]/80">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        <span className="gradient-text">inviter</span>
                        <span className="text-white/40">.uz</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/pricing"
                            className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
                        >
                            Narxlar
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2"
                        >
                            Kirish
                        </Link>
                        <Link
                            href="/signup"
                            className="gradient-btn !py-2.5 !px-5 !text-[13px]"
                        >
                            Boshlash
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ─── HERO ────────────────────────────────────── */}
            <section className="pt-32 pb-20 px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[var(--color-secondary)] mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        1000+ taklifnoma yaratildi
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
                        Marosimingiz uchun
                        <br />
                        <span className="gradient-text">raqamli taklifnoma</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
                        To'y, osh, tug'ilgan kun — QR kod bilan ulashing,
                        xaritada yo'l ko'rsating, online hadya qabul qiling
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/signup" className="gradient-btn text-base px-8 py-4">
                            Bepul boshlash →
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-white/60 hover:text-white transition-colors text-sm underline underline-offset-4"
                        >
                            Narxlarni ko'rish
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Event Types ─────────────────────────────── */}
            <section className="py-16 px-4">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-center text-sm uppercase tracking-[4px] text-[var(--color-secondary)] mb-10">
                        Barcha marosimlar uchun
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {EVENT_TYPES.map((t) => (
                            <div
                                key={t.label}
                                className="glass rounded-2xl p-4 text-center hover:bg-white/[0.06] transition-colors cursor-default"
                            >
                                <div className="text-3xl mb-2">{t.emoji}</div>
                                <div className="text-sm font-medium text-white/90">{t.label}</div>
                                <div className="text-[11px] text-white/40 mt-0.5">{t.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ───────────────────────────────── */}
            <section className="py-20 px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Nima uchun <span className="gradient-text">inviter.uz</span>?
                        </h2>
                        <p className="text-white/50 max-w-lg mx-auto">
                            Oddiy qog'oz taklifnoma emas — zamonaviy raqamli platforma
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {FEATURES.map((f) => (
                            <div
                                key={f.title}
                                className="glass rounded-2xl p-6 hover:bg-white/[0.06] transition-all group"
                            >
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─────────────────────────── */}
            <section className="py-20 px-4 border-t border-white/5">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-14">
                        Qanday <span className="gradient-text">ishlaydi?</span>
                    </h2>
                    <div className="space-y-8">
                        {STEPS.map((s) => (
                            <div key={s.num} className="flex items-start gap-6">
                                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-[var(--color-secondary)] font-bold text-lg shrink-0">
                                    {s.num}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
                                    <p className="text-white/50">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PRICING PREVIEW ───────────────────────── */}
            <section className="py-20 px-4">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Oddiy <span className="gradient-text">narxlar</span>
                    </h2>
                    <p className="text-white/50 text-center mb-12">
                        Bepul boshlang, kerak bo'lsa PRO ga o'ting
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {/* FREE */}
                        <div className="glass rounded-3xl p-8">
                            <div className="text-sm font-medium text-white/50 mb-2">Bepul</div>
                            <div className="text-4xl font-bold mb-1">0 <span className="text-lg font-normal text-white/40">so'm</span></div>
                            <p className="text-sm text-white/40 mb-6">Doim bepul</p>
                            <ul className="space-y-3 text-sm mb-8">
                                <li className="flex items-center gap-2 text-white/70">
                                    <span className="text-green-400">✓</span> 1 ta taklifnoma
                                </li>
                                <li className="flex items-center gap-2 text-white/70">
                                    <span className="text-green-400">✓</span> 3 ta shablon
                                </li>
                                <li className="flex items-center gap-2 text-white/30">
                                    <span>✗</span> QR kod
                                </li>
                                <li className="flex items-center gap-2 text-white/30">
                                    <span>✗</span> Hadya tizimi
                                </li>
                                <li className="flex items-center gap-2 text-white/30">
                                    <span>✗</span> Rasm galereyasi
                                </li>
                            </ul>
                            <Link
                                href="/signup"
                                className="block text-center py-3 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 transition-colors text-sm font-medium"
                            >
                                Bepul boshlash
                            </Link>
                        </div>

                        {/* PRO */}
                        <div className="rounded-3xl p-8 bg-gradient-to-b from-[var(--color-secondary)]/10 to-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-secondary)] text-black text-[11px] font-bold">
                                TAVSIYA
                            </div>
                            <div className="text-sm font-medium text-[var(--color-secondary)] mb-2">PRO</div>
                            <div className="text-4xl font-bold mb-1">
                                100K <span className="text-lg font-normal text-white/40">so'm/yil</span>
                            </div>
                            <p className="text-sm text-white/40 mb-6">≈ 275 so'm/kun</p>
                            <ul className="space-y-3 text-sm mb-8">
                                <li className="flex items-center gap-2 text-white/80">
                                    <span className="text-[var(--color-secondary)]">✓</span> Cheklanmagan taklifnoma
                                </li>
                                <li className="flex items-center gap-2 text-white/80">
                                    <span className="text-[var(--color-secondary)]">✓</span> 15+ shablon
                                </li>
                                <li className="flex items-center gap-2 text-white/80">
                                    <span className="text-[var(--color-secondary)]">✓</span> QR kod
                                </li>
                                <li className="flex items-center gap-2 text-white/80">
                                    <span className="text-[var(--color-secondary)]">✓</span> Online hadya (Click/Payme)
                                </li>
                                <li className="flex items-center gap-2 text-white/80">
                                    <span className="text-[var(--color-secondary)]">✓</span> Rasm galereyasi
                                </li>
                            </ul>
                            <Link
                                href="/signup"
                                className="gradient-btn w-full justify-center !py-3 !text-sm"
                            >
                                PRO sotib olish
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA ───────────────────────────────────── */}
            <section className="py-24 px-4 border-t border-white/5">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Tayyor? <span className="gradient-text">Boshlang!</span>
                    </h2>
                    <p className="text-white/50 mb-8">
                        2 daqiqada birinchi taklifnomangizni yarating
                    </p>
                    <Link href="/signup" className="gradient-btn text-base px-10 py-4">
                        Bepul ro'yxatdan o'tish →
                    </Link>
                </div>
            </section>

            {/* ─── FOOTER ────────────────────────────────── */}
            <footer className="border-t border-white/5 py-10 px-4">
                <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-white/30">
                        © 2026 inviter.uz — Barcha huquqlar himoyalangan
                    </div>
                    <div className="flex items-center gap-6 text-sm text-white/40">
                        <Link href="/about" className="hover:text-white/70 transition-colors">
                            Biz haqimizda
                        </Link>
                        <Link href="/privacy" className="hover:text-white/70 transition-colors">
                            Maxfiylik
                        </Link>
                        <Link href="/terms" className="hover:text-white/70 transition-colors">
                            Shartlar
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

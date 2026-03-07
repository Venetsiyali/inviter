import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Narxlar",
    description: "inviter.uz narxlari — Bepul va PRO rejalar. To'y, osh, tug'ilgan kun uchun raqamli taklifnomalar.",
};

const PLANS = [
    {
        name: "Bepul",
        price: "0",
        period: "Doim bepul",
        desc: "Sinab ko'rish uchun",
        features: [
            { text: "1 ta taklifnoma", included: true },
            { text: "3 ta shablon", included: true },
            { text: "Mobil sahifa", included: true },
            { text: "QR kod", included: false },
            { text: "Google Maps", included: false },
            { text: "Online hadya (Click/Payme)", included: false },
            { text: "Rasm galereyasi", included: false },
            { text: "Dashboard statistika", included: false },
        ],
        cta: "Bepul boshlash",
        ctaLink: "/signup",
        highlight: false,
    },
    {
        name: "PRO",
        price: "100,000",
        period: "so'm / yil",
        desc: "Professional marosimlar uchun",
        features: [
            { text: "Cheklanmagan taklifnoma", included: true },
            { text: "15+ premium shablon", included: true },
            { text: "Mobil sahifa", included: true },
            { text: "QR kod + yuklab olish", included: true },
            { text: "Google Maps + Yandex Maps", included: true },
            { text: "Online hadya (Click/Payme)", included: true },
            { text: "Rasm galereyasi", included: true },
            { text: "Dashboard statistika", included: true },
        ],
        cta: "PRO sotib olish",
        ctaLink: "/signup",
        highlight: true,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {/* Navbar */}
            <nav className="border-b border-white/5">
                <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">
                        <span className="gradient-text">inviter</span>
                        <span className="text-white/40">.uz</span>
                    </Link>
                    <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">
                        Kirish
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-16 pb-10 px-4 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    Oddiy va <span className="gradient-text">shaffof narxlar</span>
                </h1>
                <p className="text-white/40 max-w-md mx-auto">
                    Bepul boshlang, kerak bo'lganda PRO ga o'ting. Yashirin to'lovlar yo'q.
                </p>
            </section>

            {/* Plans Grid */}
            <section className="px-4 pb-20">
                <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-3xl p-7 relative ${plan.highlight
                                    ? "bg-gradient-to-b from-[var(--color-secondary)]/10 to-[var(--color-secondary)]/5 border-2 border-[var(--color-secondary)]/30"
                                    : "glass"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-secondary)] text-black text-[11px] font-bold tracking-wide">
                                    ENG MASHHUR
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-sm font-semibold mb-2 ${plan.highlight ? "text-[var(--color-secondary)]" : "text-white/60"}`}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-sm text-white/40">{plan.period}</span>
                                </div>
                                <p className="text-xs text-white/30 mt-1">{plan.desc}</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f.text} className={`flex items-center gap-2.5 text-sm ${f.included ? "text-white/80" : "text-white/25"}`}>
                                        <span className={f.included
                                            ? plan.highlight ? "text-[var(--color-secondary)]" : "text-green-400"
                                            : "text-white/15"
                                        }>
                                            {f.included ? "✓" : "✗"}
                                        </span>
                                        {f.text}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.ctaLink}
                                className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${plan.highlight
                                        ? "gradient-btn w-full justify-center !rounded-xl"
                                        : "border border-white/10 text-white/70 hover:bg-white/5"
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="max-w-2xl mx-auto mt-16">
                    <h2 className="text-xl font-bold text-white text-center mb-8">Ko'p so'raladigan savollar</h2>
                    <div className="space-y-3">
                        {[
                            { q: "PRO dan bepulga qaytsa bo'ladimi?", a: "Ha, PRO muddati tugaganda avtomatik bepul rejaga tushadi. Ma'lumotlaringiz saqlanib qoladi." },
                            { q: "To'lov qanday amalga oshiriladi?", a: "Click yoki Payme orqali to'lash mumkin. To'lov xavfsiz va tez amalga oshiriladi." },
                            { q: "Nechta mehmon taklifnomani ko'rishi mumkin?", a: "Cheklov yo'q! Taklifnomangizni qancha kishi ko'rsa ham bo'ladi." },
                            { q: "Qaytarilish (refund) bormi?", a: "Ha, 7 kun ichida to'liq qaytarilish kafolatlanadi." },
                        ].map((faq) => (
                            <div key={faq.q} className="glass rounded-2xl p-5">
                                <h4 className="text-sm font-semibold text-white/90 mb-2">{faq.q}</h4>
                                <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 px-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <span className="text-xs text-white/20">© 2026 inviter.uz</span>
                    <div className="flex gap-4 text-xs text-white/30">
                        <Link href="/" className="hover:text-white/50">Bosh sahifa</Link>
                        <Link href="/privacy" className="hover:text-white/50">Maxfiylik</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Maxfiylik siyosati" };

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <nav className="border-b border-white/5">
                <div className="mx-auto max-w-3xl px-4 h-16 flex items-center">
                    <Link href="/" className="text-xl font-bold">
                        <span className="gradient-text">inviter</span><span className="text-white/40">.uz</span>
                    </Link>
                </div>
            </nav>
            <div className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-white mb-6">Maxfiylik siyosati</h1>
                <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                    <p>Oxirgi yangilanish: 2026-yil, mart</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">1. Ma'lumotlar yig'ish</h2>
                    <p>Biz foydalanuvchilardan quyidagi ma'lumotlarni yig'amiz: email, ism, telefon raqami, va taklifnoma ma'lumotlari (marosim turi, sana, manzil).</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">2. Ma'lumotlardan foydalanish</h2>
                    <p>Yig'ilgan ma'lumotlar faqat taklifnomalar yaratish va xizmat ko'rsatish maqsadida ishlatiladi. Uchinchi tomonlarga sotilmaydi.</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">3. Cookie'lar</h2>
                    <p>Biz autentifikatsiya va sessiyalarni boshqarish uchun cookie'lardan foydalanamiz.</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">4. Aloqa</h2>
                    <p>Savollar uchun: <a href="mailto:info@inviter.uz" className="text-[var(--color-secondary)]">info@inviter.uz</a></p>
                </div>
            </div>
        </div>
    );
}

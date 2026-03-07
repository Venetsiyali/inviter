import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Foydalanish shartlari" };

export default function TermsPage() {
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
                <h1 className="text-3xl font-bold text-white mb-6">Foydalanish shartlari</h1>
                <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                    <p>Oxirgi yangilanish: 2026-yil, mart</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">1. Xizmatdan foydalanish</h2>
                    <p>inviter.uz platformasidan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz.</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">2. Akkauntlar</h2>
                    <p>Har bir foydalanuvchi bitta akkaunt yaratishi mumkin. Akkaunt ma'lumotlarining xavfsizligi foydalanuvchi zimmasida.</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">3. Taqiqlangan kontent</h2>
                    <p>Platformada qonunga zid, haqoratli yoki aldov maqsadidagi kontent joylashtirish taqiqlanadi.</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">4. To'lovlar</h2>
                    <p>PRO rejaning narxi yillik 100,000 so'm. To'lov Click yoki Payme orqali amalga oshiriladi. 7 kun ichida to'liq qaytarish kafolatlanadi.</p>
                    <h2 className="text-lg font-semibold text-white !mt-6">5. Aloqa</h2>
                    <p>Savollar: <a href="mailto:info@inviter.uz" className="text-[var(--color-secondary)]">info@inviter.uz</a></p>
                </div>
            </div>
        </div>
    );
}

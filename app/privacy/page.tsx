import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
    title: "Maxfiylik siyosati | Inviter.uz",
    description: "Inviter.uz platformasining maxfiylik siyosati — shaxsiy ma'lumotlaringiz qanday himoyalanishini bilib oling.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Inviter.uz
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Bosh sahifa
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Maxfiylik siyosati</h1>
                        <p className="text-gray-500 text-sm">Oxirgi yangilanish: 2026-yil mart</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Umumiy ma&apos;lumot</h2>
                        <p>
                            Inviter.uz platformasi (bundan buyon — &quot;Platforma&quot;) foydalanuvchilarining shaxsiy
                            ma&apos;lumotlarini himoya qilishga jiddiy yondashadi. Ushbu maxfiylik siyosati sizning
                            ma&apos;lumotlaringiz qanday to&apos;planishi, ishlatilishi va himoya qilinishini tushuntiradi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Qanday ma&apos;lumotlar to&apos;planadi?</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Ro&apos;yxatdan o&apos;tish ma&apos;lumotlari:</strong> Ism, email manzil, parol (shifrlangan holda).</li>
                            <li><strong>Google akkaunt:</strong> Google orqali kirsangiz — ism, email va profil rasmi.</li>
                            <li><strong>Tadbir ma&apos;lumotlari:</strong> Taklifnomalarda ko&apos;rsatilgan ism, sana, manzil, tavsif.</li>
                            <li><strong>Texnik ma&apos;lumotlar:</strong> IP manzil, brauzer turi, qurilma turi (faqat xavfsizlik maqsadida).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Ma&apos;lumotlar qanday ishlatiladi?</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Platformaga kirish va shaxsingizni tasdiqlash uchun.</li>
                            <li>Taklifnomalar yaratish va boshqarish uchun.</li>
                            <li>Xizmat sifatini yaxshilash va xatolarni tuzatish uchun.</li>
                            <li>Sizga muhim yangiliklar va bildirishnomalar yuborish uchun.</li>
                        </ul>
                        <p className="mt-3 text-sm text-gray-500">
                            Biz sizning ma&apos;lumotlaringizni uchinchi tomonlarga sotmaymiz yoki reklamachilar bilan ulashmaymiz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Ma&apos;lumotlar xavfsizligi</h2>
                        <p>
                            Barcha parollar BCrypt algoritmi bilan shifrlangan holda saqlanadi.
                            Ma&apos;lumotlar bazasi SSL/TLS himoyasi ostida ishlaydi.
                            Foydalanuvchi sessiyalari xavfsiz cookie orqali boshqariladi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Foydalanuvchi huquqlari</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>O&apos;z shaxsiy ma&apos;lumotlaringizni ko&apos;rish va tahrirlash huquqi.</li>
                            <li>Akkauntni o&apos;chirish va barcha ma&apos;lumotlarni yo&apos;q qilishni so&apos;rash huquqi.</li>
                            <li>Ma&apos;lumotlar qayta ishlashga rozililikni bekor qilish huquqi.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Bog&apos;lanish</h2>
                        <p>
                            Maxfiylik siyosati bo&apos;yicha savollaringiz bo&apos;lsa, biz bilan bog&apos;laning:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li>📧 Email: <a href="mailto:info@inviter.uz" className="text-blue-600 hover:underline">info@inviter.uz</a></li>
                            <li>💬 Telegram: <a href="https://t.me/inviter_uz" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">@inviter_uz</a></li>
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
    title: "Foydalanish shartlari | Inviter.uz",
    description: "Inviter.uz platformasining foydalanish shartlari — platformadan foydalanish qoidalari va shartlari.",
};

export default function TermsPage() {
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
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Foydalanish shartlari</h1>
                        <p className="text-gray-500 text-sm">Oxirgi yangilanish: 2026-yil mart</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Umumiy qoidalar</h2>
                        <p>
                            Inviter.uz platformasidan (&quot;Platforma&quot;) foydalanish orqali siz ushbu foydalanish
                            shartlariga rozilik bildirasiz. Agar siz ushbu shartlarga rozi bo&apos;lmasangiz,
                            platformadan foydalanmasligingizni so&apos;raymiz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Xizmatlar tavsifi</h2>
                        <p>Inviter.uz quyidagi xizmatlarni taqdim etadi:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>To&apos;y, osh, tug&apos;ilgan kun va boshqa marosimlar uchun raqamli taklifnomalar yaratish.</li>
                            <li>Sun&apos;iy intellekt (AI) yordamida taklifnoma dizaynini generatsiya qilish.</li>
                            <li>QR kod yaratish va mehmonlarni boshqarish.</li>
                            <li>Taklifnomalarni ijtimoiy tarmoqlar orqali ulashish.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Akkaunt va ro&apos;yxatdan o&apos;tish</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Ro&apos;yxatdan o&apos;tish uchun haqiqiy email manzil talab qilinadi.</li>
                            <li>Parolingiz xavfsizligini ta&apos;minlash sizning mas&apos;uliyatingiz.</li>
                            <li>Akkauntingiz orqali amalga oshirilgan barcha harakatlar uchun siz javobgarsiz.</li>
                            <li>Biz istalgan vaqtda qoidalarni buzgan akkauntlarni to&apos;xtatish huquqini saqlab qolamiz.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Bepul va Pro rejalar</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Bepul reja:</strong> 3 tagacha taklifnoma yaratish, asosiy shablonlar, QR kod.</li>
                            <li><strong>Pro reja:</strong> Cheksiz taklifnomalar, barcha premium shablonlar, brend belgisisiz, ustuvor qo&apos;llab-quvvatlash.</li>
                            <li>Pro reja uchun to&apos;lov qaytarilmaydi (agar texnik muammo bo&apos;lmasa).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Taqiqlangan harakatlar</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Platformadan noqonuniy maqsadlarda foydalanish.</li>
                            <li>Boshqa foydalanuvchilarning akkauntlariga ruxsatsiz kirish.</li>
                            <li>Zararli kod, virus yoki spam tarqatish.</li>
                            <li>Platformaning ishlashiga xalaqit beruvchi harakatlar.</li>
                            <li>Haqoratli, g&apos;ayriaxloqiy yoki noqonuniy kontent joylashtirish.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellektual mulk</h2>
                        <p>
                            Platforma dizayni, kodi va brendi Inviter.uz jamoasiga tegishli.
                            Foydalanuvchilar o&apos;zlari yaratgan taklifnomalar kontentiga egalik huquqini saqlab qoladi.
                            AI tomonidan generatsiya qilingan dizaynlar platformada erkin foydalanish uchun beriladi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Javobgarlikni cheklash</h2>
                        <p>
                            Inviter.uz platformasi &quot;boricha&quot; asosida taqdim etiladi.
                            Biz platformaning uzluksiz ishlashini yoki xatosiz bo&apos;lishini kafolatlamaymiz.
                            AI tomonidan yaratilgan kontent uchun biz to&apos;liq javobgarlik olmaymiz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. O&apos;zgarishlar</h2>
                        <p>
                            Biz ushbu foydalanish shartlarini istalgan vaqtda o&apos;zgartirish huquqini saqlab qolamiz.
                            O&apos;zgarishlar platformada e&apos;lon qilinadi va siz davom etishingiz rozi bo&apos;lganingizni bildiradi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Bog&apos;lanish</h2>
                        <p>Foydalanish shartlari bo&apos;yicha savollaringiz bo&apos;lsa:</p>
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

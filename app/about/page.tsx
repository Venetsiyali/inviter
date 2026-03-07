import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Biz haqimizda",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <nav className="border-b border-white/5">
                <div className="mx-auto max-w-3xl px-4 h-16 flex items-center">
                    <Link href="/" className="text-xl font-bold">
                        <span className="gradient-text">inviter</span>
                        <span className="text-white/40">.uz</span>
                    </Link>
                </div>
            </nav>
            <div className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-white mb-6">Biz haqimizda</h1>
                <div className="prose prose-invert prose-sm max-w-none space-y-4 text-white/60 leading-relaxed">
                    <p><strong className="text-white">inviter.uz</strong> — O'zbekistondagi birinchi raqamli taklifnomalar platformasi.</p>
                    <p>Biz to'y, osh, tug'ilgan kun va boshqa marosimlar uchun zamonaviy, chiroyli va qulay online taklifnomalar yaratish imkonini beramiz.</p>
                    <h2 className="text-xl font-semibold text-white !mt-8">Nimalar qila olamiz?</h2>
                    <ul className="space-y-2">
                        <li>🎨 Professional dizayndagi taklifnomalar</li>
                        <li>📱 QR kod orqali tezkor ulashish</li>
                        <li>🗺 Google Maps va Yandex Maps integratsiyasi</li>
                        <li>💰 Click va Payme orqali online hadya</li>
                        <li>📸 Mehmonlar rasm galereyasi</li>
                        <li>📊 Real-time statistika</li>
                    </ul>
                    <p className="!mt-8">Savollar uchun: <a href="mailto:info@inviter.uz" className="text-[var(--color-secondary)]">info@inviter.uz</a></p>
                </div>
            </div>
        </div>
    );
}

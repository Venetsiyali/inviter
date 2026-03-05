import Link from "next/link";
import { Check, Zap, Crown, ArrowRight, Star } from "lucide-react";

const FREE_FEATURES = [
    "3 ta taklifnoma yaratish",
    "50 ta mehmon cheklovi",
    "Asosiy shablon (Minimal)",
    "QR-kod yaratish",
    "RSVP to'plash",
    "Inviter.uz brending",
];

const PRO_FEATURES = [
    "Cheksiz taklifnomalar",
    "Cheksiz mehmonlar",
    "Barcha premium shablonlar (Milliy, Zamonaviy, Hashamatli)",
    "QR-kod yaratish",
    "RSVP va tahlillar",
    "Brend belgisisiz",
    "Maxsus domen qo'llab-quvvatlash",
    "HD sifatida yuklab olish",
    "Ustuvor mijozlarga xizmat ko'rsatish",
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Inviter.uz
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Kirish</Link>
                        <Link href="/auth/signup" className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all">
                            Bepul boshlash
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-20 max-w-5xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        Narxlar
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        O'zingizga mos<br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">tarifni tanlang</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Bepul rejadan boshlang. Kerak bo'lganda PRO ga o'ting.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* FREE Plan */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100 flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-6 h-6 text-blue-600" />
                                <span className="text-lg font-semibold text-gray-700">Bepul</span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-5xl font-bold text-gray-900">$0</span>
                                <span className="text-gray-500 pb-2">/oy</span>
                            </div>
                            <p className="text-gray-600">Boshlash uchun mukammal</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {FREE_FEATURES.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-blue-600" />
                                    </div>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/auth/signup"
                            className="block w-full text-center py-4 px-6 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition-all"
                        >
                            Bepul boshlash
                        </Link>
                    </div>

                    {/* PRO Plan */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 text-white flex flex-col relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                                ENG MASHHUR
                            </span>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="w-6 h-6 text-yellow-300" />
                                <span className="text-lg font-semibold text-white/90">PRO</span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-5xl font-bold">$9</span>
                                <span className="text-white/70 pb-2">/oy</span>
                            </div>
                            <p className="text-white/80">Professional taklifnomalar uchun</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {PRO_FEATURES.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/90">
                                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/auth/signup?plan=pro"
                            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-white text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl"
                        >
                            PRO ni sinab ko'ring
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* FAQ / Note */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500">
                        Savollar bormi?{" "}
                        <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
                            Blog maqolalarimizni o'qing
                        </Link>{" "}
                        yoki biz bilan{" "}
                        <a href="mailto:info@inviter.uz" className="text-blue-600 hover:text-blue-700 font-medium">
                            bog'laning
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

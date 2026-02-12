"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Award, BookOpen, ExternalLink, Brain, Users } from "lucide-react";

// JSON-LD Schema
const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rustamjon Nasridinov",
    "jobTitle": "O'qituvchi",
    "affiliation": {
        "@type": "EducationalOrganization",
        "name": "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti",
        "alternateName": "TATU",
        "url": "https://tatu.uz"
    },
    "description": "Sun'iy intellekt (AI), VR/XR texnologiyalari va raqamli pedagogika mutaxassisi",
    "knowsAbout": ["Artificial Intelligence", "VR/XR Technologies", "Digital Pedagogy", "Mathematical Modeling"],
    "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "TATU"
    }
};

export default function AboutPage() {
    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-5xl mx-auto px-4 py-12">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span>Bosh sahifa</span>
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Loyiha Haqida
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            O&apos;zbekistondagi ilk AI yordamida taklifnoma yaratish platformasi
                        </p>
                    </motion.div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Mission Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Brain className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        Loyiha Maqsadi
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Invite.uz platformasi sun&apos;iy intellekt texnologiyalarini ta&apos;lim va real hayot
                                        ehtiyojlari bilan bog&apos;lash maqsadida yaratilgan. Loyihaning asosiy yo&apos;nalishi —
                                        foydalanuvchilarga professional va chiroyli taklifnomalarni bir necha daqiqada
                                        yaratish imkoniyatini berish orqali tadbirlarni yanada oson va samarali
                                        tashkil etishga yordam berish.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Author Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <GraduationCap className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        Muallif va Ishlab Chiquvchi
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                Rustamjon Nasridinov
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari
                                                universiteti (TATU), &quot;Kasbiy ta&apos;lim&quot; fakulteti,
                                                &quot;Axborot va ta&apos;lim texnologiyalari&quot; kafedrasi o&apos;qituvchisi
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Mutaxassislik:</h4>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                <li>Sun&apos;iy intellekt (AI) texnologiyalari</li>
                                                <li>Virtual va kengaytirilgan reallik (VR/XR)</li>
                                                <li>Raqamli pedagogika va innovatsion ta&apos;lim metodlari</li>
                                                <li>Matematik modellashtirish va ma&apos;lumotlar tahlili</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Achievements Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Award className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Yutuqlar va Ishtirok
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h3 className="font-semibold text-gray-800 mb-1">
                                                Agrobank AI500! Hackathon 2025
                                            </h3>
                                            <p className="text-gray-600">
                                                Top-50 finalistlar safida. Sun&apos;iy intellekt yordamida
                                                innovatsion yechimlar ishlab chiqish bo&apos;yicha milliy musobaqa.
                                            </p>
                                        </div>
                                        <div className="border-l-4 border-purple-500 pl-4">
                                            <h3 className="font-semibold text-gray-800 mb-1">
                                                Eco-Balance Edu XR Loyihasi
                                            </h3>
                                            <p className="text-gray-600">
                                                Ta&apos;lim va amaliy muhitni AI hamda XR texnologiyalari orqali
                                                bog&apos;lash bo&apos;yicha tajriba va tadqiqotlar.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Scientific Work Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Ilmiy Faoliyat
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Quyidagi yo&apos;nalishlarda ilmiy maqolalar va konferensiya tezislari muallifi
                                        (J.X. Djumanov bilan hammualliflikda):
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        <li>Sun&apos;iy intellekt va mashinali o&apos;rganish</li>
                                        <li>Matematik modellashtirish va optimizatsiya</li>
                                        <li>Suv resurslarini boshqarish tizimlari</li>
                                        <li>Ta&apos;limda raqamli texnologiyalar</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* External Links Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Bog&apos;lanish va Havolalar
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <a
                                            href="https://tatu.uz"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                                        >
                                            <GraduationCap className="w-6 h-6 text-blue-600" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">TATU</div>
                                                <div className="text-sm text-gray-600">Rasmiy veb-sayt</div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group opacity-50 cursor-not-allowed"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <BookOpen className="w-6 h-6 text-purple-600" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">Google Scholar</div>
                                                <div className="text-sm text-gray-600">Tez kunda</div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-400" />
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group opacity-50 cursor-not-allowed"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <Award className="w-6 h-6 text-green-600" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">ORCID</div>
                                                <div className="text-sm text-gray-600">Tez kunda</div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-400" />
                                        </a>
                                        <a
                                            href="mailto:info@inviter.uz"
                                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
                                        >
                                            <Users className="w-6 h-6 text-orange-600" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">Email</div>
                                                <div className="text-sm text-gray-600">info@inviter.uz</div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-10 text-white"
                        >
                            <h2 className="text-2xl font-bold mb-4">Texnologiyalar</h2>
                            <p className="text-blue-100 mb-6">
                                Invite.uz zamonaviy veb-texnologiyalar va sun&apos;iy intellekt yordamida ishlab chiqilgan:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {["Next.js 14", "TypeScript", "Prisma ORM", "Neon PostgreSQL",
                                    "Google Gemini AI", "Resend Email", "Tailwind CSS", "Vercel"].map((tech) => (
                                        <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                                            <div className="font-semibold">{tech}</div>
                                        </div>
                                    ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-12 text-gray-600">
                        <p>© 2026 Invite.uz. Barcha huquqlar himoyalangan.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

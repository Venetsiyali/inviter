import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-lg font-bold mb-4">Invite.uz</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            O&apos;zbekistondagi ilk AI yordamida taklifnoma yaratish platformasi.
                            Professional raqamli taklifnomalar bir necha daqiqada.
                        </p>
                        <p className="text-gray-500 text-xs">
                            Muallif: Rustamjon Nasridinov<br />
                            TATU &quot;Axborot va ta&apos;lim texnologiyalari&quot; kafedrasi o&apos;qituvchisi
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Ma&apos;lumotlar</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    Loyiha haqida
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Foydalanish shartlari
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:info@inviter.uz" className="text-gray-400 hover:text-white transition-colors">
                                    Bog&apos;lanish
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Tezkor havolalar</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors">
                                    Ro&apos;yxatdan o&apos;tish
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                                    Kirish
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    <p>© 2026 Invite.uz. Barcha huquqlar himoyalangan.</p>
                    <p className="mt-2 text-xs">
                        Built with Next.js, TypeScript, and Gemini AI
                    </p>
                </div>
            </div>
        </footer>
    );
}

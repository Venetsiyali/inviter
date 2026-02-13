import Link from "next/link";
import { BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function BlogPage() {
    // Fetch blog posts from database
    const blogPosts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        select: {
            slug: true,
            title: true,
            excerpt: true,
            category: true,
            readTime: true,
            createdAt: true,
        },
    });

    const formattedPosts = blogPosts.map((post) => ({
        ...post,
        date: new Date(post.createdAt).toLocaleDateString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Invite.uz
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Bosh sahifa
                        </Link>
                        <Link href="/auth/login" className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all">
                            Kirish
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        <BookOpen className="w-4 h-4" />
                        Blog va Maqolalar
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Taklifnoma Yaratish Bo&apos;yicha Maslahatlar
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        AI taklifnomalar, dizayn yo&apos;riqnomalari va tadbirlarni tashkil etish bo&apos;yicha foydali maqolalar
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-600">
                                        {post.category}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {new Date(post.date).toLocaleDateString('uz-UZ', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                                    >
                                        O&apos;qish
                                        <TrendingUp className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* SEO Content Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Taklifnoma Haqida Batafsil
                    </h2>
                    <div className="prose max-w-none text-gray-700">
                        <p className="mb-4">
                            <strong>Taklifnoma</strong> - bu mehmonlarni turli tadbirlarga taklif qilish uchun
                            ishlatilad igan rasmiy yoki norasmiy xabar. Zamonaviy dunyoda <strong>onlayn taklifnomalar</strong>
                            tobora ommalashib bormoqda, chunki ular tez, arzon va ekologik jihatdan xavfsizdir.
                        </p>
                        <p className="mb-4">
                            Invite.uz platformasi <strong>AI yordamida taklifnoma yaratish</strong> imkoniyatini
                            taqdim etadi. Bizning xizmatimiz orqali siz quyidagi tadbirlar uchun professional
                            raqamli taklifnomalar yaratishingiz mumkin:
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-2">
                            <li><strong>To&apos;y taklifnomasi</strong> - nikoh marosimi uchun</li>
                            <li><strong>Tug&apos;ilgan kun taklifnomasi</strong> - tug&apos;ilgan kunni nishonlash uchun</li>
                            <li><strong>Sunnat to&apos;yi taklifnomasi</strong> - o&apos;g&apos;il bolalar uchun</li>
                            <li><strong>Osh taklifnomasi</strong> - katta tadbirlar uchun</li>
                        </ul>
                        <p>
                            Bizning platformamiz yordamida siz bir necha daqiqada professional dizayn yaratib,
                            uni ijtimoiy tarmoqlar orqali ulashishingiz yoki WhatsApp, Telegram kabi
                            messenjerlar orqali yuborishingiz mumkin.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Taklifnomangizni Hoziroq Yarating!
                    </h2>
                    <p className="text-blue-100 mb-6">
                        AI yordamida professional taklifnoma yaratish uchun ro&apos;yxatdan o&apos;ting
                    </p>
                    <Link
                        href="/auth/signup"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl"
                    >
                        Bepul Boshlash
                    </Link>
                </div>
            </div>
        </div>
    );
}

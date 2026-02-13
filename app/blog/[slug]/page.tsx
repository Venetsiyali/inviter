import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { prisma } from "@/lib/db";
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true },
    });

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug, published: true },
    });

    if (!post) {
        return {
            title: "Maqola topilmadi - Invite.uz",
        };
    }

    return {
        title: `${post.title} | Invite.uz Blog`,
        description: post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            tags: post.keywords,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug, published: true },
    });

    if (!post) {
        notFound();
    }

    // Increment view count
    await prisma.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
    });

    const formattedDate = new Date(post.createdAt).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Invite.uz
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Blog
                        </Link>
                        <Link href="/auth/login" className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all">
                            Kirish
                        </Link>
                    </div>
                </div>
            </header>

            <article className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span>Barcha maqolalar</span>
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.createdAt.toISOString()}>
                                {formattedDate}
                            </time>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-600 mb-6">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{post.author}</div>
                            <div className="text-sm text-gray-600">TATU o&apos;qituvchisi</div>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <ReactMarkdown
                            className="markdown-content"
                            components={{
                                h2: ({ children }) => (
                                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {children}
                                    </p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
                                        {children}
                                    </ol>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6 bg-blue-50 py-4 rounded-r-lg">
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ children }) => (
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                        {children}
                                    </code>
                                ),
                                pre: ({ children }) => (
                                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6">
                                        {children}
                                    </pre>
                                ),
                                table: ({ children }) => (
                                    <div className="overflow-x-auto mb-6">
                                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                thead: ({ children }) => (
                                    <thead className="bg-gray-50">{children}</thead>
                                ),
                                th: ({ children }) => (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {children}
                                    </td>
                                ),
                                a: ({ href, children }) => (
                                    <Link
                                        href={href || "#"}
                                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                                    >
                                        {children}
                                    </Link>
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-bold text-gray-900">{children}</strong>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Keywords */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-600 font-medium">Kalit so&apos;zlar:</span>
                        {post.keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Taklifnomangizni hoziroq yarating!
                    </h2>
                    <p className="text-blue-100 mb-6 text-lg">
                        AI yordamida professional taklifnoma 2 daqiqada tayyor
                    </p>
                    <Link
                        href="/auth/signup"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl"
                    >
                        Bepul Boshlash
                    </Link>
                </div>
            </article>
        </div>
    );
}

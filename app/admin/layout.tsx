import { requireAdmin } from "@/lib/auth/admin";
import Link from "next/link";
import { uz } from "@/locales/uz";

/**
 * Admin Layout - Faqat ADMIN role uchun
 */
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Admin access check - role validation
    await requireAdmin();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/admin" className="text-2xl font-bold text-blue-600">
                                🔧 Admin Panel
                            </Link>
                            <nav className="flex gap-4">
                                <Link
                                    href="/admin"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                                >
                                    Foydalanuvchilar
                                </Link>
                                <Link
                                    href="/admin/events"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                                >
                                    Tadbirlar
                                </Link>
                            </nav>
                        </div>
                        <Link
                            href="/dashboard"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            ← Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            {/* Admin Content */}
            <main className="container mx-auto px-6 py-8">{children}</main>
        </div>
    );
}

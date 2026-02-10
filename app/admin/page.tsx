import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, Star } from "lucide-react";

/**
 * Admin Dashboard - Statistics Overview
 */
export default async function AdminDashboardPage() {
    await requireAdmin();

    // Fetch statistics
    const [totalUsers, premiumUsers, totalEvents, publishedEvents] =
        await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { plan: "PREMIUM" } }),
            prisma.event.count(),
            prisma.event.count({ where: { isPublished: true } }),
        ]);

    const premiumConversionRate =
        totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(1) : "0";

    const stats = [
        {
            title: "Jami Foydalanuvchilar",
            value: totalUsers,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Premium Foydalanuvchilar",
            value: premiumUsers,
            icon: Star,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
        {
            title: "Jami Tadbirlar",
            value: totalEvents,
            icon: Calendar,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Premium Konversiya",
            value: `${premiumConversionRate}%`,
            icon: TrendingUp,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Platforma statistikasi va boshqaruv paneli
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Tezkor Harakatlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                            href="/admin/users"
                            className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition text-center"
                        >
                            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Foydalanuvchilarni Boshqarish
                            </h3>
                            <p className="text-sm text-gray-600">
                                Plan o'zgartirish va ro'yxat
                            </p>
                        </a>
                        <a
                            href="/admin/events"
                            className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition text-center"
                        >
                            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Tadbirlar Ro'yxati
                            </h3>
                            <p className="text-sm text-gray-600">
                                Barcha tadbirlarni ko'rish
                            </p>
                        </a>
                        <a
                            href="/dashboard"
                            className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition text-center"
                        >
                            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Foydalanuvchi Rejimi
                            </h3>
                            <p className="text-sm text-gray-600">Dashboard'ga qaytish</p>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

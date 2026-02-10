import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminEventsPage() {
    await requireAdmin();

    // Fetch all events
    const events = await prisma.event.findMany({
        select: {
            id: true,
            title: true,
            type: true,
            slug: true,
            date: true,
            isPublished: true,
            views: true,
            createdAt: true,
            user: {
                select: {
                    email: true,
                    name: true,
                    plan: true,
                },
            },
            _count: {
                select: {
                    guests: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 50,
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Tadbirlar Ro'yxati
                </h1>
                <p className="text-gray-600">
                    Barcha foydalanuvchilar tomonidan yaratilgan tadbirlar
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Tadbirlar Jadvali ({events.length} ta)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Tadbir</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Turi</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Foydalanuvchi</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Holat</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Ko'rishlar</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Mehmonlar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{event.title}</div>
                                            <div className="text-xs text-gray-500">/{event.slug}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Badge variant="outline">{event.type}</Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm text-gray-900">{event.user.email}</div>
                                            <div className="text-xs text-gray-500">
                                                {event.user.plan === "PREMIUM" ? "👑 Premium" : "Free"}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            {event.isPublished ? (
                                                <Badge className="bg-green-500">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">Draft</Badge>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {event.views}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {event._count.guests} ta
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Loader2 } from "lucide-react";

interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
    plan: string;
    createdAt: string;
    _count: {
        events: number;
    };
}

export default function UsersManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const togglePlan = async (userId: string, currentPlan: string) => {
        setUpdating(userId);
        const newPlan = currentPlan === "FREE" ? "PREMIUM" : "FREE";

        try {
            const res = await fetch("/api/admin/update-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, plan: newPlan }),
            });

            if (res.ok) {
                // Update local state
                setUsers((prev) =>
                    prev.map((user) =>
                        user.id === userId ? { ...user, plan: newPlan } : user
                    )
                );
            }
        } catch (error) {
            console.error("Error updating plan:", error);
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Foydalanuvchilar Ro'yxati
                </h1>
                <p className="text-gray-600">
                    Barcha foydalanuvchilar va ularning plan holati
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Jami Foydalanuvchilar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Premium Foydalanuvchilar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {users.filter((u) => u.plan === "PREMIUM").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Free Foydalanuvchilar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-600">
                            {users.filter((u) => u.plan === "FREE").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Foydalanuvchilar Jadvali
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                                        Foydalanuvchi
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                                        Email
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                                        Role
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                                        Plan
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                                        Tadbirlar
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                                        Harakatlar
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">
                                                {user.name || "Noma'lum"}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.role === "ADMIN" ? (
                                                <Badge variant="destructive" className="bg-red-600">
                                                    ADMIN
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">USER</Badge>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.plan === "PREMIUM" ? (
                                                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                                    <Crown className="w-3 h-3 mr-1" />
                                                    PREMIUM
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">FREE</Badge>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {user._count.events} ta
                                        </td>
                                        <td className="py-3 px-4">
                                            <Button
                                                size="sm"
                                                variant={user.plan === "PREMIUM" ? "outline" : "default"}
                                                onClick={() => togglePlan(user.id, user.plan)}
                                                disabled={updating === user.id || user.role === "ADMIN"}
                                            >
                                                {updating === user.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : user.plan === "PREMIUM" ? (
                                                    "FREE ga o'tkazish"
                                                ) : (
                                                    "PREMIUM qilish"
                                                )}
                                            </Button>
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

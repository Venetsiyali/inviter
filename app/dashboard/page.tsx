import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import Link from "next/link";
import { uz } from "@/locales/uz";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Users,
    DollarSign,
    Eye,
    Plus,
    LogOut,
} from "lucide-react";

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile-First Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Invite.uz
                    </h1>
                    <form action="/api/auth/logout" method="POST">
                        <Button variant="ghost" size="icon">
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {uz.dashboard.welcome}, {user.name}!
                    </h2>
                    <p className="text-gray-600">{uz.dashboard.welcomeBack}</p>
                </div>

                {/* Quick Stats - Mobile Optimized Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={Calendar}
                        label={uz.dashboard.myEvents}
                        value="0"
                        color="blue"
                    />
                    <StatCard
                        icon={Users}
                        label={uz.dashboard.totalGuests}
                        value="0"
                        color="purple"
                    />
                    <StatCard
                        icon={Eye}
                        label={uz.dashboard.views}
                        value="0"
                        color="emerald"
                    />
                    <StatCard
                        icon={DollarSign}
                        label={uz.dashboard.donations}
                        value="0"
                        color="rose"
                    />
                </div>

                {/* Create Event CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {uz.dashboard.createFirst}
                    </h3>
                    <p className="text-blue-100 mb-6 max-w-md mx-auto">
                        2 daqiqada professional taklifnoma yarating
                    </p>
                    <Link href="/events/create">
                        <Button
                            size="xl"
                            className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            {uz.dashboard.createNew}
                        </Button>
                    </Link>
                </div>

                {/* Empty State */}
                <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">{uz.dashboard.noEvents}</p>
                </div>
            </main>
        </div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    color,
}: {
    icon: any;
    label: string;
    value: string;
    color: string;
}) {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-100 text-purple-600",
        emerald: "bg-emerald-100 text-emerald-600",
        rose: "bg-rose-100 text-rose-600",
    };

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {value}
            </div>
            <div className="text-xs md:text-sm text-gray-600">{label}</div>
        </div>
    );
}

import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { DashboardNav } from "@/components/dashboard-nav";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();
    if (!user) redirect("/auth/login");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/30">
            <DashboardNav userName={user.name || "Foydalanuvchi"} />
            {/* Desktop: shift content right of sidebar, Mobile: add top padding for header */}
            <div className="lg:ml-64 pt-16 lg:pt-0">
                {children}
            </div>
        </div>
    );
}

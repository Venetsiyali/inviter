import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";

/**
 * Dashboard Layout - Server Component
 * Session validation Node.js runtime da ishlaydi
 */
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server Component - Node.js runtime
    // Prisma va Lucia validation bu yerda xavfsiz
    const user = await getUser();

    if (!user) {
        // Session noto'g'ri yoki yo'q - login ga yo'naltir
        redirect("/auth/login");
    }

    // User mavjud - dashboard ko'rsatish
    return <>{children}</>;
}

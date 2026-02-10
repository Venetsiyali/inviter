import { getUser } from "./get-user";
import { redirect } from "next/navigation";

/**
 * Admin-only route protection
 * Faqat ADMIN role'ga ega foydalanuvchilar kirishi mumkin
 */
export async function requireAdmin() {
    const user = await getUser();

    if (!user) {
        redirect("/auth/login");
    }

    if (user.role !== "ADMIN") {
        // ADMIN emas - dashboard ga yo'naltir
        redirect("/dashboard");
    }

    return user;
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
    const user = await getUser();
    return user?.role === "ADMIN";
}

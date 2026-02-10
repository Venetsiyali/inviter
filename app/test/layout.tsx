import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";

/**
 * Test Pages Layout - Server Component
 * Session validation Node.js runtime da ishlaydi
 */
export default async function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server Component - Node.js runtime
    const user = await getUser();

    if (!user) {
        // Login talab qilinadi
        redirect("/auth/login?from=/test/ai");
    }

    return <>{children}</>;
}

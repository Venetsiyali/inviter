import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { uz } from "@/locales/uz";
import EventCreateForm from "@/components/EventCreateForm";

export default async function CreateEventPage() {
    const user = await getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Check if user can create events (Free users can create 1, Premium unlimited)
    // For now, we'll allow all logged-in users

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
            {/* Stars */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-20"
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Tadbir ma'lumotlari
                    </h1>
                    <p className="text-white/70 text-lg">
                        Taklifnomangizni tayyorlash uchun kerakli ma'lumotlarni kiriting
                    </p>
                </div>

                <EventCreateForm user={{
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    plan: user.plan
                }} />
            </div>
        </div>
    );
}

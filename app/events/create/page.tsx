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
        <div className="min-h-[100dvh] bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 sm:py-16 flex-1 flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                        Taklifnoma Yaratish
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base">
                        Atigi 3 qadamda orzuingizdagi dizaynni kashf eting
                    </p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <EventCreateForm user={{
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        plan: user.plan
                    }} />
                </div>
            </div>
        </div>
    );
}

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
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {uz.events.createNew}
                    </h1>
                    <p className="text-gray-600">
                        AI yordamida professional taklifnoma yarating
                    </p>
                </div>

                <EventCreateForm user={user} />
            </div>
        </div>
    );
}

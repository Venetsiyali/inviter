import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {
    CalendarDays,
    Clock,
    Settings,
    Eye,
    Users,
    Sparkles,
    Plus,
} from "lucide-react";

export default async function EventsPage() {
    const user = await getUser();
    if (!user) redirect("/auth/login");

    // Fetch all user's events from DB
    const events = await prisma.event.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            slug: true,
            date: true,
            isPublished: true,
            _count: {
                select: { guests: true }
            }
        }
    });

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Barcha Taklifnomalarim</h1>
                        <p className="text-gray-500">Siz yaratgan barcha tadbirlar tarixi va statistikasi</p>
                    </div>
                    <Link href="/dashboard/ai-create"
                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" /> Yangi yaratish
                    </Link>
                </div>

                {events.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm max-w-2xl mx-auto mt-12">
                        <div className="w-20 h-20 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="w-10 h-10 text-violet-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Sizda hali taklifnomalar yo'q</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Mehmonlaringizni chiroyli va zamonaviy raqamli taklifnoma bilan quvontiring. AI yordamida bir necha soniyada tayyor!
                        </p>
                        <Link href="/dashboard/ai-create"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:shadow-xl transition-all shadow-md"
                        >
                            <Sparkles className="w-5 h-5" />
                            Birinchi taklifnomani yaratish
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center border border-violet-100">
                                        <CalendarDays className="w-7 h-7 text-violet-600" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${event.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {event.isPublished ? 'Internetda oshkor' : 'Qoralama'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl mb-1 truncate">{event.title}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-5">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    {new Date(event.date).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </p>

                                <div className="flex items-center gap-3 mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Users className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Tashrifchilar</p>
                                        <p className="font-bold text-gray-900 leading-tight"><span className="text-lg">{event._count.guests}</span> tasdiqlangan</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <Link href={`/events/${event.id}/edit`} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-violet-50 text-gray-700 hover:text-violet-700 font-bold py-3 rounded-2xl transition-colors text-sm border border-gray-100 border-b-2">
                                        <Settings className="w-4 h-4" /> Boshqarish
                                    </Link>
                                    <Link href={`/invite/${event.slug}`} target="_blank" className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-bold py-3 rounded-2xl transition-colors text-sm border border-gray-100 border-b-2">
                                        <Eye className="w-4 h-4" /> Ochish
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

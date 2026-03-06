import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import ShareButtons from "@/components/ShareButtons";
import InvitationCard from "@/components/InvitationCard";
import { DesignConfig } from "@/lib/ai/design-generator";
import { ArrowLeft, ExternalLink, Users, Calendar, MapPin, Eye, Edit3 } from "lucide-react";

export default async function EventEditPage({
    params,
}: {
    params: { id: string };
}) {
    const user = await getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Fetch event with guest count
    const event = await prisma.event.findUnique({
        where: { id: params.id },
        include: {
            _count: {
                select: { guests: true },
            },
        },
    });

    if (!event) {
        notFound();
    }

    // Check ownership
    if (event.userId !== user.id && user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const design: DesignConfig = JSON.parse(event.designConfig as string);
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${event.slug}`;

    const formattedDate = new Date(event.date).toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    // Get RSVP stats
    const guests = await prisma.guest.findMany({
        where: { eventId: event.id },
    });

    const rsvpStats = {
        total: guests.length,
        confirmed: guests.filter((g) => g.rsvpStatus === "confirmed").length,
        declined: guests.filter((g) => g.rsvpStatus === "declined").length,
        maybe: guests.filter((g) => g.rsvpStatus === "maybe").length,
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* ====== HEADER ====== */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <Link href="/dashboard/events" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-3">
                                <ArrowLeft className="w-4 h-4 mr-1.5" /> Barcha taklifnomalar
                            </Link>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate max-w-lg">
                                    {event.title}
                                </h1>
                                <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${event.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                    {event.isPublished ? "Ommaviy" : "Qoralama"}
                                </span>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5 overflow-hidden">
                                    <Calendar className="w-4 h-4 shrink-0" />
                                    <span className="truncate">{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-1.5 overflow-hidden">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span className="truncate max-w-[200px]">{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Actions */}
                        <div className="flex items-center gap-3">
                            <a href={`/events/${event.id}/settings`}>
                                <Button variant="outline" className="h-10 border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Tahrirlash
                                </Button>
                            </a>
                            <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="h-10 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md">
                                    <Eye className="w-4 h-4 mr-2 text-violet-200" />
                                    Ko'rish
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* ===== LEFT COLUMN: RSVP & SHARING ===== */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* RSVP STATS CARDS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl"></div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Jami mehmonlar</p>
                                <p className="text-3xl font-extrabold text-gray-900">{rsvpStats.total}</p>
                                <Users className="w-12 h-12 absolute -bottom-2 -right-2 text-gray-50 opacity-50 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-2xl"></div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Kelishadi</p>
                                <p className="text-3xl font-extrabold text-green-600">{rsvpStats.confirmed}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-400 rounded-l-2xl"></div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Kelolmaydi</p>
                                <p className="text-3xl font-extrabold text-red-500">{rsvpStats.declined}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 rounded-l-2xl"></div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Aniq emas</p>
                                <p className="text-3xl font-extrabold text-yellow-500">{rsvpStats.maybe}</p>
                            </div>
                        </div>

                        {/* SHARE & LINKS */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-lg font-bold text-gray-900">Taklifnomani ulashish</h3>
                                <p className="text-sm text-gray-500">Ushbu havola orqali mehmonlaringiz taklifnomani ko'rishlari mumkin.</p>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                                            <input
                                                type="text"
                                                readOnly
                                                value={inviteUrl}
                                                className="w-full bg-transparent px-3 text-sm text-gray-700 font-medium focus:outline-none"
                                            />
                                            <Button variant="secondary" className="shrink-0 bg-white border border-gray-200 shadow-sm" onClick={() => {
                                                navigator.clipboard.writeText(inviteUrl);
                                            }}>Nusxa olish</Button>
                                        </div>
                                    </div>
                                    <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full sm:w-auto h-[46px] bg-slate-900 hover:bg-slate-800 text-white shrink-0">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Ochish
                                        </Button>
                                    </a>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-3">Tarmoqlar orqali yuborish</label>
                                    <ShareButtons
                                        url={inviteUrl}
                                        title={event.title}
                                        date={formattedDate}
                                        location={event.location || ""}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN: PREVIEW & QR ===== */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* INVITATION PREVIEW */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Dizayn ko'rinishi</h3>
                                <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full">{((design as any).style || "Avto").slice(0, 15)}</span>
                            </div>
                            <div className="p-5 flex-1 flex justify-center items-center bg-gray-50 relative">
                                <div className="absolute inset-0 pattern-opacity-10 pattern-dots text-gray-400"></div>
                                <div className="relative z-10 w-full max-w-[280px]">
                                    <InvitationCard event={JSON.parse(JSON.stringify(event))} design={design} />
                                </div>
                            </div>
                        </div>

                        {/* QR CODE */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Scan className="w-4 h-4 text-violet-600" />
                                    QR Kod
                                </h3>
                            </div>
                            <div className="p-6 flex flex-col items-center">
                                <div className="bg-white p-4 border rounded-2xl shadow-sm mb-4">
                                    <QRCodeGenerator url={inviteUrl} size={180} />
                                </div>
                                <p className="text-sm text-center text-gray-500 px-4">
                                    Skaner qilish uchun ushbu kodni chop eting yoki ekraningizda ko'rsating.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

// Just an inline local SVG icon for Scan
function Scan(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        </svg>
    )
}

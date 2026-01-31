import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ChevronRight,
    ClipboardList,
    Megaphone,
    Pill
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const updates = [
    {
        id: 1,
        title: "Prohibited List 2026",
        icon: <Pill className="h-6 w-6 text-orange-500" />,
        color: "bg-orange-50"
    },
    {
        id: 2,
        title: "TUE Process Changes",
        icon: <Megaphone className="h-6 w-6 text-blue-500" />,
        color: "bg-blue-50"
    },
    // {
    //     id: 3,
    //     title: "Standard Updates",
    //     icon: <Globe className="h-6 w-6 text-indigo-500" />,
    //     color: "bg-indigo-50"
    // },
];

const blogs = [
    {
        id: 1,
        title: "Common Unintentional Doping Risks",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 2,
        title: "Understanding the 'Speak Up!' Program",
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 3,
        title: "How to Apply for a TUE",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200&h=200"
    },
];

export default function WadaPage() {
    const navigate = useNavigate()

    return (
        // OUTER WRAPPER: Centers content on desktop, handles background
        <div className="min-h-screen w-full flex flex-col  bg-slate-100 flex items-center justify-center">
            <Header />

            {/* MOBILE CONTAINER: Constrains width to look like an app on all screens */}
            <div className="w-full max-w-md h-full bg-white shadow-2xl overflow-hidden flex flex-col relative">

                {/* 1. Header */}

                {/* Main Scrollable Content */}
                <ScrollArea className="flex-1 w-full">
                    <div className="p-4 space-y-6 pb-24">

                        {/* 2. Recent WADA Updates (Compact) */}
                        <section>
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h2 className="text-sm font-bold text-slate-900">Recent Updates</h2>
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide cursor-pointer">View All</span>
                            </div>

                            <div className="grid grid-cols-2  pb-2 ">
                                {updates.map(item => (
                                    <div key={item.id} className={` ${item.color} rounded-xl flex items-center mx-auto flex-col gap-2 p-3 relative  border border-black/5 active:scale-95 transition-transform duration-200`}>
                                        <div className="flex-1 flex items-start pt-1">
                                            <div className="bg-white p-2 rounded-lg shadow-sm ring-1 ring-black/5">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <p className="text-xs  font-bold text-slate-800 leading-tight">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Substance & Method List Card (Refined) */}
                        <section>
                            <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Substance Database</h2>
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4 items-center">
                                {/* Icon */}
                                <div className="shrink-0 h-16 w-16 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                                    <ClipboardList className="h-7 w-7 text-blue-600" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Check Compliance</h3>
                                    <p className="text-xs text-slate-500 mb-3 leading-snug">
                                        Check substances against the 2026 Prohibited List.
                                    </p>
                                    <Button onClick={() => navigate("/substance-database")} size="sm" className="h-8 px-4 rounded-full cursor-pointer bg-slate-900 hover:bg-slate-800 text-white text-[10px] uppercase font-bold tracking-wide w-full">
                                        Open Database <ChevronRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* 4. Educational Blogs (Tighter Layout) */}
                        <section className="pb-2">
                            <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Insights</h2>
                            <div className="grid gap-3">
                                {blogs.map(blog => (
                                    <div key={blog.id} className="bg-white p-2.5 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer">
                                        <img
                                            src={blog.image}
                                            alt="Blog"
                                            className="h-16 w-16 object-cover rounded-lg bg-slate-100 shrink-0"
                                        />
                                        <div className="flex-1 py-0.5 pr-2">
                                            <span className="text-[10px] font-bold text-blue-600 mb-0.5 block uppercase tracking-wider">Education</span>
                                            <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                                                {blog.title}
                                            </h3>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-300 shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </ScrollArea>

                {/* Wrapper ensures BottomNav stays inside the phone frame */}
                <div className="absolute bottom-0 left-0 right-0 z-40">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
}
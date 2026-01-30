import BottomNav from "@/components/shared/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Bell,
    Bookmark,
    ChevronRight,
    ClipboardList,
    Globe,
    Megaphone,
    Pill,
    Search
} from "lucide-react";

// --- MOCK DATA ---
const updates = [
    {
        id: 1,
        title: "New Prohibited Substances 2026",
        icon: <Pill className="h-8 w-8 text-orange-500" />,
        color: "bg-orange-50"
    },
    {
        id: 2,
        title: "Changes to TUE Process",
        icon: <Megaphone className="h-8 w-8 text-blue-500" />,
        color: "bg-blue-50"
    },
    {
        id: 3,
        title: "International Standard Updates",
        icon: <Globe className="h-8 w-8 text-indigo-500" />,
        color: "bg-indigo-50"
    },
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
    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 font-sans text-slate-900">

            {/* 1. Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-blue-500 tracking-tighter">K</span>
                    <span className="text-lg font-bold text-slate-900">-Guide</span>
                </div>

                <div className="flex-1 max-w-[200px] relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search"
                        className="h-9 pl-9 bg-slate-100 border-none rounded-full text-xs font-medium focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-slate-100 text-slate-600">
                        <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-slate-100 text-slate-600 relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                    </Button>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-65px)]">
                <div className="p-4 space-y-8">

                    {/* 2. Recent WADA Updates (Horizontal Scroll) */}
                    <section>
                        <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Recent WADA Updates</h2>
                        <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                            {updates.map(item => (
                                <div key={item.id} className={`flex-none w-36 aspect-[4/5] ${item.color} rounded-2xl flex flex-col p-4 relative overflow-hidden snap-start shadow-sm border border-black/5 active:scale-95 transition-transform duration-200`}>
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="bg-white p-3 rounded-full shadow-sm">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-800 leading-tight mt-3">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Substance & Method List Card */}
                    <section>
                        <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Substance & Method List</h2>
                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-4">
                            {/* Large Icon */}
                            <div className="shrink-0">
                                <div className="h-24 w-20 rounded-xl border-2 border-slate-100 flex flex-col items-center justify-center gap-2">
                                    <div className="h-3 w-8 bg-blue-500 rounded-b-md mb-1"></div>
                                    <ClipboardList className="h-8 w-8 text-blue-500" />
                                    <div className="space-y-1 w-10">
                                        <div className="h-1 w-full bg-slate-100 rounded-full"></div>
                                        <div className="h-1 w-3/4 bg-slate-100 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-3">
                                <ul className="space-y-1.5">
                                    {["Prohibited at all times", "Prohibited in-competition", "Substances of Abuse"].map(txt => (
                                        <li key={txt} className="text-xs font-medium text-slate-600 flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-800 shrink-0" /> {txt}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-900/10">
                                    View Full WADA List
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* 4. Educational Blogs & Insights */}
                    <section className="pb-20">
                        <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Educational Blogs & Insights</h2>
                        <div className="space-y-3">
                            {blogs.map(blog => (
                                <div key={blog.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-all">
                                    <img
                                        src={blog.image}
                                        alt="Blog"
                                        className="h-16 w-24 object-cover rounded-xl bg-slate-100"
                                    />
                                    <div className="flex-1 py-1">
                                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-2 text-blue-600">
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Read More</span>
                                            <ChevronRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </ScrollArea>

            <BottomNav />
        </div>
    );
}

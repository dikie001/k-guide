import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Camera,
    ChevronRight,
    ClipboardList,
    Droplets,
    HeartPulse,
    Move,
    ScanLine,
    Search,
    Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate()

    const handleRoute = (route: string) => {
        navigate(route)
    };

    // --- Data Configuration ---
    const tools = [
        { label: "Scan Meds", icon: <ScanLine className="h-5 w-5" />, route: "scan-dopine" },
        { label: "First Aid", icon: <HeartPulse className="h-5 w-5" />, route: "first-aid" },
        { label: "Recovery", icon: <Stethoscope className="h-5 w-5" />, route: "recovery" },
    ];

    const insights = [
        { title: "Hydration", subtitle: "Tracker", icon: <Droplets className="h-4 w-4 text-blue-500" />, route: "hydration", color: "border-blue-500" },
        { title: "Log", subtitle: "Symptoms", icon: <ClipboardList className="h-4 w-4 text-orange-500" />, route: "log-symptoms", color: "border-orange-500" },
        { title: "Stretching", subtitle: "Routine", icon: <Move className="h-4 w-4 text-emerald-500" />, route: "stretching", color: "border-emerald-500" },
    ];

    const activities = [
        { title: "Scan Medicine", time: "Scanned Today 5:25 PM", icon: <Camera className="h-4 w-4 text-blue-600" />, bg: "bg-blue-100", route: "Activity: Scan" },
        { title: "Log Symptoms", time: "Logged 3 symptoms", icon: <ClipboardList className="h-4 w-4 text-orange-600" />, bg: "bg-orange-100", route: "Activity: Log" },
    ];



    return (
        <div className="relative min-h-full bg-slate-50 font-sans text-slate-900 pb-28">

            {/* --- HEADER --- */}
            <Header />

            {/* --- SEARCH --- */}
            <div className="px-4 py-2">
                <div
                    className="relative group cursor-text active:scale-[0.99] transition-transform duration-200"
                    onClick={() => document.getElementById('search-bar')?.focus()}
                >
                    <div className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        id="search-bar"
                        placeholder="Search..."
                        className="pl-9 bg-white border-none shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] rounded-full h-10 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* --- HERO CARD --- */}
            <div className="px-4 py-2">
                <div
                    onClick={() => handleRoute('/details')}
                    className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-200 group"
                >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Athlete Readiness</p>
                    <h2 className="text-3xl font-black tracking-tight mb-3 drop-shadow-md">RACE READY</h2>
                    <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm h-8 px-4 rounded-full text-xs font-bold text-white shadow-sm border border-white/10 hover:bg-white/30 transition-colors">
                        See Details
                    </div>
                </div>
            </div>

            {/* --- TOOLS GRID --- */}
            <div className="px-4 py-3">
                {/* Section Header with Accent */}
                <div className="flex items-center gap-2 mb-4 pl-1">
                    <div className="w-1 h-4 bg-blue-600 rounded-full shadow-sm shadow-blue-200" />
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        K-Guide Tools
                    </h3>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {tools.map((tool, index) => (
                        <button
                            key={index}
                            onClick={() => handleRoute(tool.route)}
                            className="relative flex flex-col items-center cursor-pointer  shadow-lg shadow-black/20 justify-center h-28 rounded-2xl bg-white border border-slate-100  hover:shadow-xl hover:border-blue-200/60 hover:-translate-y-1 active:scale-95 transition-all duration-300 group outline-none overflow-hidden"
                        >
                            {/* Background Decoration (Subtle Shine) */}
                            <div className="absolute  inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon Container */}
                            <div className="relative p-2 mb-2 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:shadow-sm transition-all duration-300">
                                <div className="text-blue-600 group-hover:text-blue-900 group-hover:scale-110 transition-all duration-300">
                                    {tool.icon}
                                </div>
                            </div>

                            {/* Label */}
                            <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors duration-300">
                                {tool.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* --- DAILY INSIGHTS (Horizontal Scroll) --- */}
            <div className="py-2">
                <div className="px-6 flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800 ml-1">Daily Insights</h3>
                    <button
                        onClick={() => handleRoute('insights')}
                        className="text-[10px] font-bold text-slate-400 hover:text-blue-600 active:text-blue-700 transition-colors py-1 px-2 -mr-2 active:bg-slate-100 rounded"
                    >
                        View all
                    </button>
                </div>
                <ScrollArea className="w-full whitespace-nowrap px-6">
                    <div className="flex w-max space-x-3 pb-6 pl-1 pr-6 pt-1">
                        {insights.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleRoute(item.route)}
                                className={`w-28 bg-white p-3 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-slate-50 flex flex-col justify-between h-24 cursor-pointer active:scale-95 transition-all duration-300 hover:shadow-xl border-b-4 ${item.color}`}
                            >
                                <div className="leading-tight">
                                    <p className="text-xs font-bold text-slate-800">{item.title}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{item.subtitle}</p>
                                </div>
                                <div className="self-end p-1.5 bg-slate-50 rounded-full group-hover:bg-white transition-colors">
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>

            {/* --- RECENT ACTIVITIES --- */}
            <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800 ml-1">Recent Activities</h3>
                    <button
                        onClick={() => handleRoute('activities')}
                        className="text-[10px] font-bold text-slate-400 hover:text-blue-600 active:text-blue-700 transition-colors py-1 px-2 -mr-2 active:bg-slate-100 rounded"
                    >
                        View all
                    </button>
                </div>
                <div className="space-y-3">
                    {activities.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleRoute(item.route)}
                            className="flex items-center p-3 bg-white rounded-2xl border border-slate-50 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.98] hover:bg-slate-50/50 hover:shadow-md transition-all duration-200 group"
                        >
                            <div className={`p-2.5 rounded-xl mr-3 ${item.bg} shadow-sm`}>
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                                <p className="text-[10px] text-slate-400 font-bold truncate">{item.time}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- FLOATING NAVBAR  --- */}
            <BottomNav />

        </div>
    );
}
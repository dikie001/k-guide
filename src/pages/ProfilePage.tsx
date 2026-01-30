import BottomNav from "@/components/shared/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    HeartPulse,
    Settings,
    Share2,
    User,
    Zap
} from "lucide-react";
import { useState } from "react";

// --- MOCK DATA ---
const scans = [
    { id: 1, name: "Ibuprofen 400mg", result: "SAFE", date: "2h ago" },
    { id: 2, name: "Caffeine Pill", result: "SAFE", date: "Yesterday" },
    { id: 3, name: "Unknown Supp.", result: "CAUTION", date: "2 days ago" },
    { id: 4, name: "Pre-Workout", result: "SAFE", date: "3 days ago" },
    { id: 5, name: "Cold Meds", result: "BANNED", date: "1 week ago" },
    { id: 6, name: "Vitamin C", result: "SAFE", date: "1 week ago" },
];

const injuries = [
    { id: 1, title: "Ankle Sprain", date: "Oct 12, 2025", status: "Recovered" },
    { id: 2, title: "Shin Splints", date: "Sep 05, 2025", status: "Active" },
    { id: 3, title: "Runner's Knee", date: "Aug 20, 2025", status: "Recovered" },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("grid");
    console.log(activeTab)

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900">

            {/* 1. Header */}
            <div className="sticky top-0 z-30 bg-blue-50/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-blue-100/50">
                <div className="flex items-center gap-1.5">
                    <h1 className="text-lg font-bold tracking-tight">long_run</h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/50">
                        <Settings className="h-5 w-5 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/50">
                        <Share2 className="h-5 w-5 text-slate-600" />
                    </Button>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-4 space-y-6">

                    {/* 2. Profile Card */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />

                        <div className="relative flex flex-col items-center">
                            {/* Avatar with Ring */}
                            <div className="relative mb-3 group cursor-pointer">
                                <div className="h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-blue-400 to-indigo-400">
                                    <div className="h-full w-full rounded-full bg-white p-0.5">
                                        <img
                                            src="https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=200&h=200"
                                            alt="Profile"
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-1 bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border-2 border-white flex items-center gap-0.5 shadow-sm">
                                    <User className="h-2.5 w-2.5 fill-current" /> SAFE
                                </div>
                            </div>

                            <div className="flex items-center gap-1 mb-1">
                                <h2 className="text-xl font-bold">Lucy Cherono</h2>
                                <span className="text-lg">🇰🇪</span>
                            </div>
                            <p className="text-xs font-medium text-slate-500 text-center max-w-[240px] leading-relaxed mb-6">
                                Marathoner | Iten, Home of Champions 🏃🏾‍♀️💨 <br />
                                "Pain is temporary, Pride is forever"
                            </p>

                            {/* Stats Row */}
                            <div className="flex items-center justify-center gap-8 w-full mb-6">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-slate-900">87</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Scans</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100" />
                                <div className="text-center">
                                    <p className="text-lg font-bold text-slate-900">142</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Day Streak</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100" />
                                <div className="text-center">
                                    <p className="text-lg font-bold text-slate-900">Elite</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Level</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full">
                                <Button variant="outline" className="flex-1 h-9 rounded-xl text-xs font-bold border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    Edit Profile
                                </Button>
                                <Button variant="outline" className="flex-1 h-9 rounded-xl text-xs font-bold border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    Share Profile
                                </Button>
                                <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    <User className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Cycle & Training Graph Card */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                My Cycle & Training
                            </h3>
                            <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                        </div>

                        {/* Custom Graph Area (CSS/SVG Mock) */}
                        <div className="relative h-32 w-full mt-4">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                                <div className="w-full h-px bg-slate-900" />
                                <div className="w-full h-px bg-slate-900" />
                                <div className="w-full h-px bg-slate-900" />
                            </div>

                            {/* Wave Graph SVG */}
                            <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,80 C20,80 30,80 50,40 C70,0 80,60 100,65 L100,100 L0,100 Z"
                                    fill="url(#gradient)"
                                />
                                <path
                                    d="M0,80 C20,80 30,80 50,40 C70,0 80,60 100,65"
                                    fill="none"
                                    stroke="#ec4899"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                {/* Current Point */}
                                <circle cx="50" cy="40" r="3" fill="#ec4899" stroke="white" strokeWidth="2" />
                                <line x1="50" y1="40" x2="50" y2="100" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 2" />
                            </svg>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] bg-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                                Peak Phase
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="text-xs font-bold text-slate-900 mb-0.5">Day 14: Peak Phase</p>
                            <p className="text-[10px] text-slate-500 font-medium">Focus on strength & high-intensity workouts.</p>
                        </div>
                    </div>

                    {/* 4. Tab Navigation */}
                    <Tabs defaultValue="grid" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="w-full bg-slate-200/50 p-1 rounded-xl mb-4 h-11">
                            <TabsTrigger
                                value="grid"
                                className="flex-1 rounded-lg text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                            >
                                Grid (Scans)
                            </TabsTrigger>
                            <TabsTrigger
                                value="list"
                                className="flex-1 rounded-lg text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                            >
                                List (Injury Log)
                            </TabsTrigger>
                        </TabsList>

                        {/* Grid Content */}
                        <TabsContent value="grid" className="mt-0 space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                {scans.map(scan => (
                                    <div key={scan.id} className="aspect-square bg-white rounded-2xl p-2 border border-slate-100 flex flex-col items-center justify-center gap-2 shadow-sm relative overflow-hidden group">
                                        <div className={`absolute top-0 right-0 p-1.5 rounded-bl-xl ${scan.result === 'SAFE' ? 'bg-green-100 text-green-600' :
                                                scan.result === 'BANNED' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {scan.result === 'SAFE' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                                        </div>

                                        <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center">
                                            <Zap className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <p className="text-[10px] font-bold text-center leading-tight line-clamp-2">{scan.name}</p>
                                    </div>
                                ))}

                                {/* View All Button item */}
                                <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">View All</span>
                                </div>
                            </div>
                        </TabsContent>

                        {/* List Content */}
                        <TabsContent value="list" className="mt-0">
                            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                                {injuries.map((injury, i) => (
                                    <div key={injury.id} className={`p-4 flex items-center justify-between ${i !== injuries.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                                                <HeartPulse className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">{injury.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-medium">{injury.date}</p>
                                            </div>
                                        </div>

                                        <Badge variant="outline" className={`border-none ${injury.status === 'Active' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            {injury.status}
                                        </Badge>
                                    </div>
                                ))}
                                <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                                    <button className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                                        + Log New Injury
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </ScrollArea>

            <BottomNav />
        </div>
    );
}

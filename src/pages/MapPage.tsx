import BottomNav from "@/components/shared/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Baby,
    Crosshair,
    MapPin,
    Menu,
    Navigation,
    PlusSquare,
    Search,
    Tent,
    UserCircle
} from "lucide-react";

// --- MOCK DATA ---
const safetyPoints = [
    {
        id: 1,
        name: "Eldoret Sports Chemist",
        type: "Pharmacy",
        status: "Verified Safe",
        distance: "0.8 km",
        verified: true
    },
    {
        id: 2,
        name: "Iten Medical Clinic",
        type: "Clinic",
        status: "Sports Injury Specialist",
        distance: "2.4 km",
        verified: false
    },
    {
        id: 3,
        name: "Kaptagat Training Camp Medical Point",
        type: "Camp",
        status: "Restricted Access",
        distance: "12 km",
        verified: false
    },
];

export default function MapPage() {
    return (
        <div className="h-screen w-full bg-slate-100 flex items-center justify-center font-sans text-slate-900">

            {/* MOBILE CONTAINER */}
            <div className="w-full max-w-md h-full bg-slate-50 shadow-2xl overflow-hidden flex flex-col relative">

                {/* 1. Map Background Layer (Absolute) */}
                <div className="absolute inset-x-0 top-0 bottom-[40%] bg-slate-200 overflow-hidden z-0">
                    {/* Abstract Map Styling */}
                    <div className="w-full h-full opacity-60 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_Eldoret%2C_Kenya.png')] bg-cover bg-center grayscale contrast-50 brightness-110"></div>

                    {/* Map Pins (Absolute Positions) */}
                    <div className="absolute top-[30%] left-[20%] animate-bounce duration-1000">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md mb-1 border border-cyan-100">
                                <span className="text-[10px] font-bold text-cyan-800">Safe Pharmacies</span>
                            </div>
                            <MapPin className="h-8 w-8 text-cyan-500 fill-cyan-500/20 drop-shadow-lg" />
                        </div>
                    </div>

                    <div className="absolute top-[45%] right-[25%] animate-bounce duration-[1.2s]">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md mb-1 border border-emerald-100">
                                <span className="text-[10px] font-bold text-emerald-800">Sports Clinics</span>
                            </div>
                            <MapPin className="h-8 w-8 text-emerald-600 fill-emerald-600/20 drop-shadow-lg" />
                        </div>
                    </div>

                    <div className="absolute top-[55%] left-[50%] animate-bounce duration-[1.5s]">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md mb-1 border border-amber-100">
                                <span className="text-[10px] font-bold text-amber-800">Training Camps</span>
                            </div>
                            <MapPin className="h-8 w-8 text-amber-500 fill-amber-500/20 drop-shadow-lg" />
                        </div>
                    </div>

                    {/* User Location */}
                    <div className="absolute bottom-8 left-6">
                        <div className="h-4 w-4 bg-blue-500 rounded-full border-2 border-white shadow-lg ring-4 ring-blue-500/20 animate-pulse"></div>
                    </div>

                    {/* Locate Me Button */}
                    <div className="absolute bottom-6 right-6">
                        <Button size="icon" className="h-10 w-10 rounded-full bg-white text-slate-700 shadow-xl border border-slate-100 hover:bg-slate-50">
                            <Crosshair className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* 2. Top Header & Search (Floating over Map) */}
                <div className="relative z-10 px-4 pt-4 pb-2 bg-gradient-to-b from-white/90 to-transparent">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                            <span className="text-xl font-black text-blue-600 tracking-tighter">K</span>
                            <span className="text-lg font-bold text-slate-900">-Guide</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-slate-800 rounded-full hover:bg-white/50">
                                <UserCircle className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-800 rounded-full hover:bg-white/50">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative shadow-xl shadow-blue-900/5 rounded-2xl">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <Input
                            placeholder="Find a Pharmacy, Clinic, or Doctor"
                            className="h-12 pl-11 bg-white border-none rounded-2xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-500 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* 3. Bottom Sheet (Safety Network) */}
                <div className="flex-1 z-10 mt-auto bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col pt-2 pb-24 border-t border-slate-100 relative">
                    {/* Drag Handle */}
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />

                    <div className="px-5 mb-4 shrink-0">
                        <h2 className="text-lg font-bold text-slate-900 mb-3">Your Safety Network</h2>

                        {/* Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            <Badge variant="secondary" className="bg-cyan-100/50 text-cyan-700 hover:bg-cyan-100 text-xs py-1.5 px-3 whitespace-nowrap border-transparent">
                                <PlusSquare className="h-3.5 w-3.5 mr-1.5" /> Pharmacies
                            </Badge>
                            <Badge variant="outline" className="text-slate-600 hover:bg-slate-50 text-xs py-1.5 px-3 whitespace-nowrap border-slate-200">
                                <Baby className="h-3.5 w-3.5 mr-1.5" /> Sports Docs
                            </Badge>
                            <Badge variant="outline" className="text-slate-600 hover:bg-slate-50 text-xs py-1.5 px-3 whitespace-nowrap border-slate-200">
                                <Tent className="h-3.5 w-3.5 mr-1.5" /> Training Camps
                            </Badge>
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <ScrollArea className="flex-1 w-full px-5">
                        <div className="space-y-3 pb-4">
                            {safetyPoints.map(point => (
                                <div key={point.id} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1">{point.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium mb-1.5">{point.type}</p>
                                        {point.verified ? (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
                                                Verified Safe
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500">
                                                {point.status}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-[10px] font-bold text-slate-400">{point.distance}</span>
                                        <Button size="sm" className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 shadow-lg text-xs font-bold">
                                            Navigate
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-40">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
}

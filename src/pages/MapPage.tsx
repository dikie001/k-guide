import BottomNav from "@/components/shared/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Crosshair,
  Menu,
  Search,
  User
} from "lucide-react";

const LOCATIONS = [
  {
    id: 1,
    name: "Eldoret Sports Chemist",
    sub: "Eldoret Chemist",
    tag: "Verified Safe",
    tagType: "SAFE",
    distance: "1.2km",
  },
  {
    id: 2,
    name: "Iten Medical Clinic",
    sub: "Iten Medical Clinic",
    tag: "Sports Injury Specialist",
    tagType: "INFO",
    distance: "3.5km",
  },
  {
    id: 3,
    name: "Kaptagat Training Camp Medical Point",
    sub: "Kaptagat Training Camp",
    tag: "First Aid Only",
    tagType: "INFO",
    distance: "8.0km",
  },
];

const FILTERS = [
  { id: "pharmacy", label: "Pharmacies (Safe Zones)", active: true },
  { id: "docs", label: "Sports Docs", active: false },
  { id: "firstaid", label: "First Aid Points", active: false },
];

export default function MapSafetyPage() {
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      
      {/* 1. HEADER & SEARCH OVERLAY */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 pt-6 pb-4 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent -z-10 pb-20" />
        
        <div className="pointer-events-auto flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-xl">
            <span className="text-2xl font-black text-[#008CA5]">K</span>
            <span className="text-2xl font-bold text-slate-800">-Guide</span>
          </div>
          <div className="flex items-center gap-3">
             <button className="rounded-full bg-white/80 backdrop-blur-md border border-white/40 p-2.5 text-slate-700 shadow-sm active:scale-95 transition-transform">
               <User className="h-6 w-6" />
             </button>
             <button className="text-slate-800 p-1">
               <Menu className="h-8 w-8" />
             </button>
          </div>
        </div>

        <div className="pointer-events-auto relative shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] rounded-full group">
           <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-slate-500" />
           </div>
           <Input 
             placeholder="Find a Pharmacy, Clinic, or Doctor" 
             className="h-14 rounded-full border-0 bg-white/95 backdrop-blur-xl pl-12 text-[15px] font-medium text-slate-700 placeholder:text-slate-400 focus-visible:ring-0"
           />
        </div>
      </div>

      {/* 2. MAP AREA */}
      <div className="relative h-[60%] w-full bg-[#EBEBE8] overflow-hidden">
        <img 
          src="/map.png" 
          alt="Realistic Map of Eldoret"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        <button className="absolute bottom-24 right-5 z-40 rounded-full bg-white p-3.5 shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-white/50 active:scale-95 transition-transform">
           <Crosshair className="h-6 w-6 text-slate-700" />
        </button>
      </div>

      {/* 3. BOTTOM SHEET */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-white rounded-t-[2.5rem] shadow-[0_-10px_50px_rgba(0,0,0,0.15)] flex flex-col z-40">
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-200/80" />
        
        <div className="px-6 pt-5 pb-0">
           <h2 className="text-[1.35rem] font-black text-slate-900 mb-5 tracking-tight">Your Safety Network</h2>
           
           {/* Filters - Scrollbar Hidden */}
           <div className="flex gap-2 overflow-x-auto pb-5 -mx-6 px-6 scrollbar-hide snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
             {FILTERS.map((f) => (
               <button
                 key={f.id}
                 className={cn(
                   "flex-shrink-0 snap-start rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 border",
                   f.active
                     ? "bg-cyan-50 text-cyan-800 border-cyan-200 shadow-sm scale-105"
                     : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                 )}
               >
                 {f.label}
               </button>
             ))}
           </div>
        </div>

        {/* List Content - Scrollbar Hidden */}
        <ScrollArea className="flex-1 w-full px-6 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
           {/* CRITICAL: pb-40 adds enough space so items scroll clear of the nav */}
           <div className="space-y-3 pb-40">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]">
                   <div className="flex flex-col gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm leading-none">{loc.name}</h3>
                      <span className="text-xs text-slate-500 font-medium">{loc.sub}</span>
                      
                      <div className="mt-0.5">
                        {loc.tagType === 'SAFE' ? (
                          <Badge className="bg-green-100 text-green-800 border border-green-200 gap-1 pl-1.5 pr-2.5 py-0.5 h-6 text-[10px] font-extrabold shadow-none">
                             <CheckCircle2 className="h-3 w-3 fill-green-600 text-white" />
                             {loc.tag}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] py-0.5 h-6 px-2.5 font-bold shadow-none">
                             {loc.tag}
                          </Badge>
                        )}
                      </div>
                   </div>

                   <div className="flex flex-col items-end gap-3 min-w-[80px]">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Distance</span>
                      <Button className="h-9 w-full rounded-full bg-[#008CA5] text-xs font-bold hover:bg-[#007A90] shadow-sm transition-all hover:scale-105">
                        Navigate
                      </Button>
                   </div>
                </div>
              ))}
           </div>
        </ScrollArea>
      </div>

      {/* 4. BOTTOM NAV */}
      <div className="absolute bottom-0 w-full z-50 pointer-events-none">
         <div className="pointer-events-auto">
            <BottomNav />
         </div>
      </div>

    </div>
  );
}
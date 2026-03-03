import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Crosshair,
  Search
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
  {
    id: 4,
    name: "Moiben Road Dispensary",
    sub: "Public Dispensary",
    tag: "General Aid",
    tagType: "INFO",
    distance: "12.0km",
  },
];

const FILTERS = [
  { id: "pharmacy", label: "Pharmacies (Safe Zones)", active: true },
  { id: "docs", label: "Sports Docs", active: false },
  { id: "firstaid", label: "First Aid Points", active: false },
];

export default function MapSafetyPage() {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground">
      <Header />

      {/* 1. HEADER & SEARCH OVERLAY */}
      <div className="pointer-events-none absolute left-0 right-0 top-16 z-40 px-4 pb-4 pt-2">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/50 to-transparent pb-20" />


        <div className="group pointer-events-auto relative rounded-full shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)]">
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            placeholder="Find a Pharmacy, Clinic, or Doctor"
            className="h-14 rounded-full border-0 bg-card/80 pl-12 text-[15px] font-medium text-foreground placeholder:text-muted-foreground focus-visible:ring-0 backdrop-blur-xl"
          />
        </div>
      </div>

      {/* 2. MAP AREA - Fixed Height */}
      <div className="absolute inset-x-0 top-16 z-0 h-[60%] w-full bg-slate-800">
        <img
          src="/map.png"
          alt="Realistic Map of Eldoret"
          className="h-full w-full object-cover opacity-70"
        />
        <button className="absolute bottom-24 right-5 z-40 rounded-full border border-slate-600 bg-card/80 backdrop-blur p-3.5 shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-transform active:scale-95">
          <Crosshair className="h-6 w-6 text-cyan-400" />
        </button>
      </div>

      {/* 3. BOTTOM SHEET */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex h-[45%] flex-col rounded-t-[2.5rem] bg-card border-t border-slate-600/40 shadow-[0_-10px_50px_rgba(0,0,0,0.15)]">
        {/* Drag Handle */}
        <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-600/60" />

        {/* Header/Filters */}
        <div className="shrink-0 px-6 pb-0 pt-5">
          <h2 className="mb-5 text-[1.35rem] font-black tracking-tight text-foreground">
            Your Safety Network
          </h2>

          <div className="scrollbar-hide -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-5 [scrollbar-width:'none'] [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={cn(
                  "flex-shrink-0 snap-start rounded-full border px-5 py-2.5 text-xs font-bold transition-all duration-200",
                  f.active
                    ? "scale-105 border-cyan-600/50 bg-cyan-950/40 text-cyan-300 shadow-sm"
                    : "border-slate-600/40 bg-slate-700/30 text-slate-400 hover:border-slate-600/60",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex min-h-0 flex-1 flex-col">
          <ScrollArea className="h-full w-full px-6 [scrollbar-width:'none'] [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden">
            <div className="space-y-3 pb-32">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-600/40 bg-slate-700/30 p-4 shadow-sm transition-shadow hover:shadow-md active:scale-[0.99]"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold leading-none text-foreground">
                      {loc.name}
                    </h3>
                    <span className="text-xs font-medium text-muted-foreground">
                      {loc.sub}
                    </span>

                    <div className="mt-0.5">
                      {loc.tagType === "SAFE" ? (
                        <Badge className="h-6 gap-1 border border-green-700/50 bg-green-950/40 py-0.5 pl-1.5 pr-2.5 text-[10px] font-extrabold text-green-300 shadow-none">
                          <CheckCircle2 className="h-3 w-3 fill-green-500 text-foreground" />
                          {loc.tag}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="h-6 border border-slate-600/40 bg-slate-700/30 px-2.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-none"
                        >
                          {loc.tag}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex min-w-[80px] flex-col items-end gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {loc.distance}
                    </span>
                    <Button className="h-9 w-full rounded-full bg-cyan-600 text-xs font-bold shadow-sm transition-all hover:scale-105 hover:bg-cyan-500">
                      Navigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* 4. BOTTOM NAV - Fixed on top */}
      <div className="pointer-events-none absolute bottom-0 z-50 w-full">
        <div className="pointer-events-auto">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

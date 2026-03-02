import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Activity,
  Camera,
  ChevronRight,
  ClipboardList,
  Droplets,
  HeartPulse,
  Move,
  ScanLine,
  Search,
  Shield,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleRoute = (route: string) => navigate(route);

  return (
    <div className="relative min-h-full bg-background text-foreground pb-24">
      <Header />
      <div className="px-4 pt-3 pb-2">
        <div
          className="relative cursor-text"
          onClick={() => document.getElementById("search-bar")?.focus()}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id="search-bar"
            placeholder="Search features, substances..."
            className="pl-9 h-10 rounded-xl bg-card border-border/60 shadow-none text-sm focus-visible:ring-1 focus-visible:ring-primary/60 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>
      <div className="px-4 py-2">
        <div
          onClick={() => handleRoute("/wada")}
          className="relative rounded-2xl bg-card border border-border/60 p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform duration-200 overflow-hidden"
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
            <Shield className="h-28 w-28 text-foreground" />
          </div>
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Athlete Readiness
            </span>
            <h2 className="text-2xl font-black tracking-tight text-foreground mb-3">
              RACE READY
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  Performance: High
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  Clean Status
                </span>
              </div>
              <span className="text-xs font-semibold text-primary">
                View Details
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="mb-3">
          <SectionHeader title="K-Guide Tools" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => handleRoute("scan-dopine")}
            className="flex flex-col items-center justify-center gap-2 h-[88px] rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 outline-none"
          >
            <div className="p-2 rounded-xl text-primary bg-primary/10">
              <ScanLine className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground/70">
              Scan Meds
            </span>
          </button>
          <button
            onClick={() => handleRoute("first-aid")}
            className="flex flex-col items-center justify-center gap-2 h-[88px] rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 outline-none"
          >
            <div className="p-2 rounded-xl text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground/70">
              First Aid
            </span>
          </button>
          <button
            onClick={() => handleRoute("recovery")}
            className="flex flex-col items-center justify-center gap-2 h-[88px] rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 outline-none"
          >
            <div className="p-2 rounded-xl text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground/70">
              Recovery
            </span>
          </button>
        </div>
      </div>
      <div className="py-2">
        <div className="px-4 flex items-center justify-between mb-2">
          <SectionHeader title="Daily Insights" />
          <ViewAllBtn onClick={() => handleRoute("activities")} />
        </div>
        <ScrollArea className="w-full whitespace-nowrap px-4">
          <div className="flex w-max space-x-3 pb-4 pt-1 pr-4">
            <div
              onClick={() => handleRoute("hydration")}
              className="w-28 bg-card p-3 rounded-2xl border border-border/60 shadow-sm flex flex-col justify-between h-24 cursor-pointer active:scale-95 transition-all duration-200 hover:shadow-md border-b-2 border-blue-400"
            >
              <div className="leading-tight">
                <p className="text-xs font-bold text-foreground">Hydration</p>
                <p className="text-[10px] font-medium text-muted-foreground">
                  Tracker
                </p>
              </div>
              <div className="self-end p-1.5 bg-muted rounded-full">
                <Droplets className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div
              onClick={() => handleRoute("log-symptoms")}
              className="w-28 bg-card p-3 rounded-2xl border border-border/60 shadow-sm flex flex-col justify-between h-24 cursor-pointer active:scale-95 transition-all duration-200 hover:shadow-md border-b-2 border-orange-400"
            >
              <div className="leading-tight">
                <p className="text-xs font-bold text-foreground">Log</p>
                <p className="text-[10px] font-medium text-muted-foreground">
                  Symptoms
                </p>
              </div>
              <div className="self-end p-1.5 bg-muted rounded-full">
                <ClipboardList className="h-4 w-4 text-orange-500" />
              </div>
            </div>
            <div
              onClick={() => handleRoute("stretching")}
              className="w-28 bg-card p-3 rounded-2xl border border-border/60 shadow-sm flex flex-col justify-between h-24 cursor-pointer active:scale-95 transition-all duration-200 hover:shadow-md border-b-2 border-emerald-400"
            >
              <div className="leading-tight">
                <p className="text-xs font-bold text-foreground">Stretching</p>
                <p className="text-[10px] font-medium text-muted-foreground">
                  Routine
                </p>
              </div>
              <div className="self-end p-1.5 bg-muted rounded-full">
                <Move className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader title="Recent Activities" />
          <ViewAllBtn onClick={() => handleRoute("activities")} />
        </div>
        <div className="space-y-2.5">
          <div
            onClick={() => handleRoute("activities")}
            className="flex items-center p-3 bg-card rounded-2xl border border-border/60 shadow-sm cursor-pointer active:scale-[0.98] hover:shadow-md transition-all duration-200 group"
          >
            <div className="p-2.5 rounded-xl mr-3 bg-primary/10">
              <Camera className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground truncate">
                Scan Medicine
              </h4>
              <p className="text-[10px] text-muted-foreground font-medium truncate">
                Scanned Today 5:25 PM
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
          <div
            onClick={() => handleRoute("activities")}
            className="flex items-center p-3 bg-card rounded-2xl border border-border/60 shadow-sm cursor-pointer active:scale-[0.98] hover:shadow-md transition-all duration-200 group"
          >
            <div className="p-2.5 rounded-xl mr-3 bg-orange-100 dark:bg-orange-900/30">
              <ClipboardList className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground truncate">
                Log Symptoms
              </h4>
              <p className="text-[10px] text-muted-foreground font-medium truncate">
                Logged 3 symptoms
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[3px] h-4 rounded-full bg-primary shrink-0" />
      <h3 className="text-sm font-bold text-foreground tracking-tight">
        {title}
      </h3>
    </div>
  );
}

function ViewAllBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] font-bold text-primary/70 hover:text-primary transition-colors px-2 py-1 rounded -mr-2"
    >
      View all
    </button>
  );
}

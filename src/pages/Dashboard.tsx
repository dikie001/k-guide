import React from 'react';
import { 
  Bell, 
  Search, 
  Camera, 
  Plus, 
  Activity, 
  Droplets, 
  ClipboardList, 
  Move, 
  Home, 
  CheckCircle, 
  Map as MapIcon, 
  User, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Dashboard() {
  return (
    <div className="min-h-full bg-background font-sans text-foreground">
      
      {/* --- Main Content Wrapper --- */}
      <div className="flex flex-col gap-3 pb-24"> 
        
        {/* Header - Compact */}
        <header className="flex items-center justify-between px-5 pt-4 pb-0">
          <h1 className="text-xl font-bold tracking-tight text-primary">K-Guide</h1>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative hover:bg-transparent">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-[1.5px] border-background" />
          </Button>
        </header>

        {/* Search - Smaller height */}
        <div className="px-5">
          <div className="relative shadow-sm rounded-full group">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/70 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-muted/40 border-muted-foreground/10 rounded-full h-9 text-sm focus-visible:ring-blue-400 focus-visible:bg-background transition-all" 
            />
          </div>
        </div>

        {/* Hero Card - Slightly more compact */}
        <div className="px-5">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-5 text-white shadow-lg shadow-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none"></div>
            
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-90 mb-0.5">Athlete Readiness</p>
            <h2 className="text-2xl font-black tracking-tight mb-3 drop-shadow-sm">RACE READY</h2>
            <Button variant="secondary" size="sm" className="h-7 text-xs bg-white text-blue-600 hover:bg-blue-50 border-none font-bold rounded-full px-4 shadow-sm">
              See Details
            </Button>
          </div>
        </div>

        {/* Tools Grid - Smaller Cards */}
        <div className="px-5 pt-2">
          <h3 className="text-sm font-bold mb-2 text-foreground/90 ml-1">K-Guide Tools</h3>
          <div className="grid grid-cols-3 gap-2">
            <ToolCard icon={<Camera className="h-5 w-5" />} label="Scan Meds" />
            <ToolCard icon={<Plus className="h-5 w-5" />} label="First Aid" />
            <ToolCard icon={<Activity className="h-5 w-5" />} label="Recovery" />
          </div>
        </div>

        {/* Daily Health Insights - Compact Horizontal Scroll */}
        <div className="px-5 pt-3">
          <div className="flex items-center justify-between mb-2 ml-1">
            <h3 className="text-sm font-bold text-foreground/90">Daily Insights</h3>
            <Button variant="link" className="text-muted-foreground font-medium text-[10px] h-auto p-0">View all</Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap -mx-5 px-5">
            <div className="flex w-max space-x-2 pb-2">
              <InsightCard icon={<Droplets className="h-4 w-4 text-blue-500" />} title="Hydration" subtitle="Tracker" />
              <InsightCard icon={<ClipboardList className="h-4 w-4 text-orange-500" />} title="Log" subtitle="Symptoms" />
              <InsightCard icon={<Move className="h-4 w-4 text-emerald-500" />} title="Stretching" subtitle="Routine" />
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Recent Activities - Tighter List */}
        <div className="px-5 pt-1">
          <div className="flex items-center justify-between mb-2 ml-1">
            <h3 className="text-sm font-bold text-foreground/90">Recent Activities</h3>
            <Button variant="link" className="text-muted-foreground font-medium text-[10px] h-auto p-0">View all</Button>
          </div>
          <div className="space-y-2">
            <ActivityItem 
              icon={<Camera className="h-4 w-4 text-blue-600" />}
              bg="bg-blue-100 dark:bg-blue-900/30"
              title="Scan Medicine"
              time="Scanned Today 5:25 PM"
            />
            <ActivityItem 
              icon={<ClipboardList className="h-4 w-4 text-orange-600" />}
              bg="bg-orange-100 dark:bg-orange-900/30"
              title="Log Symptoms"
              time="Logged 3 symptoms"
            />
          </div>
        </div>
      </div>

      {/* --- Refined Sticky Bottom Navigation --- */}
      <div className="sticky bottom-4 z-50 w-full px-5">
        <nav className="bg-background/90 backdrop-blur-md border border-border/40 shadow-xl rounded-2xl px-1 py-2 grid grid-cols-5 gap-0 ring-1 ring-black/5">
          <NavItem icon={<Home className="h-5 w-5" />} label="Home" active />
          <NavItem icon={<CheckCircle className="h-5 w-5" />} label="WADA" />
          <NavItem icon={<MapIcon className="h-5 w-5" />} label="Map" />
          <NavItem icon={<User className="h-5 w-5" />} label="Profile" />
          <NavItem icon={<HelpCircle className="h-5 w-5" />} label="Support" />
        </nav>
      </div>

    </div>
  );
}

// --- Optimized Sub-components ---

function ToolCard({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <Card className="hover:bg-muted/50 transition-all active:scale-95 border-none shadow-sm bg-card/50 ring-1 ring-black/5 cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center p-2 text-center h-20 gap-2">
        <div className="p-2 bg-background rounded-xl text-primary shadow-sm ring-1 ring-black/5">
          {icon}
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground leading-tight">{label}</span>
      </CardContent>
    </Card>
  );
}

function InsightCard({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <Card className="w-28 border-none shadow-sm bg-card/50 ring-1 ring-black/5 rounded-xl overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors">
      <CardContent className="p-3 flex flex-col justify-between h-20">
        <div className="font-bold text-xs leading-tight text-foreground/90">
          {title} <br/> 
          <span className="text-muted-foreground font-medium text-[10px]">{subtitle}</span>
        </div>
        <div className="self-end p-1.5 bg-background rounded-full shadow-sm">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ icon, title, time, bg }: { icon: React.ReactNode, title: string, time: string, bg: string }) {
  return (
    <div className="flex items-center p-2 bg-card rounded-xl border-none shadow-sm ring-1 ring-black/5 cursor-pointer hover:bg-muted/50 transition-colors">
      <div className={`p-2 rounded-lg mr-3 ${bg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-foreground truncate">{title}</h4>
        <p className="text-[10px] text-muted-foreground font-medium truncate">{time}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center gap-0.5 group outline-none py-1 ${active ? 'text-primary' : 'text-muted-foreground/60'}`}>
      <div className={`transition-all duration-200 ${active ? 'scale-105' : 'group-hover:scale-105 group-active:scale-95'}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-medium transition-colors ${active ? 'text-primary font-bold' : 'text-muted-foreground/60'}`}>
        {label}
      </span>
    </button>
  );
}
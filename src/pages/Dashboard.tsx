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
    <div className="min-h-full bg-background font-sans">
      
      {/* --- Main Content Wrapper (padded bottom for nav) --- */}
      <div className="flex flex-col gap-2 pb-4">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-2 pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-primary">K-Guide</h1>
          <Button variant="ghost" size="icon" className="relative hover:bg-transparent">
            <Bell className="h-6 w-6 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
          </Button>
        </header>

        {/* Search */}
        <div className="px-6">
          <div className="relative shadow-sm rounded-full group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search..." 
              className="pl-9 bg-muted/40 border-muted-foreground/10 rounded-full h-10 focus-visible:ring-blue-400 focus-visible:bg-background transition-all" 
            />
          </div>
        </div>

        {/* Hero Card */}
        <div className="px-6 pt-2">
          <div className="rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 p-6 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-1">Athlete Readiness</p>
            <h2 className="text-3xl font-black tracking-tight mb-5 drop-shadow-sm">RACE READY</h2>
            <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50 border-none font-bold rounded-full px-6 h-9 shadow-sm">
              See Details
            </Button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="px-6 pt-4">
          <h3 className="text-lg font-bold mb-3 text-foreground">K-Guide Tools</h3>
          <div className="grid grid-cols-3 gap-3">
            <ToolCard icon={<Camera className="h-6 w-6" />} label="Scan Medicine" />
            <ToolCard icon={<Plus className="h-6 w-6" />} label="Injury First Aid" />
            <ToolCard icon={<Activity className="h-6 w-6" />} label="Post-Run Recovery" />
          </div>
        </div>

        {/* Daily Health Insights (Horizontal Scroll) */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">Daily Health Insights</h3>
            <Button variant="link" className="text-muted-foreground font-medium text-xs h-auto p-0">View all</Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap -mx-6 px-6 pb-2">
            <div className="flex w-max space-x-3">
              <InsightCard icon={<Droplets className="h-5 w-5 text-blue-500" />} title="Hydration" subtitle="Tracker" />
              <InsightCard icon={<ClipboardList className="h-5 w-5 text-orange-500" />} title="Log" subtitle="Symptoms" />
              <InsightCard icon={<Move className="h-5 w-5 text-emerald-500" />} title="Stretching" subtitle="Routine" />
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Recent Activities */}
        <div className="px-6 pt-2 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">Recent Activities</h3>
            <Button variant="link" className="text-muted-foreground font-medium text-xs h-auto p-0">View all</Button>
          </div>
          <div className="space-y-3">
            <ActivityItem 
              icon={<Camera className="h-5 w-5 text-blue-600" />}
              bg="bg-blue-100 dark:bg-blue-900/30"
              title="Scan Medicine"
              time="Scanned Today 5:25 PM"
            />
            <ActivityItem 
              icon={<ClipboardList className="h-5 w-5 text-orange-600" />}
              bg="bg-orange-100 dark:bg-orange-900/30"
              title="Log Symptoms"
              time="Logged 3 symptoms"
            />
          </div>
        </div>
      </div>

      {/* --- Sticky Bottom Navigation --- */}
      {/* Using sticky bottom-0 ensures it stays at the bottom of the PhoneFrame scroll area */}
      <div className="sticky bottom-0 z-50 w-full px-6 pb-4 pt-0">
        <nav className="bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-2 py-3 grid grid-cols-5 gap-1 ring-1 ring-black/5">
          <NavItem icon={<Home className="h-6 w-6" />} label="Home" active />
          <NavItem icon={<CheckCircle className="h-6 w-6" />} label="WADA" />
          <NavItem icon={<MapIcon className="h-6 w-6" />} label="Map" />
          <NavItem icon={<User className="h-6 w-6" />} label="Profile" />
          <NavItem icon={<HelpCircle className="h-6 w-6" />} label="Support" />
        </nav>
      </div>

    </div>
  );
}

// --- Sub-components ---

function ToolCard({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <Card className="hover:bg-muted/50 transition-all active:scale-95 border-none shadow-sm bg-card/50 ring-1 ring-black/5 cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center p-3 text-center h-28 gap-3">
        <div className="p-3 bg-background rounded-2xl text-primary shadow-sm ring-1 ring-black/5">
          {icon}
        </div>
        <span className="text-[11px] font-bold text-muted-foreground leading-tight">{label}</span>
      </CardContent>
    </Card>
  );
}

function InsightCard({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <Card className="w-32 border-none shadow-sm bg-card/50 ring-1 ring-black/5 rounded-2xl overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors">
      <CardContent className="p-4 flex flex-col justify-between h-28">
        <div className="font-bold text-sm leading-tight text-foreground/90">
          {title} <br/> 
          <span className="text-muted-foreground font-medium">{subtitle}</span>
        </div>
        <div className="self-end p-2 bg-background rounded-full shadow-sm">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ icon, title, time, bg }: { icon: React.ReactNode, title: string, time: string, bg: string }) {
  return (
    <div className="flex items-center p-3 bg-card rounded-2xl border-none shadow-sm ring-1 ring-black/5 cursor-pointer hover:bg-muted/50 transition-colors">
      <div className={`p-3 rounded-xl mr-4 ${bg}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground font-medium">{time}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center gap-1 group outline-none ${active ? 'text-primary' : 'text-muted-foreground'}`}>
      <div className={`transition-all duration-200 ${active ? 'scale-110' : 'group-hover:scale-110 group-active:scale-95'}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-bold transition-colors ${active ? 'text-primary' : 'text-muted-foreground/70'}`}>
        {label}
      </span>
    </button>
  );
}
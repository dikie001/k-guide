import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";

// --- TYPES & MOCK DATA ---
interface Scan {
  id: number;
  name: string;
  result: "SAFE" | "CAUTION" | "BANNED";
  date: string;
}

interface Injury {
  id: number;
  title: string;
  date: string;
  status: "Recovered" | "Active";
}

const scans: Scan[] = [
  { id: 1, name: "Ibuprofen 400mg", result: "SAFE", date: "2h ago" },
  { id: 2, name: "Caffeine Pill", result: "SAFE", date: "Yesterday" },
  { id: 3, name: "Unknown Supp.", result: "CAUTION", date: "2 days ago" },
  { id: 4, name: "Pre-Workout", result: "SAFE", date: "3 days ago" },
  { id: 5, name: "Cold Meds", result: "BANNED", date: "1 week ago" },
  { id: 6, name: "Vitamin C", result: "SAFE", date: "1 week ago" },
];

const injuries: Injury[] = [
  { id: 1, title: "Ankle Sprain", date: "Oct 12, 2025", status: "Recovered" },
  { id: 2, title: "Shin Splints", date: "Sep 05, 2025", status: "Active" },
  { id: 3, title: "Runner's Knee", date: "Aug 20, 2025", status: "Recovered" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("grid");

  console.log(activeTab);

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      {/* 1. Sticky Header */}
      <div className="sticky top-0 z-40 w-full">
        <Header />
      </div>

      {/* 2. Scrollable Main Content */}
      <ScrollArea className="flex-1 w-full">
        <div className="p-4 pb-32 space-y-6">
          {" "}
          {/* Added generous pb-32 for BottomNav clearance */}
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm">
            {/* Gradient Background */}
            <div className="absolute top-0 left-0 h-28 w-full bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="relative flex flex-col items-center pt-8 p-5">
              {/* Avatar */}
              <div className="group relative mb-3 cursor-pointer">
                <div className="h-24 w-24 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 p-0.75 shadow-lg shadow-blue-500/20">
                  <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-background bg-background">
                    <img
                      src="https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=200&h=200"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* Status Badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border-2 border-background bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                  <User className="h-3 w-3 fill-white/20" /> SAFE
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                    Lucy Cherono
                  </h2>
                  <span className="text-lg shadow-sm rounded-sm overflow-hidden">
                    🇰🇪
                  </span>
                </div>
                <p className="max-w-65 mx-auto text-xs font-medium leading-relaxed text-muted-foreground">
                  Marathoner | Iten, Home of Champions 🏃🏾‍♀️💨 <br />
                  <span className="italic text-muted-foreground/70">
                    "Pain is temporary, Pride is forever"
                  </span>
                </p>
              </div>

              {/* Stats Row */}
              <div className="mb-6 grid w-full grid-cols-3 divide-x divide-border">
                <div className="text-center">
                  <p className="text-lg font-extrabold text-foreground">87</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    Scans
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-foreground">142</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    Streak
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-foreground">
                    Elite
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    Level
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-xl border-border bg-muted/50 text-xs font-bold hover:bg-muted hover:text-foreground"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-xl border-border bg-muted/50 text-xs font-bold hover:bg-muted hover:text-foreground"
                >
                  Share
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-10 w-10 shrink-0 rounded-xl border-border bg-muted/50 hover:bg-muted hover:text-foreground"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Cycle Graph Card */}
          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                My Cycle & Training
              </h3>
              <div className="flex items-center gap-1.5 rounded-full bg-pink-500/10 px-2 py-0.5 border border-pink-500/20 dark:bg-pink-950/40 dark:border-pink-500/30">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-500" />
                <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400">
                  Active
                </span>
              </div>
            </div>

            <div className="relative h-32 w-full">
              {/* Simplified Graph Background */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03]">
                <div className="h-px w-full bg-foreground" />
                <div className="h-px w-full bg-foreground" />
                <div className="h-px w-full bg-foreground" />
              </div>

              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
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
                <circle
                  cx="50"
                  cy="40"
                  r="3"
                  fill="#ec4899"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="40"
                  x2="50"
                  y2="100"
                  stroke="#ec4899"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />
              </svg>

              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 rounded-full bg-pink-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                Peak Phase
              </div>
            </div>

            <div className="mt-2 text-center sm:text-left">
              <p className="text-xs font-bold text-foreground">
                Day 14: Strength Focus
              </p>
              <p className="text-[10px] font-medium text-muted-foreground">
                High intensity & resistance training recommended.
              </p>
            </div>
          </div>
          {/* Navigation Tabs */}
          <Tabs
            defaultValue="grid"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4 h-12 w-full rounded-2xl bg-muted p-1">
              <TabsTrigger
                value="grid"
                className="flex-1 rounded-xl py-2 text-xs font-bold transition-all data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Scan History
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex-1 rounded-xl py-2 text-xs font-bold transition-all data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Injury Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="grid"
              className="mt-0 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="grid grid-cols-3 gap-3">
                {scans.map((scan) => (
                  <div
                    key={scan.id}
                    className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-sm transition-all hover:border-border/80 hover:shadow-md"
                  >
                    <div
                      className={`absolute right-0 top-0 rounded-bl-xl p-1.5 ${
                        scan.result === "SAFE"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : scan.result === "BANNED"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400"
                            : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      }`}
                    >
                      {scan.result === "SAFE" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground transition-colors">
                      <Zap className="h-5 w-5" />
                    </div>
                    <p className="line-clamp-2 text-center text-[10px] font-bold leading-tight text-foreground/80">
                      {scan.name}
                    </p>
                  </div>
                ))}

                {/* 'View All' Button */}
                <button className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/30 p-2 transition-colors hover:bg-muted/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm">
                    <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                  </div>
                  <span className="text-[9px] font-bold uppercase text-muted-foreground/70">
                    View All
                  </span>
                </button>
              </div>
            </TabsContent>

            <TabsContent
              value="list"
              className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
                <div className="divide-y divide-border">
                  {injuries.map((injury) => (
                    <div
                      key={injury.id}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 dark:bg-red-950/40 text-red-500 dark:text-red-400">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">
                            {injury.title}
                          </h4>
                          <p className="text-[10px] font-medium text-muted-foreground/70">
                            {injury.date}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`border-0 px-2 py-0.5 text-[10px] font-bold ${
                          injury.status === "Active"
                            ? "bg-orange-500/10 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                            : "bg-green-500/10 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                        }`}
                      >
                        {injury.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-muted/30 p-3 text-center">
                  <button className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
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

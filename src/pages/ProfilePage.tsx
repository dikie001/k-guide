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

  console.log(activeTab)

  return (
    // FIX: Use h-screen with flex-col to handle mobile viewport heights correctly
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Sticky Header */}
      <div className="sticky top-0 z-40 w-full bg-slate-50/80 backdrop-blur-md">
        <Header />
      </div>

      {/* 2. Scrollable Main Content */}
      <ScrollArea className="flex-1 w-full">
        <div className="p-4 pb-32 space-y-6"> {/* Added generous pb-32 for BottomNav clearance */}
          
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
            {/* Gradient Background */}
            <div className="absolute top-0 left-0 h-28 w-full bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none" />

            <div className="relative flex flex-col items-center pt-8 p-5">
              {/* Avatar */}
              <div className="group relative mb-3 cursor-pointer">
                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-[3px] shadow-lg shadow-blue-500/20">
                  <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=200&h=200"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* Status Badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border-2 border-white bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                  <User className="h-3 w-3 fill-white/20" /> SAFE
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Lucy Cherono</h2>
                  <span className="text-lg shadow-sm rounded-sm overflow-hidden">🇰🇪</span>
                </div>
                <p className="max-w-[260px] mx-auto text-xs font-medium leading-relaxed text-slate-500">
                  Marathoner | Iten, Home of Champions 🏃🏾‍♀️💨 <br />
                  <span className="italic text-slate-400">"Pain is temporary, Pride is forever"</span>
                </p>
              </div>

              {/* Stats Row */}
              <div className="mb-6 grid w-full grid-cols-3 divide-x divide-slate-100">
                <div className="text-center">
                  <p className="text-lg font-extrabold text-slate-900">87</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scans</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-slate-900">142</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-slate-900">Elite</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Level</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex w-full gap-2">
                <Button variant="outline" className="h-10 flex-1 rounded-xl border-slate-200 bg-slate-50/50 text-xs font-bold hover:bg-slate-100 hover:text-slate-900">
                  Edit Profile
                </Button>
                <Button variant="outline" className="h-10 flex-1 rounded-xl border-slate-200 bg-slate-50/50 text-xs font-bold hover:bg-slate-100 hover:text-slate-900">
                  Share
                </Button>
                <Button size="icon" variant="outline" className="h-10 w-10 shrink-0 rounded-xl border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:text-slate-900">
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Cycle Graph Card */}
          <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                My Cycle & Training
              </h3>
              <div className="flex items-center gap-1.5 rounded-full bg-pink-50 px-2 py-0.5 border border-pink-100">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-500" />
                <span className="text-[10px] font-bold text-pink-600">Active</span>
              </div>
            </div>

            <div className="relative h-32 w-full">
               {/* Simplified Graph Background */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03]">
                <div className="h-px w-full bg-slate-900" />
                <div className="h-px w-full bg-slate-900" />
                <div className="h-px w-full bg-slate-900" />
              </div>

              <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 C20,80 30,80 50,40 C70,0 80,60 100,65 L100,100 L0,100 Z" fill="url(#gradient)" />
                <path d="M0,80 C20,80 30,80 50,40 C70,0 80,60 100,65" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="40" r="3" fill="#ec4899" stroke="white" strokeWidth="2" />
                <line x1="50" y1="40" x2="50" y2="100" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
              </svg>
              
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 rounded-full bg-pink-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                Peak Phase
              </div>
            </div>
            
            <div className="mt-2 text-center sm:text-left">
               <p className="text-xs font-bold text-slate-900">Day 14: Strength Focus</p>
               <p className="text-[10px] font-medium text-slate-500">High intensity & resistance training recommended.</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs defaultValue="grid" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4 h-12 w-full rounded-2xl bg-slate-100 p-1">
              <TabsTrigger
                value="grid"
                className="flex-1 rounded-xl py-2 text-xs font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Scan History
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex-1 rounded-xl py-2 text-xs font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Injury Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-0 animate-in fade-in zoom-in-95 duration-200">
              <div className="grid grid-cols-3 gap-3">
                {scans.map((scan) => (
                  <div key={scan.id} className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-sm transition-all hover:border-slate-200 hover:shadow-md">
                    <div className={`absolute right-0 top-0 rounded-bl-xl p-1.5 ${
                      scan.result === 'SAFE' ? 'bg-green-50 text-green-600' :
                      scan.result === 'BANNED' ? 'bg-red-50 text-red-600' : 
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {scan.result === 'SAFE' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                      <Zap className="h-5 w-5" />
                    </div>
                    <p className="line-clamp-2 text-center text-[10px] font-bold leading-tight text-slate-700">
                      {scan.name}
                    </p>
                  </div>
                ))}
                
                {/* 'View All' Button */}
                <button className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-2 transition-colors hover:bg-slate-100">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                   </div>
                   <span className="text-[9px] font-bold uppercase text-slate-400">View All</span>
                </button>
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
                <div className="divide-y divide-slate-50">
                  {injuries.map((injury) => (
                    <div key={injury.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{injury.title}</h4>
                          <p className="text-[10px] font-medium text-slate-400">{injury.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`border-0 px-2 py-0.5 text-[10px] font-bold ${
                        injury.status === 'Active' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {injury.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 bg-slate-50 p-3 text-center">
                  <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                    + Log New Injury
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </ScrollArea>

      {/* 3. Fixed Bottom Nav */}
      <div className="fixed bottom-0 z-50 w-full border-t border-slate-100 bg-white/90 backdrop-blur-lg">
         <BottomNav />
      </div>
    </div>
  );
}
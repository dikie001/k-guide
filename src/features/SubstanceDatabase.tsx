import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  ChevronRight,
  Info,
  Search
} from "lucide-react";
import { useState } from "react";

// --- TYPES & MOCK DATA (Unchanged) ---
type ComplianceStatus = "BANNED" | "CONDITIONAL" | "SAFE" | "TUE_REQUIRED";

interface Substance {
  id: string;
  name: string;
  category: string;
  code: string;
  status: ComplianceStatus;
  inComp: boolean;
  outComp: boolean;
  threshold?: string;
  lastUpdated: string;
}

const CATEGORIES = [
  { id: "ALL", label: "All" },
  { id: "S1", label: "Anabolic Agents" },
  { id: "S2", label: "Peptides" },
  { id: "S6", label: "Stimulants" },
  { id: "S9", label: "Glucocorticoids" },
];

const SUBSTANCES: Substance[] = [
  {
    id: "1",
    name: "Stanozolol",
    category: "Anabolic Steroids",
    code: "S1",
    status: "BANNED",
    inComp: true,
    outComp: true,
    lastUpdated: "Jan 2025",
  },
  {
    id: "2",
    name: "Pseudoephedrine",
    category: "Stimulants",
    code: "S6",
    status: "CONDITIONAL",
    inComp: true,
    outComp: false,
    threshold: "> 150 µg/mL",
    lastUpdated: "Nov 2024",
  },
  {
    id: "3",
    name: "Salbutamol",
    category: "Beta-2 Agonists",
    code: "S3",
    status: "TUE_REQUIRED",
    inComp: true,
    outComp: true,
    threshold: "Max 1600µg",
    lastUpdated: "Feb 2025",
  },
];

export default function SubstanceDatabasePage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900">
      {/* 1. Compact Sticky Header */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Header />
        
        <div className="px-4 pb-3 pt-1 space-y-3">
          {/* Compact Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search database..." 
              className="h-10 rounded-xl border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-slate-900 focus-visible:ring-offset-0"
            />
          </div>

          {/* Streamlined Categories (Scrollable Pills) */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "flex-shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all border",
                  activeFilter === cat.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Scrollable Content */}
      <ScrollArea className="flex-1 w-full px-4">
        <div className="pt-4 pb-24 space-y-3">
          
          <div className="flex items-center justify-between px-1 mb-2">
             <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
               {SUBSTANCES.length} Records found
             </h2>
          </div>

          {SUBSTANCES.map((item) => (
            <div 
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all active:scale-[0.99]"
            >
              {/* Card Header: Icon + Name + Badge */}
              <div className="flex gap-3 mb-3">
                {/* Status Icon Indicator */}
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  item.status === 'BANNED' ? 'bg-red-50 text-red-500' : 
                  item.status === 'SAFE' ? 'bg-green-50 text-green-500' :
                  'bg-amber-50 text-amber-500'
                )}>
                  {item.status === 'BANNED' ? <Ban className="h-5 w-5" /> : 
                   item.status === 'SAFE' ? <CheckCircle2 className="h-5 w-5" /> :
                   <Info className="h-5 w-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 truncate pr-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-mono font-bold text-slate-400">{item.code}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                        <span className="truncate max-w-[120px]">{item.category}</span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <Badge variant="outline" className={cn(
                      "h-5 border-0 px-2 text-[9px] font-extrabold uppercase tracking-wide",
                       item.status === 'BANNED' ? 'bg-red-100 text-red-600' : 
                       item.status === 'SAFE' ? 'bg-green-100 text-green-600' :
                       'bg-amber-100 text-amber-700'
                    )}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Threshold Warning (if exists) */}
              {item.threshold && (
                <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[10px] font-medium text-amber-700">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span>Threshold: {item.threshold}</span>
                </div>
              )}

              {/* Footer: Compliance Grid */}
              <div className="mt-3 flex items-center divide-x divide-slate-100 border-t border-slate-50 pt-3">
                <div className="flex flex-1 items-center justify-center gap-1.5">
                  <div className={cn("h-1.5 w-1.5 rounded-full", item.inComp ? "bg-red-500" : "bg-green-500")} />
                  <span className="text-[10px] font-medium text-slate-600">In-Comp</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-1.5">
                  <div className={cn("h-1.5 w-1.5 rounded-full", item.outComp ? "bg-red-500" : "bg-green-500")} />
                  <span className="text-[10px] font-medium text-slate-600">Out-Comp</span>
                </div>
                <div className="flex flex-1 items-center justify-end">
                   <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-300 hover:text-slate-600">
                     <ChevronRight className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        <BottomNav />
      </ScrollArea>
    </div>
  );
}
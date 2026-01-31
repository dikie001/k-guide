import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    ChevronRight,
    FileText,
    Info,
    Search,
    ShieldAlert,
    X
} from "lucide-react";
import { useMemo, useState } from "react";

// --- MOCK DATA: 2026 CHANGES ---
type ChangeType = "NEW" | "MODIFIED" | "CLARIFICATION";

interface ListChange {
  id: string;
  title: string;
  category: string; // e.g., S7. Narcotics
  type: ChangeType;
  impact: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  effectiveDate: string;
}

const CHANGE_FILTERS = [
  { id: "ALL", label: "All Updates" },
  { id: "NEW", label: "New Entries" },
  { id: "MODIFIED", label: "Modified" },
  { id: "CLARIFICATION", label: "Clarifications" },
];

const CHANGES_DATA: ListChange[] = [
  {
    id: "1",
    title: "Tramadol Inclusion",
    category: "M1. Narcotics",
    type: "NEW",
    impact: "HIGH",
    description: "Tramadol is now prohibited in-competition. Washout period updated to 24 hours prior to competition.",
    effectiveDate: "Jan 1, 2026"
  },
  {
    id: "2",
    title: "Plasma Donation Rules",
    category: "M2. Chemical & Physical",
    type: "CLARIFICATION",
    impact: "LOW",
    description: "Clarification that plasma donation by plasmapheresis performed in a registered collection center is permitted.",
    effectiveDate: "Jan 1, 2026"
  },
  {
    id: "3",
    title: "Beta-blockers in Mini-Golf",
    category: "P1. Beta-blockers",
    type: "MODIFIED",
    impact: "MEDIUM",
    description: "Mini-Golf has been removed from the list of sports where beta-blockers are prohibited.",
    effectiveDate: "Jan 1, 2026"
  },
  {
    id: "4",
    title: "Tapentadol Added",
    category: "S7. Narcotics",
    type: "NEW",
    impact: "HIGH",
    description: "Added to the monitoring program to detect potential patterns of misuse in sport.",
    effectiveDate: "Jan 1, 2026"
  },
  {
    id: "5",
    title: "Glucocorticoid Washout",
    category: "S9. Glucocorticoids",
    type: "MODIFIED",
    impact: "HIGH",
    description: "Rectal administration washout periods have been revised based on new excretion studies.",
    effectiveDate: "Jan 1, 2026"
  },
];

// --- MODAL ---
const ChangeDetailModal = ({ item, onClose }: { item: ListChange | null; onClose: () => void }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] w-full flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animate-in slide-in-from-bottom-10 bg-white p-6 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" />
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className="border-slate-200 text-slate-500">{item.category}</Badge>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h2>
        <div className="flex items-center gap-2 mb-6 text-sm text-slate-500 font-medium">
          <BookOpen className="h-4 w-4" />
          <span>Effective: {item.effectiveDate}</span>
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
          <p className="text-sm font-bold text-slate-400 uppercase text-[10px] mb-2">Change Description</p>
          <p className="text-slate-800 leading-relaxed font-medium">{item.description}</p>
        </div>

        <Button className="w-full h-12 rounded-xl text-base font-bold bg-slate-900" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default function ProhibitedListPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<ListChange | null>(null);

  const filteredData = useMemo(() => {
    return CHANGES_DATA.filter(s => activeFilter === "ALL" || s.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900">
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <Header />
        <div className="px-4 pb-4 pt-2">
          {/* Search */}
          <div className="relative mb-4 group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-1 rounded-md shadow-sm">
                <Search className="h-3.5 w-3.5 text-slate-400" />
             </div>
             <Input placeholder="Search changes..." className="h-12 rounded-2xl border-transparent bg-slate-100 pl-11 text-sm font-semibold focus:bg-white focus:border-slate-200 transition-all" />
          </div>
          
          {/* Filters (Custom Scroll) */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {CHANGE_FILTERS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "flex-shrink-0 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all border",
                  activeFilter === cat.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-md transform -translate-y-0.5"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 w-full bg-slate-50/50">
        <div className="p-4 pb-32 space-y-3">
          {filteredData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={cn(
                "group relative flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
                // Color Logic: Red for New, Blue for Modified, Amber for Clarification
                item.type === 'NEW' ? 'border-l-[6px] border-l-red-500' : 
                item.type === 'MODIFIED' ? 'border-l-[6px] border-l-blue-500' : 
                'border-l-[6px] border-l-amber-500'
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                  item.type === 'NEW' ? 'bg-red-50 text-red-600' :
                  item.type === 'MODIFIED' ? 'bg-blue-50 text-blue-600' :
                  'bg-amber-50 text-amber-600'
                )}>
                  {item.type === 'NEW' ? <ShieldAlert className="h-6 w-6" /> : 
                   item.type === 'MODIFIED' ? <FileText className="h-6 w-6" /> : <Info className="h-6 w-6" />}
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{item.title}</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{item.category.split('.')[0]}</span>
                     <span className="text-[11px] font-medium text-slate-400 truncate w-32">{item.category}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          ))}
        </div>
        <BottomNav />
      </ScrollArea>

      <ChangeDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
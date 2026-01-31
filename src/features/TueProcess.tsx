import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    Calendar,
    CheckCircle,
    ClipboardList,
    FileCheck,
    Search,
    Stethoscope,
    X
} from "lucide-react";
import { useMemo, useState } from "react";

// --- MOCK DATA: TUE UPDATES ---
type TueTag = "PROCESS" | "CHECKLIST" | "RETROACTIVE";

interface TueUpdate {
  id: string;
  title: string;
  tag: TueTag;
  date: string;
  description: string;
  actionRequired: boolean;
}

const TUE_FILTERS = [
  { id: "ALL", label: "All Updates" },
  { id: "PROCESS", label: "Process" },
  { id: "CHECKLIST", label: "Checklists" },
  { id: "RETROACTIVE", label: "Retroactive" },
];

const TUE_DATA: TueUpdate[] = [
  {
    id: "1",
    title: "Updated Asthma Checklist",
    tag: "CHECKLIST",
    date: "Revised Jan 2026",
    description: "New spirometry requirements added. FEV1 values must be recorded within 3 months of application.",
    actionRequired: true,
  },
  {
    id: "2",
    title: "Retroactive TUE Window",
    tag: "RETROACTIVE",
    date: "Policy Update",
    description: "Emergency treatment window extended to 7 days post-treatment for submission.",
    actionRequired: false,
  },
  {
    id: "3",
    title: "ADAMS 5.0 Submission",
    tag: "PROCESS",
    date: "System Update",
    description: "All documents must now be uploaded as PDF. JPEG/IMG files are no longer accepted in the portal.",
    actionRequired: true,
  },
  {
    id: "4",
    title: "ADHD Renewal Protocol",
    tag: "PROCESS",
    date: "Medical Standard",
    description: "Yearly psychiatric review is mandatory for renewals. GP letters are no longer sufficient.",
    actionRequired: true,
  },
];

// --- MODAL ---
const TueDetailModal = ({ item, onClose }: { item: TueUpdate | null; onClose: () => void }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] w-full flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animate-in slide-in-from-bottom-10 bg-white p-6 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" />
        
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-0 font-bold">
            {item.tag}
          </Badge>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h2>
        <p className="text-slate-400 font-medium text-sm mb-6 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> {item.date}
        </p>

        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 mb-6">
           <h4 className="text-indigo-900 font-bold text-sm mb-2 flex items-center gap-2">
             <ClipboardList className="h-4 w-4" /> Description
           </h4>
           <p className="text-slate-700 text-sm leading-relaxed">{item.description}</p>
        </div>

        {item.actionRequired && (
          <div className="mb-6 flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-xs font-bold">
            <CheckCircle className="h-5 w-5" />
            <span>Action Required: Review your current files.</span>
          </div>
        )}

        <Button className="w-full h-12 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-700" onClick={onClose}>
          Acknowledge
        </Button>
      </div>
    </div>
  );
};

export default function TueProcessPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<TueUpdate | null>(null);

  const filteredData = useMemo(() => {
    return TUE_DATA.filter(s => activeFilter === "ALL" || s.tag === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900">
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <Header />
        <div className="px-4 pb-4 pt-2">
          <div className="relative mb-4 group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-1 rounded-md shadow-sm">
                <Search className="h-3.5 w-3.5 text-slate-400" />
             </div>
             <Input placeholder="Search TUE updates..." className="h-12 rounded-2xl border-transparent bg-slate-100 pl-11 text-sm font-semibold focus:bg-white focus:border-slate-200 transition-all" />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {TUE_FILTERS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "flex-shrink-0 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all border",
                  activeFilter === cat.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md transform -translate-y-0.5"
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
              // THEME: Indigo/Medical
              className="group relative flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-100 border-l-[6px] border-l-indigo-500 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  {item.tag === 'CHECKLIST' ? <ClipboardList className="h-6 w-6" /> : 
                   item.tag === 'RETROACTIVE' ? <Calendar className="h-6 w-6" /> : <Stethoscope className="h-6 w-6" />}
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{item.title}</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{item.date}</span>
                     {item.actionRequired && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase">Action</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <FileCheck className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
        <BottomNav />
      </ScrollArea>

      <TueDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
import BottomNav from "@/components/shared/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Bone,
  ChevronLeft, ChevronRight, HeartPulse,
  Search,
  ShieldAlert,
  Stethoscope,
  Thermometer
} from 'lucide-react';
import React, { useState } from 'react';

// --- MOCK DATA ---
const firstAidData = [
  {
    id: 1, title: "Ankle Sprain", category: "Joints", severity: "Moderate",
    icon: <Activity className="text-orange-500" />,
    symptoms: ["Swelling", "Bruising", "Pain on weight", "Restricted motion"],
    treatment: ["R.I.C.E Protocol", "Ice 15-20 mins", "Compression wrap", "Elevate leg"],
    warning: "Seek X-ray if unable to walk >4 steps."
  },
  {
    id: 2, title: "Muscle Cramp", category: "Muscle", severity: "Mild",
    icon: <Activity className="text-yellow-500" />,
    symptoms: ["Sudden sharp pain", "Hard lump", "Muscle lock"],
    treatment: ["Stop activity", "Stretch & massage", "Apply heat/cold", "Hydrate"],
    warning: "Do not force muscle if pain is excruciating."
  },
  {
    id: 3, title: "Concussion", category: "Head Trauma", severity: "Critical",
    icon: <ShieldAlert className="text-red-600" />,
    symptoms: ["Confusion", "Dizziness", "Nausea", "Light sensitivity"],
    treatment: ["Remove from play", "Monitor condition", "Rest 24-48h", "No screens"],
    warning: "Call 911 if unconscious or vomiting."
  },
  {
    id: 4, title: "Heat Exhaustion", category: "Environmental", severity: "High",
    icon: <Thermometer className="text-red-500" />,
    symptoms: ["Heavy sweating", "Pale skin", "Dizziness", "Fainting"],
    treatment: ["Move to cool shade", "Loosen clothes", "Sip water", "Cool wet cloths"],
    warning: "Can progress to Heat Stroke (Life Threatening)."
  },
  {
    id: 5, title: "Nosebleed", category: "Trauma", severity: "Mild",
    icon: <HeartPulse className="text-red-400" />,
    symptoms: ["Nostril bleeding", "Iron taste"],
    treatment: ["Lean forward", "Pinch nose soft part", "Breathe via mouth", "Ice bridge"],
    warning: "Seek help if bleeding > 20 mins."
  },
  {
    id: 6, title: "Bone Fracture", category: "Trauma", severity: "Severe",
    icon: <Bone className="text-slate-500" />,
    symptoms: ["Deformity", "Swelling", "Grinding feel"],
    treatment: ["Immobilize/Splint", "Stop bleeding", "Ice packs", "Treat shock"],
    warning: "Do not try to realign the bone yourself."
  },
  {
    id: 7, title: "Blisters", category: "Skin", severity: "Mild",
    icon: <Activity className="text-blue-400" />,
    symptoms: ["Fluid bubble", "Pain", "Redness"],
    treatment: ["Clean area", "Cover with pad", "Don't pop"],
    warning: "If popped, apply antibiotic ointment."
  },
  {
    id: 8, title: "Dislocation", category: "Joints", severity: "Severe",
    icon: <Bone className="text-orange-600" />,
    symptoms: ["Out of place", "Intense pain", "Immovable"],
    treatment: ["Don't move joint", "Ice area", "Immobilize as found"],
    warning: "Seek medical help. Do not pop back in."
  },
  {
    id: 9, title: "Hypothermia", category: "Environmental", severity: "Critical",
    icon: <Thermometer className="text-blue-600" />,
    symptoms: ["Shivering", "Confusion", "Slurred speech"],
    treatment: ["Warm area", "Remove wet clothes", "Warm center body", "Warm drink"],
    warning: "Handle gently; rough handling risks cardiac arrest."
  },
  {
    id: 10, title: "Asthma Attack", category: "Respiratory", severity: "High",
    icon: <Activity className="text-purple-500" />,
    symptoms: ["Wheezing", "Short breath", "Chest tight"],
    treatment: ["Sit upright", "Use inhaler", "Keep calm"],
    warning: "No improvement > 15 mins? Call Emergency."
  },
  {
    id: 11, title: "Abrasion", category: "Skin", severity: "Mild",
    icon: <HeartPulse className="text-pink-500" />,
    symptoms: ["Raw skin", "Bleeding", "Stinging"],
    treatment: ["Clean debris", "Antibiotic ointment", "Non-stick bandage"],
    warning: "Watch for signs of infection."
  },
  {
    id: 12, title: "Choking", category: "Emergency", severity: "Critical",
    icon: <AlertCircle className="text-red-600" />,
    symptoms: ["Clutching throat", "Silent", "Blue lips"],
    treatment: ["5 Back blows", "5 Abdominal thrusts", "Repeat"],
    warning: "Unconscious? Start CPR."
  }
];

export default function FirstAid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInjury, setSelectedInjury] = useState<typeof firstAidData[0] | null>(null);

  const ITEMS_PER_PAGE = 8; // Increased slightly for compact grid

  // --- Filter Logic ---
  const filteredData = firstAidData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(p => p + 1);
    if (direction === 'prev' && currentPage > 1) setCurrentPage(p => p - 1);
  };

  // --- VIEW: DETAIL PAGE (No Dialogs) ---
  if (selectedInjury) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans animate-in slide-in-from-right-4 duration-300">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-100 px-4 h-14 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -ml-1 rounded-full hover:bg-zinc-100"
            onClick={() => setSelectedInjury(null)}
          >
            <ArrowLeft className="h-5 w-5 text-zinc-600" />
          </Button>
          <span className="font-bold text-sm text-zinc-900">Emergency Guide</span>
        </div>

        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="p-5 pb-20 space-y-6">
            {/* Title Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-zinc-50 rounded-lg border border-zinc-100 flex items-center justify-center">
                  {React.cloneElement(selectedInjury.icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5" })}
                </div>
                <Badge variant="outline" className={`text-[10px] px-2 py-0.5 border-none ${selectedInjury.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                  selectedInjury.severity === 'Severe' || selectedInjury.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                  {selectedInjury.severity}
                </Badge>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{selectedInjury.title}</h1>
                <p className="text-xs font-medium text-zinc-400 mt-1 uppercase tracking-wide">{selectedInjury.category}</p>
              </div>
            </div>

            {/* Critical Warning */}
            <div className="bg-red-50/80 border border-red-100 p-3 rounded-lg flex gap-3">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 font-medium leading-relaxed">{selectedInjury.warning}</p>
            </div>

            {/* Symptoms */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <Stethoscope className="h-3 w-3 text-zinc-400" /> Symptoms
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedInjury.symptoms.map((sym, i) => (
                  <div key={i} className="bg-zinc-50 border border-zinc-100/50 p-2 rounded-md text-xs font-medium text-zinc-600">
                    {sym}
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="h-3 w-3 text-zinc-400" /> Action Plan
              </h3>
              <div className="space-y-2">
                {selectedInjury.treatment.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 bg-white border border-zinc-100 rounded-lg shadow-sm">
                    <span className="flex-none flex items-center justify-center h-5 w-5 rounded-full bg-zinc-900 text-white text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-zinc-700 font-medium leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Action */}
        <div className="fixed bottom-6 left-0 right-0 left-1/2 -translate-x-1/2 max-w-80 p-4  border-zinc-100">
          <Button className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold" onClick={() => setSelectedInjury(null)}>
            Done
          </Button>
        </div>
      </div>
    );
  }

  // --- VIEW: MAIN LIST ---
  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-4 py-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-zinc-900 tracking-tight">First Aid</h1>
          <div className="h-7 w-7 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
            <HeartPulse className="h-3.5 w-3.5 text-red-500" />
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search injury..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-9 h-9 text-sm bg-zinc-50 border-zinc-200 rounded-lg focus-visible:ring-1 focus-visible:ring-zinc-900"
          />
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-4 pt-4">
        {filteredData.length === 0 ? (
          <div className="py-20 text-center opacity-40">
            <p className="text-sm font-medium text-zinc-500">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedInjury(item)}
                className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm active:scale-95 transition-transform duration-200 cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-white/50 z-0 pointer-events-none rounded-bl-3xl opacity-50 ${item.severity === 'Critical' ? 'from-red-50/50' : 'from-zinc-50/50'
                  }`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
                      {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "h-4 w-4" })}
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.severity === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-zinc-50 text-zinc-500'
                      }`}>
                      {item.severity === 'Critical' ? 'CRITICAL' : item.severity}
                    </span>
                  </div>
                  <h3 className="font-bold text-zinc-800 text-sm leading-tight mb-0.5">{item.title}</h3>
                  <p className="text-[10px] text-zinc-400 font-medium">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tiny Pagination */}
      {filteredData.length > 0 && totalPages > 1 && (
        <div className=" mx-auto flex justify-center mt-6 z-20">
          <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur text-white px-3 py-1.5 rounded-full shadow-lg shadow-zinc-900/20">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
              className="p-1 hover:text-zinc-300 disabled:opacity-30 disabled:hover:text-white transition-colors"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <span className="text-[10px] font-bold tabular-nums tracking-widest opacity-90">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
              className="p-1 hover:text-zinc-300 disabled:opacity-30 disabled:hover:text-white transition-colors"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
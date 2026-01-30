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
    Thermometer,
    X
} from 'lucide-react';
import React, { useState } from 'react';

// --- MOCK DATA DATABASE ---
const firstAidData = [
  {
    id: 1,
    title: "Ankle Sprain",
    category: "Joints",
    severity: "Moderate",
    icon: <Activity className="text-orange-500" />,
    symptoms: ["Swelling", "Bruising", "Pain when bearing weight", "Restricted range of motion"],
    treatment: [
      "R.I.C.E Protocol: Rest, Ice, Compression, Elevation.",
      "Apply ice for 15-20 minutes every 2-3 hours.",
      "Wrap with a compression bandage (not too tight).",
      "Elevate the leg above heart level."
    ],
    warning: "If unable to walk more than 4 steps, seek X-ray for fracture."
  },
  {
    id: 2,
    title: "Muscle Cramp",
    category: "Muscle",
    severity: "Mild",
    icon: <Activity className="text-yellow-500" />,
    symptoms: ["Sudden, sharp pain", "Hard lump of muscle tissue", "Inability to use muscle"],
    treatment: [
      "Stop activity immediately.",
      "Gently stretch and massage the cramping muscle.",
      "Apply heat to tight muscles, or cold to sore muscles.",
      "Hydrate with water or electrolyte drink."
    ],
    warning: "Do not force the muscle if pain is excruciating."
  },
  {
    id: 3,
    title: "Concussion",
    category: "Head Trauma",
    severity: "Critical",
    icon: <ShieldAlert className="text-red-600" />,
    symptoms: ["Headache", "Confusion", "Dizziness", "Nausea", "Sensitivity to light"],
    treatment: [
      "Remove athlete from play immediately (No return same day).",
      "Monitor for deteriorating condition.",
      "Rest typically 24-48 hours.",
      "Avoid screens and bright lights."
    ],
    warning: "Call 911 if: Loss of consciousness, repeated vomiting, or worsening headache."
  },
  {
    id: 4,
    title: "Heat Exhaustion",
    category: "Environmental",
    severity: "High",
    icon: <Thermometer className="text-red-500" />,
    symptoms: ["Heavy sweating", "Pale skin", "Muscle cramps", "Dizziness", "Fainting"],
    treatment: [
      "Move to a cool, shaded place.",
      "Loosen clothing.",
      "Sip cool water (do not chug).",
      "Apply cool wet cloths to neck and forehead."
    ],
    warning: "If not treated, can progress to Heat Stroke (Life Threatening)."
  },
  {
    id: 5,
    title: "Nosebleed",
    category: "Trauma",
    severity: "Mild",
    icon: <HeartPulse className="text-red-400" />,
    symptoms: ["Bleeding from nostril", "Iron taste in throat"],
    treatment: [
      "Sit upright and lean forward slightly (do NOT tilt head back).",
      "Pinch the soft part of the nose for 10-15 minutes.",
      "Breathe through the mouth.",
      "Apply ice pack to bridge of nose."
    ],
    warning: "Seek help if bleeding doesn't stop after 20 minutes."
  },
  {
    id: 6,
    title: "Bone Fracture",
    category: "Trauma",
    severity: "Severe",
    icon: <Bone className="text-slate-500" />,
    symptoms: ["Deformity", "Swelling", "Bruising", "Grinding sensation"],
    treatment: [
      "Immobilize the area (Splint if trained).",
      "Stop any bleeding with sterile pressure.",
      "Apply ice packs to limit swelling.",
      "Treat for shock (lay down, keep warm)."
    ],
    warning: "Do not try to realign the bone yourself."
  },
  {
    id: 7,
    title: "Blisters",
    category: "Skin",
    severity: "Mild",
    icon: <Activity className="text-blue-400" />,
    symptoms: ["Fluid-filled bubble", "Pain", "Redness"],
    treatment: [
      "Clean area with soap and water.",
      "Cover with a blister pad or donut bandage.",
      "Do not pop the blister unless necessary for drainage."
    ],
    warning: "If it pops, keep clean and apply antibiotic ointment."
  },
  {
    id: 8,
    title: "Dislocation",
    category: "Joints",
    severity: "Severe",
    icon: <Bone className="text-orange-600" />,
    symptoms: ["Visibly out of place", "Intense pain", "Immovable joint"],
    treatment: [
      "Do not move the joint.",
      "Ice the area to control swelling.",
      "Immobilize in the position found."
    ],
    warning: "Seek immediate medical attention. Do not pop back in."
  },
  {
    id: 9,
    title: "Hypothermia",
    category: "Environmental",
    severity: "Critical",
    icon: <Thermometer className="text-blue-600" />,
    symptoms: ["Shivering", "Confusion", "Slurred speech", "Slow breathing"],
    treatment: [
      "Move to warm area.",
      "Remove wet clothing.",
      "Warm the center of the body first (chest, neck, groin).",
      "Give warm (non-alcoholic) beverages."
    ],
    warning: "Handle gently; rough handling can trigger cardiac arrest."
  },
  {
    id: 10,
    title: "Asthma Attack",
    category: "Respiratory",
    severity: "High",
    icon: <Activity className="text-purple-500" />,
    symptoms: ["Wheezing", "Coughing", "Shortness of breath", "Chest tightness"],
    treatment: [
      "Sit person upright.",
      "Help them use their rescue inhaler.",
      "Keep them calm."
    ],
    warning: "If no improvement after 10 puffs or 15 mins, call Emergency Services."
  },
  {
    id: 11,
    title: "Abrasion / Road Rash",
    category: "Skin",
    severity: "Mild",
    icon: <HeartPulse className="text-pink-500" />,
    symptoms: ["Raw skin", "Bleeding", "Stinging pain"],
    treatment: [
      "Clean with water to remove debris.",
      "Apply antibiotic ointment.",
      "Cover with non-stick sterile bandage."
    ],
    warning: "Watch for signs of infection (pus, increasing redness)."
  },
  {
    id: 12,
    title: "Choking",
    category: "Emergency",
    severity: "Critical",
    icon: <AlertCircle className="text-red-600" />,
    symptoms: ["Hands clutched to throat", "Inability to talk", "Blue lips"],
    treatment: [
      "Give 5 back blows.",
      "Give 5 abdominal thrusts (Heimlich Maneuver).",
      "Repeat until object is cleared."
    ],
    warning: "If they fall unconscious, start CPR."
  }
];

export default function FirstAid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInjury, setSelectedInjury] = useState<typeof firstAidData[0] | null>(null);

  const ITEMS_PER_PAGE = 6;

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

  // --- Detail View Component (Overlay) ---
  const DetailView = ({ item, onClose }: { item: typeof firstAidData[0], onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="h-12 w-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              {React.cloneElement(item.icon as React.ReactElement, { className: "h-6 w-6" })}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="bg-slate-200 text-slate-600 text-[10px]">{item.category}</Badge>
                <Badge variant="outline" className={`text-[10px] border-none ${
                  item.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                  item.severity === 'Severe' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {item.severity}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200">
            <X className="h-5 w-5 text-slate-500" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            
            {/* Warning Box */}
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-700 text-sm mb-1">Critical Warning</h4>
                <p className="text-red-600/90 text-sm leading-relaxed">{item.warning}</p>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-blue-500" /> Symptoms
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {item.symptoms.map((sym, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600 text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    {sym}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Steps */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" /> Immediate Action
              </h3>
              <div className="space-y-3">
                {item.treatment.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-none h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-slate-900/20">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 text-sm pt-0.5 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl" onClick={onClose}>
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans pb-10">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="-ml-2 hover:bg-slate-100 rounded-full" onClick={() => console.log('Back')}>
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-lg font-bold text-slate-900">First Aid Guide</h1>
          </div>
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <HeartPulse className="h-4 w-4 text-red-500" />
          </div>
        </div>
      </header>

      {/* --- SEARCH BAR --- */}
      <div className="px-4 py-4 sticky top-14 z-20 bg-slate-50">
        <div className="relative shadow-sm shadow-slate-200/50 rounded-xl group">
          <div className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <Input 
            placeholder="Search sprain, cut, concussion..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 h-11 bg-white border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 text-base"
          />
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="px-4 pb-24">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
            <Search className="h-12 w-12 text-slate-300 mb-2" />
            <p className="text-slate-500 font-medium">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedInjury(item)}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all duration-200 cursor-pointer hover:shadow-md hover:border-blue-100 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "h-5 w-5" })}
                  </div>
                  <Badge variant="outline" className={`font-semibold border-none ${
                    item.severity === 'Critical' ? 'bg-red-50 text-red-600' :
                    item.severity === 'Severe' ? 'bg-orange-50 text-orange-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.severity}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">{item.treatment[0]}</p>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] h-5 px-2">{item.category}</Badge>
                  <span className="text-[10px] text-blue-600 font-bold ml-auto flex items-center">
                    Read Guide <ChevronRight className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- PAGINATION FOOTER --- */}
      {filteredData.length > 0 && (
        <div className="fixed bottom-8 left-0 shadow-lg shadow-black/40 w-full rounded-4xl left-1/2 -translate-x-1/2 max-w-80 bg-white border-t border-slate-100 p-4 flex items-center justify-between pb-8 z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="rounded-full px-4 h-9 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Prev
          </Button>
          
          <span className="text-xs font-bold text-slate-400">
            Page <span className="text-slate-900">{currentPage}</span> of {totalPages}
          </span>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="rounded-full px-4 h-9 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* --- OVERLAY RENDERING --- */}
      {selectedInjury && (
        <DetailView item={selectedInjury} onClose={() => setSelectedInjury(null)} />
      )}
    </div>
  );
}
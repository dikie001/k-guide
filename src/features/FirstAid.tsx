import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  AlertCircle,
  Bone,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Search,
  ShieldAlert,
  Stethoscope,
  Thermometer
} from "lucide-react";
import React, { useState } from "react";

// --- MOCK DATA ---
const firstAidData = [
  {
    id: 1,
    title: "Ankle Sprain",
    category: "Joints",
    severity: "Moderate",
    icon: <Activity className="text-white" />,
    symptoms: ["Swelling", "Bruising", "Pain on weight", "Restricted motion"],
    treatment: [
      "R.I.C.E Protocol",
      "Ice 15-20 mins",
      "Compression wrap",
      "Elevate leg",
    ],
    warning: "Seek X-ray if unable to walk >4 steps.",
    bg: "bg-orange-500",
  },
  {
    id: 2,
    title: "Muscle Cramp",
    category: "Muscle",
    severity: "Mild",
    icon: <Activity className="text-white" />,
    symptoms: ["Sudden sharp pain", "Hard lump", "Muscle lock"],
    treatment: [
      "Stop activity",
      "Stretch & massage",
      "Apply heat/cold",
      "Hydrate",
    ],
    warning: "Do not force muscle if pain is excruciating.",
    bg: "bg-yellow-500",
  },
  {
    id: 3,
    title: "Concussion",
    category: "Head Trauma",
    severity: "Critical",
    icon: <ShieldAlert className="text-white" />,
    symptoms: ["Confusion", "Dizziness", "Nausea", "Light sensitivity"],
    treatment: [
      "Remove from play",
      "Monitor condition",
      "Rest 24-48h",
      "No screens",
    ],
    warning: "Call 911 if unconscious or vomiting.",
    bg: "bg-red-600",
  },
  {
    id: 4,
    title: "Heat Exhaustion",
    category: "Environmental",
    severity: "High",
    icon: <Thermometer className="text-white" />,
    symptoms: ["Heavy sweating", "Pale skin", "Dizziness", "Fainting"],
    treatment: [
      "Move to cool shade",
      "Loosen clothes",
      "Sip water",
      "Cool wet cloths",
    ],
    warning: "Can progress to Heat Stroke (Life Threatening).",
    bg: "bg-red-500",
  },
  {
    id: 5,
    title: "Nosebleed",
    category: "Trauma",
    severity: "Mild",
    icon: <HeartPulse className="text-white" />,
    symptoms: ["Nostril bleeding", "Iron taste"],
    treatment: [
      "Lean forward",
      "Pinch nose soft part",
      "Breathe via mouth",
      "Ice bridge",
    ],
    warning: "Seek help if bleeding > 20 mins.",
    bg: "bg-rose-500",
  },
  {
    id: 6,
    title: "Bone Fracture",
    category: "Trauma",
    severity: "Severe",
    icon: <Bone className="text-white" />,
    symptoms: ["Deformity", "Swelling", "Grinding feel"],
    treatment: [
      "Immobilize/Splint",
      "Stop bleeding",
      "Ice packs",
      "Treat shock",
    ],
    warning: "Do not try to realign the bone yourself.",
    bg: "bg-slate-500",
  },
  {
    id: 7,
    title: "Blisters",
    category: "Skin",
    severity: "Mild",
    icon: <Activity className="text-white" />,
    symptoms: ["Fluid bubble", "Pain", "Redness"],
    treatment: ["Clean area", "Cover with pad", "Don't pop"],
    warning: "If popped, apply antibiotic ointment.",
    bg: "bg-blue-400",
  },
  {
    id: 8,
    title: "Dislocation",
    category: "Joints",
    severity: "Severe",
    icon: <Bone className="text-white" />,
    symptoms: ["Out of place", "Intense pain", "Immovable"],
    treatment: ["Don't move joint", "Ice area", "Immobilize as found"],
    warning: "Seek medical help. Do not pop back in.",
    bg: "bg-orange-600",
  },
  {
    id: 9,
    title: "Hypothermia",
    category: "Environmental",
    severity: "Critical",
    icon: <Thermometer className="text-white" />,
    symptoms: ["Shivering", "Confusion", "Slurred speech"],
    treatment: [
      "Warm area",
      "Remove wet clothes",
      "Warm center body",
      "Warm drink",
    ],
    warning: "Handle gently; rough handling risks cardiac arrest.",
    bg: "bg-blue-600",
  },
  {
    id: 10,
    title: "Asthma Attack",
    category: "Respiratory",
    severity: "High",
    icon: <Activity className="text-white" />,
    symptoms: ["Wheezing", "Short breath", "Chest tight"],
    treatment: ["Sit upright", "Use inhaler", "Keep calm"],
    warning: "No improvement > 15 mins? Call Emergency.",
    bg: "bg-purple-500",
  },
  {
    id: 11,
    title: "Abrasion",
    category: "Skin",
    severity: "Mild",
    icon: <HeartPulse className="text-white" />,
    symptoms: ["Raw skin", "Bleeding", "Stinging"],
    treatment: ["Clean debris", "Antibiotic ointment", "Non-stick bandage"],
    warning: "Watch for signs of infection.",
    bg: "bg-pink-500",
  },
  {
    id: 12,
    title: "Choking",
    category: "Emergency",
    severity: "Critical",
    icon: <AlertCircle className="text-white" />,
    symptoms: ["Clutching throat", "Silent", "Blue lips"],
    treatment: ["5 Back blows", "5 Abdominal thrusts", "Repeat"],
    warning: "Unconscious? Start CPR.",
    bg: "bg-red-700",
  },
];

export default function FirstAid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInjury, setSelectedInjury] = useState<
    (typeof firstAidData)[0] | null
  >(null);

  const ITEMS_PER_PAGE = 8;

  const filteredData = firstAidData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages)
      setCurrentPage((p) => p + 1);
    if (direction === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
  };

  if (selectedInjury) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans animate-in slide-in-from-right-8 duration-300">
        {/* <div className="bg-red-600 px-4 pt-4 pb-12 shadow-lg relative z-0">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedInjury(null)}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-white font-bold text-lg">Medical Protocol</h2>
          </div>
        </div> */}

        <ScrollArea className="h-[calc(100vh-5rem)] -mt-2 relative z-10 px-4">
          <div className="bg-card rounded-t-3xl shadow-xl min-h-[85vh] p-6 pb-24 space-y-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <Badge
                  variant="outline"
                  className={`mb-2 border-none px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${
                    selectedInjury.severity === "Critical"
                      ? "bg-red-900/40 text-red-300"
                      : selectedInjury.severity === "Severe"
                        ? "bg-orange-900/40 text-orange-300"
                        : "bg-slate-600/40 text-slate-300"
                  }`}
                >
                  {selectedInjury.severity} Severity
                </Badge>
                <h1 className="text-3xl font-black text-foreground leading-none mb-1">
                  {selectedInjury.title}
                </h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                  {selectedInjury.category}
                </p>
              </div>
              <div
                className={`h-16 w-16 rounded-2xl ${selectedInjury.bg} flex items-center justify-center shadow-lg transform rotate-3`}
              >
                {React.cloneElement(
                  selectedInjury.icon as React.ReactElement<{
                    className?: string;
                  }>,
                  { className: "h-8 w-8 text-white" },
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-red-950/30 border-l-4 border-red-500 rounded-r-xl">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <h3 className="text-xs font-extrabold text-red-300 uppercase tracking-widest">
                    Crucial Warning
                  </h3>
                </div>
                <p className="text-sm font-bold text-red-100/80 leading-snug">
                  {selectedInjury.warning}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-black text-foreground flex items-center gap-2 mb-3">
                  <Stethoscope className="h-4 w-4 text-red-500" />
                  SIGNS & SYMPTOMS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedInjury.symptoms.map((s, i) => (
                    <div
                      key={i}
                      className="bg-slate-700/40 border border-slate-600/50 p-3 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-foreground flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  ACTION PLAN
                </h3>
                <div className="space-y-3">
                  {selectedInjury.treatment.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shadow-md z-10">
                          {i + 1}
                        </div>
                        {i !== selectedInjury.treatment.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-600/40 -mb-2 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium text-muted-foreground leading-snug pt-0.5">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <Button
            onClick={() => setSelectedInjury(null)}
            className="pointer-events-auto h-12 px-8 rounded-full bg-foreground text-background font-bold shadow-2xl hover:opacity-90 hover:scale-105 transition-all"
          >
            Close Protocol
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full bg-background text-foreground pb-24 font-sans">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)]">
        <div className="p-4 space-y-4">
          <div className="relative group sticky top-0 z-20 -mx-4 px-4">
            <Search className="absolute left-7 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-red-500 transition-colors" />
            <Input
              placeholder="Search injury e.g. 'Sprain'..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-10 bg-slate-700/40 border-slate-600/50 rounded-xl focus-visible:ring-red-500 font-medium transition-all"
            />
          </div>

          {filteredData.length === 0 ? (
            <div className="py-20 text-center opacity-40">
              <div className="mx-auto h-16 w-16 bg-slate-700/40 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm font-bold text-slate-500">
                No injuries found matching "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedInjury(item)}
                  className="group bg-card border border-slate-600/40 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-red-600/50 active:scale-95 transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-5 transform rotate-[-15deg] group-hover:scale-110 transition-transform">
                    {React.cloneElement(
                      item.icon as React.ReactElement<{ className?: string }>,
                      { className: "h-24 w-24 text-foreground" },
                    )}
                  </div>

                  <div className="flex justify-between items-start">
                    <div
                      className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center shadow-sm`}
                    >
                      {React.cloneElement(
                        item.icon as React.ReactElement<{ className?: string }>,
                        { className: "h-5 w-5 text-white" },
                      )}
                    </div>
                    {item.severity === "Critical" && (
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground text-sm leading-tight mb-1 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="inline-block px-1.5 py-0.5 bg-slate-700/40 rounded text-[9px] font-bold text-slate-400 uppercase tracking-wide border border-slate-600/40">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredData.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => handlePageChange("prev")}
                className="rounded-full h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="h-8 px-3 flex items-center bg-foreground text-background rounded-full text-xs font-bold shadow-lg">
                {currentPage}{" "}
                <span className="text-muted-foreground mx-1">/</span>{" "}
                {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange("next")}
                className="rounded-full h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

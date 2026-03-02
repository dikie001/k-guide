import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Clock,
  Flame,
  Heart,
  Plus,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Symptom {
  id: number;
  name: string;
  severity: "mild" | "moderate" | "severe";
  time: string;
  notes?: string;
}

const SYMPTOM_OPTIONS = [
  { name: "Headache", icon: "ðŸ¤•", category: "Pain" },
  { name: "Fatigue", icon: "ðŸ˜´", category: "Energy" },
  { name: "Muscle Soreness", icon: "ðŸ’ª", category: "Muscle" },
  { name: "Dizziness", icon: "ðŸŒ€", category: "Nervous" },
  { name: "Nausea", icon: "ðŸ¤¢", category: "GI" },
  { name: "Joint Pain", icon: "ðŸ¦µ", category: "Joints" },
  { name: "Fever", icon: "ðŸŒ¡ï¸", category: "Infection" },
  { name: "Shortness of Breath", icon: "ðŸ˜®â€ðŸ’¨", category: "Respiratory" },
];

export default function LogSymptomsPage() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: 1,
      name: "Muscle Soreness",
      severity: "moderate",
      time: "08:30 AM",
      notes: "Legs - post training",
    },
    {
      id: 2,
      name: "Fatigue",
      severity: "mild",
      time: "12:15 PM",
      notes: "General tiredness",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("recent");

  const handleAddSymptom = (symptomName: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setSymptoms([
      ...symptoms,
      {
        id: Date.now(),
        name: symptomName,
        severity: "mild",
        time: timeString,
      },
    ]);
  };

  const handleDeleteSymptom = (id: number) => {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-yellow-100 text-yellow-700";
      case "moderate":
        return "bg-orange-100 text-orange-700";
      case "severe":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "mild":
        return <AlertCircle className="h-4 w-4" />;
      case "moderate":
        return <Zap className="h-4 w-4" />;
      case "severe":
        return <Flame className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const severityCount = {
    mild: symptoms.filter((s) => s.severity === "mild").length,
    moderate: symptoms.filter((s) => s.severity === "moderate").length,
    severe: symptoms.filter((s) => s.severity === "severe").length,
  };

  return (
    <div className="relative min-h-full bg-background text-foreground pb-24">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)] flex-1">
        <div className="p-4 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-2xl p-3 border border-slate-100 text-center">
              <p className="text-2xl font-bold text-slate-900">
                {symptoms.length}
              </p>
              <p className="text-xs text-slate-500 font-bold">Total</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-3 border border-yellow-100 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {severityCount.mild}
              </p>
              <p className="text-xs text-yellow-700 font-bold">Mild</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-3 border border-red-100 text-center">
              <p className="text-2xl font-bold text-red-600">
                {severityCount.severe}
              </p>
              <p className="text-xs text-red-700 font-bold">Severe</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-xl h-auto p-1 bg-white border border-slate-100">
              <TabsTrigger
                value="recent"
                className="rounded-lg data-[state=active]:bg-blue-50"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="add"
                className="rounded-lg data-[state=active]:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-3 mt-4">
              {symptoms.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">
                    No symptoms logged today
                  </p>
                </div>
              ) : (
                symptoms.map((symptom) => (
                  <div
                    key={symptom.id}
                    className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {symptom.name}
                        </h4>
                        <Badge
                          className={`text-xs ${getSeverityColor(symptom.severity)}`}
                        >
                          {getSeverityIcon(symptom.severity)}
                          <span className="ml-1 capitalize">
                            {symptom.severity}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {symptom.time}
                        </span>
                        {symptom.notes && <span>â€¢ {symptom.notes}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSymptom(symptom.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-2"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-3 mt-4">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide px-1">
                Select Symptom
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SYMPTOM_OPTIONS.map((option) => (
                  <Button
                    key={option.name}
                    onClick={() => handleAddSymptom(option.name)}
                    variant="outline"
                    className="h-20 rounded-xl border-slate-200 hover:border-blue-200 hover:bg-blue-50 flex flex-col items-center gap-2"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-xs font-bold text-slate-700">
                      {option.name}
                    </span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Severity Scale Info */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
              Symptom Severity
            </h4>
            <div className="space-y-1.5 text-xs text-blue-800">
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full w-2 bg-yellow-500"></div>
                <span>
                  <strong>Mild:</strong> Noticeable but manageable
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full w-2 bg-orange-500"></div>
                <span>
                  <strong>Moderate:</strong> Affects performance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full w-2 bg-red-500"></div>
                <span>
                  <strong>Severe:</strong> Seek medical attention
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}



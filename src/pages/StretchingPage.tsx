import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Flame, Plus, Trash2, Zap } from "lucide-react";
import { useState } from "react";

interface StretchingRoutine {
  id: number;
  name: string;
  duration: number; // minutes
  intensity: "light" | "moderate" | "intense";
  bodyParts: string[];
  completed: boolean;
  date: string;
}

const STRETCHING_ROUTINES = [
  {
    name: "Post-Run Cool Down",
    duration: 10,
    intensity: "light",
    bodyParts: ["Hamstrings", "Calves", "Quads", "Hip Flexors"],
  },
  {
    name: "Full Body Mobility",
    duration: 15,
    intensity: "moderate",
    bodyParts: ["Shoulders", "Hips", "Spine", "Ankles"],
  },
  {
    name: "Deep Stretching Session",
    duration: 20,
    intensity: "intense",
    bodyParts: ["All Major Groups"],
  },
  {
    name: "Pre-Run Dynamic Stretch",
    duration: 8,
    intensity: "light",
    bodyParts: ["Legs", "Glutes", "Hip Flexors"],
  },
];

export default function StretchingPage() {
  const [routines, setRoutines] = useState<StretchingRoutine[]>([
    {
      id: 1,
      name: "Post-Run Cool Down",
      duration: 10,
      intensity: "light",
      bodyParts: ["Hamstrings", "Calves", "Quads", "Hip Flexors"],
      completed: true,
      date: "Today, 4:30 PM",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("today");

  useState<StretchingRoutine | null>(null);

  const handleAddRoutine = (routine: (typeof STRETCHING_ROUTINES)[0]) => {
    const now = new Date();
    const dateString = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setRoutines([
      ...routines,
      {
        id: Date.now(),
        name: routine.name,
        duration: routine.duration,
        intensity: routine.intensity as "light" | "moderate" | "intense",
        bodyParts: routine.bodyParts,
        completed: false,
        date: dateString,
      },
    ]);
  };

  const handleCompleteRoutine = (id: number) => {
    setRoutines(
      routines.map((r) => (r.id === id ? { ...r, completed: true } : r)),
    );
  };

  const handleDeleteRoutine = (id: number) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "light":
        return "bg-green-100 text-green-700";
      case "moderate":
        return "bg-orange-100 text-orange-700";
      case "intense":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case "light":
        return <Zap className="h-3 w-3" />;
      case "moderate":
        return <Flame className="h-3 w-3" />;
      case "intense":
        return <Flame className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const today = routines.filter((r) => r.date.includes("Today"));
  const completed = routines.filter((r) => r.completed);

  return (
    <div className="relative min-h-full bg-slate-50 font-sans text-slate-900 pb-28">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)] flex-1">
        <div className="p-4 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-100">
              <p className="text-2xl font-bold text-slate-900">
                {today.length}
              </p>
              <p className="text-xs text-slate-500 font-bold">Today</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <p className="text-2xl font-bold text-green-600">
                {completed.length}
              </p>
              <p className="text-xs text-green-700 font-bold">Completed</p>
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
                value="today"
                className="rounded-lg data-[state=active]:bg-blue-50"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                My Routines
              </TabsTrigger>
              <TabsTrigger
                value="browse"
                className="rounded-lg data-[state=active]:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Browse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-3 mt-4">
              {routines.length === 0 ? (
                <div className="text-center py-8">
                  <Zap className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No routines yet</p>
                </div>
              ) : (
                routines.map((routine) => (
                  <div
                    key={routine.id}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      routine.completed
                        ? "bg-green-50 border-green-100"
                        : "bg-white border-slate-100 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {routine.name}
                        </h4>
                        <p className="text-xs text-slate-500">{routine.date}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRoutine(routine.id);
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`text-xs ${getIntensityColor(routine.intensity)}`}
                      >
                        {getIntensityIcon(routine.intensity)}
                        <span className="ml-1 capitalize">
                          {routine.intensity}
                        </span>
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {routine.duration}min
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {routine.bodyParts.map((part) => (
                        <Badge
                          key={part}
                          variant="outline"
                          className="text-xs bg-slate-50"
                        >
                          {part}
                        </Badge>
                      ))}
                    </div>

                    {!routine.completed && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteRoutine(routine.id);
                        }}
                        className="w-full mt-3 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="browse" className="space-y-3 mt-4">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide px-1">
                Available Routines
              </p>
              {STRETCHING_ROUTINES.map((routine, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">
                      {routine.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`text-xs ${getIntensityColor(routine.intensity)}`}
                      >
                        {getIntensityIcon(routine.intensity)}
                        <span className="ml-1 capitalize">
                          {routine.intensity}
                        </span>
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {routine.duration}min
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {routine.bodyParts.map((part) => (
                        <Badge
                          key={part}
                          variant="outline"
                          className="text-xs bg-slate-50"
                        >
                          {part}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddRoutine(routine)}
                    size="sm"
                    className="ml-2 rounded-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Tips */}
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 space-y-2">
            <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wide">
              Stretching Tips
            </h4>
            <ul className="text-xs text-purple-800 space-y-1 list-disc list-inside">
              <li>Stretch after warming up muscles</li>
              <li>Hold each stretch for 30 seconds</li>
              <li>Never bounce or force too hard</li>
              <li>Focus on major muscle groups used in training</li>
            </ul>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  category: "scan" | "injury" | "activity" | "log";
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "Scanned Ibuprofen 200mg",
    description: "Result: SAFE - In-competition permitted",
    timestamp: "Today, 5:25 PM",
    category: "scan",
  },
  {
    id: 2,
    title: "Logged Muscle Soreness",
    description: "Severity: Moderate - Legs post-training",
    timestamp: "Today, 4:10 PM",
    category: "log",
  },
  {
    id: 3,
    title: "Updated Injury Status",
    description: "Ankle Sprain marked as Recovered",
    timestamp: "Yesterday, 2:30 PM",
    category: "injury",
  },
  {
    id: 4,
    title: "Completed Recovery Session",
    description: "5-Min Post-Run Leg Flush - Completed",
    timestamp: "Yesterday, 4:45 PM",
    category: "activity",
  },
  {
    id: 5,
    title: "Scanned Caffeine Pill",
    description: "Result: SAFE - No restrictions detected",
    timestamp: "2 days ago, 6:15 PM",
    category: "scan",
  },
  {
    id: 6,
    title: "Logged Cold Symptoms",
    description: "Severity: Mild - Sneezing and throat irritation",
    timestamp: "3 days ago, 10:20 AM",
    category: "log",
  },
];

export default function ActivitiesPage() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "scan":
        return "bg-blue-900/40 text-blue-300";
      case "injury":
        return "bg-red-900/40 text-red-300";
      case "activity":
        return "bg-green-900/40 text-green-300";
      case "log":
        return "bg-orange-900/40 text-orange-300";
      default:
        return "bg-slate-700/40 text-slate-300";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "scan":
        return "Scan";
      case "injury":
        return "Injury";
      case "activity":
        return "Activity";
      case "log":
        return "Log";
      default:
        return "Other";
    }
  };

  return (
    <div className="relative min-h-full bg-background text-foreground pb-24">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)] flex-1">
        <div className="p-4 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-slate-600/40 text-center">
              <p className="text-2xl font-bold text-foreground">
                {MOCK_ACTIVITIES.length}
              </p>
              <p className="text-xs text-muted-foreground font-bold">
                Total Activities
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/30 rounded-2xl p-4 border border-blue-700/30 text-center">
              <p className="text-2xl font-bold text-cyan-400">3</p>
              <p className="text-xs text-cyan-300 font-bold">This Week</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground px-1">
              Activity Timeline
            </h3>

            <div className="space-y-3">
              {MOCK_ACTIVITIES.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full border-2 border-foreground/40 ${
                        activity.category === "scan"
                          ? "bg-blue-500"
                          : activity.category === "injury"
                            ? "bg-red-500"
                            : activity.category === "activity"
                              ? "bg-green-500"
                              : "bg-orange-500"
                      }`}
                    />
                    {index !== MOCK_ACTIVITIES.length - 1 && (
                      <div className="w-0.5 h-16 bg-slate-600/30 my-2" />
                    )}
                  </div>

                  {/* Activity Card */}
                  <div className="flex-1 pb-2">
                    <div className="p-3 bg-card rounded-xl border border-slate-600/40 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-bold text-foreground">
                          {activity.title}
                        </h4>
                        <Badge
                          className={`text-xs ${getCategoryColor(activity.category)}`}
                        >
                          {getCategoryLabel(activity.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {activity.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State for Filters */}
          <div className="space-y-3 text-center py-4">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">
              Showing all activities
            </p>
            <Button
              variant="outline"
              className="w-full rounded-lg border-slate-600/40 hover:border-cyan-600/50 hover:bg-cyan-500/10"
            >
              <Users className="h-4 w-4 mr-2" />
              Filter by Type
            </Button>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

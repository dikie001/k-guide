import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Droplets, Trash2 } from "lucide-react";
import { useState } from "react";

interface HydrationLog {
  id: number;
  amount: number; // in ml
  time: string;
  type: "water" | "sports-drink" | "electrolyte";
}

export default function HydrationPage() {
  const [logs, setLogs] = useState<HydrationLog[]>([
    { id: 1, amount: 250, time: "06:30 AM", type: "water" },
    { id: 2, amount: 500, time: "10:15 AM", type: "sports-drink" },
    { id: 3, amount: 300, time: "01:45 PM", type: "water" },
  ]);

  const dailyGoal = 3000; // 3 liters
  const totalIntake = logs.reduce((sum, log) => sum + log.amount, 0);
  const percentage = Math.min((totalIntake / dailyGoal) * 100, 100);

  const handleAddWater = (amount: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setLogs([
      ...logs,
      {
        id: Date.now(),
        amount,
        time: timeString,
        type: "water",
      },
    ]);
  };

  const handleDeleteLog = (id: number) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="relative min-h-full bg-background text-foreground pb-24">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)] flex-1">
        <div className="p-4 space-y-6">
          {/* Hydration Status Card */}
          <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/30 rounded-3xl p-6 border border-blue-700/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Daily Hydration
              </h2>
              <Droplets className="h-6 w-6 text-cyan-400" />
            </div>

            {/* Progress Circle */}
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg
                  className="transform -rotate-90 w-full h-full"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="8"
                    strokeDasharray={`${percentage * 3.14} 314`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    {totalIntake}
                  </span>
                  <span className="text-xs text-muted-foreground">ml</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">
                    Goal: {dailyGoal}ml
                  </p>
                  <Progress value={percentage} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {dailyGoal - totalIntake > 0
                    ? `${dailyGoal - totalIntake}ml to go`
                    : "Goal reached! ðŸŽ‰"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground pl-1">
              Quick Add
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleAddWater(250)}
                variant="outline"
                className="h-12 rounded-xl border-slate-600/40 hover:border-cyan-600/50 hover:bg-cyan-500/10"
              >
                <Droplets className="h-4 w-4 mr-1.5" />
                250ml
              </Button>
              <Button
                onClick={() => handleAddWater(500)}
                variant="outline"
                className="h-12 rounded-xl border-slate-600/40 hover:border-cyan-600/50 hover:bg-cyan-500/10"
              >
                <Droplets className="h-4 w-4 mr-1.5" />
                500ml
              </Button>
              <Button
                onClick={() => handleAddWater(1000)}
                variant="outline"
                className="h-12 rounded-xl border-slate-600/40 hover:border-cyan-600/50 hover:bg-cyan-500/10"
              >
                <Droplets className="h-4 w-4 mr-1.5" />
                1L
              </Button>
            </div>
          </div>

          {/* Hydration Log */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Today's Log</h3>
              <Badge variant="secondary">
                <BarChart3 className="h-3 w-3 mr-1" />
                {logs.length} entries
              </Badge>
            </div>

            <div className="space-y-2">
              {logs.length === 0 ? (
                <div className="text-center py-8">
                  <Droplets className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No logs yet. Start hydrating!
                  </p>
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 bg-card rounded-xl border border-slate-600/40 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-foreground">
                          {log.amount}ml
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.time}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-2 hover:bg-red-950/40 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-cyan-950/20 rounded-2xl p-4 border border-cyan-700/30 space-y-2">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
              Hydration Tips
            </h4>
            <ul className="text-xs text-cyan-100/70 space-y-1 list-disc list-inside">
              <li>Drink 500ml every 15-20 minutes during training</li>
              <li>Drink 500ml within 2 hours after exercise</li>
              <li>Pre-hydrate: 400-600ml 2-3 hours before exercise</li>
            </ul>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

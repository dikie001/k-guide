import React, { useState, useEffect } from "react";
import AppRoutes from "./routes";
import InstallPrompt from "@/features/pwa/InstallPrompt";
import { ThemeProvider } from "@/contexts/ThemeContext";
import {
  Wifi,
  Signal,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  BatteryCharging,
} from "lucide-react";

interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
  }
}

const BatteryIcon = ({
  level,
  charging,
}: {
  level: number | null;
  charging: boolean;
}) => {
  if (charging) return <BatteryCharging className="w-[22px] h-[12px]" />;
  if (level === null) return <BatteryMedium className="w-[22px] h-[12px]" />;
  if (level <= 0.2)
    return <BatteryLow className="w-[22px] h-[12px] text-red-500" />;
  if (level <= 0.6) return <BatteryMedium className="w-[22px] h-[12px]" />;
  return <BatteryFull className="w-[22px] h-[12px]" />;
};

const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState("");
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let battery: BatteryManager | null = null;

    const handleLevelChange = () => {
      if (battery) setBatteryLevel(battery.level);
    };
    const handleChargingChange = () => {
      if (battery) setIsCharging(battery.charging);
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        battery = bat;
        setBatteryLevel(bat.level);
        setIsCharging(bat.charging);
        bat.addEventListener("levelchange", handleLevelChange);
        bat.addEventListener("chargingchange", handleChargingChange);
      });
    }

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleLevelChange);
        battery.removeEventListener("chargingchange", handleChargingChange);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center md:bg-zinc-200 dark:md:bg-zinc-900 md:p-8">
      <div
        className="relative w-full h-screen lg:-mt-8 md:h-auto md:max-h-screen bg-background
        md:w-[390px] md:h-[844px] md:border-[10px] md:border-zinc-900 md:rounded-[52px]
        md:shadow-2xl md:overflow-hidden ring-1 ring-black/10 dark:ring-white/5 flex flex-col"
      >
        {/* Dynamic Island */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 h-[34px] w-[126px] bg-black rounded-b-[22px] z-50 items-center justify-center pointer-events-none">
          <div className="w-[68px] h-[18px] bg-black rounded-full" />
          <div className="absolute right-3.5 w-3 h-3 rounded-full bg-zinc-900 ring-1 ring-zinc-800/50" />
        </div>

        {/* Side Buttons */}
        <div className="hidden md:block absolute -left-[18px] top-[108px] h-[34px] w-[3px] bg-zinc-800 rounded-l-full" />
        <div className="hidden md:block absolute -left-[18px] top-[168px] h-[64px] w-[3px] bg-zinc-800 rounded-l-full" />
        <div className="hidden md:block absolute -left-[18px] top-[252px] h-[64px] w-[3px] bg-zinc-800 rounded-l-full" />
        <div className="hidden md:block absolute -right-[18px] top-[188px] h-[96px] w-[3px] bg-zinc-800 rounded-r-full" />

        {/* Status Bar */}
        <div className="hidden md:flex bg-background text-foreground justify-between items-center px-8 pt-4 pb-1 w-full absolute top-0 z-40 select-none pointer-events-none">
          {/* Time */}
          <span className="text-xs font-semibold tracking-tight">
            {time}
          </span>

          {/* Right icons */}
          <div className="flex items-center gap-[6px]">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px] h-[12px]">
              {[3, 5, 7, 10, 12].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className={`w-[3px] rounded-sm ${i < 4 ? "bg-foreground" : "bg-foreground/30"}`}
                />
              ))}
            </div>

            {/* WiFi */}
            <Wifi className="w-[15px] h-[15px]" strokeWidth={2.2} />

            {/* Battery */}
            <div className="flex items-center gap-[3px]">
              <div className="relative flex items-center">
                {/* Battery body */}
                <div className="w-[22px] h-[11px] rounded-[3px] border-[1.5px] border-foreground flex items-center px-[1.5px]">
                  <div
                    className={`h-[6px] rounded-[1.5px] transition-all ${
                      isCharging
                        ? "bg-green-500"
                        : batteryLevel !== null && batteryLevel <= 0.2
                          ? "bg-red-500"
                          : "bg-foreground"
                    }`}
                    style={{
                      width: `${Math.round((batteryLevel ?? 0.8) * 100)}%`,
                      maxWidth: "100%",
                    }}
                  />
                </div>
                {/* Battery nub */}
                <div className="w-[2px] h-[5px] bg-foreground/60 rounded-r-sm ml-[1px]" />
              </div>
              {batteryLevel !== null && (
                <span className="text-[11px] font-medium leading-none">
                  {Math.round(batteryLevel * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar md:pt-10 flex flex-col">
          {children}
        </div>

        {/* Home indicator */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/70 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <PhoneFrame>
        <AppRoutes />
        <InstallPrompt />
      </PhoneFrame>
    </ThemeProvider>
  );
};

export default App;

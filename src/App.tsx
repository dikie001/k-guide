import React from "react";
import AppRoutes from "./routes";
import InstallPrompt from "@/features/pwa/InstallPrompt";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

// The wrapper that creates the phone frame on MD+ screens only
const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center md:bg-zinc-200  md:p-8">
      <div
        className="relative w-full lg:-mt-8 h-screen md:h-auto md:max-h-screen bg-background
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

        {/* Status Bar (Desktop only) */}
        <div className="hidden md:flex bg-background text-foreground justify-between items-center px-9 pt-3 pb-1 w-full absolute top-0 z-40 text-xs font-semibold select-none pointer-events-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar md:pt-9 flex flex-col">
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

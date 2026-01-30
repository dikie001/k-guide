import React from "react";
import AppRoutes from "./routes";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

// The wrapper that creates the frame only on MD+ screens
const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen md:max-h-screen w-full flex items-center justify-center md:bg-slate-100 md:p-8">
      {/* MOBILE: Full width/height, no border.
         DESKTOP (md): Fixed width/height, thick borders, rounded corners, shadow.
      */}
      <div className="relative w-full h-full bg-background 
        md:w-[380px] md:h-[650px]  md:border-12  md:border-gray-900 md:rounded-[3rem] 
        md:shadow-2xl md:overflow-hidden ring-1 ring-black/5"
      >

        {/* --- DECORATIONS (Hidden on Mobile) --- */}

        {/* Dynamic Island / Notch */}
        <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 h-[35px] w-[120px] bg-black rounded-b-[18px] z-50 items-center justify-center pointer-events-none">
          <div className="w-16 h-4 bg-black rounded-full" />
          <div className="absolute right-3 w-3 h-3 rounded-full bg-gray-900 ring-1 ring-gray-800/50" />
        </div>

        {/* Buttons (Volume/Power) */}
        <div className="hidden md:block absolute -left-[17px] top-[100px] h-[32px] w-[3px] bg-gray-800 rounded-l-lg" />
        <div className="hidden md:block absolute -left-[17px] top-[160px] h-[60px] w-[3px] bg-gray-800 rounded-l-lg" />
        <div className="hidden md:block absolute -left-[17px] top-[240px] h-[60px] w-[3px] bg-gray-800 rounded-l-lg" />
        <div className="hidden md:block absolute -right-[17px] top-[180px] h-[95px] w-[3px] bg-gray-800 rounded-r-lg" />

        {/* Status Bar (Desktop Only - Mobile has its own real one) */}
        <div className="hidden md:flex justify-between items-center px-8 pt-3 pb-1 w-full absolute top-0 z-40 text-black font-semibold text-xs select-none pointer-events-none">
          <span className="pl-1">9:41</span>
          <div className="flex items-center gap-1.5 pr-1">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="h-full w-full overflow-y-auto no-scrollbar md:pt-8 md:pb-8">
          {children}
        </div>

        {/* Home Indicator (Desktop Only) */}
        <div className="hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[130px] h-[5px] bg-black/80 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <PhoneFrame>
      <AppRoutes />
    </PhoneFrame>
  );
};

export default App;
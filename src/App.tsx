import React, { useEffect, useState } from "react";
import AppRoutes from "./routes";
import InstallPrompt from "@/features/pwa/InstallPrompt";
import { ThemeProvider } from "@/contexts/ThemeContext";

// ─── Live Clock ────────────────────────────────────────────────
const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-bold tabular-nums tracking-tight text-[12px]">
      {time}
    </span>
  );
};

// ─── Signal Bars ───────────────────────────────────────────────
const SignalBars = ({ strength = 4 }: { strength?: number }) => (
  <div className="flex items-end gap-[2px] h-[13px]">
    {[1, 2, 3, 4].map((bar) => (
      <div
        key={bar}
        className="w-[3px] rounded-sm"
        style={{
          height: `${bar * 3}px`,
          backgroundColor: "currentColor",
          opacity: bar <= strength ? 1 : 0.22,
        }}
      />
    ))}
  </div>
);

// ─── WiFi Icon ─────────────────────────────────────────────────
const WifiIcon = () => (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
    <path
      d="M7 8.5C7.55 8.5 8 8.95 8 9.5C8 10.05 7.55 10.5 7 10.5C6.45 10.5 6 10.05 6 9.5C6 8.95 6.45 8.5 7 8.5Z"
      fill="currentColor"
    />
    <path
      d="M4.17 6.67C4.91 5.93 5.91 5.5 7 5.5C8.09 5.5 9.09 5.93 9.83 6.67"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M1.34 3.84C2.87 2.31 4.83 1.5 7 1.5C9.17 1.5 11.13 2.31 12.66 3.84"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

// ─── Battery Icon ──────────────────────────────────────────────
const BatteryIcon = ({
  level,
  charging,
}: {
  level: number;
  charging: boolean;
}) => {
  const fillColor = charging
    ? "#4ade80"
    : level <= 15
      ? "#ef4444"
      : level <= 30
        ? "#f97316"
        : "currentColor";

  return (
    <div className="flex items-center gap-0.5">
      {charging && (
        <svg width="7" height="9" viewBox="0 0 7 9" fill="none">
          <path d="M4 0L1 5H3.5L3 9L6.5 4H4L4 0Z" fill="#4ade80" />
        </svg>
      )}
      <div className="relative flex items-center">
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="20"
            height="11"
            rx="2.5"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <rect
            x="2"
            y="2"
            width={Math.round((16 * Math.min(100, Math.max(0, level))) / 100)}
            height="8"
            rx="1.5"
            fill={fillColor}
            style={{ transition: "width 0.6s ease, fill 0.4s ease" }}
          />
          <rect
            x="21"
            y="3.5"
            width="2.5"
            height="5"
            rx="1"
            fill="currentColor"
            fillOpacity="0.35"
          />
        </svg>
        {level <= 15 && !charging && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-ping absolute inline-flex h-2.5 w-4 rounded opacity-20 bg-red-500" />
          </span>
        )}
      </div>
      <span
        className="text-[9px] font-semibold tabular-nums leading-none ml-0.5"
        style={{ color: fillColor }}
      >
        {level}%
      </span>
    </div>
  );
};

// ─── Phone Status Bar ──────────────────────────────────────────
const PhoneStatusBar = () => {
  const [battery, setBattery] = useState({ level: 100, charging: false });
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const nav = navigator as any;
    if (!nav.getBattery) return;
    nav.getBattery().then((bat: any) => {
      setSupported(true);
      const update = () =>
        setBattery({
          level: Math.round(bat.level * 100),
          charging: bat.charging,
        });
      update();
      bat.addEventListener("levelchange", update);
      bat.addEventListener("chargingchange", update);
      return () => {
        bat.removeEventListener("levelchange", update);
        bat.removeEventListener("chargingchange", update);
      };
    });
  }, []);

  return (
    <div className="flex justify-between items-center px-9 pt-3 pb-1 w-full text-foreground select-none pointer-events-none">
      <LiveClock />
      <div className="flex items-center gap-2">
        <SignalBars strength={4} />
        <WifiIcon />
        <BatteryIcon
          level={supported ? battery.level : 100}
          charging={battery.charging}
        />
      </div>
    </div>
  );
};

// ─── Phone Frame ───────────────────────────────────────────────
const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center md:bg-zinc-200 md:p-8">
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

        {/* ── Status Bar: real live clock + real battery ── */}
        <div className="hidden md:flex bg-background absolute top-0 z-40 w-full">
          <PhoneStatusBar />
        </div>

        {/* Content */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar md:pt-9 flex flex-col">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/70 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};

// ─── App ───────────────────────────────────────────────────────
const App = () => (
  <ThemeProvider>
    <PhoneFrame>
      <AppRoutes />
      <InstallPrompt />
    </PhoneFrame>
  </ThemeProvider>
);

export default App;

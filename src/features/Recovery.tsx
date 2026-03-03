"use client";

import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Clock, Play, Share2, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RECOVERY_MODULES = [
  {
    id: 1,
    title: "5-Min Post-Run Leg Flush",
    trainer: "Run Better with Ash",
    duration: "5 min",
    intensity: "Low",
    category: "Mobility",
    youtubeId: "uYaUNOKeE3s",
    views: "12k",
  },
  {
    id: 2,
    title: "15 Min Foam Rolling Routine",
    trainer: "Julia Reppel",
    duration: "15 min",
    intensity: "Medium",
    category: "Myofascial",
    youtubeId: "abFZLv4QkAM",
    views: "24k",
  },
  {
    id: 3,
    title: "Electrolytes & Rehydration Science",
    trainer: "Sports Injury Physio",
    duration: "11 min",
    intensity: "Education",
    category: "Nutrition",
    youtubeId: "QLZOsMppVeE",
    views: "22k",
  },
  {
    id: 4,
    title: "8-Hour Deep Sleep Meditation",
    trainer: "Jason Stephenson",
    duration: "8 hrs",
    intensity: "None",
    category: "Mental",
    youtubeId: "Vn2cd6O3gKw",
    views: "5M+",
  },
  {
    id: 5,
    title: "Yoga for Runners",
    trainer: "Adriene",
    duration: "20 min",
    intensity: "Low",
    category: "Mobility",
    youtubeId: "2Mp238c9uEA",
    views: "1M+",
  },
  {
    id: 6,
    title: "Guided Wim Hof Method Breathing",
    trainer: "Wim Hof",
    duration: "11 min",
    intensity: "Medium",
    category: "Mental",
    youtubeId: "tybOi4hjZFQ",
    views: "60M+",
  },
  {
    id: 7,
    title: "10 Min Full Body Stretch",
    trainer: "MadFit",
    duration: "10 min",
    intensity: "Low",
    category: "Mobility",
    youtubeId: "Mv_eZntEheA",
    views: "4M+",
  },
  {
    id: 8,
    title: "Active Recovery Workout (No Jumping)",
    trainer: "Juice & Toya",
    duration: "20 min",
    intensity: "Medium",
    category: "Active",
    youtubeId: "OIfP-T2YhMw",
    views: "850k",
  },
  {
    id: 9,
    title: "Ice Bath & Cold Exposure Protocol",
    trainer: "Huberman Lab",
    duration: "14 min",
    intensity: "Education",
    category: "Science",
    youtubeId: "pq6WHJzOkno",
    views: "2.1M",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(RECOVERY_MODULES.map((m) => m.category))),
];

const INTENSITY_COLOR: Record<string, string> = {
  Low: "text-green-400",
  Medium: "text-yellow-400",
  Education: "text-sky-400",
  None: "text-slate-500",
  High: "text-red-400",
};

type Mod = (typeof RECOVERY_MODULES)[0];

export default function RecoveryPage() {
  const [active, setActive] = useState<Mod>(RECOVERY_MODULES[0]);
  const [playing, setPlaying] = useState(false);
  const [cat, setCat] = useState("All");
  const [imgLoaded, setImgLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const list =
    cat === "All"
      ? RECOVERY_MODULES
      : RECOVERY_MODULES.filter((m) => m.category === cat);

  useEffect(() => {
    setImgLoaded(false);
  }, [active.youtubeId]);

  const select = (v: Mod) => {
    if (v.id === active.id) {
      setPlaying(true);
      return;
    }
    setPlaying(false);
    setActive(v);
    setTimeout(() => setPlaying(true), 100);
  };

  const stop = () => {
    setPlaying(false);
    if (iframeRef.current) iframeRef.current.src = "";
  };

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-slate-950 text-white relative shadow-2xl sm:border-x sm:border-slate-800">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full bg-indigo-700/10 blur-[80px]" />
      </div>

      {/* Header */}
      <div
        className={`absolute inset-x-0 top-0 z-50 transition-all duration-500 ${
          playing
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Header />
      </div>

      {/* HERO SECTION */}
      <div className="relative w-full shrink-0 h-[40vh] min-h-[280px]">
        {playing ? (
          <div className="relative h-full w-full bg-black ">
            <iframe
              ref={iframeRef}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={stop}
              aria-label="Close"
              className="absolute right-3 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur transition-transform active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="relative h-full w-full overflow-hidden bg-slate-900">
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-800" />
            )}
            <img
              key={active.youtubeId}
              src={`https://img.youtube.com/vi/${active.youtubeId}/hqdefault.jpg`}
              alt={active.title}
              onLoad={() => setImgLoaded(true)}
              className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-700 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                aria-label={`Play ${active.title}`}
                className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-full transition-transform active:scale-90"
              >
                <span
                  className="absolute inset-0 animate-ping rounded-full bg-white/15"
                  style={{ animationDuration: "2s" }}
                />
                <span className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-105">
                  <Play className="ml-0.5 h-5 w-5 fill-slate-950 text-slate-950" />
                </span>
              </button>
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 inset-x-0 z-10 px-5 pb-6">
              <div className="mb-2 flex items-center gap-2">
                <Badge className="border-0 bg-blue-500 px-2.5 py-0.5 text-[10px] text-white shadow-lg shadow-blue-500/20">
                  {active.category}
                </Badge>
                <span className="flex items-center gap-1 rounded border border-white/5 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-slate-300 backdrop-blur-sm">
                  <Clock className="h-2.5 w-2.5" />
                  {active.duration}
                </span>
                <span
                  className={`flex items-center gap-1 rounded border border-white/5 bg-black/50 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${
                    INTENSITY_COLOR[active.intensity] ?? "text-slate-400"
                  }`}
                >
                  <Zap className="h-2.5 w-2.5 fill-current" />
                  {active.intensity}
                </span>
              </div>
              {/* FIX 1: Added break-words to hero title */}
              <h1 className="line-clamp-2 break-words text-2xl font-black leading-tight tracking-tight text-white drop-shadow-md">
                {active.title}
              </h1>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-300">
                  {active.trainer}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PLAYLIST CARD */}
      <div className="relative z-20 -mt-2 flex min-h-0 flex-1 flex-col rounded-t-3xl border-t border-white/10 bg-slate-950 shadow-[0_-12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-white/20" />

        <div className="shrink-0 px-5 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Up Next
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {list.length} videos
            </span>
          </div>

          {/* Category chips */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  cat === c
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <div className=" space-y-2 px-4 pb-28 pt-1">
            {list.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-slate-500">
                  No videos found in this category.
                </p>
              </div>
            )}

            {list.map((item, idx) => {
              const isActive = active.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => select(item)}
                  aria-label={`Play ${item.title}`}
                  className={`group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all active:scale-[0.98] ${
                    isActive
                      ? "border border-blue-500/30 bg-blue-500/10"
                      : "border border-transparent bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {/* Track # / equalizer */}
                  <div className="flex w-6 shrink-0 items-center justify-center">
                    {isActive && playing ? (
                      <span className="flex h-4 items-end gap-[2px]">
                        {[0, 0.2, 0.35].map((d, i) => (
                          <span
                            key={i}
                            className="w-[3px] rounded-full bg-blue-400"
                            style={{
                              animation: `eqBar 0.75s ${d}s ease-in-out infinite alternate`,
                              height: "55%",
                            }}
                          />
                        ))}
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          isActive ? "text-blue-400" : "text-slate-500"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-14 w-[90px] shrink-0 overflow-hidden rounded-xl bg-slate-800">
                    <img
                      src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className={`h-full w-full object-cover transition-all duration-300 ${
                        isActive
                          ? "scale-[1.08] opacity-40"
                          : "opacity-80 group-hover:opacity-100"
                      }`}
                    />
                    {isActive ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 animate-pulse text-blue-400" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                          <Play className="ml-0.5 h-3 w-3 fill-white text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* FIX 2: Replaced 'truncate' with 'line-clamp-2 break-words' */}
                    <p
                      className={`line-clamp-2 break-words text-sm font-bold leading-tight ${
                        isActive ? "text-blue-300" : "text-slate-200"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {item.trainer}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </span>
                      <span className="text-[10px] text-slate-600">•</span>
                      <span
                        className={`flex items-center gap-1 text-[10px] font-semibold ${
                          INTENSITY_COLOR[item.intensity] ?? "text-slate-500"
                        }`}
                      >
                        <Zap className="h-3 w-3 fill-current" />
                        {item.intensity}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 inset-x-0 z-50">
        <BottomNav />
      </div>

      <style>{`
        @keyframes eqBar { from { height: 20%; } to { height: 100%; } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

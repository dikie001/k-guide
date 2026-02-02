"use client";

import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Clock,
  Play,
  Share2,
  X,
  Zap
} from "lucide-react";
import { useState } from "react";

// --- REAL DATA ---
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
    duration: "480 min",
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
];

export default function RecoveryPage() {
  const [activeVideo, setActiveVideo] = useState(RECOVERY_MODULES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: typeof RECOVERY_MODULES[0]) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    // Changed h-full to h-[100dvh] to ensure visibility
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-slate-950 font-sans text-slate-50">

      {/* 1. HEADER (Hides when playing) */}
      <div className={`absolute top-0 left-0 z-50 w-full transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Header />
      </div>

      {/* 2. BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="absolute -top-[20%] -right-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* 3. HERO PLAYER AREA */}
      <div className="relative z-10 h-[45%] w-full shrink-0 transition-all duration-700 ease-in-out">

        {isPlaying ? (
          /* VIDEO MODE */
          <div className="relative h-full w-full bg-black animate-in fade-in duration-700">
            <iframe
              className="h-full w-full object-contain"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              onClick={() => setIsPlaying(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          /* COVER ART MODE */
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
            <img
              src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`}
              alt={activeVideo.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Play Trigger */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all active:scale-95 hover:bg-white/20 ring-1 ring-white/20"
              >
                <div className="absolute inset-0 animate-ping rounded-full bg-white/10 opacity-75 duration-2000" />
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-slate-950 text-slate-950" />
                </div>
              </button>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-12 left-0 w-full px-6 z-20">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="border-none bg-blue-500 text-white shadow-lg shadow-blue-500/20 backdrop-blur-md">
                  {activeVideo.category}
                </Badge>
                <div className="flex items-center text-[10px] font-bold text-slate-300 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/5">
                  <Clock className="w-3 h-3 mr-1" /> {activeVideo.duration}
                </div>
              </div>

              <h1 className="line-clamp-2 text-3xl font-black leading-tight tracking-tight text-white mb-2 drop-shadow-lg">
                {activeVideo.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                  <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {activeVideo.intensity} Intensity</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. PLAYLIST CARD */}
      <div className="relative z-20 flex-1 -mt-8 flex flex-col w-full min-h-0">
        <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-b from-slate-900/80 to-slate-950 backdrop-blur-2xl border-t border-white/5 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">

          {/* Drag Handle */}
          <div className="mx-auto mt-4 h-1 w-12 shrink-0 rounded-full bg-white/10" />

          {/* ScrollArea */}
          <ScrollArea className="h-full w-full rounded-t-[2.5rem]">
            <div className="px-5 pt-4 pb-32">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Up Next</h3>
              <div className="space-y-3">
                {RECOVERY_MODULES.map((item) => {
                  const isActive = activeVideo.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleVideoSelect(item)}
                      className={`group flex items-center gap-4 rounded-2xl p-3 transition-all cursor-pointer ${isActive
                          ? 'bg-blue-600/10 border border-blue-500/30'
                          : 'bg-white/5 border border-white/5 hover:bg-white/10'
                        }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                        <img
                          src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                          alt="thumb"
                          className={`h-full w-full object-cover transition-opacity ${isActive ? 'opacity-40' : 'opacity-80 group-hover:opacity-100'}`}
                        />
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 animate-pulse text-blue-400" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <h4 className={`truncate text-sm font-bold ${isActive ? 'text-blue-400' : 'text-slate-200'}`}>
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mb-1">{item.trainer}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="h-4 text-[9px] px-1 bg-white/10 text-slate-300 hover:bg-white/20 border-0">
                            {item.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* 5. BOTTOM NAV */}
      <div className="pointer-events-none absolute bottom-0 z-50 w-full">
        <div className="pointer-events-auto">
          <BottomNav />
        </div>
      </div>

    </div>
  );
}
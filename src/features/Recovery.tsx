import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    BarChart3,
    Clock,
    Play,
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
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HEADER (Hides when playing) */}
      <div className={`absolute top-0 left-0 z-50 w-full transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <Header />
      </div>

      {/* 2. HERO PLAYER AREA */}
      {/* shrink-0 ensures this stays exactly 40% height */}
      <div className="relative z-0 h-[40%] w-full shrink-0 bg-black shadow-2xl transition-all duration-500">
        
        {isPlaying ? (
          /* VIDEO MODE */
          <div className="relative h-full mb-4 -mt-4 w-full animate-in fade-in duration-500">
             <iframe
              className="h-full w-full object-contain bg-black"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Button 
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
                onClick={() => setIsPlaying(false)}
            >
                <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          /* COVER ART MODE */
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
            <img
              src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`}
              alt={activeVideo.title}
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
            />

            {/* Play Trigger */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(true)}
                className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all active:scale-95 hover:bg-white/30"
              >
                <div className="absolute inset-0 animate-ping rounded-full bg-white/20 opacity-75 duration-1000" />
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-slate-900 text-slate-900" />
                </div>
              </button>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-10 left-0 w-full px-6 text-white">
               <Badge className="mb-2 border-none bg-[#008CA5] text-white shadow-lg">
                  {activeVideo.category}
               </Badge>
              
              <h1 className="line-clamp-2 text-2xl font-black leading-tight tracking-tight">
                {activeVideo.title}
              </h1>
              
              <div className="mt-3 flex items-center gap-4 text-sm font-medium text-slate-200">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {activeVideo.duration}</span>
                <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-400" /> {activeVideo.intensity}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. PLAYLIST CARD */}
      {/* min-h-0 is CRITICAL for flex-col scrolling to work properly */}
      <div className="relative z-10 -mt-6 flex flex-1 flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.2)] min-h-0">
        
        {/* Drag Handle */}
        <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />

        {/* ScrollArea must be h-full to fill the flex container */}
        <ScrollArea className="h-full w-full">
          <div className="px-5 pt-2 pb-32"> {/* INCREASED PADDING TO 32 (8rem) to clear bottom nav */}
            

            {/* Playlist Items */}
            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-900">Up Next</h3>
              <div className="space-y-3">
                {RECOVERY_MODULES.map((item) => {
                  const isActive = activeVideo.id === item.id;

                  return (
                    <div 
                        key={item.id} 
                        onClick={() => handleVideoSelect(item)}
                        className={`group flex items-center gap-3 rounded-2xl border p-2.5 transition-all cursor-pointer ${
                            isActive 
                            ? 'border-[#008CA5] bg-cyan-50/50 shadow-sm' 
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                    >
                        {/* Thumbnail */}
                        <div className="relative h-16  shrink-0 overflow-hidden rounded-lg bg-slate-200">
                        <img 
                            src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`} 
                            alt="thumb" 
                            className={`h-full w-full object-cover transition-opacity ${isActive ? 'opacity-50' : 'opacity-100'}`}
                        />
                        {isActive && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <BarChart3 className="h-5 w-5 animate-bounce text-[#008CA5]" />
                            </div>
                        )}
                        </div>

                        {/* Info */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <h4 className={`truncate text-sm font-bold ${isActive ? 'text-[#008CA5]' : 'text-slate-900'}`}>
                                {item.title}
                            </h4>
                            <p className="text-xs text-slate-500">{item.trainer}</p>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </ScrollArea>
      </div>

      {/* 4. BOTTOM NAV */}
      <div className="pointer-events-none absolute bottom-0 z-50 w-full">
        <div className="pointer-events-auto">
          <BottomNav />
        </div>
      </div>

    </div>
  );
}
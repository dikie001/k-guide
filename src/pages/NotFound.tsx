import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, MapPin, Radio } from 'lucide-react';

export default function NotFound() {
  return (
    <div className=" min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Radial Gradient Spotlight */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1e293b_0%,_#020617_70%)] pointer-events-none"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Floating Particles (Decorations) */}
      <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-blue-500 rounded-full animate-float opacity-50 blur-[1px]"></div>
      <div className="absolute bottom-1/3 right-1/4 h-3 w-3 bg-indigo-500 rounded-full animate-float-delayed opacity-40 blur-[2px]"></div>
      <div className="absolute top-1/3 right-10 h-1.5 w-1.5 bg-slate-400 rounded-full animate-float opacity-30"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Animated 404 Visual */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Large Text */}
          <h1 className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-800 leading-none select-none drop-shadow-2xl">
            4
          </h1>
          
          {/* The Zero (Radar Animation) */}
          <div className="relative w-32 h-32 mx-2 flex items-center justify-center">
            {/* Outer Rings */}
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full opacity-20"></div>
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-ping-slow"></div>
            <div className="absolute inset-4 border-2 border-slate-700 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
            
            {/* Inner Icon */}
            <div className="bg-slate-900 p-4 rounded-full border border-slate-700 shadow-2xl z-10 animate-bounce-slight">
              <MapPin className="h-10 w-10 text-blue-500 fill-blue-500/20" />
            </div>
          </div>

          <h1 className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-800 leading-none select-none drop-shadow-2xl">
            4
          </h1>
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            Off the Map
          </h2>
          <p className="text-slate-400 text-lg">
            We searched everywhere, but we couldn't find the page you're looking for. It might have moved or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
       <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full sm:w-auto">
  
  {/* Secondary Button: Subtle glass effect with sliding icon */}
  <Button 
    variant="outline" 
    onClick={() => window.history.back()}
    className="group h-12 w-full sm:w-auto px-8 rounded-full border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-900 backdrop-blur-md transition-all duration-300"
  >
    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
    Go Back
  </Button>

  {/* Primary Button: Gradient, strong glow, and scaling icon */}
  <Button 
    onClick={() => window.location.href = '/'}
    className="group relative h-12 w-full sm:w-auto px-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.7)] border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
  >
    {/* Inner shimmer effect */}
    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
    
    <div className="relative flex items-center">
      <Home className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      <span className="font-semibold tracking-wide">Return Home</span>
    </div>
  </Button>
  
</div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-slate-600 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
        <Radio className="h-3 w-3 animate-pulse text-red-500" />
        Signal Lost
      </div>

      {/* --- CSS ANIMATIONS --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounce-slight {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-slight { animation: bounce-slight 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
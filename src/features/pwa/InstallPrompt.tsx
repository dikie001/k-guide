import { Button } from "@/components/ui/button";
import { X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-8 fade-in duration-700">
            {/* Glass Container */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                
                {/* Ambient Background Glow */}
                <div className="absolute -left-4 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -right-4 -bottom-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                <div className="relative flex items-center justify-between rounded-2xl bg-black/20 p-3 pr-2">
                    {/* Left: Branding & Value Prop */}
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/20">
                            <Zap className="h-5 w-5 fill-white text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-sm font-bold text-white">Install App</h3>
                            <p className="text-[11px] font-medium text-slate-300">
                                Faster access and offline mode
                            </p>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                         <Button
                            onClick={() => setIsVisible(false)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={handleInstallClick}
                            size="sm"
                            className="h-9 rounded-xl bg-white px-4 text-xs font-bold text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-slate-100 hover:scale-105 transition-all"
                        >
                            Get It
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
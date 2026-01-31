import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
    }

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/95 backdrop-blur-md p-4 text-white shadow-2xl ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <Download className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold leading-tight">Install App</h3>
                        <p className="text-[10px] font-medium text-slate-300">
                            Add to home screen for offline access
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleDismiss}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <Button
                        onClick={handleInstallClick}
                        size="sm"
                        className="h-8 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white hover:bg-blue-500"
                    >
                        Install
                    </Button>
                </div>
            </div>
        </div>
    );
}

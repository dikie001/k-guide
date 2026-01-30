import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    const handleRoute = (route: string) => {
        navigate(route)
    };
    return (
  <header className="sticky -top-12 z-50 w-full bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-5 py-2 transition-all duration-300 supports-[backdrop-filter]:bg-slate-50/60">
    
    {/* Brand Identity */}
    <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
            <span className="text-white font-black text-sm italic">K</span>
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            K-Guide
        </h1>
    </div>

    {/* Notification Button */}
    <Button
        variant="ghost" size="icon"
        className="h-10 w-10 relative rounded-full hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 active:scale-95 transition-all duration-300 group"
        onClick={() => handleRoute('/notifications')}
    >
        <Bell className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
        
        {/* Animated Badge */}
        <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-slate-50"></span>
        </span>
    </Button>
</header>
    )
}

export default Header
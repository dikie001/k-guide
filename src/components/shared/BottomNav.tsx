import { CheckCircle, Home, MapIcon, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const navigate = useNavigate()
    const navItems = [
        { id: 'Home', icon: Home, label: 'Home', route: "/" },
        { id: 'WADA', icon: CheckCircle, label: 'WADA', route: "/wada" },
        { id: 'Map', icon: MapIcon, label: 'Map', route: '/map' },
        { id: 'Profile', icon: User, label: 'Profile', route: '/profile' },
        // { id: 'Support', icon: HelpCircle, label: 'Support', route: '/support' }
    ];


    const handleRoute = (route: string) => {
        navigate(route)
    };

    return (
        <div className="fixed bottom-8 pb-2  left-1/2 -translate-x-1/2  px-6 z-50 max-w-90 w-full flex  justify-center  pointer-events-none">
            <nav className="pointer-events-auto rounded-4xl w-full max-w-[400px] bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-1.5 flex justify-between items-center ring-1 ring-black/5">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); handleRoute(item.route); }}
                            className={`flex-1 flex flex-col cursor-pointer items-center justify-center py-2.5 rounded-2xl transition-all duration-300 group outline-none select-none ${isActive ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                        >
                            <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'group-active:scale-90'}`}>
                                <item.icon
                                    className={`h-5 w-5 mb-0.5 transition-colors duration-300 ${isActive ? 'text-blue-600 fill-blue-600/10' : 'text-slate-400 group-hover:text-slate-600'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={`text-[9px] font-bold transition-all duration-300 ${isActive ? 'text-blue-600 translate-y-0' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </nav>
        </div>)
}

export default BottomNav
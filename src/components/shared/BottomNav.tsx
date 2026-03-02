import { Home, ScanLine, Shield, MapIcon, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "home", icon: Home, label: "Home", route: "/" },
  { id: "scan", icon: ScanLine, label: "Scan", route: "/scan-dopine" },
  { id: "wada", icon: Shield, label: "WADA", route: "/wada" },
  { id: "map", icon: MapIcon, label: "Map", route: "/map" },
  { id: "profile", icon: User, label: "Profile", route: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route: string) => {
    if (route === "/") return location.pathname === "/";
    return location.pathname.startsWith(route);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 bg-background/95 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-stretch pb-safe-bottom">
        {navItems.map(({ id, icon: Icon, label, route }) => {
          const active = isActive(route);
          return (
            <button
              key={id}
              onClick={() => navigate(route)}
              aria-label={label}
              className={`flex-1 relative flex flex-col items-center justify-center gap-0.5 pt-2.5 pb-3 outline-none select-none transition-colors duration-200
                ${active ? "text-primary" : "text-muted-foreground hover:text-foreground/70"}`}
            >
              {/* Active indicator bar */}
              <span
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300
                  ${active ? "w-6 bg-primary" : "w-0 bg-transparent"}`}
              />

              {/* Icon */}
              <Icon
                className={`h-5 w-5 transition-transform duration-200 ${active ? "scale-110" : "scale-100"}`}
                strokeWidth={active ? 2.5 : 1.8}
              />

              {/* Label */}
              <span
                className={`text-[10px] font-semibold leading-none transition-colors duration-200 ${active ? "opacity-100" : "opacity-60"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

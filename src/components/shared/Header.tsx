import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Activity,
  Bell,
  BookOpen,
  ChevronLeft,
  ClipboardList,
  Droplets,
  HelpCircle,
  HeartPulse,
  LogIn,
  Map,
  Menu,
  Moon,
  Move,
  Pill,
  ScanLine,
  Shield,
  Stethoscope,
  Sun,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// ─── Menu structure ────────────────────────────────────────────
const menuSections = [
  {
    label: "WADA & Anti-Doping",
    items: [
      { label: "Prohibited List", icon: Pill, route: "/prohibited-list" },
      {
        label: "Substance Database",
        icon: Shield,
        route: "/substance-database",
      },
      { label: "TUE Process", icon: LogIn, route: "/tue-process" },
      { label: "Scan Medicine", icon: ScanLine, route: "/scan-dopine" },
    ],
  },
  {
    label: "Athlete Health",
    items: [
      { label: "Recovery", icon: Stethoscope, route: "/recovery" },
      { label: "First Aid", icon: HeartPulse, route: "/first-aid" },
      { label: "Hydration Tracker", icon: Droplets, route: "/hydration" },
      { label: "Log Symptoms", icon: ClipboardList, route: "/log-symptoms" },
      { label: "Stretching Routine", icon: Move, route: "/stretching" },
    ],
  },
  {
    label: "Explore",
    items: [
      { label: "Map", icon: Map, route: "/map" },
      { label: "Activities", icon: Activity, route: "/activities" },
      { label: "Resources", icon: BookOpen, route: "/resources" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", icon: User, route: "/profile" },
      { label: "Notifications", icon: Bell, route: "/notifications" },
      { label: "Support", icon: HelpCircle, route: "/support" },
    ],
  },
];

// ─── Header Component ──────────────────────────────────────────
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHome = location.pathname === "/";

  const handleRoute = (route: string) => {
    navigate(route);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/60 flex items-center justify-between px-4 py-3 transition-all duration-200">
      {/* ── Left: Brand / Back ── */}
      <div className="flex items-center gap-2">
        {!isHome ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="-ml-1 h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : null}

        <button
          onClick={() => handleRoute("/")}
          className="flex items-center gap-2.5 outline-none"
        >
          {/* Logo mark */}
          <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/30">
            <span className="text-primary-foreground font-black text-sm italic select-none">
              K
            </span>
          </div>
          {isHome && (
            <span className="text-[17px] font-bold tracking-tight text-foreground">
              K-Guide
            </span>
          )}
        </button>
      </div>

      {/* ── Right: Theme + Bell + Menu ── */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4.5 w-4.5" />
          ) : (
            <Moon className="h-4.5 w-4.5" />
          )}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleRoute("/notifications")}
          className="relative h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
        </Button>

        {/* ── Drawer Menu ── */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] sm:w-[320px] p-0 flex flex-col max-h-screen"
          >
            {/* Drawer Header */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-border/60">
              <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/30">
                <span className="text-primary-foreground font-black text-sm italic select-none">
                  K
                </span>
              </div>
              <div>
                <p className="font-bold text-foreground text-[15px] leading-tight">
                  K-Guide
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Athlete Anti-Doping Platform
                </p>
              </div>
            </div>

            {/* Drawer Scroll Area */}
            <div className="flex-1 overflow-y-auto py-3 no-scrollbar">
              {menuSections.map((section) => (
                <div key={section.label} className="mb-1">
                  <p className="px-5 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    {section.label}
                  </p>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.route;
                    return (
                      <SheetClose asChild key={item.route}>
                        <button
                          onClick={() => navigate(item.route)}
                          className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-150 outline-none
                            ${
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80 hover:bg-accent/60 hover:text-foreground"
                            }`}
                        >
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0
                              ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-[13px] font-medium">
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      </SheetClose>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Drawer Footer — Theme Toggle */}
            <div className="border-t border-border/60 px-5 py-4">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-muted/50 hover:bg-muted transition-colors duration-150 outline-none"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border shadow-sm shrink-0">
                  {theme === "dark" ? (
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Moon className="h-3.5 w-3.5 text-indigo-500" />
                  )}
                </span>
                <span className="text-[13px] font-medium text-foreground/80">
                  {theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"}
                </span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

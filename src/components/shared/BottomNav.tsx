import { Home, ScanLine, Shield, MapIcon, User, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const allItems = [
  { id: "home", icon: Home, label: "Home", route: "/" },
  { id: "wada", icon: Shield, label: "WADA", route: "/wada" },
  { id: "scan", icon: ScanLine, label: "Scan", route: "/scan-dopine" },
  { id: "map", icon: MapIcon, label: "Map", route: "/map" },
  { id: "profile", icon: User, label: "Profile", route: "/profile" },
  { id: "support", icon: Info, label: "Support", route: "/support" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pressed, setPressed] = useState<string | null>(null);

  const isActive = (route: string) =>
    route === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(route);

  const handleClick = (id: string, route: string) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 250);
    navigate(route);
  };

  return (
    <>
      <style>{`
        .bn2-wrap {
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }
        .bn2-bar {
          display: flex;
          align-items: center;
          background: rgba(18, 18, 28, 0.85);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 8px 10px;
          gap: 4px;
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,0.04) inset,
            0 8px 32px rgba(0,0,0,0.55),
            0 2px 8px rgba(0,0,0,0.3);
        }
        .bn2-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 999px;
          position: relative;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          transition: background 0.15s ease, transform 0.15s ease;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .bn2-btn { width: 36px; height: 36px; }
        }
        .bn2-btn:active, .bn2-btn.bn2-pressed {
          transform: scale(0.88);
        }
        /* ACTIVE STATE — pill bg + glow */
        .bn2-btn.bn2-on {
          background: rgba(255,255,255,0.09);
        }
        .bn2-btn-icon {
          transition: color 0.2s ease, filter 0.2s ease;
          width: 20px;
          height: 20px;
        }
        @media (min-width: 768px) {
          .bn2-btn-icon { width: 16px; height: 16px; }
        }
        .bn2-btn.bn2-on .bn2-btn-icon {
          color: #fff;
          filter: drop-shadow(0 0 7px rgba(255,255,255,0.55));
        }
        .bn2-btn:not(.bn2-on) .bn2-btn-icon {
          color: rgba(255,255,255,0.32);
        }
        /* Glowing dot under active icon */
        .bn2-dot {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #fff;
          opacity: 0;
          transition: opacity 0.2s ease, box-shadow 0.2s ease;
          pointer-events: none;
        }
        .bn2-btn.bn2-on .bn2-dot {
          opacity: 1;
          box-shadow: 0 0 6px 2px rgba(255,255,255,0.5);
        }

      `}</style>

      <nav className="bn2-wrap" role="navigation" aria-label="Main navigation">
        <div className="bn2-bar">
          {allItems.map(({ id, icon: Icon, label, route }) => {
            const active = isActive(route);
            return (
              <div key={id} style={{ display: "contents" }}>
                <button
                  onClick={() => handleClick(id, route)}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  title={label}
                  className={`bn2-btn${active ? " bn2-on" : ""}${pressed === id ? " bn2-pressed" : ""}`}
                >
                  <Icon
                    className="bn2-btn-icon"
                    strokeWidth={active ? 2.2 : 1.7}
                  />
                  <span className="bn2-dot" />
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;

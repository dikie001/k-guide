import { Home, ScanLine, Shield, MapIcon, User, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const leftItems = [
  { id: "home", icon: Home, label: "Home", route: "/" },
  { id: "wada", icon: Shield, label: "WADA", route: "/wada" },
];

const rightItems = [
  { id: "map", icon: MapIcon, label: "Map", route: "/map" },
  { id: "profile", icon: User, label: "Profile", route: "/profile" },
  { id: "support", icon: Info, label: "Support", route: "/support" },
];

const centerItem = {
  id: "scan",
  icon: ScanLine,
  label: "Scan",
  route: "/scan-dopine",
};

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
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Pill bar */
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
          position: relative;
        }

        /* Divider gap for center button */
        .bn2-gap {
          width: 64px;
          height: 44px;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .bn2-gap { width: 52px; height: 36px; }
        }

        /* Regular icon buttons */
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

        .bn2-btn:active,
        .bn2-btn.bn2-pressed {
          transform: scale(0.88);
          background: rgba(255,255,255,0.06);
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
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.4));
        }

        .bn2-btn:not(.bn2-on) .bn2-btn-icon {
          color: rgba(255,255,255,0.32);
        }

        /* Active dot */
        .bn2-dot {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #fff;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .bn2-btn.bn2-on .bn2-dot { opacity: 0.7; }

        /* Center FAB button — floats above the bar */
        .bn2-fab-wrap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .bn2-fab {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          pointer-events: all;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #a855f7, #7c3aed);
          box-shadow:
            0 0 0 3px rgba(168, 85, 247, 0.2),
            0 4px 20px rgba(124, 58, 237, 0.6),
            0 2px 6px rgba(0,0,0,0.4);
          -webkit-tap-highlight-color: transparent;
          outline: none;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
          position: relative;
        }

        @media (min-width: 768px) {
          .bn2-fab { width: 42px; height: 42px; }
          .bn2-fab-wrap { bottom: 5px; }
        }

        .bn2-fab:active,
        .bn2-fab.bn2-fab-pressed {
          transform: scale(0.9);
          box-shadow:
            0 0 0 3px rgba(168, 85, 247, 0.3),
            0 2px 10px rgba(124, 58, 237, 0.5);
        }

        .bn2-fab.bn2-fab-active {
          background: linear-gradient(145deg, #c084fc, #9333ea);
          box-shadow:
            0 0 0 4px rgba(192, 132, 252, 0.3),
            0 6px 24px rgba(147, 51, 234, 0.7);
        }

        .bn2-fab-icon {
          width: 22px;
          height: 22px;
          color: #fff;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (min-width: 768px) {
          .bn2-fab-icon { width: 17px; height: 17px; }
        }

        .bn2-fab:active .bn2-fab-icon {
          transform: scale(0.85);
        }

        /* Subtle pulse on FAB */
        .bn2-fab-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid rgba(168, 85, 247, 0.35);
          animation: bn2-pulse 2.8s ease-out infinite;
          pointer-events: none;
        }

        @keyframes bn2-pulse {
          0%   { opacity: 0.6; transform: scale(1); }
          65%  { opacity: 0;   transform: scale(1.45); }
          100% { opacity: 0;   transform: scale(1.45); }
        }
      `}</style>

      <nav className="bn2-wrap" role="navigation" aria-label="Main navigation">
        <div className="bn2-bar">
          {/* Left items */}
          {leftItems.map(({ id, icon: Icon, label, route }) => {
            const active = isActive(route);
            return (
              <button
                key={id}
                onClick={() => handleClick(id, route)}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`bn2-btn${active ? " bn2-on" : ""}${pressed === id ? " bn2-pressed" : ""}`}
              >
                <Icon
                  className="bn2-btn-icon"
                  strokeWidth={active ? 2.2 : 1.7}
                />
                <span className="bn2-dot" />
              </button>
            );
          })}

          {/* Gap for FAB */}
          <div className="bn2-gap" />

          {/* Right items */}
          {rightItems.map(({ id, icon: Icon, label, route }) => {
            const active = isActive(route);
            return (
              <button
                key={id}
                onClick={() => handleClick(id, route)}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`bn2-btn${active ? " bn2-on" : ""}${pressed === id ? " bn2-pressed" : ""}`}
              >
                <Icon
                  className="bn2-btn-icon"
                  strokeWidth={active ? 2.2 : 1.7}
                />
                <span className="bn2-dot" />
              </button>
            );
          })}

          {/* Floating center FAB */}
          <div className="bn2-fab-wrap">
            <button
              onClick={() => handleClick(centerItem.id, centerItem.route)}
              aria-label={centerItem.label}
              aria-current={isActive(centerItem.route) ? "page" : undefined}
              className={`bn2-fab${isActive(centerItem.route) ? " bn2-fab-active" : ""}${pressed === centerItem.id ? " bn2-fab-pressed" : ""}`}
            >
              <span className="bn2-fab-pulse" />
              <centerItem.icon className="bn2-fab-icon" strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;

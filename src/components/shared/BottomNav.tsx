import { Home, ScanLine, Shield, MapIcon, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

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
  const [ripple, setRipple] = useState<{ id: string; key: number } | null>(
    null,
  );
  const rippleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = navItems.findIndex(({ route }) =>
    route === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(route),
  );

  const handleClick = (id: string, route: string) => {
    if (rippleTimer.current) clearTimeout(rippleTimer.current);
    setRipple({ id, key: Date.now() });
    rippleTimer.current = setTimeout(() => setRipple(null), 500);
    navigate(route);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .bnav-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          bottom: 0;
          width: 100%;
          max-width: 430px;
          padding: 0 14px calc(env(safe-area-inset-bottom, 0px) + 10px);
        }

        @media (min-width: 768px) {
          .bnav-root {
            bottom: 28px;
            max-width: 320px;
            padding: 0;
          }
        }

        .bnav-glass {
          display: flex;
          align-items: center;
          position: relative;
          background: rgba(8, 8, 12, 0.88);
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 6px 4px;
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,0.04) inset,
            0 2px 0 rgba(255,255,255,0.03) inset,
            0 -1px 30px rgba(0,0,0,0.5),
            0 12px 50px rgba(0,0,0,0.55),
            0 4px 16px rgba(0,0,0,0.4);
        }

        @media (min-width: 768px) {
          .bnav-glass {
            padding: 4px 3px;
            border-radius: 22px;
            /* Extra ambient glow on desktop */
            box-shadow:
              0 0 0 0.5px rgba(255,255,255,0.05) inset,
              0 2px 0 rgba(255,255,255,0.04) inset,
              0 0 0 1px rgba(99,102,241,0.12),
              0 8px 32px rgba(0,0,0,0.6),
              0 0 60px rgba(99,102,241,0.08),
              0 20px 60px rgba(0,0,0,0.5);
          }
        }

        .bnav-slider {
          position: absolute;
          top: 6px;
          bottom: 6px;
          border-radius: 22px;
          background: linear-gradient(140deg,
            rgba(99, 102, 241, 0.22) 0%,
            rgba(168, 85, 247, 0.14) 100%
          );
          border: 1px solid rgba(139, 92, 246, 0.28);
          box-shadow:
            0 0 24px rgba(99, 102, 241, 0.18),
            0 0 8px rgba(139, 92, 246, 0.12) inset;
          transition:
            left  0.38s cubic-bezier(0.34, 1.52, 0.64, 1),
            width 0.38s cubic-bezier(0.34, 1.52, 0.64, 1);
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .bnav-slider { top: 4px; bottom: 4px; }
        }

        .bnav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 9px 4px 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          transition: transform 0.13s ease;
          user-select: none;
        }

        .bnav-item:active { transform: scale(0.91); }

        @media (min-width: 768px) {
          .bnav-item { padding: 6px 4px 5px; gap: 2px; }
        }

        .bnav-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
        }

        .bnav-icon {
          transition:
            transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
            color      0.2s ease,
            filter     0.2s ease;
          width: 20px;
          height: 20px;
        }

        @media (min-width: 768px) {
          .bnav-icon { width: 16px; height: 16px; }
          .bnav-icon-wrap { width: 20px; height: 20px; }
        }

        .bnav-item.active .bnav-icon {
          transform: translateY(-1.5px) scale(1.14);
          color: #a78bfa;
          filter: drop-shadow(0 0 9px rgba(167, 139, 250, 0.65));
        }

        .bnav-item:not(.active) .bnav-icon {
          color: rgba(255,255,255,0.32);
          transform: translateY(0) scale(1);
        }

        .bnav-label {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.025em;
          line-height: 1;
          transition: color 0.2s ease, opacity 0.2s ease;
        }

        @media (min-width: 768px) {
          .bnav-label { font-size: 8px; letter-spacing: 0.03em; }
        }

        .bnav-item.active .bnav-label     { color: #c4b5fd; opacity: 1; }
        .bnav-item:not(.active) .bnav-label { color: rgba(255,255,255,0.28); opacity: 1; }

        .bnav-dot {
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 7px rgba(167, 139, 250, 0.9);
          animation: bnav-dot-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes bnav-dot-in {
          from { opacity: 0; transform: translateX(-50%) scale(0); }
          to   { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        .bnav-ripple {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          background: radial-gradient(circle at center, rgba(167,139,250,0.18) 0%, transparent 70%);
          transform: scale(0);
          animation: bnav-ripple-out 0.5s ease-out forwards;
          pointer-events: none;
        }

        @keyframes bnav-ripple-out {
          to { transform: scale(2.4); opacity: 0; }
        }

        /* Ambient underlight on desktop */
        @media (min-width: 768px) {
          .bnav-root::after {
            content: '';
            position: absolute;
            bottom: -16px;
            left: 50%;
            transform: translateX(-50%);
            width: 55%;
            height: 18px;
            background: radial-gradient(ellipse at center, rgba(99,102,241,0.3), transparent 70%);
            filter: blur(10px);
            pointer-events: none;
            border-radius: 50%;
          }
        }
      `}</style>

      <nav className="bnav-root" role="navigation" aria-label="Main navigation">
        <div className="bnav-glass">
          <SliderPill activeIndex={activeIndex} total={navItems.length} />

          {navItems.map(({ id, icon: Icon, label, route }, i) => {
            const active = i === activeIndex;
            const isRippling = ripple?.id === id;

            return (
              <button
                key={id}
                onClick={() => handleClick(id, route)}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`bnav-item${active ? " active" : ""}`}
              >
                {isRippling && (
                  <span className="bnav-ripple" key={ripple?.key} />
                )}

                <span className="bnav-icon-wrap">
                  <Icon
                    className="bnav-icon"
                    strokeWidth={active ? 2.25 : 1.6}
                  />
                  {active && <span className="bnav-dot" />}
                </span>

                <span className="bnav-label">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

const SliderPill = ({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) => {
  const pct = 100 / total;
  return (
    <span
      className="bnav-slider"
      style={{
        left: `calc(${activeIndex * pct}% + 4px)`,
        width: `calc(${pct}% - 8px)`,
      }}
    />
  );
};

export default BottomNav;

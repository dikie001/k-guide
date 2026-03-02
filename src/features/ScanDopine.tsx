import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Barcode,
  Camera,
  ChevronRight,
  FlipHorizontal,
  History,
  Keyboard,
  ScanLine,
  Search,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  X,
  Zap,
  ZapOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = "SAFE" | "CAUTION" | "BANNED";
type ViewMode = "scan" | "manual" | "analyzing" | "result";

interface DrugResult {
  name: string;
  brand: string;
  status: Status;
  type: string;
  details: string;
}

// ─── Mock DB ──────────────────────────────────────────────────────────────────
const MOCK_DB: DrugResult[] = [
  {
    name: "Ibuprofen 200mg",
    brand: "Advil",
    status: "SAFE",
    type: "In-Competition",
    details:
      "Permitted under WADA 2026 prohibited list. No restrictions apply.",
  },
  {
    name: "Pseudoephedrine",
    brand: "Sudafed",
    status: "CAUTION",
    type: "In-Competition",
    details:
      "Prohibited above 150 micrograms per millilitre in urine. Therapeutic use may require TUE.",
  },
  {
    name: "Clenbuterol",
    brand: "Spiropent",
    status: "BANNED",
    type: "Always Prohibited",
    details:
      "Anabolic agent — zero tolerance in all competition and out-of-competition contexts.",
  },
];

const QUICK_SEARCHES = ["Caffeine", "Aspirin", "Insulin", "Melatonin"];

// ─── Status Config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  Status,
  {
    pill: string;
    icon: React.ReactNode;
    glow: string;
    card: string;
    label: string;
  }
> = {
  SAFE: {
    pill: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_16px_rgba(52,211,153,0.12)]",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    glow: "shadow-[0_0_60px_rgba(52,211,153,0.15)]",
    card: "from-emerald-500/8 to-transparent border-emerald-500/20",
    label: "Permitted",
  },
  CAUTION: {
    pill: "bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-[0_0_16px_rgba(245,158,11,0.12)]",
    icon: <TriangleAlert className="w-3.5 h-3.5" />,
    glow: "shadow-[0_0_60px_rgba(245,158,11,0.15)]",
    card: "from-amber-500/8 to-transparent border-amber-500/20",
    label: "Use with caution",
  },
  BANNED: {
    pill: "bg-red-500/15 text-red-400 border-red-500/40 shadow-[0_0_16px_rgba(239,68,68,0.12)]",
    icon: <ShieldAlert className="w-3.5 h-3.5" />,
    glow: "shadow-[0_0_60px_rgba(239,68,68,0.2)]",
    card: "from-red-500/8 to-transparent border-red-500/20",
    label: "Prohibited",
  },
};

// ─── StatusBadge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase ${cfg.pill}`}
    >
      {cfg.icon}
      {status}
    </span>
  );
};

// ─── Corner SVG ──────────────────────────────────────────────────────────────
const Corner = ({ rotate }: { rotate: number }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)` }}
    className="absolute"
  >
    <path
      d="M4 32 L4 4 L32 4"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ScanDopine() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );
  const [torchOn, setTorchOn] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("scan");
  const [result, setResult] = useState<DrugResult | null>(null);
  const [manualQuery, setManualQuery] = useState("");
  const [scanPulse, setScanPulse] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Camera lifecycle ────────────────────────────────────────────────────────
  useEffect(() => {
    const isActive = viewMode === "scan" || viewMode === "analyzing";
    if (!isActive) {
      stopStream();
      return;
    }
    startCamera();
    return stopStream;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode, viewMode]);

  const startCamera = async () => {
    stopStream();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch {
      setHasPermission(false);
    }
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  // ── Controls ────────────────────────────────────────────────────────────────
  const toggleCamera = () => {
    setTorchOn(false);
    setFacingMode((p) => (p === "environment" ? "user" : "environment"));
  };

  const toggleTorch = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    const caps = track.getCapabilities?.() as
      | Record<string, unknown>
      | undefined;
    if (!caps?.torch) return;
    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as MediaTrackConstraintSet],
      });
      setTorchOn((p) => !p);
    } catch {
      /* unsupported */
    }
  };

  const handleBack = () => {
    if (viewMode === "result" || viewMode === "manual") {
      resetScan();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  // ── Actions ─────────────────────────────────────────────────────────────────
  const triggerAnalysis = (query?: string) => {
    setScanPulse(true);
    setViewMode("analyzing");
    navigator.vibrate?.(50);

    setTimeout(() => {
      const found = query
        ? (MOCK_DB.find(
            (d) =>
              d.name.toLowerCase().includes(query.toLowerCase()) ||
              d.brand.toLowerCase().includes(query.toLowerCase()),
          ) ?? MOCK_DB[0])
        : MOCK_DB[Math.floor(Math.random() * MOCK_DB.length)];

      setResult(found);
      setViewMode("result");
      setScanPulse(false);
      navigator.vibrate?.([80, 40, 80]);
    }, 1600);
  };

  const handleScanTrigger = () => triggerAnalysis();

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualQuery.trim()) triggerAnalysis(manualQuery.trim());
  };

  const resetScan = () => {
    setResult(null);
    setManualQuery("");
    setViewMode("scan");
  };

  // ── Permission denied ────────────────────────────────────────────────────────
  if (hasPermission === false) {
    return (
      <div className="h-screen w-full bg-[#080810] flex flex-col items-center justify-center text-white p-8 gap-6">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <Camera className="h-9 w-9 text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Camera access denied</h2>
          <p className="text-sm text-white/40">
            Please allow camera access in your browser settings.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  const isCamera = viewMode === "scan" || viewMode === "analyzing";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .sd-root { font-family: 'DM Sans', sans-serif; }
        .sd-title { font-family: 'Syne', sans-serif; }

        /* Scan line animation */
        @keyframes scan-sweep {
          0%   { transform: translateY(0);    opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(260px); opacity: 0; }
        }
        .scan-line-anim { animation: scan-sweep 2.2s cubic-bezier(0.4,0,0.6,1) infinite; }

        /* Corner pulse */
        @keyframes corner-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .corner-pulse { animation: corner-pulse 2s ease-in-out infinite; }

        /* Spinner */
        @keyframes spin-smooth { to { transform: rotate(360deg); } }
        .spin-smooth { animation: spin-smooth 1s linear infinite; }

        /* Counter-spin for inner ring */
        @keyframes spin-rev { to { transform: rotate(-360deg); } }
        .spin-rev { animation: spin-rev 1.4s linear infinite; }

        /* Fade-slide in */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards; }

        /* Sheet slide */
        @keyframes sheet-in {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .sheet-in { animation: sheet-in 0.4s cubic-bezier(0.32,0.72,0,1) forwards; }

        /* Shutter ring pulse on trigger */
        @keyframes ring-flash {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.6); }
          100% { box-shadow: 0 0 0 22px rgba(255,255,255,0); }
        }
        .ring-flash { animation: ring-flash 0.5s ease-out; }

        /* Vignette overlay */
        .vignette {
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%);
        }

        /* Torch glow */
        @keyframes torch-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .torch-active { animation: torch-pulse 1.5s ease-in-out infinite; }

        /* Scan pulse overlay */
        @keyframes scan-flash {
          0% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        .scan-flash { animation: scan-flash 0.4s ease-out forwards; }

        /* Safe area helpers */
        .pt-safe { padding-top: max(16px, env(safe-area-inset-top, 16px)); }
        .pb-safe { padding-bottom: max(20px, env(safe-area-inset-bottom, 20px)); }
      `}</style>

      <div className="sd-root relative h-[100dvh] w-full bg-[#080810] overflow-hidden text-white select-none">
        {/* ── CAMERA FEED ─────────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            isCamera ? "opacity-100" : "opacity-0 pointer-events-none"
          } ${viewMode === "analyzing" ? "scale-105 blur-[2px]" : "scale-100"}`}
        />

        {/* Vignette */}
        {isCamera && (
          <div className="vignette absolute inset-0 z-[1] pointer-events-none" />
        )}

        {/* Scan flash on trigger */}
        {viewMode === "analyzing" && scanPulse && (
          <div className="scan-flash absolute inset-0 z-[2] bg-white/10 pointer-events-none" />
        )}

        {/* ── TOP HEADER ─────────────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 z-50 pt-safe px-4 pb-3 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent">
          <button
            onClick={handleBack}
            className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2} />
          </button>

          <p className="sd-title text-sm font-bold tracking-[0.12em] uppercase text-white/70">
            Scan·Dopine
          </p>

          <div className="flex items-center gap-2">
            {viewMode === "scan" && (
              <>
                <button
                  onClick={toggleTorch}
                  className={`h-10 w-10 rounded-2xl backdrop-blur-xl border flex items-center justify-center active:scale-95 transition-all ${
                    torchOn
                      ? "bg-yellow-400/20 border-yellow-400/40 torch-active"
                      : "bg-white/10 border-white/10 hover:bg-white/15"
                  }`}
                >
                  {torchOn ? (
                    <Zap className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                  ) : (
                    <ZapOff className="h-4 w-4 text-white/60" />
                  )}
                </button>

                <button
                  onClick={toggleCamera}
                  className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all"
                >
                  <FlipHorizontal className="h-4 w-4 text-white/60" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── SCAN VIEW ──────────────────────────────────────────────────── */}
        {viewMode === "scan" && (
          <div className="absolute inset-0 z-10 flex flex-col">
            {/* Viewfinder area */}
            <div className="flex-1 flex items-center justify-center px-10">
              <div className="relative w-full max-w-[270px] aspect-square">
                {/* Dim overlay outside the frame */}
                <div className="absolute -inset-[9999px] bg-black/50 z-0" />
                <div className="absolute inset-0 z-10" />

                {/* Corner brackets */}
                <div className="corner-pulse absolute top-0 left-0">
                  <Corner rotate={0} />
                </div>
                <div className="corner-pulse absolute top-0 right-0">
                  <Corner rotate={90} />
                </div>
                <div className="corner-pulse absolute bottom-0 left-0">
                  <Corner rotate={270} />
                </div>
                <div className="corner-pulse absolute bottom-0 right-0">
                  <Corner rotate={180} />
                </div>

                {/* Scan line */}
                <div className="absolute inset-x-3 top-3 bottom-3 overflow-hidden z-20 pointer-events-none">
                  <div className="scan-line-anim absolute left-0 right-0 top-0">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-90 shadow-[0_0_12px_2px_rgba(0,212,255,0.5)]" />
                    <div className="h-12 bg-gradient-to-b from-[#00d4ff]/10 to-transparent" />
                  </div>
                </div>

                {/* Frame label */}
                <p className="absolute -bottom-10 left-0 right-0 text-center text-[11px] font-medium tracking-wider text-white/50 uppercase">
                  Align barcode within frame
                </p>
              </div>
            </div>

            {/* Bottom controls */}
            <div className="pb-safe px-8 pt-6 flex flex-col gap-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="flex items-center justify-between px-4">
                {/* Manual */}
                <button
                  onClick={() => setViewMode("manual")}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all">
                    <Keyboard className="h-5 w-5 text-white/70" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-white/40">
                    Manual
                  </span>
                </button>

                {/* Shutter */}
                <button
                  onClick={handleScanTrigger}
                  className="group relative h-[76px] w-[76px] flex items-center justify-center active:scale-95 transition-transform"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-[2.5px] border-white/25 group-active:border-white/50 transition-colors" />
                  {/* Inner button */}
                  <div className="h-[58px] w-[58px] bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] group-active:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all group-active:scale-90">
                    <ScanLine
                      className="h-5 w-5 text-black/60"
                      strokeWidth={2.5}
                    />
                  </div>
                </button>

                {/* History */}
                <button className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all">
                    <History className="h-5 w-5 text-white/70" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-white/40">
                    Recent
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYZING ──────────────────────────────────────────────────── */}
        {viewMode === "analyzing" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8">
            {/* Spinner */}
            <div className="relative w-24 h-24">
              <div className="spin-smooth absolute inset-0 rounded-full border-[2px] border-transparent border-t-[#00d4ff] border-r-[#00d4ff]/30" />
              <div className="spin-rev absolute inset-3 rounded-full border-[2px] border-transparent border-b-[#a78bfa] border-l-[#a78bfa]/30" />
              <div className="absolute inset-[18px] rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <ScanLine className="h-5 w-5 text-white/60" strokeWidth={1.8} />
              </div>
            </div>

            <div className="text-center fade-up">
              <p className="sd-title text-lg font-bold tracking-wide">
                Analyzing Compound
              </p>
              <p className="text-sm text-white/40 mt-1">
                Cross-referencing WADA 2026 list…
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                  style={{
                    animation: `corner-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── MANUAL ENTRY ───────────────────────────────────────────────── */}
        {viewMode === "manual" && (
          <div className="absolute inset-0 z-30 bg-[#080810] flex flex-col pt-safe">
            <div className="flex-1 overflow-y-auto px-6 pt-20 pb-8">
              <div className="fade-up">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00d4ff]/70 mb-3">
                  Database Search
                </p>
                <h1 className="sd-title text-3xl font-extrabold leading-tight mb-2">
                  Find a substance
                </h1>
                <p className="text-sm text-white/40 mb-8 leading-relaxed">
                  Enter the medication, supplement, or substance name to check
                  against WADA 2026 guidelines.
                </p>

                <form
                  onSubmit={handleManualSearch}
                  className="flex flex-col gap-3 mb-8"
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <Input
                      autoFocus
                      placeholder="e.g. Ibuprofen, Clenbuterol…"
                      value={manualQuery}
                      onChange={(e) => setManualQuery(e.target.value)}
                      className="h-13 pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-2xl text-sm focus-visible:ring-[#00d4ff]/50 focus-visible:border-[#00d4ff]/40"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-13 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] font-semibold text-sm hover:bg-[#00d4ff]/15 active:scale-[0.98] transition-all"
                  >
                    Check compliance
                  </button>
                </form>

                {/* Quick searches */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/25 mb-3">
                    Quick searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SEARCHES.map((item) => (
                      <button
                        key={item}
                        onClick={() => setManualQuery(item)}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 text-sm font-medium hover:bg-white/8 hover:text-white/80 active:scale-95 transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT SHEET ────────────────────────────────────────────────── */}
        {viewMode === "result" && result && (
          <div className="absolute inset-0 z-40 flex items-end sm:items-center justify-center sm:p-6">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={resetScan}
            />

            {/* Sheet */}
            <div
              className={`sheet-in relative w-full max-w-md rounded-t-[32px] sm:rounded-[32px] overflow-hidden ${STATUS_CONFIG[result.status].glow}`}
            >
              {/* Status gradient header */}
              <div
                className={`bg-gradient-to-br ${STATUS_CONFIG[result.status].card} border-b border-white/5 p-6 pt-7 bg-[#0f0f18]`}
              >
                {/* Drag handle */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/15 sm:hidden" />

                <div className="flex items-start justify-between mb-5">
                  <StatusBadge status={result.status} />
                  <button
                    onClick={resetScan}
                    className="h-8 w-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/12 active:scale-95 transition-all -mr-1"
                  >
                    <X className="h-3.5 w-3.5 text-white/50" />
                  </button>
                </div>

                <h2 className="sd-title text-2xl font-extrabold text-white leading-snug">
                  {result.name}
                </h2>
                <p className="text-white/45 font-medium text-sm mt-1">
                  {result.brand}
                </p>
              </div>

              {/* Body */}
              <div className="bg-[#0f0f18] p-6 space-y-4">
                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/4 border border-white/7">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1.5">
                      Competition
                    </p>
                    <p className="text-sm font-semibold text-white/85">
                      {result.type}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/4 border border-white/7">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1.5">
                      Detection ID
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Barcode className="h-3 w-3 text-white/30 flex-shrink-0" />
                      <p className="text-sm font-semibold text-white/85 font-mono">
                        {Math.floor(Math.random() * 9000000 + 1000000)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div
                  className={`p-4 rounded-2xl border bg-gradient-to-br ${STATUS_CONFIG[result.status].card}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">
                    WADA 2026 Ruling
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {result.details}
                  </p>
                </div>

                {/* Verdict pill */}
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/3 border border-white/7">
                  <div
                    className={`h-2 w-2 rounded-full flex-shrink-0 ${
                      result.status === "SAFE"
                        ? "bg-emerald-400"
                        : result.status === "CAUTION"
                          ? "bg-amber-400"
                          : "bg-red-400"
                    } shadow-[0_0_8px_currentColor]`}
                  />
                  <p className="text-xs text-white/50">
                    {STATUS_CONFIG[result.status].label} — always verify with
                    your team physician.
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={resetScan}
                  className="w-full h-13 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm hover:bg-white/12 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Scan next item
                  <ChevronRight className="h-4 w-4 text-white/50" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

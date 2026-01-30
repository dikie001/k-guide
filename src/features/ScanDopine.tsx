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
  X,
  Zap,
  ZapOff
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Mock database for the "Working" manual search
const MOCK_DB = [
  { name: "Ibuprofen 200mg", brand: "Advil", status: "SAFE", type: "In-Competition", details: "Permitted under WADA 2026." },
  { name: "Pseudoephedrine", brand: "Sudafed", status: "CAUTION", type: "In-Competition", details: "Prohibited >150 microgram/ml in urine." },
  { name: "Clenbuterol", brand: "Spiropent", status: "BANNED", type: "Always Prohibited", details: "Anabolic agent. Zero tolerance." },
];

export default function ScanDopine() {
  // --- State ---
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);

  // Modes: 'scan' | 'manual' | 'analyzing' | 'result'
  const [viewMode, setViewMode] = useState<'scan' | 'manual' | 'analyzing' | 'result'>('scan');
  const [scannedResult, setScannedResult] = useState<any>(null);
  const [manualQuery, setManualQuery] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  // --- 1. Navigation / Back Logic ---
  const handleBack = () => {
    if (viewMode === 'result' || viewMode === 'manual') {
      resetScan();
    } else {
      // Check if history exists, otherwise helpful fallback
      if (window.history.length > 1) {
        window.history.back();
      } else {
        console.log("No history to go back to");
      }
    }
  };

  // --- 2. Camera Logic ---
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (viewMode !== 'scan' && viewMode !== 'analyzing') return;

      try {
        if (stream) {
          // @ts-ignore
          stream.getTracks().forEach(track => track.stop());
        }

        const constraints = {
          video: {
            facingMode: cameraFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Camera Error:", err);
        setHasPermission(false);
      }
    };

    startCamera();

    return () => {
      // @ts-ignore
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [cameraFacingMode, viewMode]);

  const toggleCamera = () => {
    setCameraFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    setTorchOn(false); // Reset torch when flipping
  };

  const toggleTorch = async () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];
      // @ts-ignore
      const capabilities = (track.getCapabilities ? track.getCapabilities() : {}) as any;

      // Check if torch is supported on this device/track
      if (capabilities.torch || 'torch' in track.getSettings()) {
        try {
          // @ts-ignore
          await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
          setTorchOn(!torchOn);
        } catch (e) {
          console.log("Torch error or not supported on this specific lens", e);
        }
      } else {
        console.log("Torch capability not reported by browser");
      }
    }
  };

  // --- 3. Actions ---
  const handleScanTrigger = () => {
    if (navigator.vibrate) navigator.vibrate(50); // Haptic feedback
    setViewMode('analyzing');

    // Simulate API latency
    setTimeout(() => {
      const randomResult = MOCK_DB[0]; // Default to Safe for demo
      setScannedResult(randomResult);
      setViewMode('result');
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // Success haptics
    }, 1500);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setViewMode('analyzing');

    setTimeout(() => {
      // Simple mock filter
      const result = MOCK_DB.find(item =>
        item.name.toLowerCase().includes(manualQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(manualQuery.toLowerCase())
      ) || MOCK_DB[0];

      setScannedResult(result);
      setViewMode('result');
    }, 1000);
  };

  const resetScan = () => {
    setViewMode('scan');
    setScannedResult(null);
    setManualQuery("");
  };

  // --- 4. Sub-Components (Status Badges) ---
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      SAFE: "bg-green-500/20 text-green-400 border-green-500/50",
      CAUTION: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      BANNED: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    const icons = {
      SAFE: <ShieldCheck className="w-4 h-4 mr-1" />,
      CAUTION: <ShieldAlert className="w-4 h-4 mr-1" />,
      BANNED: <X className="w-4 h-4 mr-1" />,
    };
    // @ts-ignore
    const activeStyle = styles[status] || styles.SAFE;
    // @ts-ignore
    const activeIcon = icons[status] || icons.SAFE;

    return (
      <div className={`inline-flex items-center px-3 py-1 border rounded-full backdrop-blur-md ${activeStyle}`}>
        {activeIcon}
        <span className="text-[10px] font-bold tracking-widest uppercase">{status}</span>
      </div>
    );
  };

  if (hasPermission === false) {
    return (
      <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-white p-6">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <Camera className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">Camera Access Denied</h2>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-4 cursor-pointer">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-zinc-950 overflow-hidden font-sans text-slate-50">

      {/* --- LAYER 1: CAMERA FEED --- */}
      {(viewMode === 'scan' || viewMode === 'analyzing') && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${viewMode === 'analyzing' ? 'opacity-40 blur-sm' : 'opacity-100'}`}
        />
      )}

      {/* --- LAYER 2: HEADER (Always Visible) --- */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-safe-top p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="rounded-full mt-1 cursor-pointer bg-black/20 backdrop-blur-md text-white hover:bg-white/10 border border-white/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          {viewMode === 'scan' && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTorch} 
              className="rounded-full cursor-pointer text-white hover:bg-white/10"
            >
              {torchOn ? <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400" /> : <ZapOff className="h-5 w-5 opacity-70" />}
            </Button>
          )}
          {viewMode === 'scan' && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCamera} 
              className="rounded-full cursor-pointer text-white hover:bg-white/10"
            >
              <FlipHorizontal className="h-5 w-5 opacity-70" />
            </Button>
          )}
        </div>
      </div>

      {/* --- LAYER 3: SCANNER UI --- */}
      {viewMode === 'scan' && (
        <div className="absolute inset-0 z-10 flex flex-col pt-20 pb-safe-bottom">

          {/* Viewfinder */}
          <div className="flex-1 flex flex-col items-center justify-center relative px-8">
            <div className="relative w-full aspect-square max-w-[300px]">
              {/* Corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-white rounded-tl-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-white rounded-tr-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-white rounded-bl-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-white rounded-br-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>

              {/* Scan Line Animation */}
              <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-red-500 shadow-[0_0_20px_2px_rgba(239,68,68,0.6)] animate-[scan-vertical_2s_ease-in-out_infinite]"></div>

              <p className="absolute -bottom-12 left-0 right-0 text-center text-white/70 text-sm font-medium">
                Align code within frame
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="p-6 pb-10 flex flex-col gap-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode('manual')}
                  className="h-12 w-12 rounded-full cursor-pointer border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm"
                >
                  <Keyboard className="h-5 w-5" />
                </Button>
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Manual</span>
              </div>

              {/* Shutter Button */}
              <button
                onClick={handleScanTrigger}
                className="group relative h-20 w-20 flex items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 rounded-full border-4 border-white/30 group-active:scale-95 transition-transform duration-100"></div>
                <div className="h-16 w-16 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] group-active:scale-90 transition-transform duration-100"></div>
              </button>

              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full cursor-pointer border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm"
                >
                  <History className="h-5 w-5" />
                </Button>
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Recent</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- LAYER 4: ANALYZING STATE --- */}
      {viewMode === 'analyzing' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
            <ScanLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white/50 animate-pulse" />
          </div>
          <p className="mt-6 text-lg font-medium text-white tracking-tight animate-pulse">Analyzing Compound...</p>
        </div>
      )}

      {/* --- LAYER 5: MANUAL ENTRY FORM --- */}
      {viewMode === 'manual' && (
        <div className="absolute inset-0 z-30 bg-zinc-950 flex flex-col pt-24 px-6">
          <h1 className="text-3xl font-bold text-white mb-2">Search Database</h1>
          <p className="text-zinc-400 mb-8">Enter the medication name or serial number to check WADA compliance.</p>

          <form onSubmit={handleManualSearch} className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
              <Input
                autoFocus
                placeholder="e.g. Advil, Ibuprofen..."
                value={manualQuery}
                onChange={(e) => setManualQuery(e.target.value)}
                className="h-12 pl-12 bg-zinc-900 border-zinc-800 text-white rounded-xl focus-visible:ring-blue-600"
              />
            </div>
            <Button type="submit" className="h-12 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Check Compliance
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Quick Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Caffeine", "Aspirin", "Insulin", "Melatonin"].map(item => (
                <button
                  key={item}
                  onClick={() => { setManualQuery(item); }}
                  className="px-4 py-2 rounded-lg cursor-pointer bg-zinc-900 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- LAYER 6: RESULT CARD --- */}
      {viewMode === 'result' && scannedResult && (
        <div className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">

          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">

            {/* Card Header */}
            <div className="bg-zinc-100 p-6 border-b border-zinc-200">
              <div className="flex justify-between items-start mb-4">
                <StatusBadge status={scannedResult.status} />
                <Button variant="ghost" size="icon" onClick={resetScan} className="h-8 w-8 -mr-2 cursor-pointer text-zinc-400 hover:text-zinc-900">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900">{scannedResult.name}</h2>
              <p className="text-zinc-500 font-medium">{scannedResult.brand}</p>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Competition</p>
                  <p className="text-sm font-semibold text-zinc-900">{scannedResult.type}</p>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Detection ID</p>
                  <div className="flex items-center gap-1">
                    <Barcode className="h-3 w-3 text-zinc-400" />
                    <p className="text-sm font-semibold text-zinc-900">8839201</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="text-sm font-bold text-blue-900 mb-1">WADA Guidelines</h4>
                <p className="text-sm text-blue-700/80 leading-relaxed">
                  {scannedResult.details}
                </p>
              </div>

              <Button onClick={resetScan} className="w-full h-12 rounded-full cursor-pointer bg-zinc-900 text-white hover:bg-zinc-800 font-bold shadow-lg">
                Scan Next Item <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan-vertical {
          0% { top: 10%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import {
    AlertTriangle,
    CheckCircle,
    ChevronRight,
    RefreshCw,
    Search,
    ShieldCheck,
    X, Zap, ZapOff
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ScanDopine() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [torchOn, setTorchOn] = useState(false);
  const [scannedResult, setScannedResult] = useState<any>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- 1. Camera Initialization ---
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const constraints = { 
          video: { 
            facingMode: 'environment', // Use back camera on mobile
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
        console.error("Camera Access Denied:", err);
        setHasPermission(false);
      }
    };

    if (isScanning) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning]);

  // --- 2. Torch/Flash Toggle (Chrome/Android only usually) ---
  const toggleTorch = async () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];
      
      // Check if torch is supported
      const capabilities = track.getCapabilities() as any; // Cast to any for TS check
      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !torchOn }] as any
          });
          setTorchOn(!torchOn);
        } catch (e) {
          console.log("Torch error:", e);
        }
      }
    }
  };

  // --- 3. Capture & Analyze Logic ---
  const handleCapture = () => {
    setScanStatus('analyzing');
    
    // Simulate processing delay (OCR/Barcode lookup would happen here)
    setTimeout(() => {
      // MOCK RESULT DATA
      const mockResult = {
        name: "Ibuprofen 200mg",
        brand: "Advil",
        status: "SAFE", // or BANNED or CAUTION
        type: "In-Competition",
        details: "Not prohibited under WADA 2026 guidelines."
      };
      
      setScannedResult(mockResult);
      setScanStatus('result');
      setIsScanning(false); // Stop camera to save battery
    }, 2000);
  };

  const resetScan = () => {
    setScanStatus('idle');
    setScannedResult(null);
    setIsScanning(true);
  };

  // --- 4. Render State: Permission Denied ---
  if (hasPermission === false) {
    return (
      <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white p-6">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Camera Access Required</h2>
        <p className="text-center text-slate-400 mb-6">Please allow camera access in your browser settings to scan medications.</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 w-full rounded-full">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden font-sans">
      
      {/* --- LIVE CAMERA FEED --- */}
      {isScanning && (
        <video 
          ref={videoRef}
          autoPlay 
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* --- SCANNING UI OVERLAY --- */}
      {scanStatus !== 'result' && (
        <div className="relative z-10 h-full w-full flex flex-col justify-between pt-safe-top pb-safe-bottom">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/60 to-transparent">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
              <X className="h-6 w-6" />
            </Button>
            <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <span className="text-xs font-bold text-white tracking-wide">SCAN MEDICINE</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTorch} className="text-white hover:bg-white/20 rounded-full">
              {torchOn ? <Zap className="h-6 w-6 text-yellow-400 fill-yellow-400" /> : <ZapOff className="h-6 w-6" />}
            </Button>
          </div>

          {/* Viewfinder Area */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Dark Overlay with cutout */}
            <div className="absolute inset-0 bg-black/50 mask-image-scan" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 20% 100%, 20% 25%, 80% 25%, 80% 75%, 20% 75%, 20% 100%, 100% 100%, 100% 0%)' }}></div>
            
            {/* The Box */}
            <div className="relative w-72 h-72 rounded-3xl border-2 border-white/30 overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>

              {/* Laser Animation */}
              {scanStatus === 'analyzing' ? (
                <div className="absolute inset-0 bg-blue-500/20 animate-pulse flex items-center justify-center">
                   <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_2px_rgba(59,130,246,0.6)] animate-[scan_2s_ease-in-out_infinite]"></div>
              )}
            </div>
            
            <p className="mt-8 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
              {scanStatus === 'analyzing' ? 'Analyzing Composition...' : 'Align barcode or label in frame'}
            </p>
          </div>

          {/* Controls */}
          <div className="p-8 pb-12 flex flex-col items-center gap-6 bg-gradient-to-t from-black/80 to-transparent">
            {/* Trigger Button */}
            <div className="flex items-center gap-8">
               <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                 <Search className="h-6 w-6" />
               </Button>
               
               <button 
                onClick={handleCapture}
                className="h-20 w-20 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm active:scale-95 transition-all hover:bg-white/20"
               >
                 <div className="h-16 w-16 bg-white rounded-full shadow-lg"></div>
               </button>

               <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                 <RefreshCw className="h-6 w-6" />
               </Button>
            </div>
            <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Manual Entry</p>
          </div>
        </div>
      )}

      {/* --- RESULT SCREEN (If Scan Successful) --- */}
      {scanStatus === 'result' && scannedResult && (
        <div className="absolute inset-0 z-20 bg-slate-50 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
           {/* Result Header */}
           <div className="h-64 bg-slate-900 relative p-6 flex flex-col justify-end">
             <div className="absolute top-6 left-6 z-10">
               <Button 
                onClick={resetScan}
                variant="secondary" 
                size="sm" 
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-none rounded-full"
               >
                 <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Scan Again
               </Button>
             </div>
             
             {/* Product Image Placeholder */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>

             <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full mb-3 backdrop-blur-md">
                   <CheckCircle className="h-3 w-3 text-green-400" />
                   <span className="text-[10px] font-bold text-green-400 tracking-wide uppercase">WADA Compliant</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">{scannedResult.name}</h1>
                <p className="text-slate-400 font-medium">{scannedResult.brand}</p>
             </div>
           </div>

           {/* Result Body */}
           <div className="flex-1 p-6 -mt-6 bg-slate-50 rounded-t-3xl relative z-20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.2)]">
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   <p className="text-xs text-slate-400 font-bold uppercase mb-1">Status</p>
                   <p className="text-lg font-bold text-green-600 flex items-center gap-2">
                     <ShieldCheck className="h-5 w-5" /> Safe
                   </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   <p className="text-xs text-slate-400 font-bold uppercase mb-1">Type</p>
                   <p className="text-sm font-bold text-slate-800 pt-1">
                     In-Competition
                   </p>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 mb-6">
                 <h3 className="text-sm font-bold text-blue-800 mb-2">WADA Analysis</h3>
                 <p className="text-sm text-blue-700/80 leading-relaxed">
                   {scannedResult.details} This substance is widely accepted for use during training and competition periods.
                 </p>
              </div>

              <Button onClick={resetScan} className="w-full h-12 rounded-full bg-slate-900 text-white font-bold text-md shadow-lg shadow-slate-900/20 active:scale-95 transition-all">
                Scan Next Item
              </Button>
           </div>
        </div>
      )}

      {/* CSS for Scan Animation */}
      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
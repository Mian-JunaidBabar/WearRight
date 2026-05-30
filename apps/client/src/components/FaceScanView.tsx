import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, Sparkles, Binary } from 'lucide-react';
import { UserState } from '../types';

interface FaceScanViewProps {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

type ScanState = 'idle' | 'scanning' | 'complete';

export default function FaceScanView({ user, setUser }: FaceScanViewProps) {
  const [scanState, setScanState] = useState<ScanState>('complete'); // defaults to verified shown in HTML, but fully switchable
  const [progress, setProgress] = useState(100);
  const [activeTelemetry, setActiveTelemetry] = useState('GEOMETRY CALIBRATION IDLE');
  const [detectedContrast, setDetectedContrast] = useState('Medium Contrast');

  const telemetrySteps = [
    'PROJECTING SENSOR MAPPING...',
    'MAPPING CHROMATICITY COMPOSITION...',
    'EVALUATING SCLERA SPECTRAL VALUES...',
    'CORRELATING FACIAL SURFACE GEOMETRY...',
    'CALIBRATING CONTRAST RATIO RATINGS...',
    'CALCULATING SEAMLESS COUTURE BLEND...'
  ];

  const handleStartScan = () => {
    setScanState('scanning');
    setProgress(0);
    setActiveTelemetry(telemetrySteps[0]);

    // Fast metric timer progress mapping
    const timerInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerInterval);
          setScanState('complete');
          
          // Randomly assign standard styling contrast types
          const contrasts = ['High Contrast Cold', 'Medium Contrast Neutral', 'Low Contrast Warm', 'Deep Spectral Harmony'];
          const randomContrast = contrasts[Math.floor(Math.random() * contrasts.length)];
          setDetectedContrast(randomContrast);
          
          setUser(prevUser => ({
            ...prevUser,
            contrastType: randomContrast
          }));
          return 100;
        }
        
        const nextProg = prev + 5;
        // Shuffle active telemetries
        const telemetryStepIdx = Math.floor((nextProg / 100) * telemetrySteps.length);
        if (telemetrySteps[telemetryStepIdx]) {
          setActiveTelemetry(telemetrySteps[telemetryStepIdx]);
        }
        
        return nextProg;
      });
    }, 150);
  };

  const portraitSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuDEF8xKs_h15C2UCfzBNEPQNBGe_1iG_TT9Mjbz0PddnuZdhFbcBQ23g1BFaXOAyJ0HlRi1S3xBjefXSaiVQLDKj3qr8Dj2f7iJd_2k7NIq6xXFKtO5zAba9k0y7o2fu43Y3gIRgEHeIzmCpuhCAmN-dMtLysTsivz0p-xxPKIP9pWqDW5C7dYIxU1rwivSNyaMoXuqja39LT4h-TTU9MCSZTDdIE2qI3SJPM3OfDw9VFO_-eN1u1hKvUqpEs5iXH7LwSOBe_Z2c94";

  return (
    <div className="w-full bg-slate-50 min-h-[calc(100vh-80px)] py-12 px-6 flex flex-col items-center justify-center font-sans tracking-tight relative">
      
      {/* Background ambient lighting blur */}
      <div className="absolute right-10 top-20 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-20 w-72 h-72 bg-blue-200/5 rounded-full blur-3xl pointer-events-none" />

      {/* Frame Header Content info */}
      <header className="max-w-xl text-center mb-8 relative z-10 font-sans">
        <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
          Biometric Stylist
        </h2>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto font-sans font-medium">
          Align your facial structure inside the optic boundaries to evaluate skin optical contrast levels and generate custom palette recommendations.
        </p>
      </header>

      {/* Scanner Viewport Box */}
      <div className="relative w-full max-w-[400px] aspect-[3/4] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden group select-none">
        
        {/* Core Subject Image */}
        <img 
          src={portraitSrc} 
          alt="Clean lit fashion portrait subject" 
          className={`w-full h-full object-cover transition-all duration-700 ${
            scanState === 'scanning' ? 'brightness-105 saturate-150 grayscale-0' : 'grayscale-[20%] brightness-105'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Low transparency dark layer */}
        <div className="absolute inset-0 bg-slate-950/20" />

        {/* Framing border corners */}
        <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-blue-500 z-10 rounded-tl-md" />
        <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-blue-500 z-10 rounded-tr-md" />
        <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-blue-500 z-10 rounded-bl-md" />
        <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-blue-500 z-10 rounded-br-md" />

        {/* Dynamic Scanning Line */}
        {scanState === 'scanning' && (
          <motion.div 
            initial={{ top: '10%' }}
            animate={{ top: '90%' }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2.2, 
              ease: "easeInOut" 
            }}
            className="absolute left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_15px_3px_#2563eb] z-20 pointer-events-none"
          />
        )}

        {scanState === 'complete' && (
          <div className="absolute inset-0 bg-slate-900/10 pointer-events-none border-2 border-emerald-500/30" />
        )}

        {/* Telemetry Dots overlay */}
        <div className="absolute top-1/3 left-[32%] w-2 h-2 rounded-full border border-blue-400/80 bg-blue-500/40 animate-pulse" />
        <div className="absolute top-1/3 right-[32%] w-2 h-2 rounded-full border border-blue-400/80 bg-blue-500/40 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full border border-blue-400/50 bg-blue-500/10" />

        {/* Interactive scanning display percentage */}
        {scanState === 'scanning' && (
          <div className="absolute top-4 left-4 bg-black/75 px-3 py-1 text-[10px] text-blue-400 font-mono font-bold tracking-widest rounded flex items-center gap-1.5 backdrop-blur-sm shadow z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>ANALYSIS PROGRESS: {progress}%</span>
          </div>
        )}
      </div>

      {/* Controls & Telemetry Stats Panel */}
      <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-sm">
        
        {/* Scanning telemetry logs */}
        {scanState === 'scanning' && (
          <div className="flex items-center gap-2 p-3.5 bg-slate-900 text-blue-400 text-[10px] font-mono font-bold uppercase rounded-xl w-full justify-center shadow-lg tracking-widest leading-none border border-slate-800">
            <Binary className="w-4 h-4 text-blue-400 animate-spin" />
            <span>{activeTelemetry}</span>
          </div>
        )}

        {/* Completeness Chip layout */}
        {scanState === 'complete' && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-200 px-6 py-3 rounded-full shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider font-sans">Verification Complete</span>
          </motion.div>
        )}

        {/* Contrast Classification badge */}
        {scanState === 'complete' && (
          <motion.div 
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-slate-950 border border-slate-800 text-white px-4 py-2.5 text-xs font-bold tracking-widest uppercase rounded-xl shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Contrast Level: {detectedContrast}</span>
          </motion.div>
        )}

        <p className="text-xs text-slate-500 text-center leading-relaxed font-sans font-medium mt-2 max-w-xs">
          {scanState === 'complete' 
            ? 'Facial matrix mapped. Your digital model has been configured below with standard contrast attributes.'
            : 'Maintain a stable neutral posture and face the lens squarely to start evaluation.'}
        </p>

        {/* Control Button Actions */}
        <div className="w-full flex flex-col gap-2 mt-2">
          {scanState === 'complete' ? (
            <div className="flex gap-2 w-full">
              <button
                onClick={handleStartScan}
                className="flex-1 border-2 border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase py-3.5 tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Rescan
              </button>
              
              <button
                onClick={() => {
                  console.log(`Stylist report compiled! Classification: ${detectedContrast}`);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3.5 tracking-wider rounded-xl transition-all shadow-md shadow-blue-150 cursor-pointer"
              >
                Compile Report
              </button>
            </div>
          ) : scanState === 'idle' ? (
            <button
              onClick={handleStartScan}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-4 tracking-widest rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-white animate-pulse" />
              Begin Spectral Scan
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs uppercase py-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-ping" />
              Calibrating Matrix Optics
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

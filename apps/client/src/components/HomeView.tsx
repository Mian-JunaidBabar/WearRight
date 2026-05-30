import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Camera,
  Compass,
  TrendingUp,
  Sparkles,
  Filter,
  Layers,
  HelpCircle,
} from "lucide-react";
import { ViewType } from "../types";
import FeaturedCarousel from "./FeaturedCarousel";

interface HomeViewProps {
  setView: (view: ViewType) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-slate-50 min-h-screen text-slate-900 pb-20 font-sans"
    >
      {/* Hero Header Area */}
      <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-max mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-slate-700 font-extrabold font-sans">
                AI-Powered Atelier Intelligence
              </span>
            </div>

            <h1 className="font-display tracking-tight text-slate-900 leading-tight mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              Your Personal AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-slate-600 font-display font-bold">
                Digital Stylist
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-sans font-medium">
              Elevate your wardrobe with surgical precision. Our proprietary
              algorithms analyze your skin undertones, optical contrast levels,
              and morphology to curate flawless looks instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setView("facescan")}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 group border border-transparent cursor-pointer"
              >
                <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                Scan Your Complexion
              </button>

              <button
                onClick={() => setView("shop")}
                className="border-2 border-slate-200 text-slate-800 hover:bg-slate-50 px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 rounded-xl cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                Explore Curated Catalog
              </button>
            </div>
          </motion.div>

          {/* Hero Right Visual Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="w-full max-w-md aspect-[3/4] relative bg-slate-100 border border-slate-200 shadow-xl overflow-hidden rounded-2xl group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcOQSUo77ogSWtY3BnUHEGCTJjjWWpeVC-BjB07LgnIely8THEwE7_ykS4uPMoVlTyCqwgrFce6Y9bY5FSui9tcq1gaNPXHl8N7p5UMBmm26xbPMqSoodiZ9dS6aTXkSggLuscXFoj-SXHwfy3bttjkcFds0JgjkmidqGZ6Z0KOSQM3f_QmejuzGrcISbWIctfU3EdCtl9wnY0AO-BbmWTqDzCivYjN0eo0mtlkLYwj62gvRUuwiirYqYqN2-O8XhBFm1UgU8XPWQ"
                alt="High-fashion modern aesthetic portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cyber Overlay effect and glowing lines */}
              <div className="absolute inset-0 border border-white/20 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-blue-400/60 shadow-[0_0_8px_#60a5fa]"></div>
                <div className="absolute top-[62%] left-[25%] w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]"></div>
                <div className="absolute top-[38%] right-[28%] w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>

                {/* Floating Stylist Analysis Box */}
                <motion.div
                  style={{ x: coords.x, y: coords.y }}
                  className="absolute bottom-6 -left-6 bg-white/95 backdrop-blur p-5 shadow-xl max-w-[220px] border-l-4 border-blue-600 text-left rounded-r-xl border border-slate-100"
                >
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 font-sans">
                    AI Match Analysis
                  </p>
                  <p className="text-xs font-semibold text-slate-800 leading-normal font-sans">
                    High-contrast cold undertone detected. Recommending deep
                    Obsidian and Chalk shades.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Performance Metrics Banner */}
      <section className="w-full bg-slate-900 border-y border-slate-800 py-6 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <TrendingUp className="w-6 h-6 text-blue-400 animate-pulse" />
          <h3 className="text-lg font-display tracking-wide font-light">
            Engineered styling results: Experience a{" "}
            <span className="font-bold text-blue-400 font-sans">
              30%+ reduction
            </span>{" "}
            in sizing and post-purchase returns.
          </h3>
        </div>
      </section>

      {/* Interactive Featured Lookbook Carousel */}
      <FeaturedCarousel />

      {/* Feature Bento Grid */}
      <section className="w-full py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 mb-4">
            Style Architecture & Precision Metrics
          </h2>
          <p className="text-sm text-slate-500 font-sans font-medium">
            Our neo-minimalist toolset combines high-end couture fashion
            sensibilities with next-generation machine learning classification
            models.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Facial Scanning - Large Panel */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group relative overflow-hidden text-left shadow-sm">
            <div className="absolute right-0 top-0 w-44 h-44 bg-blue-50/20 rounded-full blur-3xl group-hover:bg-blue-50/40 transition-colors pointer-events-none" />

            <div className="relative z-10">
              <Camera className="w-8 h-8 text-slate-800 mb-6" />
              <h4 className="text-xl font-display font-bold text-slate-900 mb-3">
                Real-Time Facial Geometry Scan
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-md">
                Proprietary spectral analysis calibrates your exact skin hue,
                eye tint, and structural shadows to formulate your customized
                seasonal seasonal palette automatically.
              </p>
            </div>

            <div className="mt-8 relative z-10">
              <button
                onClick={() => setView("facescan")}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Launch Biometric Scan &rarr;
              </button>
            </div>
          </div>

          {/* Card 2: Sub-15 Filtering */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between text-left shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100">
                <Filter className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-display font-bold text-slate-900 mb-3">
                Mathematical Collection Filtering
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                No endless scrolling. Our recommendation loop parses thousands
                of articles, presenting only the top 15 mathematically optimal
                coordinates aligned with your custom aesthetic blueprint.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setView("shop")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider cursor-pointer"
              >
                Browse Shop &rarr;
              </button>
            </div>
          </div>

          {/* Card 3: Automated Outfits */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between text-left shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-905 bg-slate-900 flex items-center justify-center mb-6">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-display font-bold text-slate-900 mb-3">
                Modular Outfit Stacking
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Interchangeable layered fits calibrated for precise
                environments. Switch instantly between boardroom formal
                minimalism and curated Western casual wear.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setView("profile")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider cursor-pointer"
              >
                Set Preferences &rarr;
              </button>
            </div>
          </div>

          {/* Card 4: 3D Calibration - Full width/medium */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col sm:flex-row items-center gap-8 text-left shadow-sm">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-sans">
                3D Fitting Simulator
              </span>
              <h4 className="text-xl font-display font-bold text-slate-900 mt-2 mb-3">
                Multi-Angle Mannequin Calibration
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-sans mb-4">
                Verify drape, volume, and proportions before checking out. Map
                garments onto a simulated wireframe modeling engine configured
                dynamically to your shape.
              </p>
              <div className="h-[1px] bg-slate-100 w-full mb-4" />
              <button
                onClick={() => setView("profile")}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Configure Body Dimensions &rarr;
              </button>
            </div>

            <div className="w-32 h-32 md:w-36 md:h-36 bg-slate-950 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group shadow-inner">
              <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-3 border border-blue-500/20 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

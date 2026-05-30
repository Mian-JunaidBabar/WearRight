import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown, ShoppingBag, Eye, X, Star } from 'lucide-react';
import { Product, ViewType } from '../types';
import { INITIAL_PRODUCTS } from '../data';

interface ShopViewProps {
  setView: (view: ViewType) => void;
  selectedStyles: string[];
  setSelectedStyles: (styles: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  sortBy: 'match' | 'priceAsc' | 'priceDesc';
  setSortBy: (sort: 'match' | 'priceAsc' | 'priceDesc') => void;
  resetFilters: () => void;
}

export default function ShopView({ 
  setView, 
  selectedStyles, 
  setSelectedStyles, 
  selectedColors, 
  setSelectedColors, 
  sortBy, 
  setSortBy,
  resetFilters
}: ShopViewProps) {
  const [activeSortOpen, setActiveSortOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Perform styling filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    // Style filter (if none selected, show all)
    if (selectedStyles.length > 0) {
      result = result.filter(prod => selectedStyles.includes(prod.style));
    }

    // Color filter (if any selected, must match one of product's colors)
    if (selectedColors.length > 0) {
      result = result.filter(prod => 
        prod.colors.some(col => selectedColors.includes(col))
      );
    }

    // Sort operations
    if (sortBy === 'match') {
      result.sort((a, b) => b.match - a.match);
    } else if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedStyles, selectedColors, sortBy]);

  return (
    <div className="w-full bg-slate-50 pb-24 text-left font-sans flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        
        <section className="w-full text-left">
          
          <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                The Collection
              </h1>
              <p className="text-xs text-slate-500 font-sans mt-1 font-semibold">
                {filteredProducts.length} curated matches mapped successfully.
              </p>
            </div>

            {/* Sort actions */}
            <div className="relative">
              <button 
                onClick={() => setActiveSortOpen(!activeSortOpen)} 
                className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-black flex items-center gap-1 focus:outline-none p-1 cursor-pointer"
              >
                Sort By {sortBy === 'match' ? 'Matching Level' : sortBy === 'priceAsc' ? 'Price: Low-High' : 'Price: High-Low'}
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <AnimatePresence>
                {activeSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40 outline-none animate-fade-in"
                  >
                    {[
                      { id: 'match', label: 'By Match Rating' },
                      { id: 'priceAsc', label: 'Price: Low to High' },
                      { id: 'priceDesc', label: 'Price: High to Low' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id as any);
                          setActiveSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold cursor-pointer ${
                          sortBy === opt.id 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Empty states handling */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white border border-slate-200 rounded-2xl p-6 w-full shadow-sm">
              <span className="text-3xl font-bold text-slate-300 block mb-3">∅</span>
              <p className="text-sm font-semibold text-slate-800">No items match your active filters.</p>
              <p className="text-xs text-slate-400 mt-1">Try resetting the checked styles or colors via the Style Filters dropdown in the Navbar.</p>
              <button 
                onClick={resetFilters}
                className="mt-6 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 text-xs uppercase font-bold tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-blue-100"
              >
                Reset Live Filters
              </button>
            </div>
          ) : (
            /* Collection Items Grid list */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <article 
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="bg-white rounded-2xl border border-slate-200 hover:shadow-xl hover:border-slate-355 hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col justify-between shadow-sm"
                >
                  <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden flex-shrink-0">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Matching rating chip badge */}
                    <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm border border-slate-750 text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1 z-10 shadow-sm">
                      <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span className="text-white font-mono">{prod.match}% MATCH</span>
                    </div>

                    {/* Quick view indicator */}
                    <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 text-slate-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 shadow-md rounded-xl border border-slate-200 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-blue-600" /> Quick View
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-1.5 text-[10px] uppercase text-slate-400 font-extrabold font-sans mb-1">
                        <span>{prod.style}</span>
                        <span>{prod.colors.join(', ')}</span>
                      </div>
                      <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-900 line-clamp-1">
                        {prod.name}
                      </h3>
                    </div>
                    
                    <p className="text-xs font-bold text-slate-500 mt-2 font-mono">
                      ${prod.price.toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => alert("Simulation: Secondary boutique catalog pages are locked in prototype mode.")}
                className="bg-blue-600 border border-transparent hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-100 cursor-pointer"
              >
                Load More Couture Styles
              </button>
            </div>
          )}

        </section>

      </div>

      {/* Item detailed specifications sheet modal drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative text-left"
            >
              {/* Close icon */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full p-1.5 transition-colors focus:outline-none z-10 shadow cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Visual left */}
                <div className="h-96 md:h-full aspect-[3/4] bg-slate-55 bg-slate-50 relative">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/95 text-blue-400 border border-slate-800 font-mono text-xs px-2.5 py-1.5 font-bold rounded-lg shadow-md">
                    {selectedProduct.match}% match rate
                  </div>
                </div>

                {/* Info right */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-blue-600 font-extrabold tracking-widest font-sans">
                      Atelier Mapped Fit
                    </span>
                    <h2 className="text-xl font-display font-bold text-slate-900 mt-2 mb-1 leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-slate-400 text-xs font-sans mb-4 uppercase tracking-wider font-extrabold">
                      ID: {selectedProduct.id} / {selectedProduct.style}
                    </p>

                    <div className="h-px bg-slate-100 w-full mb-4" />

                    <div className="space-y-3.5 text-xs text-slate-500 font-sans font-semibold leading-relaxed">
                      <p>
                        This article is meticulously analyzed against your active complexion values. Structured shoulders emphasize posture, while premium weaves minimize contour drape noise.
                      </p>
                      
                      <div className="flex items-center gap-1.5 mt-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-slate-800">Highly Recommended</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-xs text-slate-400 font-sans font-bold">Retail price</span>
                      <span className="text-xl font-bold font-mono text-slate-900">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          alert(`Added ${selectedProduct.name} to shopping wishlist simulation!`);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-100"
                      >
                        <ShoppingBag className="w-4 h-4 text-blue-200" />
                        Inquire Fitting
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

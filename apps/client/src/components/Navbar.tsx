import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Lock, User, Camera, ShoppingBag, ShieldAlert, Menu, X, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { ViewType, UserState } from '../types';
import { COLOR_OPTIONS } from '../data';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  user: UserState;
  selectedStyles: string[];
  toggleStyleFilter: (styleName: string) => void;
  selectedColors: string[];
  toggleColorFilter: (colorName: string) => void;
  resetFilters: () => void;
}

export default function Navbar({ 
  currentView, 
  setView, 
  user,
  selectedStyles,
  toggleStyleFilter,
  selectedColors,
  toggleColorFilter,
  resetFilters
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const navItems = [
    { id: 'home' as ViewType, label: 'Home', icon: Home },
    { id: 'auth' as ViewType, label: 'Auth', icon: Lock },
    { id: 'profile' as ViewType, label: 'Profile', icon: User },
    { id: 'facescan' as ViewType, label: 'Face Scan', icon: Camera },
    { id: 'shop' as ViewType, label: 'Shop', icon: ShoppingBag },
    { id: 'admin' as ViewType, label: 'Admin', icon: ShieldAlert },
  ];

  const hasActiveFilters = selectedStyles.length !== 4 || selectedColors.length > 0;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo - Styled as a sleek blue dynamic container */}
        <div 
          onClick={() => setView('home')} 
          className="flex items-center gap-3 cursor-pointer hover:opacity-95 transition-opacity select-none group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transition-transform group-hover:scale-105 duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="font-display text-2xl font-bold tracking-tight text-slate-800">WEAR RIGHT</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-sans">Digital Stylist Engine</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className="relative px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 flex items-center gap-2 rounded-lg cursor-pointer"
              >
                {/* Active capsule background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-blue-600 rounded-lg -z-10 shadow-md shadow-blue-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className={isActive ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-800 font-semibold'}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Integrated Filter Controls directly in Navbar on shop page */}
          {currentView === 'shop' && (
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 border text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm ml-4 select-none ${
                filterPanelOpen 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className={`w-3.5 h-3.5 ${filterPanelOpen ? 'text-blue-600' : 'text-slate-400'}`} />
              Style Filters
              {hasActiveFilters && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white absolute -top-1 -right-1 shadow-sm" />
              )}
            </button>
          )}
        </div>

        {/* System status & User widget */}
        <div className="hidden lg:flex items-center gap-6 border-l border-slate-200 pl-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 justify-end mt-0.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span> Live Updates
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm overflow-hidden"
            />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold font-sans text-slate-800 leading-none">{user.name}</span>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider leading-relaxed mt-1">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          {currentView === 'shop' && (
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className={`p-2 border rounded-xl transition-all cursor-pointer relative ${
                filterPanelOpen 
                  ? 'border-blue-550 border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Style Filters"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
              {hasActiveFilters && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white absolute -top-0.5 -right-0.5 shadow-sm" />
              )}
            </button>
          )}

          <button 
            onClick={() => {
              setView('facescan');
            }}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-sm"
          >
            <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600 hover:text-slate-900 focus:outline-none transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expanded Multi-Category Filter Panel dropdown (fully integrated inside main navbar) */}
      <AnimatePresence>
        {filterPanelOpen && currentView === 'shop' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-slate-50 border-t border-slate-250 border-slate-200 shadow-inner overflow-hidden select-none"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
              
              {/* Style parameters column */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold font-sans block">
                  Couture Style parameters
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['Western', 'Casual', 'Formal', 'Avant-Garde'].map((style) => {
                    const isChecked = selectedStyles.includes(style);
                    return (
                      <label 
                        key={style} 
                        className={`flex items-center gap-2 px-3.5 py-2 border rounded-xl cursor-pointer select-none transition-all active:scale-95 ${
                          isChecked 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-bold' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 font-semibold'
                        }`}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleStyleFilter(style)}
                          className="hidden"
                        />
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                        <span className="text-xs">{style}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Color metrics column */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold font-sans block">
                  Complexion Color Palette
                </span>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((opt) => {
                    const isChecked = selectedColors.includes(opt.name);
                    return (
                      <button
                        key={opt.name}
                        onClick={() => toggleColorFilter(opt.name)}
                        title={opt.name}
                        style={{ backgroundColor: opt.hex }}
                        className={`w-8 h-8 rounded-full border shadow-sm relative transition-all cursor-pointer hover:scale-105 active:scale-90 ${
                          isChecked 
                            ? 'ring-2 ring-blue-500 scale-105 border-slate-800' 
                            : 'border-slate-200'
                        }`}
                      >
                        {isChecked && (
                          <Check className={`w-4 h-4 absolute inset-0 m-auto ${
                            opt.name === 'White' ? 'text-black font-extrabold' : 'text-white'
                          }`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions & Notes column */}
              <div className="md:col-span-2 space-y-3 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold font-sans block">
                  Stylist Utilities
                </span>
                <button
                  onClick={() => {
                    resetFilters();
                    setFilterPanelOpen(false);
                  }}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wide py-2.5 px-4 rounded-xl border border-slate-200 transition-colors shadow-sm cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Mobile Navigation Area */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white border-t border-slate-200 overflow-hidden text-left"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setMobileMenuOpen(false);
                      setFilterPanelOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* User Profile Card Mobile */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">{user.name}</span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider font-sans">{user.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

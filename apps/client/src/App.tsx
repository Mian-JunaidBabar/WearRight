import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';
import FaceScanView from './components/FaceScanView';
import ShopView from './components/ShopView';
import AdminView from './components/AdminView';
import { ViewType, UserState } from './types';
import { INITIAL_USER } from './data';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserState>(INITIAL_USER);

  // Curated filters state lifted to support navbar integration
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Western', 'Casual']);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'match' | 'priceAsc' | 'priceDesc'>('match');

  const toggleStyleFilter = (styleName: string) => {
    if (selectedStyles.includes(styleName)) {
      setSelectedStyles(selectedStyles.filter(s => s !== styleName));
    } else {
      setSelectedStyles([...selectedStyles, styleName]);
    }
  };

  const toggleColorFilter = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const resetFilters = () => {
    setSelectedStyles(['Western', 'Casual', 'Formal', 'Avant-Garde']);
    setSelectedColors([]);
  };

  // Derive active view type based on current router pathname
  const currentView = (location.pathname === '/' ? 'home' : location.pathname.substring(1)) as ViewType;

  // Provide back-compatibility setView handler
  const setView = (view: ViewType) => {
    navigate(view === 'home' ? '/' : `/${view}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      
      {/* Top Navigation Frame bar with lifted filters */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        user={user} 
        selectedStyles={selectedStyles}
        toggleStyleFilter={toggleStyleFilter}
        selectedColors={selectedColors}
        toggleColorFilter={toggleColorFilter}
        resetFilters={resetFilters}
      />

      {/* Main Content Area with fluid animations and React Router switches */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HomeView setView={setView} />} />
              <Route path="/auth" element={<AuthView user={user} setUser={setUser} />} />
              <Route path="/profile" element={<ProfileView user={user} setUser={setUser} />} />
              <Route path="/facescan" element={<FaceScanView user={user} setUser={setUser} />} />
              <Route 
                path="/shop" 
                element={
                  <ShopView 
                    setView={setView} 
                    selectedStyles={selectedStyles}
                    setSelectedStyles={setSelectedStyles}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resetFilters={resetFilters}
                  />
                } 
              />
              <Route path="/admin" element={<AdminView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Area */}
      <footer className="w-full bg-white border-t border-slate-200 py-8 text-center text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} WEAR RIGHT Atelier. All Rights Reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => setView('home')} className="hover:text-blue-600 transition-colors cursor-pointer">Workspace</button>
            <button onClick={() => setView('profile')} className="hover:text-blue-600 transition-colors cursor-pointer">Tonal Matrix</button>
            <button onClick={() => setView('shop')} className="hover:text-blue-600 transition-colors cursor-pointer">Boutique</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

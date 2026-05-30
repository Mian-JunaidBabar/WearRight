import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { UserState } from '../types';

interface AuthViewProps {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

export default function AuthView({ user, setUser }: AuthViewProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(user.isLoggedIn ? user.email : '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(user.isLoggedIn ? user.name : '');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isSignIn) {
      setUser((prev) => ({
        ...prev,
        email,
        name: name || 'Aura Identity',
        isLoggedIn: true,
      }));
      setSuccessMsg('Authentication Successful. Access Granted.');
    } else {
      setUser((prev) => ({
        ...prev,
        email,
        name: name || 'New Atelier Stylist',
        isLoggedIn: true,
      }));
      setSuccessMsg('Account Created Successfully.');
    }

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleSignOut = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const leftImageSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuCS_KoB3eqo7HK6hmzDtLJrEiET8m5ZE3Mgi-BslQqHHkf_Q7cVAvqX-LJl9_n6ovvhqBk2nqAW6yLp6EiQ2r9xNdL9ik5LJGhncA9nLTlLikEKCYIIMaqeX6XK0UJQFrQGfbITB3AT2ApZiQpGClW3lZK0X0bBMnXbZuQGAidPHmZbl1bZ1qr8UT52tWrWvHBRGOHvAOGcAlv__HPLSw86UFKfiKPVH3bnh6bDuaoMFiyGHEcWWekBZDLF92tmkZzt7aQbORhB1uw";

  return (
    <div className="w-full bg-slate-50 flex flex-col md:flex-row min-h-[calc(100vh-80px)] font-sans">
      
      {/* Left Column: Striking high fashion photo */}
      <div className="hidden md:block md:w-1/2 relative min-h-full">
        <img 
          src={leftImageSrc} 
          alt="Modernist stark studio lighting editorial model" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply" />
        
        {/* Soft elegant gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 text-white text-left z-10 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-none text-white">
              Elevate Your Presence
            </h2>
            <p className="text-sm lg:text-base opacity-90 max-w-md font-sans font-medium leading-relaxed text-slate-300">
              Experience AI-curated editorial fashion, configured dynamically to translate your facial contrast and body shape parameters into pristine silhouettes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Clean authentication workflow */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-6 sm:px-12 bg-white text-left">
        <div className="w-full max-w-md">
          
          {/* Active indicator chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase font-sans">
              Digital Atelier Workspace Active
            </span>
          </div>

          {/* Core Sign Status */}
          {user.isLoggedIn ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h3 className="text-xl font-display font-bold mb-2 text-slate-800">Workspace Authenticated</h3>
              <p className="text-xs text-slate-500 mb-6 font-sans font-medium">
                You are currently signed in as <span className="font-bold text-slate-700">{user.name}</span> ({user.email}).
              </p>
              
              <button
                onClick={handleSignOut}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-blue-100 transition-all cursor-pointer"
              >
                Sign Out of Workspace
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
                  {isSignIn ? 'Welcome Back' : 'Create Atelier Account'}
                </h2>
                <p className="text-xs text-slate-500 font-sans font-medium">
                  {isSignIn 
                    ? 'Enter your credentials to coordinate with your styling database.'
                    : 'Establish your biometric and aesthetic profile in the stylist engine.'}
                </p>
              </div>

              {/* Toggle controls */}
              <div className="flex bg-slate-100 border border-slate-200/60 rounded-xl p-1 mb-8 relative">
                <button 
                  onClick={() => setIsSignIn(true)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all z-10 cursor-pointer ${
                    isSignIn 
                      ? 'bg-white shadow text-blue-600 font-bold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsSignIn(false)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all z-10 cursor-pointer ${
                    !isSignIn 
                      ? 'bg-white shadow text-blue-600 font-bold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form implementation */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name - only for Sign Up */}
                {!isSignIn && (
                  <div className="relative border-b border-slate-200 focus-within:border-blue-600 transition-colors py-2">
                    <label className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aura Identity"
                      required
                      className="w-full bg-transparent border-none p-0 text-sm text-slate-900 placeholder-slate-300 focus:ring-0 focus:outline-none font-semibold"
                    />
                  </div>
                )}

                {/* Email address */}
                <div className="relative border-b border-slate-200 focus-within:border-blue-600 transition-colors py-2">
                  <label className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="stylist-pro@wearright.ai"
                    required
                    className="w-full bg-transparent border-none p-0 text-sm text-slate-900 placeholder-slate-300 focus:ring-0 focus:outline-none font-semibold"
                  />
                </div>

                {/* Password input with visibility toggle */}
                <div className="relative border-b border-slate-200 focus-within:border-blue-600 transition-colors py-2">
                  <label className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1">
                    Password
                  </label>
                  <div className="flex items-center">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-transparent border-none p-0 text-sm text-slate-900 placeholder-slate-300 focus:ring-0 focus:outline-none font-semibold"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-800 transition-colors focus:outline-none self-end p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Bottom helpers: Remember me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1.5 font-sans font-semibold">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-800">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>Remember configuration</span>
                  </label>
                  <button 
                    type="button" 
                    className="text-slate-700 hover:text-blue-600 transition-colors font-bold"
                    onClick={() => {
                      // Silently print warning, avoiding destructive full-window alert
                      console.log("Credentials reset instruction requested in development.");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Authenticate Submit trigger */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Authenticate Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Success Dialog Animation */}
          <AnimatePresence>
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3 text-xs font-bold"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-sans">{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}

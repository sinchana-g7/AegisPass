import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenId } from '../types';
import { Shield, Sparkles, Menu, X } from 'lucide-react';

export const TopNav: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'generator', label: 'Generator' },
    { id: 'checker', label: 'Checker' },
    { id: 'validator', label: 'Validator' },
    { id: 'history', label: 'Vault' },
    { id: 'tips', label: 'Tips' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff]/20 to-[#00dbe9]/5 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:border-[#00f0ff] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
            <Shield className="w-5 h-5 text-[#00f0ff]" />
            <div className="absolute inset-0 rounded-lg bg-[#00f0ff]/10 filter blur-xs"></div>
          </div>
          <div>
            <span className="text-lg font-semibold tracking-tight text-white flex items-center gap-1.5">
              AegisPass
              <span className="text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-mono font-semibold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                PRO
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                    : 'text-[#849495] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => navigateTo('generator')}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            Generate Password
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#849495] hover:text-white rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl px-4 py-4 space-y-2">
          {navItems.map(item => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30'
                    : 'text-[#849495] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                navigateTo('generator');
                setMobileMenuOpen(false);
              }}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4" />
              Generate Password
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  History as HistoryIcon, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Cpu, 
  EyeOff
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono font-medium tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
          AES-256 GCM • CLIENT-SIDE ONLY • ZERO TELEMETRY
        </div>

        {/* Hero Title */}
        <h1 className="font-display-lg text-white tracking-tight">
          Privacy-first password security toolkit.
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg text-[#b9cacb] max-w-2xl mx-auto leading-relaxed">
          Generate strong passwords, understand their real mathematical strength, and check for known breaches. No logs. No tracking.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('welcome')}
            className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.25)]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('checker')}
            className="btn-secondary w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-[#00f0ff]" />
            <span>Test a Password</span>
          </button>
        </div>
      </div>

      {/* 4 Feature Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Generator */}
        <div 
          onClick={() => navigateTo('generator')}
          className="glass-panel p-8 rounded-2xl border border-white/10 hover-glow cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
              Password Generator
            </h3>
            <p className="text-sm text-[#849495] leading-relaxed">
              Generate cryptographically random passwords tailored to each account type with granular length and character pool controls.
            </p>
          </div>
          <div className="pt-6 flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-medium">
            <span>Open Generator</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Checker */}
        <div 
          onClick={() => navigateTo('checker')}
          className="glass-panel p-8 rounded-2xl border border-white/10 hover-glow cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
              Password Checker
            </h3>
            <p className="text-sm text-[#849495] leading-relaxed">
              Measure real mathematical Shannon entropy, analyze pattern weaknesses, and scan for known breaches using k-anonymity.
            </p>
          </div>
          <div className="pt-6 flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-medium">
            <span>Check a Password</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Validator */}
        <div 
          onClick={() => navigateTo('validator')}
          className="glass-panel p-8 rounded-2xl border border-white/10 hover-glow cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
              Policy Validator
            </h3>
            <p className="text-sm text-[#849495] leading-relaxed">
              Test passwords against organizational security policies, custom requirements, and NIST 800-63B compliance rules.
            </p>
          </div>
          <div className="pt-6 flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-medium">
            <span>Validate Password</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: History / Vault */}
        <div 
          onClick={() => navigateTo('history')}
          className="glass-panel p-8 rounded-2xl border border-white/10 hover-glow cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] group-hover:scale-105 transition-transform">
              <HistoryIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
              Encrypted Local Vault
            </h3>
            <p className="text-sm text-[#849495] leading-relaxed">
              Review and safely manage your generated passwords protected by an AES-GCM encrypted local vault with zero cloud sync.
            </p>
          </div>
          <div className="pt-6 flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-medium">
            <span>View Vault History</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Security Guarantee Box */}
      <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-[#00f0ff]/20 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a]/40 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Your passwords never leave your browser.</h3>
            <p className="text-xs text-[#849495]">Cryptographic isolation and privacy architecture.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#00f0ff]">
              <Cpu className="w-4 h-4" />
              <h4>100% Client-Side</h4>
            </div>
            <p className="text-xs text-[#849495] leading-relaxed">
              All generation and entropy analysis happens entirely on your device using hardware-accelerated Web Crypto APIs.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#00f0ff]">
              <EyeOff className="w-4 h-4" />
              <h4>Zero Logs</h4>
            </div>
            <p className="text-xs text-[#849495] leading-relaxed">
              We don't collect, store, or transmit your passwords or analysis results. No telemetry or analytics tracking.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#00f0ff]">
              <Lock className="w-4 h-4" />
              <h4>k-Anonymity Breach Checks</h4>
            </div>
            <p className="text-xs text-[#849495] leading-relaxed">
              Breach verification uses SHA-1 prefix matching so your full password is never shared across the network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

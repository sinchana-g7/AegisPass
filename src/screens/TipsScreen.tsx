import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SECURITY_TIPS, DAILY_INSIGHTS } from '../utils/constants';
import { 
  Sparkles, 
  Lightbulb, 
  ArrowRight, 
  RotateCw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

export const TipsScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [insightIndex, setInsightIndex] = useState(0);

  const nextInsight = () => {
    setInsightIndex((prev) => (prev + 1) % DAILY_INSIGHTS.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-headline-lg text-white">Password Security Best Practices</h1>
        <p className="text-sm text-[#b9cacb]">
          Evidence-based guidelines grounded in modern cryptographic research and NIST standards.
        </p>
      </div>

      {/* Daily Security Insight Highlight Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/30 bg-gradient-to-b from-[#00f0ff]/10 to-transparent space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00f0ff] font-semibold">
            <Lightbulb className="w-4 h-4" />
            <span>Cryptographic Insight #{insightIndex + 1}</span>
          </div>

          <button
            onClick={nextInsight}
            className="text-xs font-mono text-[#849495] hover:text-[#00f0ff] flex items-center gap-1 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Next Insight</span>
          </button>
        </div>

        <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
          "{DAILY_INSIGHTS[insightIndex]}"
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#849495]">
          Essential Security Rules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECURITY_TIPS.map((tip) => (
            <div
              key={tip.num}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover-glow transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-[#00f0ff] border border-[#00f0ff]/20">
                  {tip.num}
                </span>
                <ShieldCheck className="w-4 h-4 text-[#849495]" />
              </div>

              <h3 className="text-base font-semibold text-white">{tip.title}</h3>
              <p className="text-xs text-[#849495] leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Passphrase vs Complexity Demonstrator */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white">The Math: Passphrase vs. Complex Short String</h3>
          <p className="text-xs text-[#849495]">
            Why 4 random English words (passphrase) mathematically defeats an 8-character substituted string.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option A: Complex short string */}
          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-400 font-semibold">Short & "Complex"</span>
              <span className="text-[#849495]">10 chars</span>
            </div>
            <div className="font-mono text-sm text-white bg-black/40 p-2.5 rounded-lg">
              P@$$w0rd!9
            </div>
            <div className="text-xs text-[#849495] space-y-1">
              <div>Entropy: ~32 bits (Weak)</div>
              <div>Estimated Crack Time: <strong className="text-red-400">12 seconds</strong></div>
              <div>Memorability: Poor (easily forgotten)</div>
            </div>
          </div>

          {/* Option B: Long Passphrase */}
          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-semibold">Long Passphrase</span>
              <span className="text-[#849495]">28 chars</span>
            </div>
            <div className="font-mono text-sm text-white bg-black/40 p-2.5 rounded-lg">
              correct-horse-battery-staple
            </div>
            <div className="text-xs text-[#849495] space-y-1">
              <div>Entropy: ~78 bits (Strong)</div>
              <div>Estimated Crack Time: <strong className="text-emerald-400">55,000 years</strong></div>
              <div>Memorability: High (visual story)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="glass-panel p-8 rounded-2xl border border-[#00f0ff]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-semibold text-white">Ready to create a secure password?</h3>
          <p className="text-xs text-[#849495]">
            Use our cryptographic generator to produce unbiased randomness on-device.
          </p>
        </div>

        <button
          onClick={() => navigateTo('generator')}
          className="btn-primary px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Generator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

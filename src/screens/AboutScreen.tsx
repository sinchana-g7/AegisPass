import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  Cpu, 
  Database, 
  Lock, 
  EyeOff, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  Terminal,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does AegisPass generate random passwords?",
      a: "AegisPass leverages your browser's native window.crypto.getRandomValues() CSPRNG (Cryptographically Secure Pseudo-Random Number Generator). This utilizes entropy harvested from your operating system and hardware noise, guaranteeing unbiased mathematical randomness."
    },
    {
      q: "Can AegisPass or third parties see the passwords I check?",
      a: "No. All Shannon entropy math, weakness pattern matching, and policy evaluations execute completely within your device's memory. When checking data breaches, we utilize mathematical k-Anonymity: only 5 hexadecimal characters of a SHA-1 hash are sent to the query endpoint."
    },
    {
      q: "How does the local encrypted vault work?",
      a: "When you save a password to the vault, AegisPass derives a 256-bit AES-GCM encryption key from your master passphrase using PBKDF2 with 100,000 iterations of HMAC-SHA256 and a 16-byte random cryptographic salt. The resulting ciphertext is stored in your browser's local storage and can only be decrypted with your master key."
    },
    {
      q: "Why does AegisPass emphasize length over symbols?",
      a: "According to information theory and NIST Special Publication 800-63B, expanding length increases the total search space exponentially faster than adding symbols to a short string, while also being far easier for humans to remember and accurately type."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-headline-lg text-white">About AegisPass</h1>
        <p className="text-sm text-[#b9cacb]">
          Zero-knowledge cryptographic engineering designed for total transparency and uncompromising privacy.
        </p>
      </div>

      {/* Mission Banner */}
      <div className="glass-panel p-8 rounded-2xl border border-[#00f0ff]/30 bg-gradient-to-b from-[#00f0ff]/10 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00f0ff] font-semibold">
          <Shield className="w-4 h-4" />
          <span>Core Privacy Principles</span>
        </div>
        <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
          AegisPass is built on the foundational belief that security utilities must operate transparently in client memory, respect user privacy unconditionally, and never harvest, log, or transmit personal credentials.
        </p>
      </div>

      {/* 4 Architectural Pillars */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#849495]">
          Architectural Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Hardware CSPRNG Randomness</h3>
            <p className="text-xs text-[#849495] leading-relaxed">
              Cryptographic entropy is drawn from OS-level hardware noise via <code className="text-[#00f0ff]">Web Crypto API</code>, eliminating pseudorandom seeding vulnerabilities.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">k-Anonymity Breach Lookups</h3>
            <p className="text-xs text-[#849495] leading-relaxed">
              Breach queries truncate SHA-1 hashes to the first 20 bits (5 hex chars). Your full password never crosses any network interface.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">AES-GCM-256 Local Vault</h3>
            <p className="text-xs text-[#849495] leading-relaxed">
              Zero cloud transmission. Saved credentials are authenticated and encrypted using Galois/Counter Mode with 100,000 PBKDF2 iterations.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Zero Telemetry & Tracking</h3>
            <p className="text-xs text-[#849495] leading-relaxed">
              No tracking cookies, no marketing pixels, and no analytics databases. The entire runtime operates strictly on your machine.
            </p>
          </div>
        </div>
      </div>

      {/* System Diagnostics Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00f0ff]">
          <Terminal className="w-4 h-4" />
          <span>Client-Side Cryptographic Runtime Status</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[#849495]">CSPRNG Provider</div>
            <div className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Web Crypto API (Active)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[#849495]">Encryption Engine</div>
            <div className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SubtleCrypto AES-GCM</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[#849495]">Telemetry Status</div>
            <div className="text-[#00f0ff] flex items-center gap-1">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Zero Logs (Disabled)</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#849495]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#00f0ff] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#849495] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#b9cacb] leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Launch CTA */}
      <div className="glass-panel p-8 rounded-2xl border border-[#00f0ff]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-semibold text-white">Experience high-fidelity password security</h3>
          <p className="text-xs text-[#849495]">
            Generate cryptographically sound passwords tailored to your personal or enterprise accounts.
          </p>
        </div>

        <button
          onClick={() => navigateTo('generator')}
          className="btn-primary px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Open Generator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

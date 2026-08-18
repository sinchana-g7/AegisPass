import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, Cpu, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openInfoModal } = useApp();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <footer className="border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-semibold tracking-tight text-white">AegisPass</span>
              </div>
              <p className="text-sm text-[#849495] leading-relaxed">
                Privacy-first cryptographic generator, mathematical entropy analyzer, and zero-knowledge local password vault.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/5 px-3 py-1.5 rounded-lg border border-[#00f0ff]/20 w-fit">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Server Logs • Client-Side Only</span>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#849495] mb-4">Toolkit</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => navigateTo('generator')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Password Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('checker')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Entropy & Strength Checker
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('validator')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Policy Validator
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('history')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Encrypted Vault
                  </button>
                </li>
              </ul>
            </div>

            {/* Cryptographic Standards */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#849495] mb-4">Security Foundations</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => openInfoModal('entropy')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>Shannon Entropy Model</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => openInfoModal('breach')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>k-Anonymity HIBP Verification</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => openInfoModal('vault')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>AES-GCM-256 / PBKDF2 Vault</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('tips')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Security Best Practices
                  </button>
                </li>
              </ul>
            </div>

            {/* Transparency / Legal */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#849495] mb-4">Legal & Docs</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('whitepaper')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors">
                    Security Whitepaper
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('contact')} className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Contact Support</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#849495] gap-4">
            <p>© {new Date().getFullYear()} AegisPass Security. All cryptographic calculations executed in browser memory.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#00f0ff]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Web Crypto API Hardware Acceleration Active
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy / Legal Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4 border border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-white capitalize">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Service'}
                {activeModal === 'whitepaper' && 'Security Architecture Whitepaper'}
                {activeModal === 'contact' && 'AegisPass Support & Verification'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#849495] hover:text-white text-lg font-mono px-2 py-1 rounded-md hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-[#b9cacb] space-y-3 leading-relaxed">
              {activeModal === 'privacy' && (
                <>
                  <p className="font-semibold text-[#00f0ff]">Zero-Knowledge & Zero-Telemetry Guarantee</p>
                  <p>AegisPass is designed with uncompromising privacy. We never store, log, transmit, or retain any passwords you generate or inspect.</p>
                  <p>All randomness is sampled locally from <code className="text-[#00f0ff] font-mono text-xs">window.crypto.getRandomValues()</code>. All vault entries are stored exclusively inside your browser's encrypted localStorage using AES-GCM-256 with user-controlled PBKDF2 keys.</p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p className="font-semibold text-[#00f0ff]">Standard Open Security Terms</p>
                  <p>AegisPass is provided as an open cryptographic auditing and generation utility. Users are solely responsible for maintaining their master passphrases and securing access to their physical devices.</p>
                  <p>Because encryption is performed strictly on-device, lost master keys cannot be recovered by anyone.</p>
                </>
              )}

              {activeModal === 'whitepaper' && (
                <>
                  <p className="font-semibold text-[#00f0ff]">Cryptographic Specifications</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>PRNG:</strong> CSPRNG conforming to RFC 4086 / NIST SP 800-90A.</li>
                    <li><strong>Entropy:</strong> Exact Shannon metric: <span className="font-mono text-xs text-[#00f0ff]">E = L × log2(Pool)</span> with heuristic penalization for character reuse.</li>
                    <li><strong>Vault Encryption:</strong> AES-256-GCM with 96-bit unique IV and PBKDF2 key derivation (100,000 iterations of HMAC-SHA256).</li>
                    <li><strong>Breach Detection:</strong> Mathematical k-Anonymity using SHA-1 prefix truncation (only 20 bits sent).</li>
                  </ul>
                </>
              )}

              {activeModal === 'contact' && (
                <>
                  <p>Need technical assistance or want to review our cryptographic benchmarks?</p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-xs text-[#849495]">Security Research Inquiries</div>
                    <div className="font-mono text-sm text-[#00f0ff]">security@aegispass.internal</div>
                    <div className="text-xs text-[#849495] pt-2">Hardware-accelerated client environment: Active</div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/20 transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

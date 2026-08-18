import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Cpu, Database, KeyRound, AlertTriangle, X } from 'lucide-react';

export const InfoModal: React.FC = () => {
  const { infoModalTopic, closeInfoModal } = useApp();

  if (!infoModalTopic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-5 border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              {infoModalTopic === 'entropy' && <Cpu className="w-5 h-5" />}
              {infoModalTopic === 'breach' && <Database className="w-5 h-5" />}
              {infoModalTopic === 'vault' && <KeyRound className="w-5 h-5" />}
              {infoModalTopic === 'calc' && <ShieldCheck className="w-5 h-5" />}
              {infoModalTopic === 'policy' && <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {infoModalTopic === 'entropy' && 'Shannon Entropy & Search Space'}
                {infoModalTopic === 'breach' && 'k-Anonymity Breach Verification'}
                {infoModalTopic === 'vault' && 'Zero-Knowledge Encrypted Vault'}
                {infoModalTopic === 'calc' && 'Brute-Force Attack Modeling'}
                {infoModalTopic === 'policy' && 'Policy Validation Criteria'}
              </h3>
              <p className="text-xs text-[#849495] font-mono">Cryptographic Explanation & Mathematical Basis</p>
            </div>
          </div>
          <button
            onClick={closeInfoModal}
            className="text-[#849495] hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="text-sm text-[#b9cacb] space-y-4 leading-relaxed">
          {infoModalTopic === 'entropy' && (
            <>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-[#00f0ff] space-y-1">
                <div>Formula: E = L × log₂(N)</div>
                <div className="text-[#849495]">Where L = Password Length, N = Character Pool Size</div>
              </div>
              <p>
                <strong>Information Entropy</strong> measures the unpredictability or randomness of your password in bits. Each bit of entropy doubles the total number of guesses an automated attacker must attempt to break your key.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><span className="text-red-400 font-semibold">&lt; 40 bits (Weak):</span> Cracked in milliseconds to minutes on consumer hardware.</li>
                <li><span className="text-amber-400 font-semibold">40–64 bits (Medium):</span> Resistant to casual guessing, vulnerable to dedicated offline GPU cracking rigs.</li>
                <li><span className="text-teal-400 font-semibold">65–84 bits (Strong):</span> Secure against massive automated distributed clusters for centuries.</li>
                <li><span className="text-[#00f0ff] font-semibold">85+ bits (Very Strong):</span> Mathematically infeasible to crack within the lifespan of our solar system.</li>
              </ul>
            </>
          )}

          {infoModalTopic === 'breach' && (
            <>
              <p>
                <strong>How k-Anonymity Protects Your Password:</strong>
              </p>
              <p>
                When checking if your password has appeared in historical public data leaks, AegisPass uses mathematical <em>k-Anonymity</em>. Your full password is <strong>never</strong> transmitted over the internet.
              </p>
              <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-mono text-[#00f0ff]">
                  <span className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[10px]">1</span>
                  <span>Browser computes SHA-1 hash locally</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[#00f0ff]">
                  <span className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[10px]">2</span>
                  <span>First 5 hex characters (20 bits) sent to HIBP API</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[#00f0ff]">
                  <span className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[10px]">3</span>
                  <span>API returns ~500 anonymized matching suffix hashes</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[#00f0ff]">
                  <span className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[10px]">4</span>
                  <span>Browser compares remaining 35 characters completely offline</span>
                </div>
              </div>
            </>
          )}

          {infoModalTopic === 'vault' && (
            <>
              <p>
                <strong>Zero-Knowledge Browser Vault:</strong>
              </p>
              <p>
                Your encrypted vault uses standard NIST-grade symmetric encryption. No unencrypted passwords are saved to your browser storage.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Algorithm:</strong> AES-GCM (Galois/Counter Mode) with 256-bit keys.</li>
                <li><strong>Key Derivation:</strong> PBKDF2 with SHA-256 and 100,000 iterations from your master passphrase.</li>
                <li><strong>Unique Initialization:</strong> 96-bit cryptographically random IV generated per entry.</li>
                <li><strong>Zero Cloud Sync:</strong> Data remains strictly on your local browser instance.</li>
              </ul>
            </>
          )}

          {infoModalTopic === 'calc' && (
            <>
              <p>
                <strong>Brute-Force Attack Hardware Model:</strong>
              </p>
              <p>
                Our crack-time estimations assume a modern high-end GPU cracking cluster capable of executing <strong>100 Billion (10¹¹) SHA-256 / NTLM hashes per second</strong>.
              </p>
              <p className="text-xs">
                Real-world online services (like bank logins) also implement rate limiting and account lockouts after 5 failed attempts, making high-entropy passwords virtually impenetrable.
              </p>
            </>
          )}

          {infoModalTopic === 'policy' && (
            <>
              <p>
                <strong>Organizational Policy Validation:</strong>
              </p>
              <p>
                AegisPass verifies password compliance against modern NIST Special Publication 800-63B and industry enterprise standards.
              </p>
              <p className="text-xs">
                Modern guidelines prioritize length over mandatory periodic rotations, favoring memorizable 16+ character passphrases with rich character diversity.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={closeInfoModal}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-[#00f0ff] text-[#002022] hover:bg-[#7df4ff] transition-all font-mono font-semibold"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all animate-slide-up ${
            toast.type === 'success'
              ? 'bg-[#0a0a0a]/90 border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.15)]'
              : toast.type === 'error'
              ? 'bg-[#1a0a0a]/90 border-red-500/40 text-red-300 shadow-[0_0_20px_rgba(255,0,0,0.15)]'
              : 'bg-[#0a0a0a]/90 border-white/10 text-white shadow-lg'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
          <span className="text-xs font-medium leading-tight text-white">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

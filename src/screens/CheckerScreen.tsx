import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMetrics } from '../utils/crypto';
import { analyzeWeaknesses } from '../utils/analysis';
import { checkBreachStatus } from '../utils/breach';
import { BreachResult } from '../types';
import { 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Zap, 
  Lock, 
  Database,
  RefreshCw
} from 'lucide-react';

export const CheckerScreen: React.FC = () => {
  const { openInfoModal, showToast } = useApp();
  const [testPassword, setTestPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [breachResult, setBreachResult] = useState<BreachResult>({ status: 'idle' });
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);

  const metrics = calculateMetrics(testPassword);
  const findings = analyzeWeaknesses(testPassword);

  const getStrengthBarData = () => {
    switch (metrics.strength) {
      case 'Weak':
        return { count: 1, color: 'bg-red-500', text: 'Weak', textColor: 'text-red-400' };
      case 'Medium':
        return { count: 2, color: 'bg-amber-400', text: 'Medium', textColor: 'text-amber-400' };
      case 'Strong':
        return { count: 3, color: 'bg-emerald-400', text: 'Strong', textColor: 'text-emerald-400' };
      case 'Very Strong':
        return { count: 4, color: 'bg-[#00f0ff]', text: 'Very Strong', textColor: 'text-[#00f0ff]' };
    }
  };

  const strengthData = getStrengthBarData();

  const handleRunBreachCheck = async () => {
    if (!testPassword) {
      showToast('Enter a password first to check for breaches', 'info');
      return;
    }

    setIsCheckingBreach(true);
    try {
      const result = await checkBreachStatus(testPassword);
      setBreachResult(result);
      if (result.status === 'breached') {
        showToast(`Warning: Found in ${result.breachCount?.toLocaleString()} known breaches!`, 'error');
      } else if (result.status === 'safe') {
        showToast('Password is safe — no record in known data breaches', 'success');
      }
    } catch {
      setBreachResult({
        status: 'error',
        message: 'Could not connect to the breach database. Please try again.'
      });
    } finally {
      setIsCheckingBreach(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-headline-lg text-white">Password Checker</h1>
        <p className="text-sm text-[#b9cacb]">
          Analyze real mathematical Shannon entropy, structural patterns, and k-Anonymity breach history.
        </p>
      </div>

      {/* Input Area */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#849495]">
          <label htmlFor="test-password-input" className="uppercase">Enter Password to Test</label>
          <span>{testPassword.length} characters</span>
        </div>

        <div className="relative">
          <input
            id="test-password-input"
            type={showPassword ? 'text' : 'password'}
            value={testPassword}
            onChange={(e) => {
              setTestPassword(e.target.value);
              setBreachResult({ status: 'idle' });
            }}
            placeholder="Type or paste any password..."
            className="w-full px-5 py-4 pr-24 rounded-xl input-cyber font-mono text-base sm:text-lg text-white placeholder-[#849495]/50 focus:ring-1 focus:ring-[#00f0ff]"
            autoFocus
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {testPassword && (
              <button
                onClick={() => {
                  setTestPassword('');
                  setBreachResult({ status: 'idle' });
                }}
                className="p-2 text-[#849495] hover:text-white rounded-lg"
                title="Clear input"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-[#849495] hover:text-[#00f0ff] rounded-lg transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Strength & Metric Cards */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/20 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#849495] uppercase">Calculated Strength:</span>
            <span className={`font-semibold ${testPassword ? strengthData.textColor : 'text-[#849495]'}`}>
              {testPassword ? strengthData.text : 'Awaiting Input'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 h-2.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`rounded-full transition-all duration-300 ${
                  testPassword && step <= strengthData.count
                    ? `${strengthData.color} shadow-[0_0_10px_currentColor]`
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {/* Entropy */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-[#849495] uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00f0ff]" />
              <span>Entropy</span>
            </div>
            <div className="font-mono text-lg font-semibold text-white">
              {metrics.entropyBits.toFixed(1)} <span className="text-xs text-[#849495]">bits</span>
            </div>
          </div>

          {/* Search Space */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-[#849495] uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#00f0ff]" />
              <span>Search Space</span>
            </div>
            <div className="font-mono text-lg font-semibold text-white">
              2<sup>{metrics.searchSpaceExp}</sup>
            </div>
          </div>

          {/* Crack Time */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 col-span-2">
            <div className="text-[11px] font-mono text-[#849495] uppercase flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#00f0ff]" />
              <span>Brute Force Estimate (100B/s)</span>
            </div>
            <div className="font-mono text-base font-semibold text-[#00f0ff] truncate">
              {testPassword ? metrics.bruteForceEstimate : '—'}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-white/5 pt-2">
          <button
            onClick={() => openInfoModal('entropy')}
            className="text-[#00f0ff] hover:underline flex items-center gap-1 text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How is entropy calculated?</span>
          </button>
        </div>
      </div>

      {/* Weaknesses and Pattern Findings */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-mono uppercase text-[#849495] tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#00f0ff]" />
          <span>Structural Analysis & Pattern Detection</span>
        </h3>

        <div className="space-y-2.5">
          {findings.map((f) => (
            <div
              key={f.id}
              className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs leading-relaxed ${
                f.type === 'good'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : f.type === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : f.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-white/5 border-white/10 text-[#b9cacb]'
              }`}
            >
              {f.type === 'good' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {f.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
              {f.type === 'error' && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {f.type === 'info' && <Info className="w-4 h-4 text-[#849495] shrink-0" />}
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* k-Anonymity HaveIBeenPwned Breach Verification */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/20 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a]/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Data Breach Verification (k-Anonymity)</h3>
              <p className="text-xs text-[#849495]">Cross-reference with billions of compromised credentials securely.</p>
            </div>
          </div>

          <button
            onClick={() => openInfoModal('breach')}
            className="text-xs text-[#00f0ff] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How does k-Anonymity protect privacy?</span>
          </button>
        </div>

        <p className="text-xs text-[#b9cacb] leading-relaxed">
          We use mathematical <strong>k-Anonymity</strong> via SHA-1 prefix truncation. Only the first 5 characters of your password's hash are sent over the network. Your actual password never leaves your browser.
        </p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            onClick={handleRunBreachCheck}
            disabled={isCheckingBreach || !testPassword}
            className="btn-primary px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            {isCheckingBreach ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Checking Database...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Scan for Breaches</span>
              </>
            )}
          </button>
        </div>

        {/* Breach Result Display */}
        {breachResult.status !== 'idle' && (
          <div className="pt-2 animate-fade-in">
            {breachResult.status === 'safe' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">No Known Breaches Found</h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed mt-0.5">
                    This password has not appeared in any known public database leaks indexed by HaveIBeenPwned.
                  </p>
                </div>
              </div>
            )}

            {breachResult.status === 'breached' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">
                    Compromised in Known Data Breaches! ({breachResult.breachCount?.toLocaleString()} occurrences)
                  </h4>
                  <p className="text-xs text-red-200/80 leading-relaxed mt-0.5">
                    This exact password has appeared in historical leaks. Hackers use automated dictionaries containing these passwords. You should not use this password for any account.
                  </p>
                </div>
              </div>
            )}

            {breachResult.status === 'error' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Connection Notice</h4>
                  <p className="text-xs text-amber-200/80 leading-relaxed mt-0.5">
                    {breachResult.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

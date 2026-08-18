import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PasswordPurpose } from '../types';
import { PURPOSE_METADATA } from '../utils/constants';
import { calculateMetrics, generateSecurePassword } from '../utils/crypto';
import { 
  Copy, 
  Check, 
  RotateCw, 
  Bookmark, 
  Sliders, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Lock
} from 'lucide-react';

export const GeneratorScreen: React.FC = () => {
  const { 
    selectedPurpose, 
    setSelectedPurpose, 
    generatorConfig, 
    setGeneratorConfig, 
    activePassword, 
    setActivePassword,
    regeneratePassword,
    saveCurrentToVault,
    showToast,
    openInfoModal
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [entryLabel, setEntryLabel] = useState('');

  const metrics = calculateMetrics(activePassword);

  // Synchronize generation when config changes
  useEffect(() => {
    const pwd = generateSecurePassword(generatorConfig);
    setActivePassword(pwd);
  }, [generatorConfig, setActivePassword]);

  const handleCopy = async () => {
    if (!activePassword) return;
    try {
      await navigator.clipboard.writeText(activePassword);
      setCopied(true);
      showToast('Password copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleRegenerate = () => {
    setIsSpinning(true);
    regeneratePassword();
    setTimeout(() => setIsSpinning(false), 300);
  };

  const handleOpenSaveModal = () => {
    setEntryLabel(PURPOSE_METADATA[selectedPurpose].label);
    setSaveModalOpen(true);
  };

  const handleConfirmSave = async () => {
    await saveCurrentToVault(activePassword, selectedPurpose, entryLabel);
    setSaveModalOpen(false);
  };

  const quickLengths = [12, 16, 20, 24, 32, 48];

  // Strength colors and labels
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-headline-lg text-white">Password Generator</h1>
          <p className="text-sm text-[#b9cacb]">
            Cryptographic randomness generated on-device with NIST-grade entropy.
          </p>
        </div>

        {/* Purpose Category Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-[#849495] uppercase">Target Profile:</label>
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value as PasswordPurpose)}
            className="px-3 py-1.5 rounded-xl bg-[#020202] border border-white/15 text-xs text-[#00f0ff] font-medium focus:outline-none focus:border-[#00f0ff]"
          >
            {Object.values(PURPOSE_METADATA).map((meta) => (
              <option key={meta.id} value={meta.id} className="bg-[#12131a] text-white">
                {meta.label} ({meta.defaultLength} chars)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Password Display Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-[#849495] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
            <span>Generated Password</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[11px]">
            {activePassword.length} characters
          </span>
        </div>

        {/* Password Text container */}
        <div className="p-5 rounded-xl bg-[#020202] border border-white/10 relative group flex items-center justify-between gap-4">
          <span className="font-mono text-lg sm:text-2xl text-white tracking-wider break-all select-all font-medium">
            {activePassword || '••••••••••••••••'}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerate}
              className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2"
              title="Regenerate random string"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#00f0ff] ${isSpinning ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>

            <button
              onClick={handleOpenSaveModal}
              className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 hover:text-[#00f0ff]"
              title="Save to local encrypted vault"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Save to Vault</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="btn-primary px-6 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Password</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generator Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Length controls */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#849495]">
              <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Password Length</span>
            </div>
            <span className="font-mono text-sm font-semibold text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-0.5 rounded border border-[#00f0ff]/30">
              {generatorConfig.length}
            </span>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="8"
            max="64"
            value={generatorConfig.length}
            onChange={(e) => setGeneratorConfig(prev => ({ ...prev, length: parseInt(e.target.value, 10) }))}
            className="w-full accent-[#00f0ff] bg-white/10 h-2 rounded-lg cursor-pointer"
          />

          {/* Quick preset length pills */}
          <div className="flex items-center justify-between gap-1 pt-1">
            {quickLengths.map((len) => (
              <button
                key={len}
                onClick={() => setGeneratorConfig(prev => ({ ...prev, length: len }))}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  generatorConfig.length === len
                    ? 'bg-[#00f0ff] text-[#002022] font-semibold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-white/5 text-[#849495] hover:text-white hover:bg-white/10'
                }`}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

        {/* Character Set Toggles */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="text-xs font-mono uppercase text-[#849495] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Character Variety Pools</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Uppercase */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all select-none">
              <input
                type="checkbox"
                checked={generatorConfig.uppercase}
                onChange={(e) => setGeneratorConfig(prev => ({ ...prev, uppercase: e.target.checked }))}
                className="w-4 h-4 accent-[#00f0ff] rounded cursor-pointer"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">Uppercase</div>
                <div className="text-[#849495] font-mono text-[10px]">A–Z</div>
              </div>
            </label>

            {/* Lowercase */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all select-none">
              <input
                type="checkbox"
                checked={generatorConfig.lowercase}
                onChange={(e) => setGeneratorConfig(prev => ({ ...prev, lowercase: e.target.checked }))}
                className="w-4 h-4 accent-[#00f0ff] rounded cursor-pointer"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">Lowercase</div>
                <div className="text-[#849495] font-mono text-[10px]">a–z</div>
              </div>
            </label>

            {/* Numbers */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all select-none">
              <input
                type="checkbox"
                checked={generatorConfig.numbers}
                onChange={(e) => setGeneratorConfig(prev => ({ ...prev, numbers: e.target.checked }))}
                className="w-4 h-4 accent-[#00f0ff] rounded cursor-pointer"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">Numbers</div>
                <div className="text-[#849495] font-mono text-[10px]">0–9</div>
              </div>
            </label>

            {/* Symbols */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all select-none">
              <input
                type="checkbox"
                checked={generatorConfig.symbols}
                onChange={(e) => setGeneratorConfig(prev => ({ ...prev, symbols: e.target.checked }))}
                className="w-4 h-4 accent-[#00f0ff] rounded cursor-pointer"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">Symbols</div>
                <div className="text-[#849495] font-mono text-[10px]">!@#$%^&*</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Real-Time Entropy & Strength Metrics Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/20 space-y-6">
        {/* Strength meter bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#849495] font-mono uppercase">Cryptographic Strength:</span>
            <span className={`font-mono font-semibold ${strengthData.textColor}`}>
              {strengthData.text}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 h-2.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`rounded-full transition-all duration-300 ${
                  step <= strengthData.count
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
              {metrics.bruteForceEstimate}
            </div>
          </div>
        </div>

        {/* Composition Summary & Info link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-[#849495] border-t border-white/5">
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Lowercase: <strong className="text-white">{metrics.composition.lowercase}</strong></span>
            <span>Uppercase: <strong className="text-white">{metrics.composition.uppercase}</strong></span>
            <span>Numbers: <strong className="text-white">{metrics.composition.numbers}</strong></span>
            <span>Symbols: <strong className="text-white">{metrics.composition.symbols}</strong></span>
          </div>

          <button
            onClick={() => openInfoModal('entropy')}
            className="text-[#00f0ff] hover:underline flex items-center gap-1 text-xs self-start sm:self-auto"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How is this calculated?</span>
          </button>
        </div>
      </div>

      {/* Modal: Save to Vault */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full space-y-5 border border-[#00f0ff]/30 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#00f0ff]" />
                <span>Save to Encrypted Vault</span>
              </h3>
              <button
                onClick={() => setSaveModalOpen(false)}
                className="text-[#849495] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[#849495] mb-1">Account Label / Service Name</label>
                <input
                  type="text"
                  value={entryLabel}
                  onChange={(e) => setEntryLabel(e.target.value)}
                  placeholder="e.g. Chase Bank, Personal Gmail, Steam"
                  className="w-full px-3.5 py-2 rounded-xl input-cyber text-sm text-white"
                  autoFocus
                />
              </div>

              <div className="p-3 rounded-xl bg-white/5 text-xs text-[#849495] space-y-1">
                <div>Category: <strong className="text-white">{PURPOSE_METADATA[selectedPurpose].label}</strong></div>
                <div>Strength: <strong className="text-[#00f0ff]">{metrics.strength}</strong> ({metrics.entropyBits.toFixed(0)} bits)</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="btn-secondary px-4 py-2 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

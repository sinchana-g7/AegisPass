import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PolicyLevel, PolicyRules } from '../types';
import { POLICY_PRESETS, evaluatePolicyRules } from '../utils/policy';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Award
} from 'lucide-react';

export const ValidatorScreen: React.FC = () => {
  const { openInfoModal } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<PolicyLevel>('strong');
  const [customRules, setCustomRules] = useState<PolicyRules>(POLICY_PRESETS.custom);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const activeRules = selectedLevel === 'custom' ? customRules : POLICY_PRESETS[selectedLevel];
  const evaluatedRules = evaluatePolicyRules(password, activeRules);

  const totalRules = evaluatedRules.length;
  const passedRules = evaluatedRules.filter(r => r.satisfied).length;
  const isFullyCompliant = password.length > 0 && passedRules === totalRules;

  const policyLevels: { id: PolicyLevel; label: string; desc: string }[] = [
    { id: 'standard', label: 'Standard', desc: '12+ chars • Basic diversity' },
    { id: 'strong', label: 'Strong (NIST)', desc: '16+ chars • All sets • Pattern defense' },
    { id: 'maximum', label: 'Maximum Security', desc: '20+ chars • High complexity' },
    { id: 'custom', label: 'Custom Policy', desc: 'Configure specific corporate rules' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-headline-lg text-white">Policy Validator</h1>
          <p className="text-sm text-[#b9cacb]">
            Test passwords against enterprise security rules and NIST Special Publication 800-63B standards.
          </p>
        </div>

        <button
          onClick={() => openInfoModal('policy')}
          className="text-xs text-[#00f0ff] hover:underline flex items-center gap-1 self-start sm:self-auto font-mono"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Policy Guidelines</span>
        </button>
      </div>

      {/* Policy Preset Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {policyLevels.map((lvl) => {
          const isSelected = selectedLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#00f0ff]/10 border-[#00f0ff]/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  : 'bg-white/5 border-white/10 text-[#849495] hover:text-white hover:bg-white/10'
              }`}
            >
              <div className={`text-xs font-semibold ${isSelected ? 'text-[#00f0ff]' : 'text-white'}`}>
                {lvl.label}
              </div>
              <div className="text-[11px] text-[#849495] mt-1 leading-tight">{lvl.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Custom Rules Configurator (if Custom is chosen) */}
      {selectedLevel === 'custom' && (
        <div className="glass-panel p-6 rounded-2xl border border-[#00f0ff]/30 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00f0ff]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Organizational Policy Constraints</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs text-[#849495] mb-1">
                Minimum Length: <strong className="text-white font-mono">{customRules.minLength}</strong>
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={customRules.minLength}
                onChange={(e) => setCustomRules(prev => ({ ...prev, minLength: parseInt(e.target.value, 10) }))}
                className="w-full accent-[#00f0ff] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customRules.requireUppercase}
                  onChange={(e) => setCustomRules(prev => ({ ...prev, requireUppercase: e.target.checked }))}
                  className="accent-[#00f0ff] rounded"
                />
                <span>Require Uppercase (A–Z)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customRules.requireLowercase}
                  onChange={(e) => setCustomRules(prev => ({ ...prev, requireLowercase: e.target.checked }))}
                  className="accent-[#00f0ff] rounded"
                />
                <span>Require Lowercase (a–z)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customRules.requireNumbers}
                  onChange={(e) => setCustomRules(prev => ({ ...prev, requireNumbers: e.target.checked }))}
                  className="accent-[#00f0ff] rounded"
                />
                <span>Require Numbers (0–9)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customRules.requireSymbols}
                  onChange={(e) => setCustomRules(prev => ({ ...prev, requireSymbols: e.target.checked }))}
                  className="accent-[#00f0ff] rounded"
                />
                <span>Require Symbols (!@#$%...)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customRules.noRepeatPatterns}
                  onChange={(e) => setCustomRules(prev => ({ ...prev, noRepeatPatterns: e.target.checked }))}
                  className="accent-[#00f0ff] rounded"
                />
                <span>Disallow Sequential/Repeated Sequences</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Password Input to Validate */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#849495]">
          <label htmlFor="validate-password-input" className="uppercase">Password to Validate</label>
          <span>{password.length} characters</span>
        </div>

        <div className="relative">
          <input
            id="validate-password-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or paste password to test compliance..."
            className="w-full px-5 py-4 pr-24 rounded-xl input-cyber font-mono text-base sm:text-lg text-white placeholder-[#849495]/50 focus:ring-1 focus:ring-[#00f0ff]"
            autoFocus
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {password && (
              <button
                onClick={() => setPassword('')}
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

      {/* Compliance Overall Status Card */}
      <div className={`p-6 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
        password.length === 0
          ? 'glass-panel border-white/10'
          : isFullyCompliant
          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
          : 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            password.length === 0
              ? 'bg-white/5 text-[#849495]'
              : isFullyCompliant
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/20 text-amber-400'
          }`}>
            {password.length === 0 ? (
              <Award className="w-5 h-5" />
            ) : isFullyCompliant ? (
              <ShieldCheck className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              {password.length === 0
                ? 'Ready for Validation'
                : isFullyCompliant
                ? 'Fully Compliant with Policy'
                : 'Non-Compliant with Policy'}
            </h3>
            <p className="text-xs text-[#849495]">
              {password.length === 0
                ? 'Enter a password above to evaluate against the selected policy rules.'
                : isFullyCompliant
                ? `Satisfies all ${totalRules} required cryptographic parameters.`
                : `${passedRules} of ${totalRules} requirements satisfied.`}
            </p>
          </div>
        </div>

        <div className="font-mono text-sm font-semibold px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
          {passedRules}/{totalRules}
        </div>
      </div>

      {/* Rules Checklist */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-xs font-mono uppercase text-[#849495] tracking-wider">
          Individual Policy Checkpoints
        </h3>

        <div className="space-y-3">
          {evaluatedRules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                rule.satisfied
                  ? 'bg-emerald-500/5 border-emerald-500/25 text-white'
                  : 'bg-white/5 border-white/10 text-[#849495]'
              }`}
            >
              <div className="flex items-center gap-3">
                {rule.satisfied ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-[#849495]/40 flex items-center justify-center text-[10px] text-[#849495] shrink-0">
                    ✕
                  </div>
                )}
                <span className={`text-sm ${rule.satisfied ? 'text-white' : 'text-[#b9cacb]'}`}>
                  {rule.label}
                </span>
              </div>

              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                rule.satisfied
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'bg-white/5 text-[#849495]'
              }`}>
                {rule.satisfied ? 'PASS' : 'FAIL'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { PasswordPurpose } from '../types';
import { PURPOSE_METADATA } from '../utils/constants';
import { 
  ArrowLeft, 
  ArrowRight, 
  Landmark, 
  Mail, 
  Share2, 
  Gamepad2, 
  Briefcase, 
  ShoppingCart, 
  ShieldAlert, 
  User, 
  Check 
} from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { 
    userName, 
    setUserName, 
    selectedPurpose, 
    setSelectedPurpose, 
    navigateTo 
  } = useApp();

  const purposes: { id: PasswordPurpose; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'banking',
      label: 'Banking & Finance',
      icon: <Landmark className="w-5 h-5" />,
      desc: 'Maximum entropy for high-value financial & credit accounts'
    },
    {
      id: 'email',
      label: 'Email & Communications',
      icon: <Mail className="w-5 h-5" />,
      desc: 'Master communication hub that controls password resets'
    },
    {
      id: 'social',
      label: 'Social Media',
      icon: <Share2 className="w-5 h-5" />,
      desc: 'Unique entropy profile to defend against credential stuffing'
    },
    {
      id: 'gaming',
      label: 'Gaming & Entertainment',
      icon: <Gamepad2 className="w-5 h-5" />,
      desc: 'Balanced length with symbols for game libraries & inventories'
    },
    {
      id: 'work',
      label: 'Work & College',
      icon: <Briefcase className="w-5 h-5" />,
      desc: 'Enterprise grade requirements for professional credentials'
    },
    {
      id: 'shopping',
      label: 'Shopping & Commerce',
      icon: <ShoppingCart className="w-5 h-5" />,
      desc: 'Protection for stored payment methods and shipping details'
    },
    {
      id: 'other',
      label: 'General / Other',
      icon: <ShieldAlert className="w-5 h-5" />,
      desc: 'Standard strong cryptographic security profile'
    }
  ];

  const currentMeta = PURPOSE_METADATA[selectedPurpose];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-2 text-xs font-mono text-[#849495] hover:text-[#00f0ff] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Header and Name Input */}
      <div className="space-y-4">
        <h1 className="font-headline-lg text-white">
          {userName.trim() ? `Welcome, ${userName.trim()}!` : 'Welcome to AegisPass!'}
        </h1>
        <p className="text-sm text-[#b9cacb] leading-relaxed">
          Choose the type of account you're securing today. We'll automatically calibrate the recommended character length and entropy targets.
        </p>

        {/* Personalized Name Input */}
        <div className="max-w-md pt-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#849495] mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Your Name / Profile Tag (Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-4 py-2.5 rounded-xl input-cyber text-sm text-white placeholder-[#849495]/60 focus:ring-1 focus:ring-[#00f0ff]"
            />
          </div>
        </div>
      </div>

      {/* Purpose Cards Grid */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#849495]">
          Select Account Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {purposes.map((p) => {
            const isSelected = selectedPurpose === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPurpose(p.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all purpose-card flex items-start gap-4 ${
                  isSelected ? 'selected' : 'border-white/10 glass-panel'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  isSelected 
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                    : 'bg-white/5 text-[#849495] border border-white/10'
                }`}>
                  {p.icon}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-semibold ${isSelected ? 'text-[#00f0ff]' : 'text-white'}`}>
                      {p.label}
                    </h3>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#00f0ff] text-[#002022] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-[#849495] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation Box */}
      <div className="p-6 rounded-2xl glass-panel border border-[#00f0ff]/20 bg-[#00f0ff]/5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider font-semibold">
          <span>Target Configuration: {currentMeta.label}</span>
          <span>•</span>
          <span>Recommended Length: {currentMeta.defaultLength} chars</span>
        </div>
        <p className="text-sm text-[#e2e1eb] leading-relaxed">
          {currentMeta.recommendation}
        </p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigateTo('generator')}
          className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.3)]"
        >
          <span>Continue to Generator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

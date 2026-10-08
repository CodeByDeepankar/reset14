import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { db } from '../../lib/db/store';
import { UserGoal } from '../../lib/db/types';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<'splash' | 'goals'>('splash');
  const [goals, setGoals] = useState<UserGoal[]>(() => db.getGoals());

  if (!isOpen) return null;

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g))
    );
    db.toggleGoal(id);
  };

  const handleFinish = () => {
    db.updateProfile({ onboarding_completed: true });
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08090C] overflow-y-auto">
      {step === 'splash' ? (
        // --- Screen 1: Splash Screen ---
        <div className="relative w-full max-w-md min-h-screen sm:min-h-0 sm:my-auto p-6 flex flex-col justify-between items-center text-center">
          {/* Top brand accent */}
          <div className="pt-8">
            <span className="text-[11px] font-mono tracking-widest text-[#8B5CF6] uppercase font-bold px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
              14-Day Reset OS
            </span>
          </div>

          {/* Center Title and Visual */}
          <div className="my-auto py-8 space-y-4 w-full">
            {/* Cinematic Mountain Illustration Card */}
            <div className="relative w-full h-64 rounded-3xl overflow-hidden border border-[#1F242E] shadow-2xl bg-gradient-to-b from-[#181B22] to-[#08090C] flex flex-col items-center justify-end p-6">
              {/* Subtle mountain ridges SVG */}
              <svg
                viewBox="0 0 400 200"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#08090C" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradSun" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Sun & twilight glow */}
                <circle cx="200" cy="110" r="55" fill="url(#gradSun)" />
                {/* Mountain Layers */}
                <path d="M0,170 Q100,100 200,130 T400,160 L400,200 L0,200 Z" fill="#181B22" />
                <path d="M0,150 Q120,70 240,110 T400,140 L400,200 L0,200 Z" fill="url(#grad1)" />
                <path d="M0,185 Q150,140 300,165 T400,180 L400,200 L0,200 Z" fill="#0B0D12" />
                {/* Silhouette of person seated on peak */}
                <circle cx="195" cy="120" r="5" fill="#FFFFFF" />
                <path d="M190,135 L200,135 L198,125 L192,125 Z" fill="#FFFFFF" />
              </svg>

              <div className="relative z-10 text-center">
                <span className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase">
                  Reclaim Sovereignty
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-1">
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                RESET 14
              </h1>
              <p className="text-sm font-medium text-slate-300">
                14 Days.
              </p>
              <p className="text-xs text-[#8B93A1] tracking-wide">
                Less Noise. More Control.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="w-full pb-8">
            <button
              onClick={() => setStep('goals')}
              className="w-full py-4 px-6 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#8B5CF6]/30 transition transform active:scale-98"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex justify-center gap-1.5 mt-4">
              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-[#374151] inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-[#374151] inline-block"></span>
            </div>
          </div>
        </div>
      ) : (
        // --- Screen 2: Onboarding Goals ---
        <div className="relative w-full max-w-md min-h-screen sm:min-h-0 sm:my-auto p-6 flex flex-col justify-between">
          <div className="space-y-6 pt-4">
            {/* Top progress indicator & skip */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-6 h-1 rounded-full bg-[#8B5CF6]" />
                <div className="w-6 h-1 rounded-full bg-[#8B5CF6]" />
                <div className="w-6 h-1 rounded-full bg-[#374151]" />
              </div>
              <button
                onClick={handleFinish}
                className="text-xs font-semibold text-[#8B93A1] hover:text-white"
              >
                Skip
              </button>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                What do you want to focus on?
              </h2>
              <p className="text-xs text-[#8B93A1] mt-1 leading-relaxed">
                Select your goals for this 14-day challenge.
              </p>
            </div>

            {/* Goals List matching reference image */}
            <div className="space-y-2.5 max-h-[58vh] overflow-y-auto pr-1">
              {goals.map((g) => {
                const isSelected = g.enabled;
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    type="button"
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-[#181B22] border-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/10'
                        : 'bg-[#12141A] border-[#1F242E] text-slate-300 hover:bg-[#181B22]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg pt-0.5">
                        {g.category === 'nasha' && '🚫'}
                        {g.category === 'relationship' && '💔'}
                        {g.category === 'study' && '📖'}
                        {g.category === 'body' && '🏋️'}
                        {g.category === 'growth' && '🎮'}
                        {g.category === 'sleep' && '🌙'}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-white block">
                          {g.title}
                        </span>
                        <span className="text-[11px] text-[#8B93A1] mt-0.5 block leading-tight">
                          {g.description}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 transition ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white'
                          : 'border-[#4B5563]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continue button */}
          <div className="pt-6 pb-4">
            <button
              onClick={handleFinish}
              className="w-full py-4 px-6 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#8B5CF6]/30 transition transform active:scale-98"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { X, ArrowRight, ShieldAlert, Heart, Zap, UserX, AlertOctagon, Frown, Sparkles } from 'lucide-react';
import { Craving } from '../../lib/db/types';

interface StrugglingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart10MinReset: (cravingData: { feeling_category: Craving['feeling_category']; intensity_before: number }) => void;
}

export const StrugglingModal: React.FC<StrugglingModalProps> = ({
  isOpen,
  onClose,
  onStart10MinReset,
}) => {
  const [selectedFeeling, setSelectedFeeling] = useState<Craving['feeling_category']>('wanting_nasha');
  const [intensity, setIntensity] = useState<number>(7);

  if (!isOpen) return null;

  const feelings: { id: Craving['feeling_category']; label: string; icon: string }[] = [
    { id: 'lonely', label: 'Lonely', icon: '👤' },
    { id: 'angry', label: 'Angry', icon: '😡' },
    { id: 'bored', label: 'Bored', icon: '🥱' },
    { id: 'missing_someone', label: 'Missing someone', icon: '💔' },
    { id: 'wanting_nasha', label: 'Wanting nasha', icon: '🚫' },
    { id: 'relationship_urge', label: 'Relationship urge', icon: '💬' },
    { id: 'stressed', label: 'Stressed', icon: '⚡' },
    { id: 'other', label: 'Other', icon: '❓' },
  ];

  const handleStart = () => {
    onStart10MinReset({
      feeling_category: selectedFeeling,
      intensity_before: intensity,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111318] border border-[#1F242E] rounded-3xl p-6 shadow-2xl space-y-6 my-auto">
        {/* Top bar with back/close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F87171]">
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Protocol</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8B93A1] hover:text-white hover:bg-[#181B22] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">You're Craving?</h2>
          <p className="text-xs text-[#8B93A1] max-w-xs mx-auto leading-relaxed">
            Don't make a permanent decision during a temporary emotional state.
          </p>
        </div>

        {/* Feeling Options */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B93A1] block">
            What are you feeling right now?
          </span>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {feelings.map((f) => {
              const isSelected = selectedFeeling === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFeeling(f.id)}
                  type="button"
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#181B22] border-[#8B5CF6] text-white shadow-sm'
                      : 'bg-[#13161D] border-[#1F242E] text-[#8B93A1] hover:text-white hover:bg-[#181B22]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-sm">{f.icon}</span>
                    <span>{f.label}</span>
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                        : 'border-[#4B5563]'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Intensity slider */}
        <div className="p-3.5 bg-[#181B22] rounded-2xl border border-[#1F242E] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#8B93A1]">Urge Intensity</span>
            <span className="text-white font-mono">{intensity} / 10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full accent-[#8B5CF6] cursor-pointer"
          />
        </div>

        {/* Start 10-Minute Reset CTA */}
        <button
          onClick={handleStart}
          className="w-full py-3.5 px-5 bg-gradient-to-r from-[#EF4444] via-[#F87171] to-[#EF4444] hover:opacity-95 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-950/40 transition transform active:scale-98"
        >
          <span>Start 10 Minute Reset</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

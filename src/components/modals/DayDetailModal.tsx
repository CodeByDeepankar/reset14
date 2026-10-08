import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { db } from '../../lib/db/store';
import { ChallengeDay } from '../../lib/db/types';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: ChallengeDay | null;
  onOpenMindJournal: () => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  isOpen,
  onClose,
  day,
  onOpenMindJournal,
}) => {
  const [reflectionAnswer, setReflectionAnswer] = useState<string>(
    day?.reflection_answer || ''
  );
  const [completedTargets, setCompletedTargets] = useState<Record<number, boolean>>({});

  if (!isOpen || !day) return null;

  const toggleTarget = (index: number) => {
    setCompletedTargets((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSaveReflection = () => {
    db.updateChallengeDay(day.day_number, {
      reflection_answer: reflectionAnswer,
      score: Math.min(100, Math.max(70, day.score + 10)),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111318] border border-[#1F242E] rounded-3xl p-6 shadow-2xl space-y-6 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8B93A1]">
              Day {day.day_number} / 14
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30">
              {day.phase}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8B93A1] hover:text-white hover:bg-[#181B22] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Mission */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">
            {day.theme}
          </h2>
          <p className="text-xs text-[#8B93A1] leading-relaxed">
            {day.mission}
          </p>
        </div>

        {/* Today's Targets checklist matching reference */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B93A1] block">
            Today's Targets
          </span>
          <div className="space-y-1.5">
            {day.targets.map((target, idx) => {
              const isChecked = Boolean(completedTargets[idx]);
              return (
                <button
                  key={idx}
                  onClick={() => toggleTarget(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-medium transition ${
                    isChecked
                      ? 'bg-[#181B22] border-[#34D399]/40 text-[#D1FAE5]'
                      : 'bg-[#13161D] border-[#1F242E] text-slate-300 hover:bg-[#181B22]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs">
                      {target.toLowerCase().includes('nasha') && '🚫'}
                      {target.toLowerCase().includes('profile') && '💔'}
                      {target.toLowerCase().includes('study') && '📖'}
                      {target.toLowerCase().includes('workout') && '🏋️'}
                      {target.toLowerCase().includes('hobby') && '🎮'}
                      {target.toLowerCase().includes('sleep') && '🌙'}
                      {target.toLowerCase().includes('water') && '💧'}
                    </span>
                    <span>{target}</span>
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                      isChecked
                        ? 'border-[#34D399] bg-[#34D399] text-[#08090C]'
                        : 'border-[#4B5563]'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reflection Question */}
        <div className="p-4 bg-[#181B22] rounded-2xl border border-[#1F242E] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Reflection Question
            </span>
          </div>

          <p className="text-xs font-semibold text-white">
            {day.reflection_question}
          </p>

          <textarea
            value={reflectionAnswer}
            onChange={(e) => setReflectionAnswer(e.target.value)}
            placeholder="Write your honest observation here..."
            rows={2}
            className="w-full bg-[#111318] border border-[#2A303C] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] resize-none"
          />
        </div>

        {/* Save button */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-[#181B22] hover:bg-[#202530] text-slate-300 font-semibold rounded-2xl text-xs transition"
          >
            Close
          </button>
          <button
            onClick={handleSaveReflection}
            className="flex-1 py-3 px-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[#8B5CF6]/30 transition"
          >
            <span>Save Reflection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

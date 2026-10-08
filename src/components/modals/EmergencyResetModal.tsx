import React, { useState, useEffect } from 'react';
import { Check, Pause, Play, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { db } from '../../lib/db/store';
import { Craving } from '../../lib/db/types';

interface EmergencyResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCravingData: {
    feeling_category: Craving['feeling_category'];
    intensity_before: number;
  } | null;
}

export const EmergencyResetModal: React.FC<EmergencyResetModalProps> = ({
  isOpen,
  onClose,
  initialCravingData,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600); // 10 minutes = 600 seconds
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [showOutcome, setShowOutcome] = useState<boolean>(false);
  const [savedCravingId, setSavedCravingId] = useState<string | null>(null);

  const steps = [
    { id: 's1', label: 'Leave the triggering environment' },
    { id: 's2', label: 'Drink water' },
    { id: 's3', label: 'Go for a walk / physical activity' },
    { id: 's4', label: 'Breathe slowly' },
    { id: 's5', label: 'No phone checking' },
    { id: 's6', label: 'Wait for 10 minutes' },
  ];

  // Timestamp-based accurate timer
  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(600);
      setIsRunning(true);
      setCompletedSteps({});
      setShowOutcome(false);
      setSavedCravingId(null);
      return;
    }

    // Save initial craving entry to database
    if (initialCravingData && !savedCravingId) {
      const today = new Date().toISOString().split('T')[0];
      const entry = db.logCraving({
        date: today,
        feeling_category: initialCravingData.feeling_category,
        intensity_before: initialCravingData.intensity_before,
        resolved: false,
      });
      setSavedCravingId(entry.id);
    }
  }, [isOpen, initialCravingData]);

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setShowOutcome(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isRunning]);

  if (!isOpen) return null;

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const handleFinishEarly = () => {
    setIsRunning(false);
    setShowOutcome(true);
  };

  const handleSaveOutcome = (outcome: 'much_lower' | 'a_little_lower' | 'same' | 'stronger') => {
    if (savedCravingId) {
      db.updateCraving(savedCravingId, {
        intensity_after: outcome,
        resolved: true,
        intervention_duration_seconds: 600 - secondsRemaining,
        steps_completed: Object.keys(completedSteps).filter((k) => completedSteps[k]),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08090C] overflow-y-auto">
      {/* Background cinematic atmosphere with mountain dusk motif */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181B22]/90 via-[#0B0D12]/95 to-[#08090C] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg min-h-screen sm:min-h-0 sm:my-auto p-5 sm:p-8 flex flex-col justify-between">
        {/* Top bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-[#8B93A1] hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={onClose}
            className="text-xs text-[#8B93A1] hover:text-white font-medium px-3 py-1 rounded-lg bg-[#181B22] border border-[#1F242E]"
          >
            End
          </button>
        </div>

        {/* Motivational Header */}
        <div className="text-center my-6 space-y-1">
          <p className="text-xs sm:text-sm text-slate-200 font-serif font-medium italic">
            "The urge will pass. You're stronger than a temporary feeling."
          </p>
        </div>

        {/* Timer Card */}
        <div className="flex flex-col items-center justify-center my-4 space-y-2">
          <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-md">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B93A1]">
            Time remaining
          </span>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#181B22] border border-[#1F242E] text-slate-300 hover:text-white flex items-center gap-1.5 transition"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Action Steps Checklist */}
        <div className="space-y-2 my-4">
          {steps.map((st) => {
            const isDone = Boolean(completedSteps[st.id]);
            return (
              <button
                key={st.id}
                onClick={() => toggleStep(st.id)}
                type="button"
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl border text-left transition ${
                  isDone
                    ? 'bg-[#181B22]/80 border-[#34D399]/40 text-[#D1FAE5]'
                    : 'bg-[#12141A]/90 border-[#1F242E] text-slate-300 hover:bg-[#181B22]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                    isDone
                      ? 'border-[#34D399] bg-[#34D399] text-[#08090C]'
                      : 'border-[#4B5563]'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm font-medium">{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* Outcome Selector or I'm OK Now CTA */}
        {!showOutcome ? (
          <div className="pt-4 pb-2">
            <button
              onClick={handleFinishEarly}
              className="w-full py-4 px-6 bg-[#34D399] hover:bg-[#10B981] text-[#08090C] font-black rounded-2xl text-sm sm:text-base transition transform active:scale-98 shadow-xl shadow-[#34D399]/20"
            >
              I'm OK Now
            </button>
          </div>
        ) : (
          <div className="p-4 bg-[#181B22] rounded-2xl border border-[#34D399]/40 space-y-3 mt-4 animate-in fade-in">
            <div className="text-center">
              <span className="text-xs font-bold text-white block">What happened to the urge?</span>
              <span className="text-[11px] text-[#8B93A1]">Be honest with yourself:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'much_lower' as const, label: 'Much lower 🌿' },
                { id: 'a_little_lower' as const, label: 'A little lower' },
                { id: 'same' as const, label: 'Same' },
                { id: 'stronger' as const, label: 'Still strong ⚠️' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSaveOutcome(opt.id)}
                  className="py-2.5 px-3 bg-[#111318] hover:bg-[#202530] border border-[#1F242E] hover:border-[#8B5CF6] text-xs font-semibold text-white rounded-xl transition"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

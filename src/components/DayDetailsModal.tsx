import React from 'react';
import { Sparkles, Brain, AlertCircle, Target, CheckCircle2, X, Edit3, ArrowRight, ShieldCheck } from 'lucide-react';
import { DayMilestoneInfo, DayCheckIn, UserProfile } from '../types/recovery';

interface DayDetailsModalProps {
  milestone: DayMilestoneInfo | null;
  checkIn?: DayCheckIn;
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckIn: (dayNumber: number) => void;
  profile: UserProfile;
}

export const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  milestone,
  checkIn,
  isOpen,
  onClose,
  onOpenCheckIn,
  profile,
}) => {
  if (!isOpen || !milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold font-mono">
              #{milestone.day}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Day {milestone.day}: {milestone.title}</h2>
              <p className="text-xs text-slate-400">{milestone.hindiTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Affirmation Card */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/40 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Day {milestone.day} Affirmation
            </div>
            <p className="text-sm sm:text-base text-emerald-100 italic font-serif-display leading-relaxed">
              "{milestone.affirmation}"
            </p>
          </div>

          {/* Neuroscience Section */}
          <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              What Is Happening In Your Brain & Body Today
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {milestone.neuroScience}
            </p>
          </div>

          {/* Withdrawal Challenge & Mission Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Withdrawal Challenge */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                The Temptation / Challenge
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {milestone.withdrawalChallenge}
              </p>
            </div>

            {/* Daily Mission */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                Today's Concrete Mission
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {milestone.mission}
              </p>
            </div>
          </div>

          {/* Coping Tips */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Essential Tactics For Day {milestone.day}
            </span>
            <ul className="space-y-1.5">
              {milestone.copingTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Existing Check-In Status or Prompt */}
          {checkIn ? (
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Day {milestone.day} Logged: {checkIn.status === 'clean' ? '100% Clean' : 'Lapse / Supported'}
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckIn(milestone.day);
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Entry
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Craving Level</span>
                  <span className="font-bold text-white">{checkIn.cravingLevel} / 10</span>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Mood</span>
                  <span className="font-bold text-white capitalize">{checkIn.mood}</span>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-lg col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block">Tools Used</span>
                  <span className="font-bold text-white">{checkIn.copingStrategies?.length || 0} applied</span>
                </div>
              </div>

              {checkIn.victoryNote && (
                <div className="text-xs text-slate-300 pt-1">
                  <strong className="text-amber-300 block mb-0.5">Victory Claimed:</strong>
                  <span>{checkIn.victoryNote}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-slate-800/30 border border-slate-700/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">
                  Check-in Not Yet Recorded for Day {milestone.day}
                </span>
                <span className="text-xs text-slate-400">
                  Track your cravings, withdrawal symptoms, and daily wins.
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckIn(milestone.day);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-950/60"
              >
                Log Day {milestone.day} Check-in
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

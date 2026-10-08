import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, X, Heart, Shield, Award } from 'lucide-react';
import { DayCheckIn, UserProfile } from '../types/recovery';
import { COMMON_SYMPTOMS, COMMON_COPING_TOOLS, RECOVERY_MILESTONES } from '../data/milestones';
import { sound } from '../utils/sound';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  existingCheckIn?: DayCheckIn;
  profile: UserProfile;
  onSaveCheckIn: (checkIn: DayCheckIn) => void;
  onOpenUrgeSOS: () => void;
  onOpenRelapseSupport: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  existingCheckIn,
  profile,
  onSaveCheckIn,
  onOpenUrgeSOS,
  onOpenRelapseSupport,
}) => {
  const milestone = RECOVERY_MILESTONES.find((m) => m.day === dayNumber) || RECOVERY_MILESTONES[0];

  const [status, setStatus] = useState<'clean' | 'slip'>('clean');
  const [cravingLevel, setCravingLevel] = useState<number>(3);
  const [mood, setMood] = useState<DayCheckIn['mood']>('hopeful');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [copingTools, setCopingTools] = useState<string[]>([]);
  const [victoryNote, setVictoryNote] = useState<string>('');
  const [reflectionNote, setReflectionNote] = useState<string>('');

  useEffect(() => {
    if (existingCheckIn) {
      setStatus(existingCheckIn.status === 'slip' ? 'slip' : 'clean');
      setCravingLevel(existingCheckIn.cravingLevel ?? 3);
      setMood(existingCheckIn.mood || 'hopeful');
      setSymptoms(existingCheckIn.physicalSymptoms || []);
      setCopingTools(existingCheckIn.copingStrategies || []);
      setVictoryNote(existingCheckIn.victoryNote || '');
      setReflectionNote(existingCheckIn.reflectionNote || '');
    } else {
      setStatus('clean');
      setCravingLevel(3);
      setMood('hopeful');
      setSymptoms([]);
      setCopingTools([]);
      setVictoryNote('');
      setReflectionNote('');
    }
  }, [existingCheckIn, isOpen]);

  if (!isOpen) return null;

  const toggleSymptom = (item: string) => {
    setSymptoms((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const toggleCoping = (item: string) => {
    setCopingTools((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const todayDate = new Date().toISOString().split('T')[0];
    const newCheckIn: DayCheckIn = {
      dayNumber,
      date: existingCheckIn?.date || todayDate,
      status,
      cravingLevel,
      mood,
      physicalSymptoms: symptoms,
      copingStrategies: copingTools,
      triggersFaced: [],
      victoryNote,
      reflectionNote,
      affirmationRead: true,
      timestamp: Date.now(),
    };

    onSaveCheckIn(newCheckIn);

    if (status === 'clean') {
      if (profile.soundEnabled) sound.playSuccessChime();
    } else {
      onOpenRelapseSupport();
    }

    onClose();
  };

  const cravingLabel =
    cravingLevel <= 1
      ? 'Peaceful & Serene'
      : cravingLevel <= 3
      ? 'Mild Fleeting Whisper'
      : cravingLevel <= 6
      ? 'Noticeable Urge / Tug'
      : cravingLevel <= 8
      ? 'Intense Craving Wave'
      : 'Severe Emergency Wave';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Day Header */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
              #{dayNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Day {dayNumber}: {milestone.title}</h2>
              </div>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Daily Affirmation Card */}
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                Today's Core Affirmation
              </span>
              <p className="text-xs sm:text-sm text-emerald-200 italic font-serif-display mt-0.5">
                "{milestone.affirmation}"
              </p>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Sobriety Status Today
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('clean')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                  status === 'clean'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">100% Clean Today</span>
                <span className="text-[10px] text-slate-400">Kept the Sankalp unbroken</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('slip')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                  status === 'slip'
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-md shadow-rose-950/50'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-white">Had a Slip / Need Support</span>
                <span className="text-[10px] text-slate-400">Zero shame. Reset & stand back up</span>
              </button>
            </div>
          </div>

          {/* Craving Intensity Slider */}
          <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Peak Craving Level Today (0 to 10)
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                cravingLevel >= 7 ? 'bg-rose-500/20 text-rose-300' : cravingLevel >= 4 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {cravingLevel} / 10 · {cravingLabel}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              value={cravingLevel}
              onChange={(e) => setCravingLevel(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            {cravingLevel >= 7 && (
              <div className="pt-2 flex items-center justify-between bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/40">
                <span className="text-xs text-amber-300">
                  Cravings are intense right now?
                </span>
                <button
                  type="button"
                  onClick={onOpenUrgeSOS}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition"
                >
                  Open Craving SOS
                </button>
              </div>
            )}
          </div>

          {/* Mood Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Dominant Emotional State
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'hopeful', label: 'Hopeful 🌿' },
                { key: 'calm', label: 'Calm 🧘' },
                { key: 'proud', label: 'Proud 🦁' },
                { key: 'restless', label: 'Restless ⚡' },
                { key: 'anxious', label: 'Anxious 🌊' },
                { key: 'irritable', label: 'Irritable 🌋' },
                { key: 'exhausted', label: 'Tired 💤' },
                { key: 'sad', label: 'Heavy / Sad 🌧️' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMood(m.key as DayCheckIn['mood'])}
                  className={`p-2 rounded-lg text-xs font-medium border text-center transition ${
                    mood === m.key
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Physical Symptoms */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Withdrawal & Physical Symptoms Experienced
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((sym) => {
                const active = symptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      active
                        ? 'bg-amber-950/50 border-amber-500/70 text-amber-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coping Tools Used */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Coping Shields Deployed Today
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_COPING_TOOLS.map((tool) => {
                const active = copingTools.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleCoping(tool)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      active
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Victory & Notes */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                🏆 Today's Personal Victory (Even a small one):
              </label>
              <input
                type="text"
                value={victoryNote}
                onChange={(e) => setVictoryNote(e.target.value)}
                placeholder="e.g., Threw away old rolling paper, went for a run instead of calling dealers"
                className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                📝 Evening Reflection / Brain Notes:
              </label>
              <textarea
                value={reflectionNote}
                onChange={(e) => setReflectionNote(e.target.value)}
                placeholder="What felt challenging today? How did your mind try to trick you, and how did you survive?"
                rows={2}
                className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Day {dayNumber} Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

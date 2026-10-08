import React, { useState } from 'react';
import { Brain, Heart, Sparkles, MessageSquare, Check, History } from 'lucide-react';
import { db } from '../../lib/db/store';
import { MoodEntry, JournalEntry } from '../../lib/db/types';

export const MindView: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMood = db.getMoodEntry(todayStr);
  const currentJournal = db.getJournalEntry(todayStr);

  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood']>(currentMood.mood);
  const [intensity, setIntensity] = useState<number>(currentMood.intensity);

  const [whatHappened, setWhatHappened] = useState<string>(currentJournal.what_happened || '');
  const [whatFeeling, setWhatFeeling] = useState<string>(currentJournal.what_feeling || '');
  const [whatTriggered, setWhatTriggered] = useState<string>(currentJournal.what_triggered || '');
  const [whatDidInstead, setWhatDidInstead] = useState<string>(currentJournal.what_did_instead || '');
  const [whatDoTomorrow, setWhatDoTomorrow] = useState<string>(currentJournal.what_do_tomorrow || '');

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const moods: { id: MoodEntry['mood']; label: string; icon: string }[] = [
    { id: 'sad', label: 'Sad', icon: '😞' },
    { id: 'neutral', label: 'Neutral', icon: '😐' },
    { id: 'good', label: 'Good', icon: '🙂' },
    { id: 'calm', label: 'Calm', icon: '😌' },
    { id: 'energetic', label: 'Energetic', icon: '🔥' },
  ];

  const handleMoodSelect = (m: MoodEntry['mood']) => {
    setSelectedMood(m);
    db.setMoodEntry(todayStr, m, intensity);
  };

  const handleIntensityChange = (val: number) => {
    setIntensity(val);
    db.setMoodEntry(todayStr, selectedMood, val);
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveJournalEntry({
      id: 'j_' + todayStr,
      user_id: db.getProfile().id,
      date: todayStr,
      what_happened: whatHappened,
      what_feeling: whatFeeling,
      what_triggered: whatTriggered,
      what_did_instead: whatDidInstead,
      what_do_tomorrow: whatDoTomorrow,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Mind & Reflection</h1>
        <p className="text-xs text-[#8B93A1]">Emotional sovereignty & daily clarity</p>
      </div>

      {/* Mood Selector matching Screen 10 */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-white block">
          How are you right now?
        </span>

        <div className="grid grid-cols-5 gap-2">
          {moods.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleMoodSelect(m.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition ${
                  isSelected
                    ? 'bg-[#181B22] border-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20'
                    : 'bg-[#13161D] border-[#1F242E] text-[#8B93A1] hover:text-white hover:bg-[#181B22]'
                }`}
              >
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className="text-[11px] font-semibold">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Intensity slider */}
        <div className="pt-2 flex items-center justify-between text-xs text-[#8B93A1]">
          <span>Mood Intensity: <strong className="text-white font-mono">{intensity} / 10</strong></span>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => handleIntensityChange(Number(e.target.value))}
            className="w-32 accent-[#8B5CF6] cursor-pointer"
          />
        </div>
      </div>

      {/* Structured Journal Form matching Screen 10 */}
      <form onSubmit={handleSaveJournal} className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Daily Reset Journal
          </span>
          <span className="text-[11px] text-[#8B93A1]">{todayStr}</span>
        </div>

        {/* Question 1: What happened today? */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What happened today?
          </label>
          <textarea
            value={whatHappened}
            onChange={(e) => setWhatHappened(e.target.value)}
            placeholder="Write your thoughts..."
            rows={2}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] resize-none"
          />
        </div>

        {/* Question 2: What am I feeling? */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What am I feeling right now?
          </label>
          <input
            type="text"
            value={whatFeeling}
            onChange={(e) => setWhatFeeling(e.target.value)}
            placeholder="e.g. Grounded, slightly restless, proud of study focus..."
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl px-3.5 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        {/* Question 3: What triggered you? */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What triggered you?
          </label>
          <input
            type="text"
            value={whatTriggered}
            onChange={(e) => setWhatTriggered(e.target.value)}
            placeholder="Write what triggered you..."
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl px-3.5 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        {/* Question 4: What did you do instead? */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What did you do instead?
          </label>
          <input
            type="text"
            value={whatDidInstead}
            onChange={(e) => setWhatDidInstead(e.target.value)}
            placeholder="Write how you handled it..."
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl px-3.5 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        {/* Question 5: What will you do tomorrow? */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What will you do tomorrow?
          </label>
          <input
            type="text"
            value={whatDoTomorrow}
            onChange={(e) => setWhatDoTomorrow(e.target.value)}
            placeholder="Your plan for tomorrow..."
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl px-3.5 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        {/* Save Journal CTA matching Screen 10 */}
        <button
          type="submit"
          className="w-full py-4 px-6 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#8B5CF6]/30 transition transform active:scale-98"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Journal Saved</span>
            </>
          ) : (
            <span>Save Journal</span>
          )}
        </button>
      </form>
    </div>
  );
};

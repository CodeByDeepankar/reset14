import React, { useState } from 'react';
import { Award, ArrowLeft, Check, Sparkles, AlertTriangle, TrendingUp } from 'lucide-react';
import { db } from '../../lib/db/store';

interface WeeklyReviewViewProps {
  onBack: () => void;
}

export const WeeklyReviewView: React.FC<WeeklyReviewViewProps> = ({ onBack }) => {
  const [whatWorked, setWhatWorked] = useState('Having pre-planned 50-minute study blocks and keeping phone in another room.');
  const [whatDidnt, setWhatDidnt] = useState('Afternoon boredom lull around 3:30 PM triggers social media checking.');
  const [whatChange, setWhatChange] = useState('Schedule a mandatory brisk walk or green tea break at 3:30 PM before fatigue sets in.');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#181B22] border border-[#1F242E] text-[#8B93A1] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Weekly Review</h1>
          <p className="text-xs text-[#8B93A1]">Analyze metrics & calibrate your next 7-day protocol</p>
        </div>
      </div>

      {/* Analytics Summary Card */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-white block">
          Week 1 Executive Summary
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Best Day</span>
            <span className="font-bold text-[#34D399]">Day 2 (90% score)</span>
          </div>
          <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Most Productive</span>
            <span className="font-bold text-white">Day 3 (150 min study)</span>
          </div>
          <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Average Mood</span>
            <span className="font-bold text-[#FBBF24]">Good (7.2/10)</span>
          </div>
          <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Study Hours</span>
            <span className="font-bold text-white">8.5 Hours total</span>
          </div>
          <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Workouts</span>
            <span className="font-bold text-white">5 Sessions</span>
          </div>
          <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Cravings Conquered</span>
            <span className="font-bold text-[#34D399]">4 Handled ✓</span>
          </div>
        </div>

        <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E] text-xs flex items-center justify-between">
          <span className="text-[#8B93A1]">Most Common Craving Trigger:</span>
          <span className="font-bold text-[#F87171]">Afternoon Boredom / Fatigue</span>
        </div>
      </div>

      {/* Reflection Prompts matching Requirement #15 */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-white block">
          Strategic Reflection
        </span>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What worked exceptionally well?
          </label>
          <textarea
            value={whatWorked}
            onChange={(e) => setWhatWorked(e.target.value)}
            rows={2}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#8B5CF6] resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What didn't work / where was resistance highest?
          </label>
          <textarea
            value={whatDidnt}
            onChange={(e) => setWhatDidnt(e.target.value)}
            rows={2}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#8B5CF6] resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            What must change in your protocol for next week?
          </label>
          <textarea
            value={whatChange}
            onChange={(e) => setWhatChange(e.target.value)}
            rows={2}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#8B5CF6] resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 px-5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition"
        >
          {isSaved ? <Check className="w-4 h-4 stroke-[3]" /> : null}
          <span>{isSaved ? 'Review Saved' : 'Save Weekly Review'}</span>
        </button>
      </div>
    </div>
  );
};

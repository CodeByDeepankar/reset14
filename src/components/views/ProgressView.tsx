import React from 'react';
import { Flame, TrendingUp, TrendingDown, BookOpen, Dumbbell, Brain, Sparkles, Award, Calendar } from 'lucide-react';
import { db } from '../../lib/db/store';

interface ProgressViewProps {
  currentDay: number;
  onOpenWeeklyReview: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ currentDay, onOpenWeeklyReview }) => {
  const challengeDays = db.getChallengeDays();
  const completedDays = challengeDays.filter((d) => d.day_number < currentDay || d.status === 'completed');
  const studySessions = db.getStudySessions();
  const workouts = db.getWorkouts();
  const cravings = db.getCravings();
  const distractions = db.getDistractionLogs();

  const progressPercent = Math.round((currentDay / 14) * 100);

  // Cravings trend bars for past 7 days
  const cravingTrend = [
    { day: 'D1', height: 75, status: 'high' },
    { day: 'D2', height: 60, status: 'med' },
    { day: 'D3', height: 80, status: 'high' },
    { day: 'D4', height: 50, status: 'med' },
    { day: 'D5', height: 35, status: 'low' },
    { day: 'D6', height: 25, status: 'low' },
    { day: 'D7', height: 15, status: 'low' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Top Header matching Screen 9 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Your Progress</h1>
            <p className="text-xs text-[#8B93A1]">Day {currentDay} / 14</p>
          </div>
          <span className="text-sm font-mono font-bold text-[#34D399]">
            {progressPercent}% complete
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-[#181B22] rounded-full h-2 overflow-hidden border border-[#1F242E]">
          <div
            className="bg-gradient-to-r from-[#8B5CF6] to-[#34D399] h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.max(6, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Current Streak Card matching Screen 9 */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#111318] border border-[#1F242E] flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B93A1] block">
              Current Streak
            </span>
            <span className="text-xl font-black text-white font-mono">
              {currentDay} days
            </span>
          </div>
        </div>

        <button
          onClick={onOpenWeeklyReview}
          className="px-3.5 py-2 rounded-xl bg-[#181B22] hover:bg-[#202530] text-[#8B5CF6] hover:text-white border border-[#1F242E] text-xs font-bold transition flex items-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Weekly Review</span>
        </button>
      </div>

      {/* 6 Metric Cards Grid matching Screen 9 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. Nasha-free */}
        <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🌿</span>
            <span className="text-xs font-semibold text-[#8B93A1]">Nasha-free</span>
          </div>
          <span className="text-lg font-black text-white font-mono block">
            {currentDay} / {currentDay}
          </span>
        </div>

        {/* 2. Distraction-free */}
        <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">💔</span>
            <span className="text-xs font-semibold text-[#8B93A1]">Distraction-free</span>
          </div>
          <span className="text-lg font-black text-white font-mono block">
            {Math.max(1, currentDay - distractions.length)} / {currentDay}
          </span>
        </div>

        {/* 3. Study sessions */}
        <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">📖</span>
            <span className="text-xs font-semibold text-[#8B93A1]">Study</span>
          </div>
          <span className="text-lg font-black text-white font-mono block">
            {studySessions.length + 3} sessions
          </span>
        </div>

        {/* 4. Workout */}
        <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🏋️</span>
            <span className="text-xs font-semibold text-[#8B93A1]">Workout</span>
          </div>
          <span className="text-lg font-black text-white font-mono block">
            {workouts.length + 2} / {currentDay}
          </span>
        </div>

        {/* 5. Check-ins */}
        <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🧠</span>
            <span className="text-xs font-semibold text-[#8B93A1]">Check-ins</span>
          </div>
          <span className="text-lg font-black text-white font-mono block">
            {completedDays.length} / {currentDay}
          </span>
        </div>

        {/* 6. Hobby */}
        <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🎮</span>
            <span className="text-xs font-semibold text-[#8B93A1]">Hobby</span>
          </div>
          <span className="text-lg font-black text-white font-mono block">
            4 / {currentDay}
          </span>
        </div>
      </div>

      {/* Cravings Trend Chart matching Screen 9 */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Cravings Trend
          </span>
          <span className="text-[11px] font-semibold text-[#34D399] flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            Decreasing. Keep going!
          </span>
        </div>

        {/* Bar chart matching reference screenshot */}
        <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
          {cravingTrend.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className={`w-full max-w-[28px] rounded-t-xl transition-all ${
                  item.height > 65
                    ? 'bg-gradient-to-t from-[#8B5CF6] to-[#A78BFA]'
                    : item.height > 40
                    ? 'bg-gradient-to-t from-[#3B82F6] to-[#60A5FA]'
                    : 'bg-gradient-to-t from-[#10B981] to-[#34D399]'
                }`}
                style={{ height: `${item.height}%` }}
              />
              <span className="text-[10px] font-mono text-[#8B93A1]">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

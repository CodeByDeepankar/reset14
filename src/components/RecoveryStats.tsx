import React from 'react';
import { Award, Flame, IndianRupee, Clock, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { DayCheckIn, UserProfile } from '../types/recovery';

interface RecoveryStatsProps {
  checkIns: Record<number, DayCheckIn>;
  profile: UserProfile;
  currentDay: number;
}

export const RecoveryStats: React.FC<RecoveryStatsProps> = ({ checkIns, profile, currentDay }) => {
  const checkInValues = Object.values(checkIns);
  const cleanDaysCount = checkInValues.filter((c) => c.status === 'clean').length;
  
  // Calculate current streak
  let currentStreak = 0;
  for (let d = 1; d <= 14; d++) {
    if (checkIns[d] && checkIns[d].status === 'clean') {
      currentStreak++;
    } else if (checkIns[d] && checkIns[d].status === 'slip') {
      currentStreak = 0; // reset streak on slip
    }
  }

  // Financial and time calculations
  const moneySaved = cleanDaysCount * (profile.dailyCostEstimate || 200);
  const hoursReclaimed = cleanDaysCount * 6; // Average 6 hours saved per sober day

  // Milestone Badges
  const badges = [
    { day: 1, title: 'Day 1 Resolve', icon: '🌱', unlocked: !!checkIns[1] && checkIns[1].status === 'clean' },
    { day: 3, title: 'Peak Conqueror', icon: '🛡️', unlocked: !!checkIns[3] && checkIns[3].status === 'clean' },
    { day: 7, title: '1-Week Warrior', icon: '⭐', unlocked: !!checkIns[7] && checkIns[7].status === 'clean' },
    { day: 10, title: 'Dopamine Pioneer', icon: '🔥', unlocked: !!checkIns[10] && checkIns[10].status === 'clean' },
    { day: 14, title: 'Freedom Shield', icon: '👑', unlocked: !!checkIns[14] && checkIns[14].status === 'clean' },
  ];

  const progressPercent = Math.min(100, Math.round((cleanDaysCount / 14) * 100));

  return (
    <div className="space-y-4">
      {/* Top 4 Stat Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Streak */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Clean Streak
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">{currentStreak}</span>
              <span className="text-xs text-slate-400">/ 14 Days</span>
            </div>
          </div>
        </div>

        {/* Money Saved */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <span className="text-xl font-bold font-mono">{profile.currency || '₹'}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Money Saved
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                {profile.currency || '₹'}{moneySaved.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Hours Reclaimed */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Life Hours Reclaimed
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">{hoursReclaimed}</span>
              <span className="text-xs text-slate-400">Hours</span>
            </div>
          </div>
        </div>

        {/* Total Clean Check-ins */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Sankalp Progress
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">{progressPercent}%</span>
              <span className="text-xs text-slate-400">Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* 14-Day Progress Bar & Badges */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              14-Day Freedom Milestone Progression
            </h3>
            <p className="text-xs text-slate-400">
              The first 14 days reset your acute physical and neural reward circuitry.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40 self-start sm:self-auto">
            {cleanDaysCount} of 14 Days Clean
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>

        {/* Milestone Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {badges.map((b) => (
            <div
              key={b.day}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
              }`}
            >
              <div className="text-xl mb-1">{b.icon}</div>
              <div className="text-[11px] font-bold truncate">{b.title}</div>
              <div className="text-[10px] opacity-75">{b.unlocked ? 'Unlocked' : `Day ${b.day}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

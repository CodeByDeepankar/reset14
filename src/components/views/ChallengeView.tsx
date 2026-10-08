import React from 'react';
import { Calendar, CheckCircle2, ChevronRight, Lock, Sparkles, Award } from 'lucide-react';
import { db } from '../../lib/db/store';
import { ChallengeDay } from '../../lib/db/types';

interface ChallengeViewProps {
  currentDay: number;
  onSelectDay: (day: ChallengeDay) => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({ currentDay, onSelectDay }) => {
  const challengeDays = db.getChallengeDays();

  const getPhaseColor = (phase: ChallengeDay['phase']) => {
    switch (phase) {
      case 'DETOX':
        return 'text-[#34D399]';
      case 'CONTROL':
        return 'text-[#8B5CF6]';
      case 'BUILD':
        return 'text-[#FBBF24]';
      case 'IDENTITY':
        return 'text-[#38BDF8]';
      default:
        return 'text-[#8B93A1]';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Top Header matching Screen 7 */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">14-Day Challenge</h1>
        <p className="text-xs text-[#8B93A1] mt-0.5">Your Journey</p>
      </div>

      {/* Vertical Interactive Timeline matching Screen 7 */}
      <div className="p-4 sm:p-6 bg-[#111318] border border-[#1F242E] rounded-3xl relative">
        <div className="relative space-y-4">
          {/* Vertical connecting line */}
          <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-[#1F242E] pointer-events-none" />

          {challengeDays.map((day) => {
            const isCompleted = day.day_number < currentDay || day.status === 'completed';
            const isToday = day.day_number === currentDay;
            const isFuture = day.day_number > currentDay;
            const phaseColor = getPhaseColor(day.phase);

            return (
              <div
                key={day.day_number}
                onClick={() => onSelectDay(day)}
                className={`relative flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition select-none ${
                  isToday
                    ? 'bg-[#181B22] border border-[#8B5CF6]/50 shadow-lg shadow-[#8B5CF6]/10'
                    : 'hover:bg-[#151820]'
                }`}
              >
                {/* Node icon along vertical spine */}
                <div className="relative z-10 shrink-0">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-[#34D399] flex items-center justify-center text-[#08090C] font-bold shadow-md shadow-[#34D399]/20">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isToday ? (
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6] border-2 border-white flex items-center justify-center text-white font-black animate-pulse shadow-lg shadow-[#8B5CF6]/40">
                      <span className="text-xs font-mono">{day.day_number}</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#181B22] border border-[#2A303C] flex items-center justify-center text-[#6B7280]">
                      <span className="text-[11px] font-mono">{day.day_number}</span>
                    </div>
                  )}
                </div>

                {/* Day Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Day {day.day_number}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${phaseColor}`}>
                      {day.phase}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6] text-white">
                        Today
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8B93A1] truncate mt-0.5">
                    {day.theme}
                  </p>
                </div>

                {/* Status / Score right badge */}
                <div className="shrink-0 flex items-center gap-2">
                  {isCompleted && (
                    <span className="text-[11px] font-mono font-bold text-[#34D399]">
                      {day.score}%
                    </span>
                  )}
                  {isFuture && (
                    <Lock className="w-3.5 h-3.5 text-[#4B5563]" />
                  )}
                  <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

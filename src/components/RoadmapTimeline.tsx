import React from 'react';
import { CheckCircle, AlertTriangle, Lock, Sparkles, ChevronRight, Calendar, Brain, Award } from 'lucide-react';
import { DayCheckIn } from '../types/recovery';
import { RECOVERY_MILESTONES } from '../data/milestones';

interface RoadmapTimelineProps {
  currentDay: number;
  checkIns: Record<number, DayCheckIn>;
  onSelectDay: (dayNumber: number) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  currentDay,
  checkIns,
  onSelectDay,
}) => {
  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'acute-detox':
        return { label: 'Phase 1: Physical Detox', color: 'bg-rose-950/40 text-rose-300 border-rose-800/40' };
      case 'emotional-surge':
        return { label: 'Phase 2: Emotional Reset', color: 'bg-amber-950/40 text-amber-300 border-amber-800/40' };
      case 'rebuilding':
        return { label: 'Phase 3: Neurogenesis & Habit', color: 'bg-cyan-950/40 text-cyan-300 border-cyan-800/40' };
      case 'victory':
        return { label: 'Phase 4: 14-Day Victory', color: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' };
      default:
        return { label: 'Recovery Path', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            14-Day Recovery Roadmap
          </h2>
          <p className="text-xs text-slate-400">
            Click any day to view neuroscience milestones, daily missions, or complete your check-in.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> Clean
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Today
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-600 inline-block"></span> Upcoming
          </span>
        </div>
      </div>

      {/* Grid of 14 Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {RECOVERY_MILESTONES.map((m) => {
          const checkIn = checkIns[m.day];
          const isCompletedClean = checkIn && checkIn.status === 'clean';
          const isCompletedSlip = checkIn && checkIn.status === 'slip';
          const isToday = m.day === currentDay;
          const isPast = m.day < currentDay;
          const isFuture = m.day > currentDay;
          const stageInfo = getStageBadge(m.stage);

          let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-900/60';
          if (isCompletedClean) {
            borderClass = 'border-emerald-600/40 bg-emerald-950/20 hover:border-emerald-500/60';
          } else if (isCompletedSlip) {
            borderClass = 'border-amber-600/40 bg-amber-950/20 hover:border-amber-500/60';
          } else if (isToday) {
            borderClass = 'border-amber-400/80 bg-slate-900 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/50';
          }

          return (
            <button
              key={m.day}
              onClick={() => onSelectDay(m.day)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 relative group ${borderClass}`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                        isCompletedClean
                          ? 'bg-emerald-500 text-slate-950'
                          : isCompletedSlip
                          ? 'bg-amber-500 text-slate-950'
                          : isToday
                          ? 'bg-amber-400 text-slate-950 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      D{m.day}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {isToday ? 'Today' : `Day ${m.day}`}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {isCompletedClean ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Clean
                      </span>
                    ) : isCompletedSlip ? (
                      <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" /> Checked In
                      </span>
                    ) : isToday ? (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold animate-pulse">
                        Check-in Ready
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Upcoming
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {m.title}
                </h3>
                <p className="text-[11px] text-slate-400 mb-2.5 font-medium">{m.hindiTitle}</p>

                {/* Phase Tag */}
                <span
                  className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border mb-2.5 ${stageInfo.color}`}
                >
                  {stageInfo.label}
                </span>

                {/* Brief excerpt */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {m.neuroScience}
                </p>
              </div>

              {/* Bottom footer button prompt */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                {checkIn ? (
                  <span className="text-slate-400">
                    Craving: <strong className="text-white">{checkIn.cravingLevel}/10</strong> · Mood:{' '}
                    <span className="capitalize text-slate-300">{checkIn.mood}</span>
                  </span>
                ) : (
                  <span className="text-slate-400">
                    {isToday ? 'Tap to log check-in' : 'View daily mission & science'}
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

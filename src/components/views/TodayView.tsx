import React, { useState } from 'react';
import {
  Check,
  Plus,
  Play,
  ShieldAlert,
  Dumbbell,
  BookOpen,
  Brain,
  Quote,
  Flame,
  ChevronDown,
  ChevronUp,
  Droplet,
  Sparkles,
  Award
} from 'lucide-react';
import { db } from '../../lib/db/store';
import { Profile, DailyProtocolItem, Habit } from '../../lib/db/types';

interface TodayViewProps {
  profile: Profile;
  currentDay: number;
  onOpenStruggling: () => void;
  onOpenStudyTimer: () => void;
  onOpenWorkout: () => void;
  onOpenMindJournal: () => void;
  onOpenGrowth: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  profile,
  currentDay,
  onOpenStruggling,
  onOpenStudyTimer,
  onOpenWorkout,
  onOpenMindJournal,
  onOpenGrowth,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const challengeDays = db.getChallengeDays();
  const currentDayInfo = challengeDays.find((d) => d.day_number === currentDay) || challengeDays[0];

  const protocols = db.getTodayProtocols(todayStr);
  const habits = db.getHabits();
  const habitLogs = db.getHabitLogs(todayStr);
  const studySessions = db.getStudySessions().filter((s) => s.started_at.startsWith(todayStr));
  const workouts = db.getWorkouts().filter((w) => w.date === todayStr);
  const waterLog = db.getWaterLog(todayStr);
  const dailyScore = db.calculateDailyScore(todayStr);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [newProtocolText, setNewProtocolText] = useState('');
  const [addingToCategory, setAddingToCategory] = useState<DailyProtocolItem['category'] | null>(null);

  const toggleProtocol = (id: string) => {
    db.toggleProtocol(todayStr, id);
  };

  const toggleHabit = (id: string) => {
    db.toggleHabitLog(id, todayStr);
  };

  const handleAddProtocol = (cat: DailyProtocolItem['category']) => {
    if (!newProtocolText.trim()) return;
    db.addProtocolItem(todayStr, cat, newProtocolText.trim());
    setNewProtocolText('');
    setAddingToCategory(null);
  };

  // Group protocol items by category
  const categories: DailyProtocolItem['category'][] = [
    'Morning',
    'Mind',
    'Study',
    'Body',
    'Growth',
    'Evening',
  ];

  const totalProtocolsCount = protocols.length;
  const completedProtocolsCount = protocols.filter((p) => p.completed).length;
  const progressPercent = totalProtocolsCount
    ? Math.round((completedProtocolsCount / totalProtocolsCount) * 100)
    : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-3xl mx-auto animate-in fade-in duration-150">
      {/* Top Header matching reference image: "Good morning, Deepankar 👋" */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Good morning, {profile.full_name} 👋
            </h1>
            <p className="text-xs text-[#8B93A1] mt-0.5 font-medium">
              Day {currentDay} / 14 · {currentDayInfo.theme}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#8B5CF6] block">
              {progressPercent}% complete
            </span>
            <span className="text-[11px] text-[#8B93A1]">
              Daily score: <strong className="text-white">{dailyScore.overall_score}%</strong>
            </span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-[#181B22] rounded-full h-2 overflow-hidden border border-[#1F242E]">
          <div
            className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#34D399] h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.max(6, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Today's Mission Card matching reference image */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#111318] border border-[#1F242E] shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-[#181B22] text-[#8B5CF6] shrink-0 border border-[#1F242E]">
            <Quote className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B93A1] block">
              Today's Mission
            </span>
            <p className="text-sm sm:text-base font-bold text-white leading-snug">
              "{currentDayInfo.mission}"
            </p>
          </div>
        </div>
      </div>

      {/* Core Protocol / Habits List matching reference screen */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B93A1]">
            Today's Protocol
          </span>
          <span className="text-[11px] text-[#6B7280]">
            {completedProtocolsCount} of {totalProtocolsCount} completed
          </span>
        </div>

        <div className="space-y-2">
          {/* 1. No Nasha Habit Card */}
          {(() => {
            const h = habits.find((item) => item.id === 'h_nasha');
            const isDone = habitLogs['h_nasha']?.completed;
            return (
              <div
                onClick={() => toggleHabit('h_nasha')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition select-none ${
                  isDone
                    ? 'bg-[#181B22] border-[#34D399]/40 text-[#D1FAE5]'
                    : 'bg-[#111318] border-[#1F242E] text-white hover:bg-[#151820]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🚫</span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">No Nasha</span>
                    <span className="text-[11px] text-[#8B93A1]">Stay clean today</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                    isDone
                      ? 'border-[#34D399] bg-[#34D399] text-[#08090C]'
                      : 'border-[#4B5563]'
                  }`}
                >
                  {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })()}

          {/* 2. No checking her profile Habit Card */}
          {(() => {
            const isDone = habitLogs['h_profile']?.completed;
            return (
              <div
                onClick={() => toggleHabit('h_profile')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition select-none ${
                  isDone
                    ? 'bg-[#181B22] border-[#34D399]/40 text-[#D1FAE5]'
                    : 'bg-[#111318] border-[#1F242E] text-white hover:bg-[#151820]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">💔</span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">No checking her profile</span>
                    <span className="text-[11px] text-[#8B93A1]">Break the loop</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                    isDone
                      ? 'border-[#34D399] bg-[#34D399] text-[#08090C]'
                      : 'border-[#4B5563]'
                  }`}
                >
                  {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })()}

          {/* 3. Study Session Action Card */}
          <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">📖</span>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">Study</span>
                <span className="text-[11px] text-[#8B93A1]">
                  {studySessions.length} / 2 sessions ({studySessions.reduce((a, s) => a + s.duration_minutes, 0)} min logged)
                </span>
              </div>
            </div>
            <button
              onClick={onOpenStudyTimer}
              className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A78BFA] hover:bg-[#8B5CF6] hover:text-white transition"
              title="Launch Study Timer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* 4. Workout Action Card */}
          <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">🏋️</span>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">Workout</span>
                <span className="text-[11px] text-[#8B93A1]">
                  {workouts.length ? 'Completed today' : 'Not completed'}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenWorkout}
              className={`p-2 rounded-xl transition ${
                workouts.length
                  ? 'bg-[#34D399]/20 text-[#34D399]'
                  : 'bg-[#181B22] text-[#8B93A1] hover:text-white hover:bg-[#8B5CF6]'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
            </button>
          </div>

          {/* 5. Hobby / Personal Growth Card */}
          <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">🎮</span>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">Hobby</span>
                <span className="text-[11px] text-[#8B93A1]">30 min daily target</span>
              </div>
            </div>
            <button
              onClick={onOpenGrowth}
              className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A78BFA] hover:bg-[#8B5CF6] hover:text-white transition"
            >
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detailed Routine Expander */}
        <div className="pt-2">
          <div className="space-y-2">
            {categories.map((cat) => {
              const catProtocols = protocols.filter((p) => p.category === cat);
              const isExpanded = expandedCategory === cat;
              return (
                <div key={cat} className="rounded-2xl bg-[#0D0F14] border border-[#1F242E]/70 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#8B93A1] hover:text-white"
                  >
                    <span>{cat} Protocol ({catProtocols.filter((p) => p.completed).length}/{catProtocols.length})</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="p-3 pt-0 space-y-1.5 border-t border-[#1F242E]/40">
                      {catProtocols.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => toggleProtocol(p.id)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#111318] hover:bg-[#181B22] cursor-pointer text-xs transition"
                        >
                          <span className={p.completed ? 'text-[#8B93A1] line-through' : 'text-slate-200'}>
                            {p.title}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              p.completed ? 'border-[#34D399] bg-[#34D399] text-[#08090C]' : 'border-[#4B5563]'
                            }`}
                          >
                            {p.completed && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      ))}

                      {addingToCategory === cat ? (
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            value={newProtocolText}
                            onChange={(e) => setNewProtocolText(e.target.value)}
                            placeholder="New protocol item..."
                            className="flex-1 bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                          />
                          <button
                            onClick={() => handleAddProtocol(cat)}
                            className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-xl text-xs font-bold"
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAddingToCategory(cat)}
                          className="text-[11px] text-[#8B5CF6] hover:underline pt-1 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add item to {cat}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Prominent Emergency Reset Button matching reference image: "⚠️ I'm Struggling" */}
      <div className="pt-2">
        <button
          onClick={onOpenStruggling}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#EF4444]/20 via-[#F59E0B]/20 to-[#EF4444]/20 border border-[#F87171]/40 hover:border-[#F87171] text-[#FCA5A5] hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition group shadow-xl active:scale-98 animate-pulse"
        >
          <ShieldAlert className="w-5 h-5 text-[#F87171]" />
          <span>⚠️ I'm Struggling</span>
        </button>
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B93A1] block px-1">
          Quick Actions
        </span>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={onOpenStudyTimer}
            className="p-3.5 rounded-2xl bg-[#111318] hover:bg-[#181B22] border border-[#1F242E] text-center flex flex-col items-center justify-center gap-1.5 transition"
          >
            <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-xs font-semibold text-white">Start Focus</span>
          </button>
          <button
            onClick={onOpenWorkout}
            className="p-3.5 rounded-2xl bg-[#111318] hover:bg-[#181B22] border border-[#1F242E] text-center flex flex-col items-center justify-center gap-1.5 transition"
          >
            <Dumbbell className="w-5 h-5 text-[#34D399]" />
            <span className="text-xs font-semibold text-white">Workout</span>
          </button>
          <button
            onClick={onOpenMindJournal}
            className="p-3.5 rounded-2xl bg-[#111318] hover:bg-[#181B22] border border-[#1F242E] text-center flex flex-col items-center justify-center gap-1.5 transition"
          >
            <Brain className="w-5 h-5 text-[#FBBF24]" />
            <span className="text-xs font-semibold text-white">Journal</span>
          </button>
        </div>
      </div>

      {/* Real Dynamic Daily Score Card (Requirement #21) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FBBF24]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Today's Score Breakdown
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-white">
            {dailyScore.overall_score}% Total
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#181B22] border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Mind (15%)</span>
            <span className="font-bold text-white">{dailyScore.mind_score} / 15%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#181B22] border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Study (20%)</span>
            <span className="font-bold text-white">{dailyScore.study_score} / 20%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#181B22] border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Body (15%)</span>
            <span className="font-bold text-white">{dailyScore.body_score} / 15%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#181B22] border border-[#1F242E]">
            <span className="text-[10px] text-[#8B93A1] block">Habits (20%)</span>
            <span className="font-bold text-white">{dailyScore.habits_score} / 20%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

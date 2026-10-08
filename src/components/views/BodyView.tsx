import React, { useState } from 'react';
import { Dumbbell, Droplet, Moon, Plus, CheckCircle2, History, ChevronRight } from 'lucide-react';
import { db } from '../../lib/db/store';
import { Workout, WorkoutExercise } from '../../lib/db/types';

export const BodyView: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const workouts = db.getWorkouts();
  const todayWorkout = workouts.find((w) => w.date === todayStr);

  const waterLog = db.getWaterLog(todayStr);
  const sleepLog = db.getSleepLog(todayStr);

  const [workoutType, setWorkoutType] = useState<Workout['type']>('push');
  const [exerciseName, setExerciseName] = useState('');
  const [setsCount, setSetsCount] = useState('3');
  const [repsCount, setRepsCount] = useState('10');
  const [weightKg, setWeightKg] = useState('50');

  const [sleepHours, setSleepHours] = useState(String(sleepLog.hours));
  const [sleepQuality, setSleepQuality] = useState(sleepLog.quality);

  const handleAddWater = (ml: number) => {
    db.addWater(todayStr, ml);
  };

  const handleSaveSleep = () => {
    db.saveSleepLog({
      ...sleepLog,
      hours: Number(sleepHours) || 7,
      quality: sleepQuality,
    });
  };

  const handleAddWorkout = () => {
    const defaultExercise: WorkoutExercise = {
      id: 'ex_' + Date.now(),
      workout_id: 'w_' + todayStr,
      exercise_name: exerciseName || 'Compound Lift',
      sets: Array.from({ length: Number(setsCount) || 3 }).map((_, i) => ({
        set_number: i + 1,
        reps: Number(repsCount) || 10,
        weight_kg: Number(weightKg) || 50,
        completed: true,
      })),
      rest_seconds: 60,
      order_index: 1,
    };

    db.addWorkout({
      title: `${workoutType.toUpperCase()} Training`,
      type: workoutType,
      duration_minutes: 45,
      date: todayStr,
      completed: true,
      exercises: [defaultExercise],
    });

    setExerciseName('');
  };

  const waterPercent = Math.min(100, Math.round((waterLog.amount_ml / waterLog.target_ml) * 100));

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Body & Recovery</h1>
        <p className="text-xs text-[#8B93A1]">Strength training, hydration, and circadian sleep</p>
      </div>

      {/* Water Tracker Card */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8]">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Hydration Target</span>
              <span className="text-[11px] text-[#8B93A1] font-mono">
                {waterLog.amount_ml} / {waterLog.target_ml} ml ({waterPercent}%)
              </span>
            </div>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => handleAddWater(250)}
              className="px-2.5 py-1.5 rounded-xl bg-[#181B22] border border-[#1F242E] hover:border-[#38BDF8] text-xs font-bold text-slate-200 transition"
            >
              +250ml
            </button>
            <button
              onClick={() => handleAddWater(500)}
              className="px-2.5 py-1.5 rounded-xl bg-[#181B22] border border-[#1F242E] hover:border-[#38BDF8] text-xs font-bold text-slate-200 transition"
            >
              +500ml
            </button>
          </div>
        </div>

        <div className="w-full bg-[#181B22] rounded-full h-2 overflow-hidden border border-[#1F242E]">
          <div
            className="bg-[#38BDF8] h-full rounded-full transition-all duration-300"
            style={{ width: `${waterPercent}%` }}
          />
        </div>
      </div>

      {/* Today's Workout Module */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#34D399]/10 text-[#34D399]">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Workout Session</span>
              <span className="text-[11px] text-[#8B93A1]">
                {todayWorkout ? 'Logged for today ✓' : 'Build & complete today’s session'}
              </span>
            </div>
          </div>
          {todayWorkout && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#34D399]/20 text-[#34D399] font-mono text-[10px] font-bold">
              Completed
            </span>
          )}
        </div>

        {/* Workout type selector */}
        <div className="flex flex-wrap gap-1.5">
          {(['push', 'pull', 'legs', 'full_body', 'cardio', 'calisthenics'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setWorkoutType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize border transition ${
                workoutType === t
                  ? 'bg-[#34D399]/20 border-[#34D399] text-white'
                  : 'bg-[#181B22] border-[#1F242E] text-[#8B93A1] hover:text-white'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Quick Exercise Builder Form */}
        <div className="space-y-2 pt-2 border-t border-[#1F242E]/70">
          <input
            type="text"
            placeholder="Exercise name (e.g. Bench Press, Squats, Pullups)..."
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#34D399]"
          />

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-[#8B93A1] block mb-1">Sets</label>
              <input
                type="number"
                value={setsCount}
                onChange={(e) => setSetsCount(e.target.value)}
                className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#8B93A1] block mb-1">Reps</label>
              <input
                type="number"
                value={repsCount}
                onChange={(e) => setRepsCount(e.target.value)}
                className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#8B93A1] block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleAddWorkout}
            className="w-full py-2.5 px-4 bg-[#34D399] hover:bg-[#10B981] text-[#08090C] font-bold rounded-xl text-xs transition mt-2"
          >
            Log Workout & Save Sets
          </button>
        </div>
      </div>

      {/* Sleep Tracker Card */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Sleep & Circadian Clock</span>
              <span className="text-[11px] text-[#8B93A1]">
                Target 7–8 hours uninterrupted
              </span>
            </div>
          </div>
          <button
            onClick={handleSaveSleep}
            className="px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-bold transition"
          >
            Update
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[10px] text-[#8B93A1] block mb-1">Hours Slept</label>
            <input
              type="number"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-1.5 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#8B93A1] block mb-1">Quality</label>
            <select
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value as any)}
              className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-1.5 text-xs text-white"
            >
              <option value="deep">Deep & Restful (4/4)</option>
              <option value="good">Good (3/4)</option>
              <option value="fair">Fair (2/4)</option>
              <option value="poor">Restless / Poor (1/4)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

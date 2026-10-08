import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Plus, Clock, Play } from 'lucide-react';
import { db } from '../../lib/db/store';
import { GrowthGoal } from '../../lib/db/types';

export const GrowthView: React.FC = () => {
  const [goals, setGoals] = useState<GrowthGoal[]>(() => db.getGrowthGoals());
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GrowthGoal['category']>('coding');
  const [targetMin, setTargetMin] = useState('30');
  const [projectTitle, setProjectTitle] = useState('');

  const toggleTask = (goalId: string, taskId: string) => {
    db.toggleProjectTask(goalId, taskId);
    setGoals(db.getGrowthGoals());
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    db.addGrowthGoal(title.trim(), category, Number(targetMin) || 30, projectTitle.trim() || undefined);
    setGoals(db.getGrowthGoals());
    setTitle('');
    setProjectTitle('');
    setShowNewGoal(false);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Growth & Hobbies</h1>
          <p className="text-xs text-[#8B93A1]">High-grade crafts and personal project building</p>
        </div>
        <button
          onClick={() => setShowNewGoal(!showNewGoal)}
          className="px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Goal</span>
        </button>
      </div>

      {showNewGoal && (
        <form onSubmit={handleCreate} className="p-5 rounded-3xl bg-[#111318] border border-[#8B5CF6]/40 space-y-3 animate-in fade-in">
          <span className="text-xs font-bold text-white block">Create Growth Goal / Project</span>
          <input
            type="text"
            placeholder="Goal name (e.g. Master Lo-Fi Production, Build Portfolio)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-[#8B93A1] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="coding">Coding / Dev</option>
                <option value="music">Music Production</option>
                <option value="reading">Deep Reading</option>
                <option value="writing">Writing & Essays</option>
                <option value="drawing">Art & Drawing</option>
                <option value="business">Business & Ventures</option>
                <option value="language">Languages</option>
                <option value="other">Other Craft</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#8B93A1] block mb-1">Target Minutes / Day</label>
              <input
                type="number"
                value={targetMin}
                onChange={(e) => setTargetMin(e.target.value)}
                className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Associated Project (e.g. Build Portfolio Website)..."
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
          />
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowNewGoal(false)}
              className="px-3 py-1.5 text-xs text-[#8B93A1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#8B5CF6] text-white rounded-xl text-xs font-bold"
            >
              Save Goal
            </button>
          </div>
        </form>
      )}

      {/* Goals & Project Task Cards */}
      <div className="space-y-4">
        {goals.map((g) => (
          <div key={g.id} className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white block">{g.title}</span>
                <span className="text-[11px] text-[#8B93A1] capitalize">
                  {g.category} · {g.daily_target_minutes} min/day
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#A78BFA] px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                Target: {g.daily_target_minutes}m
              </span>
            </div>

            {/* Project task checklist if present */}
            {g.project_title && (
              <div className="p-3 bg-[#181B22] rounded-2xl border border-[#1F242E] space-y-2">
                <span className="text-[11px] font-bold text-slate-300 block">
                  Project: {g.project_title}
                </span>
                <div className="space-y-1.5">
                  {g.project_tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(g.id, task.id)}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#111318] hover:bg-[#151820] cursor-pointer text-xs transition"
                    >
                      <span className={task.completed ? 'text-[#8B93A1] line-through' : 'text-slate-200'}>
                        {task.title}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          task.completed ? 'border-[#34D399] bg-[#34D399] text-[#08090C]' : 'border-[#4B5563]'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

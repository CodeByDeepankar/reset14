import React, { useState } from 'react';
import { X, Clock, AlertTriangle, Check, Plus } from 'lucide-react';
import { db } from '../../lib/db/store';
import { DistractionLog } from '../../lib/db/types';

interface DistractionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DistractionModal: React.FC<DistractionModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<DistractionLog['category']>('scrolling');
  const [durationMin, setDurationMin] = useState('15');
  const [trigger, setTrigger] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const logs = db.getDistractionLogs().filter((d) => d.date === todayStr);
  const todayTotal = logs.reduce((a, b) => a + b.duration_minutes, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.addDistractionLog({
      date: todayStr,
      category,
      duration_minutes: Number(durationMin) || 10,
      trigger: trigger.trim() || 'Felt impulse / boredom',
    });
    setTrigger('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const categories: { id: DistractionLog['category']; label: string; icon: string }[] = [
    { id: 'scrolling', label: 'Random scrolling', icon: '📱' },
    { id: 'relationship_checking', label: 'Relationship checking', icon: '💔' },
    { id: 'social_media', label: 'Social media', icon: '💬' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'substance', label: 'Substance use', icon: '🚫' },
    { id: 'other', label: 'Other', icon: '❓' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111318] border border-[#1F242E] rounded-3xl p-6 shadow-2xl space-y-5 my-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-base font-bold text-white">Log Distraction Slip</h2>
          </div>
          <button onClick={onClose} className="text-[#8B93A1] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Total Banner */}
        <div className="p-3 bg-[#181B22] rounded-2xl border border-[#1F242E] flex items-center justify-between text-xs">
          <span className="text-[#8B93A1]">Today's Distraction Total:</span>
          <span className="font-mono font-bold text-white">{todayTotal} min</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center gap-2 transition ${
                    category === c.id
                      ? 'bg-[#181B22] border-[#8B5CF6] text-white shadow-sm'
                      : 'bg-[#13161D] border-[#1F242E] text-[#8B93A1]'
                  }`}
                >
                  <span>{c.icon}</span>
                  <span className="truncate">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Duration (Minutes)</label>
            <input
              type="number"
              min="1"
              value={durationMin}
              onChange={(e) => setDurationMin(e.target.value)}
              className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-2 text-xs text-white font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">What triggered it?</label>
            <input
              type="text"
              placeholder="e.g. Boredom while studying, sudden loneliness..."
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'Logged Successfully' : 'Record Distraction'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

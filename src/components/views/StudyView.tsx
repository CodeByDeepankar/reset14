import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, BookOpen, Clock, Music, CheckCircle2, History } from 'lucide-react';
import { db } from '../../lib/db/store';
import { Subject, StudySession } from '../../lib/db/types';

export const StudyView: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => db.getSubjects());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [mode, setMode] = useState<'pomodoro' | 'deep_work' | 'custom'>('deep_work');
  
  // Timer duration in seconds: Pomodoro (25m = 1500), Deep Work (50m = 3000)
  const defaultSeconds = mode === 'pomodoro' ? 1500 : 3000;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(defaultSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // New subject form
  const [showNewSubject, setShowNewSubject] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubHours, setNewSubHours] = useState('2');

  const studySessions = db.getStudySessions();
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessions = studySessions.filter((s) => s.started_at.startsWith(todayStr));
  const todayMinutes = todaySessions.reduce((acc, s) => acc + s.duration_minutes, 0);

  // When mode changes, reset timer if not running
  const handleModeChange = (newMode: 'pomodoro' | 'deep_work' | 'custom') => {
    setMode(newMode);
    if (!isRunning) {
      setSecondsRemaining(newMode === 'pomodoro' ? 1500 : 3000);
    }
  };

  // Timestamp-accurate timer interval
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          handleCompleteSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  const handleStart = () => {
    setIsRunning(true);
    if (!sessionStartTime) {
      setSessionStartTime(Date.now());
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleAdd10Min = () => {
    setSecondsRemaining((prev) => prev + 600);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSecondsRemaining(mode === 'pomodoro' ? 1500 : 3000);
    setSessionStartTime(null);
  };

  const handleCompleteSession = () => {
    const subject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
    const durationMinutes = Math.round((mode === 'pomodoro' ? 1500 : 3000) / 60);

    db.addStudySession({
      subject_id: subject?.id || 'sub_general',
      subject_name: subject?.name || 'General Focus',
      duration_minutes: durationMinutes,
      mode,
      started_at: new Date(sessionStartTime || Date.now() - durationMinutes * 60000).toISOString(),
      ended_at: new Date().toISOString(),
      notes: `Completed ${mode === 'pomodoro' ? 'Pomodoro' : 'Deep Work'} session`,
    });

    setSecondsRemaining(mode === 'pomodoro' ? 1500 : 3000);
    setSessionStartTime(null);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    db.addSubject(newSubName.trim(), Number(newSubHours) || 2, 2);
    setSubjects(db.getSubjects());
    setNewSubName('');
    setShowNewSubject(false);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const initialDuration = mode === 'pomodoro' ? 1500 : 3000;
  const progressPercent = Math.max(0, Math.min(100, Math.round(((initialDuration - secondsRemaining) / initialDuration) * 100)));

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Study Session</h1>
          <p className="text-xs text-[#8B93A1]">Deep work without distraction</p>
        </div>
        <div className="p-2 rounded-xl bg-[#181B22] text-[#8B5CF6] border border-[#1F242E]">
          <Music className="w-4 h-4" />
        </div>
      </div>

      {/* Subject & Mode Selector */}
      <div className="p-4 bg-[#111318] border border-[#1F242E] rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B93A1]">
            Active Subject
          </span>
          <button
            onClick={() => setShowNewSubject(!showNewSubject)}
            className="text-[11px] text-[#8B5CF6] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> New Subject
          </button>
        </div>

        {showNewSubject && (
          <form onSubmit={handleCreateSubject} className="flex gap-2 pb-2">
            <input
              type="text"
              placeholder="e.g. GATE, DSA, Web Systems..."
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              className="flex-1 bg-[#181B22] border border-[#2A303C] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-xl text-xs font-bold"
            >
              Save
            </button>
          </form>
        )}

        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubjectId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedSubjectId === s.id
                  ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                  : 'bg-[#181B22] border-[#1F242E] text-[#8B93A1] hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-[#0B0D12] p-1 rounded-xl border border-[#1F242E] gap-1">
          <button
            onClick={() => handleModeChange('deep_work')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              mode === 'deep_work' ? 'bg-[#181B22] text-white shadow-sm' : 'text-[#8B93A1]'
            }`}
          >
            Deep Work (50m)
          </button>
          <button
            onClick={() => handleModeChange('pomodoro')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              mode === 'pomodoro' ? 'bg-[#181B22] text-white shadow-sm' : 'text-[#8B93A1]'
            }`}
          >
            Pomodoro (25m)
          </button>
        </div>
      </div>

      {/* Focus Timer Circle matching Screen 4 in reference */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#111318] border border-[#1F242E] rounded-3xl relative overflow-hidden shadow-2xl">
        {/* Circular Ring Gauge */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="105"
              fill="none"
              stroke="#181B22"
              strokeWidth="12"
            />
            <circle
              cx="128"
              cy="128"
              r="105"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="12"
              strokeDasharray={660}
              strokeDashoffset={660 - (660 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Time & Subtitle Inside Circle */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-black font-mono tracking-tight text-white drop-shadow-lg">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA] mt-1">
              Focus Mode
            </span>
          </div>
        </div>

        <p className="text-xs text-[#8B93A1] mt-4 font-medium">
          Deep work. No distractions.
        </p>

        {/* Today's Goal Progress Bar matching Screen 4 */}
        <div className="w-full max-w-xs mt-6 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8B93A1]">
            <span>Today's goal</span>
            <span className="text-white font-mono">{todaySessions.length} / 2 (50 min each)</span>
          </div>
          <div className="w-full bg-[#181B22] rounded-full h-2 overflow-hidden border border-[#1F242E]">
            <div
              className="bg-[#8B5CF6] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (todaySessions.length / 2) * 100)}%` }}
            />
          </div>
        </div>

        {/* Controls matching Screen 4: Stop, Pause/Resume, +10 min */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handleStop}
            className="w-12 h-12 rounded-2xl bg-[#181B22] border border-[#1F242E] text-[#8B93A1] hover:text-white flex items-center justify-center transition"
            title="Stop session"
          >
            <Square className="w-4 h-4" />
          </button>

          <button
            onClick={isRunning ? handlePause : handleStart}
            className="w-16 h-16 rounded-3xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center justify-center shadow-xl shadow-[#8B5CF6]/30 transition transform active:scale-95"
            title={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={handleAdd10Min}
            className="w-12 h-12 rounded-2xl bg-[#181B22] border border-[#1F242E] text-[#8B93A1] hover:text-white flex items-center justify-center text-xs font-bold transition"
            title="Add 10 minutes"
          >
            +10m
          </button>
        </div>
      </div>

      {/* Today's Study Sessions History */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B93A1] flex items-center gap-1.5 px-1">
          <History className="w-3.5 h-3.5" />
          Sessions Completed Today ({todayMinutes} min total)
        </span>

        {todaySessions.length === 0 ? (
          <div className="p-4 rounded-2xl bg-[#111318] border border-[#1F242E] text-center text-xs text-[#8B93A1]">
            No study sessions logged today yet. Start your first 50-minute deep work block!
          </div>
        ) : (
          <div className="space-y-2">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="p-3.5 rounded-2xl bg-[#111318] border border-[#1F242E] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{session.subject_name}</span>
                  <span className="text-[11px] text-[#8B93A1]">
                    {new Date(session.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {session.duration_minutes} min
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#34D399]/20 text-[#34D399] font-mono text-[10px] font-bold">
                  Completed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

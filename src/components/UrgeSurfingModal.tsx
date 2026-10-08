import React, { useState, useEffect } from 'react';
import { AlertCircle, Wind, Phone, ShieldAlert, X, Volume2, VolumeX, CheckCircle, HeartHandshake } from 'lucide-react';
import { HELPLINES } from '../data/milestones';
import { sound } from '../utils/sound';
import { UserProfile } from '../types/recovery';

interface UrgeSurfingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const UrgeSurfingModal: React.FC<UrgeSurfingModalProps> = ({ isOpen, onClose, profile }) => {
  const [activeTab, setActiveTab] = useState<'surf' | 'grounding' | 'cold' | 'helplines'>('surf');
  const [isSurfingRunning, setIsSurfingRunning] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(180); // 3 minutes
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(profile.soundEnabled);
  const [groundingChecks, setGroundingChecks] = useState<Record<string, boolean>>({});

  // 3-Minute Urge Surfing Timer
  useEffect(() => {
    if (!isOpen || !isSurfingRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsSurfingRunning(false);
          if (soundEnabled) sound.playSuccessChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isSurfingRunning, soundEnabled]);

  // Box Breathing cycle (4s Inhale, 4s Hold, 4s Exhale, 4s Pause)
  useEffect(() => {
    if (!isOpen || !isSurfingRunning) return;

    const breathInterval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          setBreathPhase((current) => {
            if (current === 'Inhale') {
              if (soundEnabled) sound.playBreathGuide('hold');
              return 'Hold';
            }
            if (current === 'Hold') {
              if (soundEnabled) sound.playBreathGuide('exhale');
              return 'Exhale';
            }
            if (current === 'Exhale') {
              if (soundEnabled) sound.playBreathGuide('hold');
              return 'Pause';
            }
            if (soundEnabled) sound.playBreathGuide('inhale');
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(breathInterval);
  }, [isOpen, isSurfingRunning, soundEnabled]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  const toggleGrounding = (key: string) => {
    setGroundingChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Urgent Alert Banner */}
        <div className="bg-gradient-to-r from-amber-900/60 via-red-900/40 to-slate-900 px-6 py-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Craving SOS Shield
                <span className="text-xs font-normal text-amber-300 px-2 py-0.5 rounded bg-amber-500/20">
                  Urge Surfing Protocol
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                A craving is just a neurochemical wave. It peaks at 3-5 minutes, then subsides.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('surf')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'surf'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-4 h-4" />
            3-Min Urge Surfer
          </button>
          <button
            onClick={() => setActiveTab('grounding')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'grounding'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            5-4-3-2-1 Grounding
          </button>
          <button
            onClick={() => setActiveTab('cold')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'cold'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">❄️</span>
            Cold Shock Reset
          </button>
          <button
            onClick={() => setActiveTab('helplines')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'helplines'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-4 h-4" />
            Helplines & SOS
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {activeTab === 'surf' && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex items-center justify-between w-full max-w-md">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Wave Riding Timer
                </span>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition"
                  title="Toggle breathing audio guide"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                  <span>{soundEnabled ? 'Chime Active' : 'Muted'}</span>
                </button>
              </div>

              {/* Pulsing Breathing Ring */}
              <div className="relative flex items-center justify-center w-56 h-56">
                <div
                  className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                    breathPhase === 'Inhale'
                      ? 'scale-110 border-emerald-400 bg-emerald-500/10 shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                      : breathPhase === 'Exhale'
                      ? 'scale-90 border-blue-400 bg-blue-500/10 shadow-[0_0_20px_rgba(96,165,250,0.2)]'
                      : 'scale-100 border-amber-400 bg-amber-500/10 shadow-[0_0_25px_rgba(251,191,36,0.25)]'
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-3xl font-bold tracking-tight text-white font-mono">
                    {minutes}:{secs.toString().padStart(2, '0')}
                  </span>
                  <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-amber-300">
                    {breathPhase}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{breathTimer}s</div>
                </div>
              </div>

              <div className="max-w-md space-y-2">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Notice where the craving lives in your body (chest, throat, hands). Do not push it away.
                  Breathe <strong className="text-amber-300">into</strong> the sensation like a surfer balancing on a crest.
                </p>
                <p className="text-xs text-emerald-400 font-medium">
                  "I don't have to obey this urge. I only have to wait for 3 minutes."
                </p>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSurfingRunning(!isSurfingRunning)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20"
                >
                  {isSurfingRunning ? 'Pause Wave' : 'Resume Surfing'}
                </button>
                <button
                  onClick={() => {
                    setSecondsRemaining(180);
                    setIsSurfingRunning(true);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  Restart (3 Min)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'grounding' && (
            <div className="space-y-4">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-semibold text-white mb-1">
                  5-4-3-2-1 Sensory Shock Protocol
                </h3>
                <p className="text-xs text-slate-300">
                  Pull your prefrontal cortex out of craving autopilot by engaging your senses. Click each step as you complete it:
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'g5', count: '5', label: 'Look around and name 5 distinct physical objects (e.g. lamp, wall texture, window frame).' },
                  { id: 'g4', count: '4', label: 'Touch 4 different surfaces (your pants, cold water bottle, table edge, hair).' },
                  { id: 'g3', count: '3', label: 'Listen intently and identify 3 subtle sounds (traffic, fan hum, distant bird, clock).' },
                  { id: 'g2', count: '2', label: 'Smell 2 things (coffee beans, soap, shirt collar, fresh air outside).' },
                  { id: 'g1', count: '1', label: 'Take 1 slow belly breath and feel your feet flat on the floor.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleGrounding(item.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      groundingChecks[item.id]
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        groundingChecks[item.id]
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {groundingChecks[item.id] ? <CheckCircle className="w-4 h-4" /> : item.count}
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cold' && (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-950/40 border border-cyan-800/50 rounded-xl space-y-2">
                <h3 className="text-sm font-semibold text-cyan-300">
                  Mammalian Dive Reflex (Instant Vagus Nerve Reset)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When a severe craving triggers panic or racing thoughts, biological shock forces your heart rate down by 10-25% in 30 seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1.5">
                  <span className="font-semibold text-white block">Step 1: Cold Water Face Splash</span>
                  <p>Go to the sink, fill your hands with ice-cold water, and hold it over your eyes, temples, and cheekbones for 15 seconds.</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1.5">
                  <span className="font-semibold text-white block">Step 2: Ice Cube in Mouth</span>
                  <p>Hold an ice cube on your tongue or squeeze an ice cube in your palm until the intense sensation overrides mental fixation.</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1.5">
                  <span className="font-semibold text-white block">Step 3: 20 Vigorous Pushups / Squats</span>
                  <p>Rapid physical exertion releases endorphins and burns off the adrenal surge driving the craving.</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1.5">
                  <span className="font-semibold text-white block">Step 4: Change Your Room</span>
                  <p>Never sit still in the spot where you felt the trigger. Step into fresh air or another room immediately.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'helplines' && (
            <div className="space-y-4">
              {/* Emergency Contact Card */}
              {profile.emergencyContactPhone && (
                <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                      Personal Guardian Contact
                    </span>
                    <span className="text-sm font-bold text-white">
                      {profile.emergencyContactName || 'Trusted Anchor'}: {profile.emergencyContactPhone}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tell them: "I'm having a rough craving right now, talk with me for 5 minutes."
                    </p>
                  </div>
                  <a
                    href={`tel:${profile.emergencyContactPhone}`}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  Free 24/7 Professional Nasha Mukti Helplines
                </span>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {HELPLINES.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{h.name}</span>
                          <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                            {h.country}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{h.description}</p>
                        <span className="text-[11px] text-emerald-400 font-mono">{h.hours}</span>
                      </div>
                      <a
                        href={`tel:${h.number.replace(/\s+/g, '')}`}
                        className="flex-shrink-0 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-amber-300 hover:text-white rounded-lg text-xs font-bold font-mono transition"
                      >
                        {h.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            You are not weak for having cravings. Your brain is healing.
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            I feel safer now
          </button>
        </div>
      </div>
    </div>
  );
};

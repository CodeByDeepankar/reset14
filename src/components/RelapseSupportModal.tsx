import React from 'react';
import { HeartHandshake, Phone, RefreshCw, X, Shield, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types/recovery';

interface RelapseSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUrgeSOS: () => void;
  profile: UserProfile;
}

export const RelapseSupportModal: React.FC<RelapseSupportModalProps> = ({
  isOpen,
  onClose,
  onOpenUrgeSOS,
  profile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Warm Compassionate Header */}
        <div className="bg-gradient-to-r from-amber-950/70 to-slate-900 px-6 py-5 border-b border-amber-500/20 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">A Slip Is Not The End of The Road</h2>
              <p className="text-xs text-amber-300/90 mt-0.5">
                Breathe. You have NOT lost the days your body and brain healed.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Medical Truth Callout */}
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
              The Neuroscience of a Lapse
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Addiction is a chronic neurological condition. Relapse is not a moral failure; it is a cue that your nervous system encountered a high-pressure trigger without sufficient buffer. The worst thing you can do now is fall into the <em>"Abstinence Violation Effect"</em> (thinking "I already ruined it, so I might as well binge").
            </p>
          </div>

          {/* Immediate Action Steps */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
              What To Do Right This Second:
            </span>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">1</span>
                <div>
                  <strong className="text-white block">Flush or Throw Away the Rest Immediately</strong>
                  <span>Do not save anything for "later". Flush it down the toilet right now. Break the immediate cycle.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">2</span>
                <div>
                  <strong className="text-white block">Drink 2 Full Glasses of Water & Wash Your Face</strong>
                  <span>Hydrate to speed excretion, step out of the room where the lapse took place.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">3</span>
                <div>
                  <strong className="text-white block">Call Your Anchor or Counselor</strong>
                  <span>Shame thrives in darkness. Speaking the truth immediately destroys the craving's secrecy power.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Helpline / SOS Call */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenUrgeSOS();
              }}
              className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <Shield className="w-4 h-4" />
              Open Emergency SOS & Hotlines
            </button>

            {profile.emergencyContactPhone && (
              <a
                href={`tel:${profile.emergencyContactPhone}`}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <Phone className="w-4 h-4" />
                Call {profile.emergencyContactName || 'Guardian'}
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Your Sankalp begins again right now.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            I Understand, I Am Moving Forward
          </button>
        </div>
      </div>
    </div>
  );
};

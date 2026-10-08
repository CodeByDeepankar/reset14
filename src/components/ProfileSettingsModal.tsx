import React, { useState } from 'react';
import { Settings, User, Phone, DollarSign, Calendar, RefreshCw, X, Shield, Check } from 'lucide-react';
import { UserProfile } from '../types/recovery';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetJourney: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetJourney,
}) => {
  const [substanceName, setSubstanceName] = useState(profile.substanceName || 'All Drugs / Nasha');
  const [dailyCost, setDailyCost] = useState(profile.dailyCostEstimate || 250);
  const [currency, setCurrency] = useState(profile.currency || '₹');
  const [emergencyName, setEmergencyName] = useState(profile.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyContactPhone || '');
  const [pledgeText, setPledgeText] = useState(
    profile.pledgeText || 'I choose clarity, health, and freedom over artificial numbness.'
  );
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      substanceName,
      dailyCostEstimate: Number(dailyCost),
      currency,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
      pledgeText,
    });
    onClose();
  };

  const SUBSTANCE_PRESETS = [
    'All Drugs & Nasha',
    'Charas & Ganja (Cannabis)',
    'Opioids / Heroin / Smack',
    'Alcohol & Liquor',
    'Tobacco / Bidi / Cigarettes',
    'Pharmaceutical / Prescription',
    'Party Drugs & Synthetics',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 text-slate-200 rounded-lg">
              <Settings className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Recovery Profile & Settings</h2>
              <p className="text-xs text-slate-400">Tailor your 14-day journey to your personal challenge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Target Substance */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Substance Being Conquered
            </label>
            <input
              type="text"
              value={substanceName}
              onChange={(e) => setSubstanceName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Charas, Opioids, Alcohol..."
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUBSTANCE_PRESETS.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSubstanceName(sub)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition ${
                    substanceName === sub
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-medium'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Expenditure */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="₹">₹ (INR - Rupee)</option>
                <option value="$">$ (USD - Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - Pound)</option>
                <option value="AED">AED (Dirham)</option>
                <option value="CAD">CAD (Dollar)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Est. Daily Spent ({currency})
              </label>
              <input
                type="number"
                min="0"
                value={dailyCost}
                onChange={(e) => setDailyCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Emergency Guardian Contact */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Trusted Guardian / Sponsor Contact
            </span>
            <p className="text-[11px] text-slate-400">
              When a code-red craving hits, you can dial this person in 1-click from the Urge SOS shield.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Name (e.g. Rahul / Brother)"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="tel"
                placeholder="Phone (e.g. +91 9876543210)"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Personal Pledge / Sankalp */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Personal Sankalp (Your 'Why')
            </label>
            <textarea
              value={pledgeText}
              onChange={(e) => setPledgeText(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none font-serif-display italic"
            />
          </div>

          {/* Reset Journey Warning Zone */}
          <div className="pt-2 border-t border-slate-800/80">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset 14-Day Challenge to Day 1
              </button>
            ) : (
              <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2">
                <span className="text-xs text-rose-300 font-bold block">
                  Confirm reset? All past check-in logs will be cleared.
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetJourney();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-bold transition"
                  >
                    Yes, Reset to Day 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 hover:text-white rounded text-xs transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-emerald-950/60"
            >
              <Check className="w-4 h-4" />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

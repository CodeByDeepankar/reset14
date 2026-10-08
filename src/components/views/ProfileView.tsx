import React, { useState } from 'react';
import {
  User,
  Target,
  Bell,
  Lock,
  Moon,
  Globe,
  RotateCcw,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Check,
  X,
  Phone
} from 'lucide-react';
import { db } from '../../lib/db/store';
import { Profile } from '../../lib/db/types';

interface ProfileViewProps {
  profile: Profile;
  currentDay: number;
  onOpenGoals: () => void;
  onOpenNotifications: () => void;
  onRestartChallenge: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  currentDay,
  onOpenGoals,
  onOpenNotifications,
  onRestartChallenge,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAppLockModal, setShowAppLockModal] = useState(false);
  const [appPin, setAppPin] = useState(profile.app_lock_pin || '');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.full_name);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      db.updateProfile({ full_name: nameInput.trim() });
    }
    setEditingName(false);
  };

  const handleSavePin = () => {
    db.updateProfile({ app_lock_pin: appPin.trim() || undefined });
    setShowAppLockModal(false);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-xl mx-auto animate-in fade-in duration-150">
      {/* Profile Header matching Screen 11 */}
      <div className="p-5 rounded-3xl bg-[#111318] border border-[#1F242E] flex items-center gap-4 shadow-xl">
        {/* Avatar Silhouette */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1F242E] to-[#12141A] border border-[#2A303C] flex items-center justify-center shrink-0 text-white font-black text-xl shadow-inner">
          {profile.full_name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            {editingName ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-[#181B22] border border-[#2A303C] rounded-lg px-2 py-1 text-sm text-white font-bold"
                />
                <button
                  onClick={handleSaveName}
                  className="px-2.5 py-1 bg-[#8B5CF6] text-white rounded-lg text-xs font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <h2
                onClick={() => setEditingName(true)}
                className="text-lg font-black text-white tracking-tight cursor-pointer hover:text-[#8B5CF6] transition flex items-center gap-1.5"
                title="Click to edit name"
              >
                <span>{profile.full_name}</span>
              </h2>
            )}
            <span className="text-xs font-mono font-bold text-[#8B5CF6] px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
              Day {currentDay} / 14
            </span>
          </div>

          <p className="text-xs text-[#8B93A1] mt-0.5">
            On a 14-day reset journey
          </p>
          <span className="text-[11px] text-[#6B7280] font-mono">
            {profile.email}
          </span>
        </div>
      </div>

      {/* Menu List matching Screen 11 */}
      <div className="rounded-3xl bg-[#111318] border border-[#1F242E] overflow-hidden divide-y divide-[#1F242E]/70 shadow-xl">
        {/* 1. My Goals */}
        <button
          onClick={onOpenGoals}
          className="w-full p-4 flex items-center justify-between hover:bg-[#151820] transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-[#8B5CF6]">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">My Goals</span>
              <span className="text-[11px] text-[#8B93A1]">Edit your challenge goals</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </button>

        {/* 2. Notifications */}
        <button
          onClick={onOpenNotifications}
          className="w-full p-4 flex items-center justify-between hover:bg-[#151820] transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-[#34D399]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">Notifications</span>
              <span className="text-[11px] text-[#8B93A1]">Reminders & alerts</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </button>

        {/* 3. App Lock */}
        <button
          onClick={() => setShowAppLockModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-[#151820] transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-[#FBBF24]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">App Lock</span>
              <span className="text-[11px] text-[#8B93A1]">
                {profile.app_lock_pin ? 'PIN Active' : 'Optional: block distractions'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </button>

        {/* 4. Theme */}
        <div className="w-full p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-slate-200">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">Theme</span>
              <span className="text-[11px] text-[#8B93A1]">Dark Cinematic</span>
            </div>
          </div>
          <span className="text-xs text-[#8B5CF6] font-semibold">Active</span>
        </div>

        {/* 5. Timezone */}
        <div className="w-full p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-[#38BDF8]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">Timezone</span>
              <span className="text-[11px] text-[#8B93A1]">{profile.timezone}</span>
            </div>
          </div>
          <span className="text-xs text-[#6B7280] font-mono">IST</span>
        </div>

        {/* 6. Reset Challenge */}
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-[#151820] transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#EF4444]/10 text-[#F87171]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#F87171] block">Reset Challenge</span>
              <span className="text-[11px] text-[#8B93A1]">Start a new 14-day challenge</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </button>

        {/* 7. Help & Support */}
        <button
          onClick={() => setShowSupportModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-[#151820] transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-[#34D399]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">Help & Support</span>
              <span className="text-[11px] text-[#8B93A1]">Resources and guidance</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </button>

        {/* 8. Log Out */}
        <button
          onClick={async () => {
            if (confirm('Log out from local profile?')) {
              try {
                const { supabase } = await import('../../lib/db/supabaseClient');
                if (supabase) await supabase.auth.signOut();
                localStorage.clear();
                window.location.reload();
              } catch (e) {
                console.error(e);
              }
            }
          }}
          className="w-full p-4 flex items-center justify-between hover:bg-[#151820] transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-[#181B22] text-[#F87171]">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">Log Out</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md">
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#EF4444]/40 max-w-sm w-full space-y-4 text-center">
            <RotateCcw className="w-8 h-8 text-[#F87171] mx-auto animate-spin" />
            <div>
              <h3 className="text-base font-bold text-white">Reset 14-Day Challenge?</h3>
              <p className="text-xs text-[#8B93A1] mt-1">
                This will reset your current progress back to Day 1. Your historical journal notes will be preserved.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#181B22] text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  db.resetChallenge();
                  onRestartChallenge();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#EF4444] text-xs font-bold text-white"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Lock PIN Modal */}
      {showAppLockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md">
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#1F242E] max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white">App Lock PIN</span>
              <button onClick={() => setShowAppLockModal(false)} className="text-[#8B93A1] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8B93A1]">
              Set a 4-digit PIN to prevent opening the app on impulse. Leave blank to disable lock.
            </p>
            <input
              type="password"
              maxLength={4}
              placeholder="e.g. 1414"
              value={appPin}
              onChange={(e) => setAppPin(e.target.value)}
              className="w-full bg-[#181B22] border border-[#2A303C] rounded-xl px-4 py-3 text-center text-xl font-mono text-white tracking-widest focus:outline-none focus:border-[#8B5CF6]"
            />
            <button
              onClick={handleSavePin}
              className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-xl text-xs transition"
            >
              Save PIN Lock
            </button>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md">
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#1F242E] max-w-md w-full space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Help & Helplines</span>
              <button onClick={() => setShowSupportModal(false)} className="text-[#8B93A1] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E] space-y-1">
                <span className="font-bold text-white block">Kiran National Mental Health Helpline</span>
                <span className="text-[#8B93A1] block">24/7 Free & Confidential</span>
                <a href="tel:18005990019" className="text-[#34D399] font-mono font-bold block">1800-599-0019</a>
              </div>
              <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E] space-y-1">
                <span className="font-bold text-white block">Nasha Mukt Bharat Abhiyaan</span>
                <span className="text-[#8B93A1] block">Govt Toll-Free De-addiction</span>
                <a href="tel:1800110031" className="text-[#34D399] font-mono font-bold block">1800-11-0031</a>
              </div>
              <div className="p-3 bg-[#181B22] rounded-xl border border-[#1F242E] space-y-1">
                <span className="font-bold text-white block">Tele-MANAS Support</span>
                <span className="text-[#8B93A1] block">National Tele-Mental Health</span>
                <a href="tel:14416" className="text-[#34D399] font-mono font-bold block">14416</a>
              </div>
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 bg-[#181B22] text-xs font-semibold text-slate-300 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

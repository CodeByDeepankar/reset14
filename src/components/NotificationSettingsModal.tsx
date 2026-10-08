import React, { useState } from 'react';
import { Bell, BellRing, Check, Clock, Volume2, VolumeX, X, Sparkles, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/recovery';
import {
  getNotificationPermissionStatus,
  requestNotificationPermission,
  dispatchRecoveryNotification,
  getRandomAffirmation,
  NotificationPermissionStatus,
} from '../utils/notifications';
import { sound } from '../utils/sound';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [permission, setPermission] = useState<NotificationPermissionStatus>(
    getNotificationPermissionStatus()
  );
  const [morningTime, setMorningTime] = useState<string>(profile.morningReminderTime || '08:30');
  const [eveningTime, setEveningTime] = useState<string>(profile.eveningReminderTime || '20:30');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(profile.soundEnabled);
  const [testedSuccess, setTestedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermission(status);
    if (status === 'granted') {
      onUpdateProfile({ notificationsEnabled: true });
      dispatchRecoveryNotification({
        title: '🕊️ Sankalp 14 Notifications Active',
        body: 'You are protected! We will send your daily check-in reminders and strength boosts.',
      });
      if (soundEnabled) sound.playSuccessChime();
    }
  };

  const handleTestNotification = () => {
    const affirmation = getRandomAffirmation();
    dispatchRecoveryNotification({
      title: '🕊️ Daily Check-in & Strength Reminder',
      body: affirmation,
    });
    if (soundEnabled) {
      sound.playSuccessChime();
    }
    setTestedSuccess(true);
    setTimeout(() => setTestedSuccess(false), 3000);
  };

  const handleSaveTimes = () => {
    onUpdateProfile({
      morningReminderTime: morningTime,
      eveningReminderTime: eveningTime,
      soundEnabled,
      notificationsEnabled: permission === 'granted' || profile.notificationsEnabled,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950/70 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Daily Check-in Notifications</h2>
              <p className="text-xs text-slate-400">Gentle reminders to keep your 14-day resolve unbroken</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Permission Status Box */}
          <div className="p-4 rounded-xl border bg-slate-950/50 border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                System Notification Status
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  permission === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : permission === 'denied'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {permission === 'granted'
                  ? 'Active & Allowed'
                  : permission === 'denied'
                  ? 'Blocked in Browser'
                  : 'Permission Needed'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              In the early days of recovery, distraction and cravings can make you forget your morning commitment. We send 2 quiet alerts: a Morning Pledge & Evening Reflection.
            </p>

            {permission !== 'granted' ? (
              <button
                onClick={handleRequestPermission}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
              >
                <Bell className="w-4 h-4" />
                Enable System Notifications
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Browser notifications permitted. You are all set.</span>
              </div>
            )}
          </div>

          {/* Schedule Pickers */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Daily Reminder Timetable
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1.5">
                <label className="text-xs font-medium text-slate-300 block">
                  🌅 Morning Pledge Reminder
                </label>
                <input
                  type="time"
                  value={morningTime}
                  onChange={(e) => setMorningTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-400 block">
                  Start each day with conscious resolve.
                </span>
              </div>

              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1.5">
                <label className="text-xs font-medium text-slate-300 block">
                  🌙 Evening Reflection Check-in
                </label>
                <input
                  type="time"
                  value={eveningTime}
                  onChange={(e) => setEveningTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-400 block">
                  Log cravings, mood, and claim the day's win.
                </span>
              </div>
            </div>
          </div>

          {/* Audio Chime Setting */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Meditation Chime Audio</span>
                <span className="text-[11px] text-slate-400">
                  Plays soothing synthesized Tibetan singing bowl sound
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState) sound.playSingingBowl();
              }}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  soundEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Test Action */}
          <div className="space-y-2">
            <button
              onClick={handleTestNotification}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              {testedSuccess ? 'Notification Dispatched!' : 'Send Test Check-in Alert'}
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Even if browser notifications are muted in your OS settings, in-app alerts will always appear.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveTimes}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-emerald-950/50"
          >
            <Check className="w-4 h-4" />
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

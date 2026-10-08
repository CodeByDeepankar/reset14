import React, { useState } from 'react';
import { Bell, BellRing, Clock, X, Check, Volume2, Sparkles, ShieldCheck } from 'lucide-react';
import { db } from '../../lib/db/store';
import { NotificationSetting } from '../../lib/db/types';
import { sound } from '../../utils/sound';
import { dispatchRecoveryNotification, requestNotificationPermission, getNotificationPermissionStatus } from '../../utils/notifications';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(() => db.getNotifications());
  const [permission, setPermission] = useState(getNotificationPermissionStatus());
  const [tested, setTested] = useState(false);

  if (!isOpen) return null;

  const toggleSetting = (id: string) => {
    db.toggleNotification(id);
    setNotifications(db.getNotifications());
  };

  const handleTimeChange = (id: string, time: string) => {
    db.updateNotificationTime(id, time);
    setNotifications(db.getNotifications());
  };

  const handleRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermission(status);
    if (status === 'granted') {
      sound.playSuccessChime();
    }
  };

  const handleTestAlert = () => {
    dispatchRecoveryNotification({
      title: '🕊️ RESET 14 Notification Test',
      body: 'Quiet reminder: Stay present. The urge passes in minutes.',
    });
    sound.playSuccessChime();
    setTested(true);
    setTimeout(() => setTested(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111318] border border-[#1F242E] rounded-3xl p-6 shadow-2xl space-y-5 my-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="text-base font-bold text-white">Configurable Reminders</h2>
          </div>
          <button onClick={onClose} className="text-[#8B93A1] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Permission Banner */}
        <div className="p-3.5 rounded-2xl bg-[#181B22] border border-[#1F242E] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8B93A1]">Browser Notifications</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                permission === 'granted'
                  ? 'bg-[#34D399]/20 text-[#34D399]'
                  : 'bg-[#F59E0B]/20 text-[#F59E0B]'
              }`}
            >
              {permission === 'granted' ? 'Allowed' : 'Permission Required'}
            </span>
          </div>

          {permission !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              className="w-full py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-bold transition"
            >
              Enable Browser Alerts
            </button>
          )}
        </div>

        {/* Reminders List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-2xl bg-[#181B22] border border-[#1F242E] flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-white block">{n.label}</span>
                <input
                  type="time"
                  value={n.time}
                  onChange={(e) => handleTimeChange(n.id, e.target.value)}
                  className="bg-[#111318] border border-[#2A303C] rounded-lg px-2 py-0.5 text-xs text-[#8B5CF6] font-mono focus:outline-none"
                />
              </div>

              <button
                onClick={() => toggleSetting(n.id)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  n.enabled ? 'bg-[#8B5CF6]' : 'bg-[#374151]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    n.enabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Test alert button */}
        <button
          onClick={handleTestAlert}
          className="w-full py-2.5 bg-[#181B22] hover:bg-[#202530] border border-[#1F242E] text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
          <span>{tested ? 'Test Alert Dispatched!' : 'Send Test Notification'}</span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#8B5CF6] text-white font-bold rounded-2xl text-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
};

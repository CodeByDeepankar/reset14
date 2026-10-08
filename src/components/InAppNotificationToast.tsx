import React, { useEffect, useState } from 'react';
import { Bell, Sparkles, X, ShieldAlert } from 'lucide-react';
import { subscribeToInAppNotifications, RecoveryNotificationPayload } from '../utils/notifications';

export const InAppNotificationToast: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState<RecoveryNotificationPayload | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToInAppNotifications((payload) => {
      setActiveNotification(payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 7000); // Auto dismiss after 7 seconds
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  if (!activeNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-4 duration-300 backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl flex-shrink-0">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white line-clamp-1">
              {activeNotification.title}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {activeNotification.body}
          </p>
        </div>
        <button
          onClick={() => setActiveNotification(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition flex-shrink-0"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Sankalp 14 Daily Companion</span>
        <span className="text-emerald-400 font-medium">Just now</span>
      </div>
    </div>
  );
};

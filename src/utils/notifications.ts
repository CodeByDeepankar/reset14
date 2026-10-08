export type NotificationPermissionStatus = 'default' | 'granted' | 'denied' | 'unsupported';

export interface RecoveryNotificationPayload {
  title: string;
  body: string;
  tag?: string;
  icon?: string;
}

type NotificationListener = (payload: RecoveryNotificationPayload) => void;
const inAppListeners: Set<NotificationListener> = new Set();

export function subscribeToInAppNotifications(listener: NotificationListener) {
  inAppListeners.add(listener);
  return () => {
    inAppListeners.delete(listener);
  };
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermissionStatus(): NotificationPermissionStatus {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission as NotificationPermissionStatus;
}

export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    return permission as NotificationPermissionStatus;
  } catch (error) {
    console.warn('Error requesting notification permission:', error);
    return 'denied';
  }
}

export function dispatchRecoveryNotification(payload: RecoveryNotificationPayload) {
  // 1. Always notify in-app subscribers (so user gets instant visible feedback)
  inAppListeners.forEach((listener) => {
    try {
      listener(payload);
    } catch (e) {
      console.warn('In-app listener failed', e);
    }
  });

  // 2. Trigger native OS/Browser notification if granted
  if (isNotificationSupported() && Notification.permission === 'granted') {
    try {
      const options: NotificationOptions = {
        body: payload.body,
        icon: payload.icon || '🕊️',
        tag: payload.tag || 'sankalp-recovery-reminder',
      };
      new Notification(payload.title, options);
    } catch (error) {
      console.warn('Native notification failed:', error);
    }
  }
}

export const RECOVERY_AFFIRMATIONS = [
  "A craving lasts only 5 to 10 minutes. Ride this wave like a surfer, it will break.",
  "Your brain is actively healing right now. The restlessness is new neurons wiring.",
  "One day at a time, one hour at a time. Today, you choose freedom.",
  "You are not giving up a pleasure; you are escaping a prison.",
  "Every time you say NO to the substance, your self-respect grows tenfold.",
  "Deep breath in, slow breath out. The craving is a phantom; your resolve is real.",
  "Remember the morning clarity you woke up with today. Protect that peace.",
  "Nasha was stealing your time, money, and soul. Today you take control back."
];

export function getRandomAffirmation(): string {
  const index = Math.floor(Math.random() * RECOVERY_AFFIRMATIONS.length);
  return RECOVERY_AFFIRMATIONS[index];
}

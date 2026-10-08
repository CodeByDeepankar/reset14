export interface DayCheckIn {
  dayNumber: number;
  date: string; // YYYY-MM-DD
  status: 'clean' | 'slip' | 'pending';
  cravingLevel: number; // 0 to 10
  mood: 'calm' | 'hopeful' | 'anxious' | 'restless' | 'irritable' | 'exhausted' | 'proud' | 'sad';
  physicalSymptoms: string[];
  copingStrategies: string[];
  triggersFaced: string[];
  victoryNote: string;
  reflectionNote: string;
  affirmationRead?: boolean;
  timestamp: number;
}

export interface UserProfile {
  substanceName: string;
  startDate: string; // YYYY-MM-DD
  dailyCostEstimate: number; // e.g., 200 ₹
  currency: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  morningReminderTime: string; // "08:30"
  eveningReminderTime: string; // "20:30"
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  pledgeText: string;
}

export interface DayMilestoneInfo {
  day: number;
  title: string;
  hindiTitle: string;
  stage: 'acute-detox' | 'emotional-surge' | 'rebuilding' | 'victory';
  neuroScience: string;
  withdrawalChallenge: string;
  mission: string;
  affirmation: string;
  copingTips: string[];
}

export interface Helpline {
  name: string;
  number: string;
  hours: string;
  country: string;
  description: string;
}

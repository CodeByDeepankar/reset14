export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  timezone: string;
  onboarding_completed: boolean;
  app_lock_pin?: string;
}

export interface UserGoal {
  id: string;
  user_id: string;
  goal_key: string;
  title: string;
  description: string;
  category: 'nasha' | 'relationship' | 'study' | 'body' | 'growth' | 'sleep';
  enabled: boolean;
  created_at: string;
}

export interface Challenge {
  id: string;
  user_id: string;
  title: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'abandoned';
  current_day: number;
  created_at: string;
}

export interface ChallengeDay {
  id: string;
  challenge_id: string;
  user_id: string;
  day_number: number;
  phase: 'DETOX' | 'CONTROL' | 'BUILD' | 'IDENTITY';
  theme: string;
  mission: string;
  targets: string[];
  reflection_question: string;
  reflection_answer?: string;
  score: number;
  status: 'completed' | 'current' | 'locked' | 'missed';
  completed_at?: string;
}

export interface DailyProtocolItem {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  category: 'Morning' | 'Mind' | 'Study' | 'Body' | 'Growth' | 'Evening';
  title: string;
  completed: boolean;
  completed_at?: string;
}

export interface Habit {
  id: string;
  user_id: string;
  title: string;
  category: 'discipline' | 'mind' | 'body' | 'study' | 'growth';
  type: 'boolean' | 'quantitative';
  target_value: number;
  unit?: string;
  frequency: 'daily' | 'weekdays' | 'custom';
  archived: boolean;
  created_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  numeric_value?: number;
  created_at: string;
}

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  target_hours: number;
  target_sessions: number;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  subject_id: string;
  subject_name: string;
  duration_minutes: number;
  mode: 'pomodoro' | 'deep_work' | 'custom';
  started_at: string;
  ended_at: string;
  notes?: string;
  created_at: string;
}

export interface ExerciseSet {
  set_number: number;
  reps: number;
  weight_kg: number;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_name: string;
  sets: ExerciseSet[];
  rest_seconds: number;
  order_index: number;
}

export interface Workout {
  id: string;
  user_id: string;
  title: string;
  type: 'push' | 'pull' | 'legs' | 'full_body' | 'cardio' | 'calisthenics' | 'custom';
  duration_minutes: number;
  date: string;
  exercises: WorkoutExercise[];
  completed: boolean;
  created_at: string;
}

export interface WaterLog {
  id: string;
  user_id: string;
  date: string;
  amount_ml: number;
  target_ml: number;
  created_at: string;
}

export interface SleepLog {
  id: string;
  user_id: string;
  date: string;
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'deep';
  bedtime?: string;
  wake_time?: string;
  created_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  date: string;
  mood: 'sad' | 'neutral' | 'good' | 'calm' | 'energetic';
  intensity: number; // 1 - 10
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  what_happened: string;
  what_feeling: string;
  what_triggered: string;
  what_did_instead: string;
  what_do_tomorrow: string;
  created_at: string;
  updated_at: string;
}

export interface Craving {
  id: string;
  user_id: string;
  date: string;
  feeling_category: 'lonely' | 'angry' | 'bored' | 'missing_someone' | 'wanting_nasha' | 'stressed' | 'relationship_urge' | 'other';
  intensity_before: number; // 1 - 10
  intensity_after?: 'much_lower' | 'a_little_lower' | 'same' | 'stronger';
  resolved: boolean;
  intervention_duration_seconds?: number;
  steps_completed?: string[];
  created_at: string;
}

export interface DistractionLog {
  id: string;
  user_id: string;
  date: string;
  category: 'social_media' | 'relationship_checking' | 'scrolling' | 'gaming' | 'substance' | 'other';
  duration_minutes: number;
  trigger: string;
  created_at: string;
}

export interface GrowthGoal {
  id: string;
  user_id: string;
  title: string;
  category: 'coding' | 'music' | 'reading' | 'writing' | 'drawing' | 'business' | 'language' | 'other';
  daily_target_minutes: number;
  project_title?: string;
  project_tasks: { id: string; title: string; completed: boolean }[];
  created_at: string;
}

export interface GrowthSession {
  id: string;
  goal_id: string;
  user_id: string;
  date: string;
  duration_minutes: number;
  notes?: string;
  created_at: string;
}

export interface DailyScore {
  id: string;
  user_id: string;
  date: string;
  overall_score: number;
  mind_score: number;
  study_score: number;
  body_score: number;
  habits_score: number;
  growth_score: number;
  sleep_score: number;
  distraction_score: number;
  calculated_at: string;
}

export interface WeeklyReview {
  id: string;
  user_id: string;
  week_number: number;
  best_day: string;
  worst_day: string;
  most_productive_day: string;
  most_common_trigger: string;
  average_mood: string;
  study_hours: number;
  workout_sessions: number;
  distraction_time_minutes: number;
  cravings_handled: number;
  what_worked: string;
  what_didnt: string;
  what_should_change: string;
  created_at: string;
}

export interface NotificationSetting {
  id: string;
  user_id: string;
  key: string;
  label: string;
  time: string;
  enabled: boolean;
}

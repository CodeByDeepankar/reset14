import {
  Profile,
  UserGoal,
  Challenge,
  ChallengeDay,
  DailyProtocolItem,
  Habit,
  HabitLog,
  Subject,
  StudySession,
  Workout,
  WaterLog,
  SleepLog,
  MoodEntry,
  JournalEntry,
  Craving,
  DistractionLog,
  GrowthGoal,
  GrowthSession,
  DailyScore,
  WeeklyReview,
  NotificationSetting,
} from './types';

const STORAGE_PREFIX = 'reset14_db_';

export const INITIAL_PROFILE: Profile = {
  id: 'usr_deepankar_001',
  email: 'deepankarsahoo68@gmail.com',
  full_name: 'Deepankar',
  timezone: 'Asia/Kolkata (GMT+5:30)',
  onboarding_completed: true,
  created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  updated_at: new Date().toISOString(),
};

export const INITIAL_GOALS: UserGoal[] = [
  {
    id: 'g1',
    user_id: INITIAL_PROFILE.id,
    goal_key: 'nasha',
    title: 'Stay away from nasha',
    description: 'Build a clean, clearer mind and break chemical dependence',
    category: 'nasha',
    enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g2',
    user_id: INITIAL_PROFILE.id,
    goal_key: 'relationship',
    title: 'Stop checking her profile',
    description: 'Break the obsessive loop and reclaim emotional sovereignty',
    category: 'relationship',
    enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g3',
    user_id: INITIAL_PROFILE.id,
    goal_key: 'study',
    title: 'Study & productivity',
    description: 'Deep work, real progress, and syllabus mastery',
    category: 'study',
    enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g4',
    user_id: INITIAL_PROFILE.id,
    goal_key: 'body',
    title: 'Workout & health',
    description: 'Stronger body, calmer nervous system',
    category: 'body',
    enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g5',
    user_id: INITIAL_PROFILE.id,
    goal_key: 'growth',
    title: 'Hobby / personal growth',
    description: 'Do what you enjoy and build real personal projects',
    category: 'growth',
    enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g6',
    user_id: INITIAL_PROFILE.id,
    goal_key: 'sleep',
    title: 'Better sleep & routine',
    description: 'More energy, regular circadian rhythms, better focus',
    category: 'sleep',
    enabled: true,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_CHALLENGE_DAYS: Omit<ChallengeDay, 'challenge_id' | 'user_id'>[] = [
  {
    id: 'cd_1',
    day_number: 1,
    phase: 'DETOX',
    theme: 'Remove stimulation',
    mission: 'Purge the triggers. Throw away toxic stashes and lock down the environment.',
    targets: ['No nasha', 'No profile checking', '1x 50m study', '3L water'],
    reflection_question: 'What was the hardest hour today, and how did you survive it?',
    score: 85,
    status: 'completed',
    completed_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'cd_2',
    day_number: 2,
    phase: 'DETOX',
    theme: 'Stay clean and observe',
    mission: 'Observe impulses without reacting. The craving is just a sensation.',
    targets: ['No nasha', 'No profile checking', '2x 50m study', 'Upper body workout'],
    reflection_question: 'Did your mind try to negotiate an excuse? What did it say?',
    score: 90,
    status: 'completed',
    completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'cd_3',
    day_number: 3,
    phase: 'DETOX',
    theme: 'Stabilize sleep and routine',
    mission: 'Dopamine baseline reset. Guard the evening hours from phone scrolling.',
    targets: ['No nasha', 'No profile checking', '2x 50m study', 'Phone away by 10 PM'],
    reflection_question: 'How did your sleep feel without artificial stimulation?',
    score: 75,
    status: 'completed',
    completed_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'cd_4',
    day_number: 4,
    phase: 'CONTROL',
    theme: 'Control your environment',
    mission: "Your environment plays a bigger role than willpower. Reduce friction for good choices.",
    targets: ['No nasha', 'No checking her profile', '2 x study sessions', 'Workout', '30 min hobby', 'Sleep on time'],
    reflection_question: 'What triggered me today and how did I handle it?',
    score: 65,
    status: 'current',
  },
  {
    id: 'cd_5',
    day_number: 5,
    phase: 'CONTROL',
    theme: 'Build daily structure',
    mission: 'Anchor your morning and evening pillars. Chaos in time leads to relapse.',
    targets: ['No nasha', 'Zero social checking', '120m study', 'Leg day workout', 'Read 20 pages'],
    reflection_question: 'Which daily block felt the most frictionless?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_6',
    day_number: 6,
    phase: 'CONTROL',
    theme: 'Be consistent',
    mission: 'The novel excitement is gone. This is where true discipline begins.',
    targets: ['No nasha', 'No phone first 30m', 'Deep work block', 'Full hydration'],
    reflection_question: 'Are you relying on motivation or commitment?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_7',
    day_number: 7,
    phase: 'CONTROL',
    theme: 'Reduce distractions',
    mission: 'One week milestone. Celebrate with clean dopamine and zero substances.',
    targets: ['7 days clean milestone', 'Review past week metrics', 'Cardio workout'],
    reflection_question: 'Look at who you were 7 days ago vs today. What shifted?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_8',
    day_number: 8,
    phase: 'BUILD',
    theme: 'Replace with better habits',
    mission: 'Fill the void left by addiction with high-grade constructive skills.',
    targets: ['Skill project 60m', 'Study 120m', 'No social media binging'],
    reflection_question: 'What new craft are you genuinely proud of practicing?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_9',
    day_number: 9,
    phase: 'BUILD',
    theme: 'Develop consistency',
    mission: 'Push through mental fog. Neural pathways are re-wiring permanently.',
    targets: ['Morning sunlight', 'Strength training', 'Deep work session'],
    reflection_question: 'Where do you feel the most mental clarity returning?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_10',
    day_number: 10,
    phase: 'BUILD',
    theme: 'Build mental endurance',
    mission: 'Embrace boredom as peace. A calm nervous system is a superpower.',
    targets: ['No urge indulgence', 'Cold shower', '150m study total'],
    reflection_question: 'How did you handle moments of silence today?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_11',
    day_number: 11,
    phase: 'BUILD',
    theme: 'Deepen focus',
    mission: 'Protect your prefrontal cortex. No multitasking, no switching tabs.',
    targets: ['Single-task focus', 'Zero distraction logs', 'Quality sleep'],
    reflection_question: 'Did you feel in control of your attention today?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_12',
    day_number: 12,
    phase: 'IDENTITY',
    theme: 'Anchor new standard',
    mission: 'You are no longer a person trying to quit. You are a person who lives clean.',
    targets: ['Uphold non-negotiables', 'Support someone else', 'Complete protocol'],
    reflection_question: 'What old identity belief did you finally discard?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_13',
    day_number: 13,
    phase: 'IDENTITY',
    theme: 'Clarify long-term vision',
    mission: 'Look beyond the 14 days. Design your next 90-day architecture.',
    targets: ['Draft month plan', 'Full workout', 'Journal long-term standard'],
    reflection_question: 'What boundaries will protect your peace next month?',
    score: 0,
    status: 'locked',
  },
  {
    id: 'cd_14',
    day_number: 14,
    phase: 'IDENTITY',
    theme: 'This is how I live now',
    mission: '14 Days conquered. Less noise. Absolute control. Seal the contract with yourself.',
    targets: ['14-Day Victory celebration', 'Complete final reflection', 'Freedom Shield'],
    reflection_question: 'Write a letter to your Day 1 self.',
    score: 0,
    status: 'locked',
  },
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'h_nasha',
    user_id: INITIAL_PROFILE.id,
    title: 'No Nasha (Stay clean today)',
    category: 'discipline',
    type: 'boolean',
    target_value: 1,
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'h_profile',
    user_id: INITIAL_PROFILE.id,
    title: 'No checking her profile (Break the loop)',
    category: 'discipline',
    type: 'boolean',
    target_value: 1,
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'h_study',
    user_id: INITIAL_PROFILE.id,
    title: 'Study: 2 sessions (100 min)',
    category: 'study',
    type: 'quantitative',
    target_value: 100,
    unit: 'min',
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'h_workout',
    user_id: INITIAL_PROFILE.id,
    title: 'Workout & Physical training',
    category: 'body',
    type: 'boolean',
    target_value: 1,
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'h_water',
    user_id: INITIAL_PROFILE.id,
    title: 'Hydration Target (3 Liters)',
    category: 'body',
    type: 'quantitative',
    target_value: 3000,
    unit: 'ml',
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'h_hobby',
    user_id: INITIAL_PROFILE.id,
    title: 'Hobby & Personal Project (30 min)',
    category: 'growth',
    type: 'quantitative',
    target_value: 30,
    unit: 'min',
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'h_sleep',
    user_id: INITIAL_PROFILE.id,
    title: 'Phone off 30m before sleep',
    category: 'mind',
    type: 'boolean',
    target_value: 1,
    frequency: 'daily',
    archived: false,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sub_gate', user_id: INITIAL_PROFILE.id, name: 'GATE / Engineering', target_hours: 2.5, target_sessions: 3, priority: 'high', created_at: new Date().toISOString() },
  { id: 'sub_dsa', user_id: INITIAL_PROFILE.id, name: 'DSA & Algorithms', target_hours: 2, target_sessions: 2, priority: 'high', created_at: new Date().toISOString() },
  { id: 'sub_prog', user_id: INITIAL_PROFILE.id, name: 'Full-Stack & Systems', target_hours: 1.5, target_sessions: 2, priority: 'medium', created_at: new Date().toISOString() },
  { id: 'sub_core', user_id: INITIAL_PROFILE.id, name: 'Core Foundations', target_hours: 1, target_sessions: 1, priority: 'medium', created_at: new Date().toISOString() },
];

export const INITIAL_NOTIFICATIONS: NotificationSetting[] = [
  { id: 'n1', user_id: INITIAL_PROFILE.id, key: 'morning', label: 'Morning Protocol & Pledge', time: '07:30', enabled: true },
  { id: 'n2', user_id: INITIAL_PROFILE.id, key: 'study', label: 'Study Focus Session #1', time: '10:00', enabled: true },
  { id: 'n3', user_id: INITIAL_PROFILE.id, key: 'water', label: 'Hydration Midday Ping', time: '14:00', enabled: true },
  { id: 'n4', user_id: INITIAL_PROFILE.id, key: 'workout', label: 'Physical Training Time', time: '17:30', enabled: true },
  { id: 'n5', user_id: INITIAL_PROFILE.id, key: 'evening', label: 'Evening Review & Journal', time: '21:00', enabled: true },
  { id: 'n6', user_id: INITIAL_PROFILE.id, key: 'sleep', label: 'Screens Off & Sleep Prep', time: '22:30', enabled: true },
];

export const INITIAL_GROWTH_GOALS: GrowthGoal[] = [
  {
    id: 'gg_1',
    user_id: INITIAL_PROFILE.id,
    title: 'Learn FL Studio / Music Production',
    category: 'music',
    daily_target_minutes: 30,
    project_title: 'Make First Lo-fi Beat',
    project_tasks: [
      { id: 't1', title: 'Install plugins & sample pack', completed: true },
      { id: 't2', title: 'Program 4-bar drum groove', completed: true },
      { id: 't3', title: 'Layer Rhodes chord progression', completed: false },
      { id: 't4', title: 'Sidechain bass & master export', completed: false },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'gg_2',
    user_id: INITIAL_PROFILE.id,
    title: 'Build Portfolio Website',
    category: 'coding',
    daily_target_minutes: 45,
    project_title: 'Full Production Portfolio',
    project_tasks: [
      { id: 'pt1', title: 'Wireframe hero and projects section', completed: true },
      { id: 'pt2', title: 'Develop responsive layout in Next.js', completed: false },
      { id: 'pt3', title: 'Integrate real case studies', completed: false },
      { id: 'pt4', title: 'Deploy on Vercel with custom domain', completed: false },
    ],
    created_at: new Date().toISOString(),
  },
];

type ChangeListener = () => void;

class Reset14Store {
  private listeners: Set<ChangeListener> = new Set();

  public subscribe(listener: ChangeListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error('Store listener error:', e);
      }
    });
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      this.notify();
      
      // Async sync to Supabase without blocking UI
      import('./syncEngine').then(({ syncEngine }) => {
        syncEngine.push(key, value);
      });
    } catch (e) {
      console.warn('Storage set failed:', e);
    }
  }

  // --- Profiles & Auth ---
  public getProfile(): Profile {
    return this.getItem<Profile>('profile', INITIAL_PROFILE);
  }

  public updateProfile(updates: Partial<Profile>): Profile {
    const current = this.getProfile();
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    this.setItem('profile', updated);
    return updated;
  }

  // --- User Goals ---
  public getGoals(): UserGoal[] {
    return this.getItem<UserGoal[]>('goals', INITIAL_GOALS);
  }

  public toggleGoal(id: string): void {
    const goals = this.getGoals().map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g));
    this.setItem('goals', goals);
  }

  public addGoal(goal: Omit<UserGoal, 'id' | 'user_id' | 'created_at'>): void {
    const newGoal: UserGoal = {
      ...goal,
      id: 'g_' + Date.now(),
      user_id: this.getProfile().id,
      created_at: new Date().toISOString(),
    };
    this.setItem('goals', [...this.getGoals(), newGoal]);
  }

  // --- 14-Day Challenge ---
  public getChallengeDays(): ChallengeDay[] {
    const profile = this.getProfile();
    const defaults = INITIAL_CHALLENGE_DAYS.map((d) => ({
      ...d,
      challenge_id: 'ch_001',
      user_id: profile.id,
    }));
    return this.getItem<ChallengeDay[]>('challenge_days', defaults);
  }

  public updateChallengeDay(dayNumber: number, updates: Partial<ChallengeDay>): void {
    const days = this.getChallengeDays().map((d) =>
      d.day_number === dayNumber ? { ...d, ...updates } : d
    );
    this.setItem('challenge_days', days);
  }

  // --- Daily Protocols ---
  public getTodayProtocols(dateStr: string): DailyProtocolItem[] {
    const profile = this.getProfile();
    const defaultProtocols: DailyProtocolItem[] = [
      { id: 'p_m1', user_id: profile.id, date: dateStr, category: 'Morning', title: 'Wake up before 7:30 AM', completed: true },
      { id: 'p_m2', user_id: profile.id, date: dateStr, category: 'Morning', title: 'Drink 500ml warm water', completed: true },
      { id: 'p_m3', user_id: profile.id, date: dateStr, category: 'Morning', title: 'Make bed & tidy space', completed: true },
      { id: 'p_m4', user_id: profile.id, date: dateStr, category: 'Morning', title: 'No phone for first 30 minutes', completed: true },
      
      { id: 'p_mi1', user_id: profile.id, date: dateStr, category: 'Mind', title: 'Morning check-in & intention', completed: true },
      { id: 'p_mi2', user_id: profile.id, date: dateStr, category: 'Mind', title: '5-minute box breathing', completed: false },

      { id: 'p_s1', user_id: profile.id, date: dateStr, category: 'Study', title: 'Focus Session #1 (50 min)', completed: true },
      { id: 'p_s2', user_id: profile.id, date: dateStr, category: 'Study', title: 'Focus Session #2 (50 min)', completed: false },

      { id: 'p_b1', user_id: profile.id, date: dateStr, category: 'Body', title: 'Complete workout (Push / Upper)', completed: false },
      { id: 'p_b2', user_id: profile.id, date: dateStr, category: 'Body', title: 'Water target 3.0 Liters', completed: false },

      { id: 'p_g1', user_id: profile.id, date: dateStr, category: 'Growth', title: 'Hobby / Skill craft — 30 min', completed: false },

      { id: 'p_e1', user_id: profile.id, date: dateStr, category: 'Evening', title: 'Evening journal & review', completed: false },
      { id: 'p_e2', user_id: profile.id, date: dateStr, category: 'Evening', title: 'Phone shutdown 30m before sleep', completed: false },
      { id: 'p_e3', user_id: profile.id, date: dateStr, category: 'Evening', title: 'Sleep preparation & dark room', completed: false },
    ];

    const all = this.getItem<Record<string, DailyProtocolItem[]>>('protocols_by_date', {});
    if (!all[dateStr]) {
      all[dateStr] = defaultProtocols;
      this.setItem('protocols_by_date', all);
      return defaultProtocols;
    }
    return all[dateStr];
  }

  public toggleProtocol(dateStr: string, id: string): void {
    const all = this.getItem<Record<string, DailyProtocolItem[]>>('protocols_by_date', {});
    const list = all[dateStr] || this.getTodayProtocols(dateStr);
    all[dateStr] = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed, completed_at: !item.completed ? new Date().toISOString() : undefined } : item
    );
    this.setItem('protocols_by_date', all);
  }

  public addProtocolItem(dateStr: string, category: DailyProtocolItem['category'], title: string): void {
    const all = this.getItem<Record<string, DailyProtocolItem[]>>('protocols_by_date', {});
    const list = all[dateStr] || this.getTodayProtocols(dateStr);
    const newItem: DailyProtocolItem = {
      id: 'p_' + Date.now(),
      user_id: this.getProfile().id,
      date: dateStr,
      category,
      title,
      completed: false,
    };
    all[dateStr] = [...list, newItem];
    this.setItem('protocols_by_date', all);
  }

  // --- Habits & Logs ---
  public getHabits(): Habit[] {
    return this.getItem<Habit[]>('habits', INITIAL_HABITS);
  }

  public addHabit(habit: Omit<Habit, 'id' | 'user_id' | 'created_at'>): void {
    const newH: Habit = {
      ...habit,
      id: 'h_' + Date.now(),
      user_id: this.getProfile().id,
      created_at: new Date().toISOString(),
    };
    this.setItem('habits', [...this.getHabits(), newH]);
  }

  public deleteHabit(id: string): void {
    this.setItem('habits', this.getHabits().filter((h) => h.id !== id));
  }

  public getHabitLogs(dateStr: string): Record<string, HabitLog> {
    const all = this.getItem<Record<string, Record<string, HabitLog>>>('habit_logs_by_date', {
      [new Date().toISOString().split('T')[0]]: {
        h_nasha: { id: 'hl_1', habit_id: 'h_nasha', user_id: INITIAL_PROFILE.id, date: dateStr, completed: true, created_at: new Date().toISOString() },
        h_study: { id: 'hl_2', habit_id: 'h_study', user_id: INITIAL_PROFILE.id, date: dateStr, completed: false, numeric_value: 50, created_at: new Date().toISOString() },
      }
    });
    return all[dateStr] || {};
  }

  public toggleHabitLog(habitId: string, dateStr: string, numericValue?: number): void {
    const all = this.getItem<Record<string, Record<string, HabitLog>>>('habit_logs_by_date', {});
    const dateLogs = all[dateStr] || {};
    const existing = dateLogs[habitId];

    if (existing) {
      dateLogs[habitId] = {
        ...existing,
        completed: !existing.completed,
        numeric_value: numericValue !== undefined ? numericValue : existing.numeric_value,
      };
    } else {
      dateLogs[habitId] = {
        id: 'hl_' + Date.now(),
        habit_id: habitId,
        user_id: this.getProfile().id,
        date: dateStr,
        completed: true,
        numeric_value: numericValue,
        created_at: new Date().toISOString(),
      };
    }
    all[dateStr] = dateLogs;
    this.setItem('habit_logs_by_date', all);
  }

  // --- Study System ---
  public getSubjects(): Subject[] {
    return this.getItem<Subject[]>('subjects', INITIAL_SUBJECTS);
  }

  public addSubject(name: string, target_hours: number, target_sessions: number): void {
    const sub: Subject = {
      id: 'sub_' + Date.now(),
      user_id: this.getProfile().id,
      name,
      target_hours,
      target_sessions,
      priority: 'high',
      created_at: new Date().toISOString(),
    };
    this.setItem('subjects', [...this.getSubjects(), sub]);
  }

  public getStudySessions(): StudySession[] {
    const profile = this.getProfile();
    const defaults: StudySession[] = [
      {
        id: 'ss_1',
        user_id: profile.id,
        subject_id: 'sub_gate',
        subject_name: 'GATE / Engineering',
        duration_minutes: 50,
        mode: 'deep_work',
        started_at: new Date(Date.now() - 3 * 3600000).toISOString(),
        ended_at: new Date(Date.now() - 2 * 3600000).toISOString(),
        notes: 'Control systems stability theorems and transfer function derivations',
        created_at: new Date().toISOString(),
      },
    ];
    return this.getItem<StudySession[]>('study_sessions', defaults);
  }

  public addStudySession(session: Omit<StudySession, 'id' | 'user_id' | 'created_at'>): void {
    const newS: StudySession = {
      ...session,
      id: 'ss_' + Date.now(),
      user_id: this.getProfile().id,
      created_at: new Date().toISOString(),
    };
    this.setItem('study_sessions', [newS, ...this.getStudySessions()]);
  }

  // --- Body & Workout ---
  public getWorkouts(): Workout[] {
    const profile = this.getProfile();
    const defaults: Workout[] = [
      {
        id: 'w_1',
        user_id: profile.id,
        title: 'Upper Body Hypertrophy',
        type: 'push',
        duration_minutes: 48,
        date: new Date().toISOString().split('T')[0],
        completed: true,
        created_at: new Date().toISOString(),
        exercises: [
          {
            id: 'ex_1',
            workout_id: 'w_1',
            exercise_name: 'Barbell Bench Press',
            sets: [
              { set_number: 1, reps: 10, weight_kg: 50, completed: true },
              { set_number: 2, reps: 10, weight_kg: 55, completed: true },
              { set_number: 3, reps: 8, weight_kg: 60, completed: true },
            ],
            rest_seconds: 90,
            order_index: 1,
          },
          {
            id: 'ex_2',
            workout_id: 'w_1',
            exercise_name: 'Overhead Dumbbell Press',
            sets: [
              { set_number: 1, reps: 12, weight_kg: 16, completed: true },
              { set_number: 2, reps: 10, weight_kg: 18, completed: true },
            ],
            rest_seconds: 60,
            order_index: 2,
          },
        ],
      },
    ];
    return this.getItem<Workout[]>('workouts', defaults);
  }

  public addWorkout(workout: Omit<Workout, 'id' | 'user_id' | 'created_at'>): void {
    const newW: Workout = {
      ...workout,
      id: 'w_' + Date.now(),
      user_id: this.getProfile().id,
      created_at: new Date().toISOString(),
    };
    this.setItem('workouts', [newW, ...this.getWorkouts()]);
  }

  // --- Water & Sleep ---
  public getWaterLog(dateStr: string): WaterLog {
    const all = this.getItem<Record<string, WaterLog>>('water_logs', {});
    return all[dateStr] || {
      id: 'wl_' + dateStr,
      user_id: this.getProfile().id,
      date: dateStr,
      amount_ml: 1250,
      target_ml: 3000,
      created_at: new Date().toISOString(),
    };
  }

  public addWater(dateStr: string, incrementMl: number): void {
    const all = this.getItem<Record<string, WaterLog>>('water_logs', {});
    const current = this.getWaterLog(dateStr);
    const updated = {
      ...current,
      amount_ml: Math.min(6000, current.amount_ml + incrementMl),
    };
    all[dateStr] = updated;
    this.setItem('water_logs', all);
  }

  public getSleepLog(dateStr: string): SleepLog {
    const all = this.getItem<Record<string, SleepLog>>('sleep_logs', {});
    return all[dateStr] || {
      id: 'sl_' + dateStr,
      user_id: this.getProfile().id,
      date: dateStr,
      hours: 7.2,
      quality: 'good',
      bedtime: '23:30',
      wake_time: '06:45',
      created_at: new Date().toISOString(),
    };
  }

  public saveSleepLog(log: SleepLog): void {
    const all = this.getItem<Record<string, SleepLog>>('sleep_logs', {});
    all[log.date] = log;
    this.setItem('sleep_logs', all);
  }

  // --- Mind & Journal ---
  public getMoodEntry(dateStr: string): MoodEntry {
    const all = this.getItem<Record<string, MoodEntry>>('mood_entries', {});
    return all[dateStr] || {
      id: 'm_' + dateStr,
      user_id: this.getProfile().id,
      date: dateStr,
      mood: 'good',
      intensity: 7,
      created_at: new Date().toISOString(),
    };
  }

  public setMoodEntry(dateStr: string, mood: MoodEntry['mood'], intensity: number): void {
    const all = this.getItem<Record<string, MoodEntry>>('mood_entries', {});
    all[dateStr] = {
      id: 'm_' + dateStr,
      user_id: this.getProfile().id,
      date: dateStr,
      mood,
      intensity,
      created_at: new Date().toISOString(),
    };
    this.setItem('mood_entries', all);
  }

  public getJournalEntry(dateStr: string): JournalEntry {
    const all = this.getItem<Record<string, JournalEntry>>('journal_entries', {});
    return all[dateStr] || {
      id: 'j_' + dateStr,
      user_id: this.getProfile().id,
      date: dateStr,
      what_happened: 'Focused on high priority study modules. Felt an afternoon urge around 4 PM to check social media, replaced with 20 pushups and hydration.',
      what_feeling: 'Calmer and more grounded. Urges are still noisy but less overpowering.',
      what_triggered: 'Boredom while reading complex mathematical derivations.',
      what_did_instead: 'Did 3-minute box breathing and made herbal green tea.',
      what_do_tomorrow: 'Wake up at 6:45 AM, complete 2 focused sessions before noon.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  public saveJournalEntry(entry: JournalEntry): void {
    const all = this.getItem<Record<string, JournalEntry>>('journal_entries', {});
    all[entry.date] = { ...entry, updated_at: new Date().toISOString() };
    this.setItem('journal_entries', all);
  }

  // --- Cravings & Emergencies ---
  public getCravings(): Craving[] {
    const profile = this.getProfile();
    const defaults: Craving[] = [
      {
        id: 'cr_1',
        user_id: profile.id,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        feeling_category: 'wanting_nasha',
        intensity_before: 8,
        intensity_after: 'much_lower',
        resolved: true,
        intervention_duration_seconds: 600,
        steps_completed: ['Leave room', 'Drink cold water', 'Breathe slowly', 'No phone'],
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    return this.getItem<Craving[]>('cravings', defaults);
  }

  public logCraving(craving: Omit<Craving, 'id' | 'user_id' | 'created_at'>): Craving {
    const newC: Craving = {
      ...craving,
      id: 'cr_' + Date.now(),
      user_id: this.getProfile().id,
      created_at: new Date().toISOString(),
    };
    this.setItem('cravings', [newC, ...this.getCravings()]);
    return newC;
  }

  public updateCraving(id: string, updates: Partial<Craving>): void {
    const updated = this.getCravings().map((c) => (c.id === id ? { ...c, ...updates } : c));
    this.setItem('cravings', updated);
  }

  // --- Distraction Logs ---
  public getDistractionLogs(): DistractionLog[] {
    const profile = this.getProfile();
    const defaults: DistractionLog[] = [
      { id: 'dl_1', user_id: profile.id, date: new Date().toISOString().split('T')[0], category: 'scrolling', duration_minutes: 12, trigger: 'Felt tired between study sets', created_at: new Date().toISOString() },
    ];
    return this.getItem<DistractionLog[]>('distraction_logs', defaults);
  }

  public addDistractionLog(entry: Omit<DistractionLog, 'id' | 'user_id' | 'created_at'>): void {
    const newD: DistractionLog = {
      ...entry,
      id: 'dl_' + Date.now(),
      user_id: this.getProfile().id,
      created_at: new Date().toISOString(),
    };
    this.setItem('distraction_logs', [newD, ...this.getDistractionLogs()]);
  }

  // --- Growth & Hobbies ---
  public getGrowthGoals(): GrowthGoal[] {
    return this.getItem<GrowthGoal[]>('growth_goals', INITIAL_GROWTH_GOALS);
  }

  public toggleProjectTask(goalId: string, taskId: string): void {
    const updated = this.getGrowthGoals().map((g) => {
      if (g.id !== goalId) return g;
      return {
        ...g,
        project_tasks: g.project_tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
      };
    });
    this.setItem('growth_goals', updated);
  }

  public addGrowthGoal(title: string, category: GrowthGoal['category'], daily_target_minutes: number, project_title?: string): void {
    const newG: GrowthGoal = {
      id: 'gg_' + Date.now(),
      user_id: this.getProfile().id,
      title,
      category,
      daily_target_minutes,
      project_title,
      project_tasks: project_title ? [{ id: 't_' + Date.now(), title: 'Initial setup & research', completed: false }] : [],
      created_at: new Date().toISOString(),
    };
    this.setItem('growth_goals', [...this.getGrowthGoals(), newG]);
  }

  public addGrowthSession(goalId: string, duration_minutes: number, notes?: string): void {
    const list = this.getItem<GrowthSession[]>('growth_sessions', []);
    const newS: GrowthSession = {
      id: 'gs_' + Date.now(),
      goal_id: goalId,
      user_id: this.getProfile().id,
      date: new Date().toISOString().split('T')[0],
      duration_minutes,
      notes,
      created_at: new Date().toISOString(),
    };
    this.setItem('growth_sessions', [newS, ...list]);
  }

  public getGrowthSessions(): GrowthSession[] {
    return this.getItem<GrowthSession[]>('growth_sessions', []);
  }

  // --- Notifications ---
  public getNotifications(): NotificationSetting[] {
    return this.getItem<NotificationSetting[]>('notifications', INITIAL_NOTIFICATIONS);
  }

  public toggleNotification(id: string): void {
    const list = this.getNotifications().map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n));
    this.setItem('notifications', list);
  }

  public updateNotificationTime(id: string, time: string): void {
    const list = this.getNotifications().map((n) => (n.id === id ? { ...n, time } : n));
    this.setItem('notifications', list);
  }

  // --- Real Dynamic Daily Score Calculation (Requirement #21) ---
  // Mind 15%, Study 20%, Body 15%, Habits 20%, Growth 10%, Sleep 10%, Distraction control 10% = 100%
  public calculateDailyScore(dateStr: string): DailyScore {
    const profile = this.getProfile();
    const protocols = this.getTodayProtocols(dateStr);
    const habits = this.getHabits();
    const habitLogs = this.getHabitLogs(dateStr);
    const studySessions = this.getStudySessions().filter((s) => s.started_at.startsWith(dateStr));
    const workouts = this.getWorkouts().filter((w) => w.date === dateStr);
    const water = this.getWaterLog(dateStr);
    const sleep = this.getSleepLog(dateStr);
    const distractions = this.getDistractionLogs().filter((d) => d.date === dateStr);
    const growthSessions = this.getGrowthSessions().filter((g) => g.date === dateStr);
    const journal = this.getJournalEntry(dateStr);

    // 1. Mind (15%): Journal written (8%) + Mind protocols checked (7%)
    const mindProtocols = protocols.filter((p) => p.category === 'Mind');
    const mindProtocolsDone = mindProtocols.filter((p) => p.completed).length;
    const mindProtocolsScore = mindProtocols.length ? (mindProtocolsDone / mindProtocols.length) * 7 : 7;
    const journalScore = journal.what_happened && journal.what_happened.length > 5 ? 8 : 0;
    const mind_score = Math.round(mindProtocolsScore + journalScore);

    // 2. Study (20%): Target 100 min total
    const studyMinutes = studySessions.reduce((acc, s) => acc + s.duration_minutes, 0);
    const study_score = Math.min(20, Math.round((studyMinutes / 100) * 20));

    // 3. Body (15%): Workout completed (8%) + Water target reached (7%)
    const workoutDone = workouts.some((w) => w.completed) ? 8 : 0;
    const waterScore = Math.min(7, Math.round((water.amount_ml / water.target_ml) * 7));
    const body_score = workoutDone + waterScore;

    // 4. Habits (20%): Percentage of active daily habits logged
    const activeHabits = habits.filter((h) => !h.archived);
    let habitsCompletedCount = 0;
    activeHabits.forEach((h) => {
      const log = habitLogs[h.id];
      if (log && log.completed) habitsCompletedCount++;
    });
    const habits_score = activeHabits.length
      ? Math.round((habitsCompletedCount / activeHabits.length) * 20)
      : 20;

    // 5. Growth (10%): Target 30 min of personal project or craft
    const growthMinutes = growthSessions.reduce((acc, s) => acc + s.duration_minutes, 0);
    const growthProtocolsDone = protocols.some((p) => p.category === 'Growth' && p.completed);
    const growth_score = Math.min(10, Math.round((growthMinutes / 30) * 8) + (growthProtocolsDone ? 2 : 0));

    // 6. Sleep (10%): Hours 7+ (6%) + Sleep quality (4%)
    const sleepHourScore = sleep.hours >= 7 ? 6 : Math.round((sleep.hours / 7) * 6);
    const sleepQualityScore = sleep.quality === 'deep' ? 4 : sleep.quality === 'good' ? 3 : 2;
    const sleep_score = Math.min(10, sleepHourScore + sleepQualityScore);

    // 7. Distraction Control (10%): Starts at 10, penalizes if distraction > 20 min
    const totalDistractionMins = distractions.reduce((acc, d) => acc + d.duration_minutes, 0);
    const penalty = Math.min(10, Math.floor(totalDistractionMins / 6));
    const distraction_score = Math.max(0, 10 - penalty);

    const overall_score = Math.min(
      100,
      mind_score + study_score + body_score + habits_score + growth_score + sleep_score + distraction_score
    );

    return {
      id: 'sc_' + dateStr,
      user_id: profile.id,
      date: dateStr,
      overall_score,
      mind_score,
      study_score,
      body_score,
      habits_score,
      growth_score,
      sleep_score,
      distraction_score,
      calculated_at: new Date().toISOString(),
    };
  }

  // --- Reset Entire 14-Day Challenge ---
  public resetChallenge(): void {
    const profile = this.getProfile();
    this.setItem('profile', { ...profile, onboarding_completed: true, created_at: new Date().toISOString() });
    
    // Re-lock all challenge days except day 1
    const freshDays = INITIAL_CHALLENGE_DAYS.map((d, index) => ({
      ...d,
      challenge_id: 'ch_001',
      user_id: profile.id,
      score: 0,
      status: index === 0 ? ('current' as const) : ('locked' as const),
      completed_at: undefined,
    }));
    this.setItem('challenge_days', freshDays);

    // Clear today's logs for fresh restart
    const today = new Date().toISOString().split('T')[0];
    const protocols = this.getItem<Record<string, DailyProtocolItem[]>>('protocols_by_date', {});
    delete protocols[today];
    this.setItem('protocols_by_date', protocols);

    this.notify();
  }
}

export const db = new Reset14Store();

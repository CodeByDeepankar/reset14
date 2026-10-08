-- ==========================================================
-- RESET 14: PostgreSQL Database Schema
-- 14 Days. Less Noise. More Control.
-- Normalized tables, foreign keys, indexes, and Row Level Security
-- ==========================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL DEFAULT 'Deepankar',
    avatar_url TEXT,
    timezone TEXT DEFAULT 'Asia/Kolkata',
    onboarding_completed BOOLEAN DEFAULT false,
    app_lock_pin TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Goals
CREATE TABLE IF NOT EXISTS public.user_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    goal_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_user_goals_user ON public.user_goals(user_id);

-- 3. Challenges
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT '14-Day Reset',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    current_day INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_challenges_user ON public.challenges(user_id);

-- 4. Challenge Days
CREATE TABLE IF NOT EXISTS public.challenge_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_number INT NOT NULL CHECK (day_number BETWEEN 1 AND 14),
    phase TEXT NOT NULL, -- DETOX, CONTROL, BUILD, IDENTITY
    theme TEXT NOT NULL,
    mission TEXT NOT NULL,
    targets JSONB NOT NULL DEFAULT '[]'::jsonb,
    reflection_question TEXT NOT NULL,
    reflection_answer TEXT,
    score INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'locked',
    completed_at TIMESTAMPTZ,
    UNIQUE(challenge_id, day_number)
);
CREATE INDEX idx_challenge_days_user ON public.challenge_days(user_id, day_number);

-- 5. Daily Protocols
CREATE TABLE IF NOT EXISTS public.daily_protocols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    category TEXT NOT NULL, -- Morning, Mind, Study, Body, Growth, Evening
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ
);
CREATE INDEX idx_protocols_user_date ON public.daily_protocols(user_id, date);

-- 6. Habits
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'boolean',
    target_value NUMERIC DEFAULT 1,
    unit TEXT,
    frequency TEXT NOT NULL DEFAULT 'daily',
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_habits_user ON public.habits(user_id);

-- 7. Habit Logs
CREATE TABLE IF NOT EXISTS public.habit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT false,
    numeric_value NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(habit_id, date)
);
CREATE INDEX idx_habit_logs_user_date ON public.habit_logs(user_id, date);

-- 8. Subjects
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_hours NUMERIC DEFAULT 2,
    target_sessions INT DEFAULT 2,
    priority TEXT DEFAULT 'high',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Study Sessions
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    duration_minutes INT NOT NULL,
    mode TEXT NOT NULL DEFAULT 'deep_work',
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_study_sessions_user ON public.study_sessions(user_id, started_at);

-- 10. Workouts
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    duration_minutes INT DEFAULT 45,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_workouts_user_date ON public.workouts(user_id, date);

-- 11. Workout Exercises
CREATE TABLE IF NOT EXISTS public.workout_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
    exercise_name TEXT NOT NULL,
    sets JSONB NOT NULL DEFAULT '[]'::jsonb,
    rest_seconds INT DEFAULT 60,
    order_index INT DEFAULT 0
);

-- 12. Water Logs
CREATE TABLE IF NOT EXISTS public.water_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    amount_ml INT DEFAULT 0,
    target_ml INT DEFAULT 3000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 13. Sleep Logs
CREATE TABLE IF NOT EXISTS public.sleep_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    hours NUMERIC NOT NULL,
    quality TEXT NOT NULL DEFAULT 'good',
    bedtime TIME,
    wake_time TIME,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 14. Mood Entries
CREATE TABLE IF NOT EXISTS public.mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    mood TEXT NOT NULL,
    intensity INT NOT NULL CHECK (intensity BETWEEN 1 AND 10),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_mood_user_date ON public.mood_entries(user_id, date);

-- 15. Journal Entries
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    what_happened TEXT,
    what_feeling TEXT,
    what_triggered TEXT,
    what_did_instead TEXT,
    what_do_tomorrow TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 16. Cravings & Interventions
CREATE TABLE IF NOT EXISTS public.cravings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    feeling_category TEXT NOT NULL,
    intensity_before INT NOT NULL CHECK (intensity_before BETWEEN 1 AND 10),
    intensity_after TEXT,
    resolved BOOLEAN DEFAULT false,
    intervention_duration_seconds INT DEFAULT 0,
    steps_completed JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_cravings_user ON public.cravings(user_id, date);

-- 17. Distraction Logs
CREATE TABLE IF NOT EXISTS public.distraction_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    trigger TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_distractions_user ON public.distraction_logs(user_id, date);

-- 18. Growth Goals & Sessions
CREATE TABLE IF NOT EXISTS public.growth_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    daily_target_minutes INT DEFAULT 30,
    project_title TEXT,
    project_tasks JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.growth_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES public.growth_goals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    duration_minutes INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Daily Scores
CREATE TABLE IF NOT EXISTS public.daily_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    overall_score INT NOT NULL,
    mind_score INT NOT NULL,
    study_score INT NOT NULL,
    body_score INT NOT NULL,
    habits_score INT NOT NULL,
    growth_score INT NOT NULL,
    sleep_score INT NOT NULL,
    distraction_score INT NOT NULL,
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);
CREATE INDEX idx_scores_user_date ON public.daily_scores(user_id, date);

-- 20. Weekly Reviews
CREATE TABLE IF NOT EXISTS public.weekly_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    best_day TEXT,
    worst_day TEXT,
    most_productive_day TEXT,
    most_common_trigger TEXT,
    average_mood TEXT,
    study_hours NUMERIC,
    workout_sessions INT,
    distraction_time_minutes INT,
    cravings_handled INT,
    what_worked TEXT,
    what_didnt TEXT,
    what_should_change TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. Notification Settings
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    label TEXT NOT NULL,
    time TEXT NOT NULL,
    enabled BOOLEAN DEFAULT true,
    UNIQUE(user_id, key)
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: User A cannot read or write User B data
-- ==========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cravings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distraction_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper to apply RLS policies for each table
CREATE POLICY "Users can access own profiles" ON public.profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT unnest(ARRAY[
            'user_goals', 'challenges', 'challenge_days',
            'daily_protocols', 'habits', 'habit_logs', 'subjects',
            'study_sessions', 'workouts', 'water_logs', 'sleep_logs',
            'mood_entries', 'journal_entries', 'cravings', 'distraction_logs',
            'growth_goals', 'growth_sessions', 'daily_scores', 'weekly_reviews',
            'notifications'
        ])
    LOOP
        EXECUTE format('CREATE POLICY "Users can access own %I" ON public.%I FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);', tbl, tbl);
    END LOOP;
END $$;

-- Policy for workout_exercises which depends on workouts
CREATE POLICY "Users can access own workout_exercises" ON public.workout_exercises FOR ALL USING (workout_id IN (SELECT id FROM public.workouts WHERE user_id = auth.uid())) WITH CHECK (workout_id IN (SELECT id FROM public.workouts WHERE user_id = auth.uid()));

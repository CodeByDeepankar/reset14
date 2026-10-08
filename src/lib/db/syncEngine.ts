import { supabase } from './supabaseClient';
import { db, INITIAL_CHALLENGE_DAYS, INITIAL_HABITS, INITIAL_SUBJECTS, INITIAL_NOTIFICATIONS } from './store';
import { Profile } from './types';

export const syncEngine = {
  async loadUser(user: any) {
    if (!supabase) return;

    const userId = user.id;

    // 1. Fetch or create Profile
    let { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
    
    if (!profile) {
      profile = {
        id: userId,
        email: user.email,
        full_name: 'Explorer',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        onboarding_completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      await supabase.from('profiles').insert(profile);
    }

    // Update local profile
    localStorage.setItem('reset14_db_profile', JSON.stringify(profile));

    // 2. Fetch Challenge Days
    let { data: challengeDays } = await supabase.from('challenge_days').select('*').eq('user_id', userId);
    if (!challengeDays || challengeDays.length === 0) {
      // Seed initial challenge days
      const days = INITIAL_CHALLENGE_DAYS.map((d, index) => ({
        ...d,
        challenge_id: 'ch_001', // Ideally we'd create a challenge row too, but simplifying
        user_id: userId,
        score: 0,
        status: index === 0 ? 'current' : 'locked',
        completed_at: null
      }));
      
      // Try to create a dummy challenge first to satisfy foreign key
      await supabase.from('challenges').insert({
        id: 'ch_001',
        user_id: userId,
        title: '14-Day Reset',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        status: 'active',
        current_day: 1
      });

      await supabase.from('challenge_days').insert(days);
      challengeDays = days;
    }
    localStorage.setItem('reset14_db_challenge_days', JSON.stringify(challengeDays));

    // 3. Fetch Protocols
    const { data: protocols } = await supabase.from('daily_protocols').select('*').eq('user_id', userId);
    if (protocols) {
      const byDate: any = {};
      protocols.forEach((p: any) => {
        if (!byDate[p.date]) byDate[p.date] = [];
        byDate[p.date].push(p);
      });
      localStorage.setItem('reset14_db_protocols_by_date', JSON.stringify(byDate));
    }

    // 4. Fetch Goals
    const { data: goals } = await supabase.from('user_goals').select('*').eq('user_id', userId);
    if (goals) {
      localStorage.setItem('reset14_db_goals', JSON.stringify(goals));
    }

    // 5. Fetch Habits
    let { data: habits } = await supabase.from('habits').select('*').eq('user_id', userId);
    if (!habits || habits.length === 0) {
      const seedHabits = INITIAL_HABITS.map(h => ({ ...h, user_id: userId, id: undefined }));
      const { data: newHabits } = await supabase.from('habits').insert(seedHabits).select();
      habits = newHabits || [];
    }
    localStorage.setItem('reset14_db_habits', JSON.stringify(habits));

    // 6. Fetch other array tables
    const arrayTables = ['subjects', 'study_sessions', 'distraction_logs', 'growth_goals', 'growth_sessions', 'notifications', 'cravings'];
    for (const table of arrayTables) {
      const { data } = await supabase.from(table).select('*').eq('user_id', userId);
      if (data && data.length > 0) {
        localStorage.setItem(`reset14_db_${table}`, JSON.stringify(data));
      }
    }

    // 7. Fetch Workouts & Exercises
    const { data: workouts } = await supabase.from('workouts').select('*, workout_exercises(*)').eq('user_id', userId);
    if (workouts && workouts.length > 0) {
      const wList = workouts.map((w: any) => {
        const { workout_exercises, ...rest } = w;
        return { ...rest, exercises: workout_exercises };
      });
      localStorage.setItem('reset14_db_workouts', JSON.stringify(wList));
    }

    // 8. Fetch date-keyed single object tables
    const dateTables = ['water_logs', 'sleep_logs', 'mood_entries', 'journal_entries'];
    for (const table of dateTables) {
      const { data } = await supabase.from(table).select('*').eq('user_id', userId);
      if (data && data.length > 0) {
        const map: any = {};
        data.forEach((d: any) => map[d.date] = d);
        localStorage.setItem(`reset14_db_${table}`, JSON.stringify(map));
      }
    }

    // 9. Fetch habit logs (double keyed: date -> habit_id -> log)
    const { data: habitLogs } = await supabase.from('habit_logs').select('*').eq('user_id', userId);
    if (habitLogs && habitLogs.length > 0) {
      const hMap: any = {};
      habitLogs.forEach((l: any) => {
        if (!hMap[l.date]) hMap[l.date] = {};
        hMap[l.date][l.habit_id] = l;
      });
      localStorage.setItem('reset14_db_habit_logs_by_date', JSON.stringify(hMap));
    }
    
    // Notify store subscribers so React re-renders with the real data
    (db as any).notify();
  },

  async push(key: string, value: any) {
    if (!supabase) return;
    
    try {
      if (key === 'profile') {
        await supabase.from('profiles').upsert(value);
      } else if (['challenge_days', 'goals', 'habits', 'subjects', 'study_sessions', 'distraction_logs', 'growth_goals', 'growth_sessions', 'notifications', 'cravings'].includes(key)) {
        const table = key === 'goals' ? 'user_goals' : key;
        if (Array.isArray(value)) {
          for (const item of value) {
            await supabase.from(table).upsert(item);
          }
        }
      } else if (['protocols_by_date', 'habit_logs_by_date'].includes(key)) {
        const table = key === 'protocols_by_date' ? 'daily_protocols' : 'habit_logs';
        const items = Object.values(value).map(obj => Array.isArray(obj) ? obj : Object.values(obj as any)).flat();
        if (items.length > 0) {
          for (const i of items as any) {
            await supabase.from(table).upsert(i);
          }
        }
      } else if (['water_logs', 'sleep_logs', 'mood_entries', 'journal_entries'].includes(key)) {
        const items = Object.values(value);
        if (items.length > 0) {
          for (const i of items as any) {
            await supabase.from(key).upsert(i);
          }
        }
      } else if (key === 'workouts' && Array.isArray(value)) {
        for (const w of value) {
          const { exercises, ...workoutData } = w;
          await supabase.from('workouts').upsert(workoutData);
          if (exercises && Array.isArray(exercises)) {
            for (const ex of exercises) {
              await supabase.from('workout_exercises').upsert(ex);
            }
          }
        }
      }
    } catch (e) {
      console.error('Supabase Sync Push Error:', e);
    }
  }
};

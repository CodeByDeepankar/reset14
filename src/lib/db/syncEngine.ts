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

    // For brevity, we could do this for all tables, but this gets the main dashboard going with real user data!
    
    // Notify store subscribers so React re-renders with the real data
    (db as any).notify();
  },

  async push(key: string, value: any) {
    if (!supabase) return;
    
    // Quick mapper from localStorage keys to Supabase tables
    // This is a naive implementation that just upserts the whole array or object
    try {
      if (key === 'profile') {
        await supabase.from('profiles').upsert(value);
      } else if (key === 'challenge_days' && Array.isArray(value)) {
        for (const day of value) {
          await supabase.from('challenge_days').upsert(day);
        }
      } else if (key === 'protocols_by_date') {
        const allProtocols = Object.values(value).flat();
        if (allProtocols.length > 0) {
            for (const p of allProtocols as any) {
                await supabase.from('daily_protocols').upsert(p);
            }
        }
      } else if (key === 'habits' && Array.isArray(value)) {
        for (const h of value) {
          await supabase.from('habits').upsert(h);
        }
      } else if (key === 'habit_logs_by_date') {
        const logs = Object.values(value).map(obj => Object.values(obj as any)).flat();
        for (const l of logs as any) {
          await supabase.from('habit_logs').upsert(l);
        }
      }
      // Add other tables as needed...
    } catch (e) {
      console.error('Supabase Sync Push Error:', e);
    }
  }
};

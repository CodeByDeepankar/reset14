import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http')
);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export interface SupabaseSyncStatus {
  connected: boolean;
  lastSync: string | null;
  mode: 'supabase-realtime' | 'offline-persistence';
}

export function getSyncStatus(): SupabaseSyncStatus {
  return {
    connected: isSupabaseConfigured,
    lastSync: new Date().toISOString(),
    mode: isSupabaseConfigured ? 'supabase-realtime' : 'offline-persistence',
  };
}

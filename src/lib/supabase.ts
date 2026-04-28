import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const sanitizeUrl = (url: string) => {
  if (!url || url === 'https://your-project-id.supabase.co') return 'https://placeholder.supabase.co';
  let clean = url.trim();
  if (clean.endsWith('/')) clean = clean.slice(0, -1);
  if (clean.endsWith('/rest/v1')) clean = clean.replace('/rest/v1', '');
  if (clean.endsWith('/')) clean = clean.slice(0, -1); // Check again after replacement
  return clean;
};

const supabaseUrl = sanitizeUrl(rawUrl);
const supabaseAnonKey = rawKey.trim() || 'placeholder';

export const isSupabaseConfigured = 
  rawUrl && 
  rawUrl !== '' && 
  rawUrl !== 'https://your-project-id.supabase.co';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

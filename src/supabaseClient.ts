import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wdzgkssfacatnzutjbgq.supabase.co';
const supabaseAnonKey = 'sb_publishable_faWbvXU4IWNylAisgEMmaw_OqvwtRFr';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
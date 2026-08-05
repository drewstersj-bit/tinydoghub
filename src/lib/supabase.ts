import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlcgmgnqwsjcaanrlfv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_KfjveSJzYJJ3hBvqLnEcfQ_OHyRV2Wq';

export const supabase = createClient(supabaseUrl, supabaseKey);

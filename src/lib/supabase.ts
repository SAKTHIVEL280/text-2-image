import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_LOVABLE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_LOVABLE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Please make sure you have connected your Supabase project in the Lovable dashboard')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
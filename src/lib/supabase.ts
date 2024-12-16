import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqdimisbsaxoynbqizwh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZGltaXNic2F4b3luYnFpendoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMTkzMzYsImV4cCI6MjA0ODc5NTMzNn0.76LR51YUQRyBrV93deutzuzx8ZWlUDaMIeqbsJ7ETUY'

export const supabase = createClient(supabase_url, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
})
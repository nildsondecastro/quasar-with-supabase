import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pldzpeuvagwufsqmusij.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZHpwZXV2YWd3dWZzcW11c2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk0ODM5OTgsImV4cCI6MTk3NTA1OTk5OH0.9AbvZLpX2bMGU9_7v-FCuh47qciHE3BxOwbb2JIcfWU'
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Init Supabase:', supabase );

export default function useSupabase() {
  return { supabase }
}

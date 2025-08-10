import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gxxhunhedhhtnwpslnrt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4eGh1bmhlZGhodG53cHNsbnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTE1MDAsImV4cCI6MjA2OTE4NzUwMH0.KS4Rk4qndxt4AkRhF5xwTnvbS0DmiOO7lVs-5LK8EPw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

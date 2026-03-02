import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Usado no browser (componentes client)
export const supabase = createClient(
  url  || 'https://placeholder.supabase.co',
  anon || 'placeholder'
)

// Usado server-side — nunca exposto ao browser
export const supabaseAdmin = createClient(
  url  || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
)

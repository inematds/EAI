import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'NAO_DEFINIDA'
  const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const { data: visits, error: visitError } = await supabaseAdmin
    .from('eai-visitors')
    .select('session_id, created_at')
    .limit(5)

  const { data: clicks, error: clickError } = await supabaseAdmin
    .from('eai-clicks')
    .select('url')
    .limit(5)

  return NextResponse.json({
    env: { url, hasServiceKey, hasAnonKey },
    visits: { data: visits, error: visitError?.message ?? null },
    clicks: { data: clicks, error: clickError?.message ?? null },
  })
}

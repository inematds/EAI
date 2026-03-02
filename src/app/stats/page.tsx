import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

type VisitRow = { session_id: string; created_at: string }
type ClickRow = { url: string; label: string | null; section: string | null; created_at: string }

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = key(item)
    if (!acc[k]) acc[k] = []
    acc[k].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export default async function StatsPage() {
  let visits: VisitRow[] = []
  let clicks: ClickRow[] = []

  try {
    const [v, c] = await Promise.all([
      supabaseAdmin.from('eai-visitors').select('session_id, created_at').order('created_at'),
      supabaseAdmin.from('eai-clicks').select('url, label, section, created_at').order('created_at'),
    ])
    visits = v.data ?? []
    clicks = c.data ?? []
  } catch { /* Supabase indisponível */ }

  const totalViews     = visits.length
  const uniqueVisitors = new Set(visits.map((v) => v.session_id)).size
  const today          = new Date().toISOString().slice(0, 10)
  const todayVisits    = visits.filter((v) => v.created_at.slice(0, 10) === today).length

  const visitsByDay = groupBy(visits, (v) => v.created_at.slice(0, 10))
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    return d.toISOString().slice(0, 10)
  })
  const visitDayData = last14.map((day) => ({
    day,
    label: new Date(day).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    count: visitsByDay[day]?.length ?? 0,
  }))
  const maxDay = Math.max(...visitDayData.map((d) => d.count), 1)

  const clicksBySection = groupBy(clicks, (c) => c.section ?? 'outros')
  const sectionData = Object.entries(clicksBySection)
    .map(([section, items]) => ({ section, count: items.length }))
    .sort((a, b) => b.count - a.count)
  const maxSection = Math.max(...sectionData.map((s) => s.count), 1)

  const linkMap: Record<string, { url: string; label: string; section: string; count: number }> = {}
  for (const c of clicks) {
    if (!linkMap[c.url]) {
      linkMap[c.url] = { url: c.url, label: c.label ?? c.url, section: c.section ?? '-', count: 0 }
    }
    linkMap[c.url].count++
  }
  const topLinks = Object.values(linkMap).sort((a, b) => b.count - a.count).slice(0, 20)

  const sectionColor: Record<string, string> = {
    arcade:      '#6366f1',
    educacional: '#22c55e',
    jogos:       '#f59e0b',
    busca:       '#3b82f6',
    header:      '#8b5cf6',
    outros:      '#94a3b8',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d18', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <div style={{ marginBottom: '2rem' }}>
          <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>← Voltar</a>
          <h1 style={{ margin: '0.5rem 0 0.25rem', fontSize: '1.8rem', fontWeight: 700 }}>
            📊 Estatísticas EAI
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Atualizado a cada 60 segundos</p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '👁',  label: 'Visualizações',     value: totalViews.toLocaleString('pt-BR') },
            { icon: '👤',  label: 'Visitantes Únicos',  value: uniqueVisitors.toLocaleString('pt-BR') },
            { icon: '🖱️', label: 'Cliques Registrados', value: clicks.length.toLocaleString('pt-BR') },
            { icon: '📅',  label: 'Acessos Hoje',       value: todayVisits.toLocaleString('pt-BR') },
          ].map((card) => (
            <div key={card.label} style={{ background: '#1e293b', borderRadius: 12, padding: '1.25rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{card.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Gráfico 14 dias */}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '1px solid #334155', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: '#cbd5e1' }}>
            Acessos — últimos 14 dias
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {visitDayData.map((d) => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{d.count > 0 ? d.count : ''}</span>
                <div style={{
                  width: '100%',
                  background: d.count > 0 ? '#6366f1' : '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: 4,
                  height: `${Math.max((d.count / maxDay) * 90, d.count > 0 ? 8 : 2)}px`,
                }} />
                <span style={{ fontSize: '0.6rem', color: '#475569', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

          {/* Cliques por seção */}
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '1px solid #334155' }}>
            <h2 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: '#cbd5e1' }}>Cliques por seção</h2>
            {sectionData.length === 0
              ? <p style={{ color: '#475569', fontSize: '0.85rem' }}>Nenhum clique ainda.</p>
              : sectionData.map((s) => (
                <div key={s.section} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                    <span style={{ textTransform: 'capitalize', color: '#cbd5e1' }}>{s.section}</span>
                    <span style={{ color: '#94a3b8' }}>{s.count}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: '#0f172a', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(s.count / maxSection) * 100}%`, background: sectionColor[s.section] ?? '#6366f1', borderRadius: 4 }} />
                  </div>
                </div>
              ))
            }
          </div>

          {/* Legenda */}
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '1px solid #334155' }}>
            <h2 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: '#cbd5e1' }}>Legenda</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(sectionColor).map(([sec, color]) => (
                <div key={sec} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'capitalize' }}>{sec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top links */}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '1px solid #334155' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: '#cbd5e1' }}>Links mais clicados</h2>
          {topLinks.length === 0
            ? <p style={{ color: '#475569', fontSize: '0.85rem' }}>Nenhum clique registrado ainda.</p>
            : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    {['#', 'Link', 'Seção', 'Cliques'].map((h) => (
                      <th key={h} style={{ padding: '0.5rem 0.75rem', color: '#64748b', textAlign: h === 'Cliques' ? 'right' : 'left', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topLinks.map((link, i) => (
                    <tr key={link.url} style={{ borderBottom: '1px solid #0f172a' }}>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#475569' }}>{i + 1}</td>
                      <td style={{ padding: '0.6rem 0.75rem' }}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'none' }}>{link.label}</a>
                      </td>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#94a3b8' }}>{link.section}</td>
                      <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 600 }}>{link.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>

      </div>
    </div>
  )
}

import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { EGRESS_PROVIDERS, EVALUATION_CRITERIA, PORTABILITY_STEPS } from '../data/valleclaroData';

export function CloudSlide() {
  const [selectedId, setSelectedId] = useState(EVALUATION_CRITERIA[0].id);
  const [gb, setGb] = useState(1000);

  const selected = EVALUATION_CRITERIA.find((c) => c.id === selectedId) ?? EVALUATION_CRITERIA[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <SectionHeader
        kicker="03 · Selección de Nube"
        title="Google Cloud lidera con 89,00 / 100"
        subtitle="Menor costo de referencia y máximo ajuste al equipo de analítica ya en GCP."
      />

      {/* Ranking visual horizontal (3 barras protagonistas) */}
      <div className="g-3" style={{ marginBottom: 14 }}>
        {[
          { name: 'Google Cloud', score: 89.0, usd: 210, col: '#1f6e43', note: 'Elegido · 4,45 / 5' },
          { name: 'Microsoft Azure', score: 73.75, usd: 220, col: '#0078d4', note: 'Top herramientas · 4,75 / 5' },
          { name: 'AWS', score: 66.5, usd: 230, col: '#dd6b20', note: 'Top egreso · 3,33 / 5' },
        ].map((p, i) => (
          <div key={p.name} className="panel" style={{ borderTop: `3px solid ${p.col}`, padding: '14px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>
                {p.name}
              </span>
              <span className="metric-lg" style={{ color: p.col }}>
                {p.score.toFixed(1).replace('.', ',')}
              </span>
            </div>
            <div className="bar-track" style={{ height: 7, marginBottom: 8 }}>
              <div className="bar-fill" style={{ width: `${p.score}%`, background: p.col }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--ink-soft)' }}>
              <span>{p.note}</span>
              <span className="mono">Ref. USD {p.usd}/m</span>
            </div>
          </div>
        ))}
      </div>

      {/* Matriz interactiva + Simulador Egreso */}
      <div className="g-60-40" style={{ flex: 1, minHeight: 0, marginBottom: 14 }}>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="panel-label">
            <span>6 criterios ponderados (clic para inspeccionar)</span>
            <span>GCP · Azure · AWS</span>
          </div>

          <div style={{ display: 'grid', gap: 7 }}>
            {EVALUATION_CRITERIA.map((c) => {
              const isSel = c.id === selected.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '145px 38px 1fr',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 8px',
                    border: isSel ? '1px solid var(--vc-cobalt)' : '1px solid transparent',
                    background: isSel ? 'var(--bg-subtle)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span style={{ fontSize: 12.5, color: 'var(--ink)' }}>{c.criterion}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--vc-cyan)' }}>{c.weight}%</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {[
                      { v: c.gcp, col: '#1f6e43' },
                      { v: c.azure, col: '#0078d4' },
                      { v: c.aws, col: '#dd6b20' },
                    ].map((b, bi) => (
                      <div key={bi} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div className="bar-track" style={{ height: 6 }}>
                          <div className="bar-fill" style={{ width: `${(b.v / 5) * 100}%`, background: b.col }} />
                        </div>
                        <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-soft)', minWidth: 22 }}>
                          {b.v.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line-hair)', fontSize: 12.5, color: 'var(--ink-mid)' }}>
            <span className="mono" style={{ color: 'var(--vc-cobalt)', marginRight: 8 }}>{selected.criterion}:</span>
            {selected.takeaway}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="panel-tint" style={{ flex: 1 }}>
            <div className="panel-label">
              <span>Simulador tarifa de salida</span>
              <span className="mono" style={{ color: 'var(--vc-cobalt)' }}>{gb.toLocaleString('es-CO')} GB</span>
            </div>
            <input
              type="range"
              className="vc-slider"
              min={100}
              max={5000}
              step={100}
              value={gb}
              onChange={(e) => setGb(Number(e.target.value))}
              style={{ marginBottom: 14 }}
            />
            {EGRESS_PROVIDERS.map((ep) => {
              const cost = (Math.max(0, gb - ep.freeGb) / 100) * ep.rate;
              return (
                <div key={ep.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: 'var(--ink-mid)' }}>{ep.label}</span>
                    <span className="mono" style={{ color: ep.color }}>USD {cost.toFixed(1)}</span>
                  </div>
                  <div className="bar-track" style={{ height: 6 }}>
                    <div className="bar-fill" style={{ width: `${Math.max(4, (cost / 600) * 100)}%`, background: ep.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="panel" style={{ padding: '12px 14px' }}>
            <div className="panel-label" style={{ marginBottom: 8 }}>
              <span>Portabilidad anti lock-in</span>
              <span>Iceberg + Terraform</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {PORTABILITY_STEPS.map((st) => (
                <div key={st.num} style={{ borderLeft: '2px solid var(--vc-cyan)', paddingLeft: 7 }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--vc-cyan)' }}>{st.num}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink)' }}>{st.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

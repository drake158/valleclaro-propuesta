import { useState } from 'react';
import { Award, CheckCircle2, Compass, Sliders } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import {
  CAPABILITIES_7,
  EGRESS_PROVIDERS,
  EVALUATION_CRITERIA,
  PORTABILITY_STEPS,
} from '../data/valleclaroData';

export function AlternativasTab() {
  const [activeCritId, setActiveCritId] = useState(EVALUATION_CRITERIA[0].id);
  const [gbVolume, setGbVolume] = useState(1000);

  const activeCrit = EVALUATION_CRITERIA.find((c) => c.id === activeCritId) ?? EVALUATION_CRITERIA[0];

  return (
    <div className="slide-enter">
      <SectionHeader
        kicker="Slide 01 · Selección Cloud"
        title="Google Cloud lidera con 89,00 / 100"
        tagline="Mejor ajuste a la analítica existente (3 personas en GCP) y menor costo base sin migrar AWS ni Azure."
      />

      {/* Podio visual compacto */}
      <div className="bento-3">
        {[
          { name: 'Google Cloud', score: 89.0, five: '4,45', refUsd: 210, color: '#1f6e43', badge: 'Ganador #1', stack: 'GCS · BigLake · BigQuery · Looker' },
          { name: 'Microsoft Azure', score: 73.75, five: '3,69', refUsd: 220, color: '#0078d4', badge: '#2 · Top Herramientas (4,75)', stack: 'ADLS Gen2 · Databricks · Purview' },
          { name: 'AWS', score: 66.5, five: '3,33', refUsd: 230, color: '#dd6b20', badge: '#3 · Top Egreso (5,0)', stack: 'S3 · Glue · Athena · Redshift' },
        ].map((p, idx) => (
          <div
            key={p.name}
            className="deck-card"
            style={{
              borderTop: `4px solid ${p.color}`,
              background: idx === 0 ? 'linear-gradient(180deg, #effaf4 0%, #ffffff 55%)' : '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span className="badge" style={{ background: `${p.color}18`, color: p.color }}>
                {idx === 0 && <Award size={12} />} {p.badge}
              </span>
              <span className="mono" style={{ fontWeight: 700, color: p.color }}>{p.five}/5</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ fontSize: 19 }}>{p.name}</h3>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: p.color }} className="num">
                {p.score.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="hbar-track" style={{ height: 11, marginBottom: 10 }}>
              <div className="hbar-fill" style={{ width: `${p.score}%`, background: p.color }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
              <span>{p.stack}</span>
              <strong className="mono" style={{ color: 'var(--text-primary)' }}>≈ USD {p.refUsd}/m*</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico interactivo de 6 criterios + 7 capacidades */}
      <div className="bento-2">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">Matriz Ponderada (6 Criterios · clic para detalle)</span>
            <span className="badge badge-navy">Escala 1–5</span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {EVALUATION_CRITERIA.map((c) => {
              const isSelected = c.id === activeCrit.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCritId(c.id)}
                  style={{
                    border: isSelected ? '1.5px solid var(--vc-cobalt)' : '1px solid var(--border-light)',
                    background: isSelected ? '#eef6ff' : '#fafcff',
                    borderRadius: 10,
                    padding: '9px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                    <strong style={{ color: 'var(--vc-cobalt)' }}>{c.criterion}</strong>
                    <span className="badge badge-cyan">{c.weight} %</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[
                      { lbl: 'GCP', val: c.gcp, col: '#1f6e43' },
                      { lbl: 'Azure', val: c.azure, col: '#0078d4' },
                      { lbl: 'AWS', val: c.aws, col: '#dd6b20' },
                    ].map((bar) => (
                      <div key={bar.lbl}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 700, color: bar.col }}>
                          <span>{bar.lbl}</span>
                          <span className="num">{bar.val.toFixed(1)}</span>
                        </div>
                        <div className="hbar-track" style={{ height: 6 }}>
                          <div className="hbar-fill" style={{ width: `${(bar.val / 5) * 100}%`, background: bar.col }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 12,
              padding: '10px 14px',
              borderRadius: 10,
              background: 'var(--vc-midnight)',
              color: '#e2e8f0',
              fontSize: 12.5,
            }}
          >
            <strong style={{ color: '#38bdf8' }}>{activeCrit.criterion} ({activeCrit.weight}%):</strong>{' '}
            {activeCrit.takeaway}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Sub-matriz visual de 7 capacidades */}
          <div className="deck-card">
            <div className="card-head">
              <span className="card-head-title">Herramientas (25 % · 7 factores)</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge badge-azure">Azure 4,75</span>
                <span className="badge badge-gcp">GCP 4,40</span>
                <span className="badge badge-aws">AWS 4,10</span>
              </div>
            </div>

            {CAPABILITIES_7.map((cap) => (
              <div key={cap.factor} style={{ display: 'grid', gridTemplateColumns: '115px 1fr', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{cap.factor}</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  <div className="hbar-track" title={`GCP: ${cap.gcp}/5`}>
                    <div className="hbar-fill" style={{ width: `${cap.gcp * 20}%`, background: '#1f6e43' }} />
                  </div>
                  <div className="hbar-track" title={`Azure: ${cap.azure}/5`}>
                    <div className="hbar-fill" style={{ width: `${cap.azure * 20}%`, background: '#0078d4' }} />
                  </div>
                  <div className="hbar-track" title={`AWS: ${cap.aws}/5`}>
                    <div className="hbar-fill" style={{ width: `${cap.aws * 20}%`, background: '#dd6b20' }} />
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
              *Purview transiciona gobierno a Fabric (mantenimiento hasta nov 2027). Barras: Verde GCP · Azul Azure · Naranja AWS.
            </div>
          </div>

          {/* Simulador visual de egreso */}
          <div className="deck-card" style={{ background: 'var(--bg-tint)' }}>
            <div className="card-head">
              <span className="card-head-title">
                <Sliders size={16} /> Simulador Tarifas de Salida (Internet)
              </span>
              <span className="badge badge-navy mono">{gbVolume.toLocaleString('es-CO')} GB/mes</span>
            </div>
            <input
              type="range"
              className="vc-slider"
              min={100}
              max={5000}
              step={100}
              value={gbVolume}
              onChange={(e) => setGbVolume(Number(e.target.value))}
              style={{ marginBottom: 14 }}
            />
            {EGRESS_PROVIDERS.map((ep) => {
              const billable = Math.max(0, gbVolume - ep.freeGb);
              const cost = (billable / 100) * ep.rate;
              const maxCost = (5000 / 100) * 12;
              return (
                <div className="hbar-row" key={ep.id}>
                  <div className="hbar-meta">
                    <span style={{ fontWeight: 600 }}>{ep.label}</span>
                    <strong className="mono" style={{ color: ep.color }}>
                      USD {cost.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>
                  <div className="hbar-track" style={{ height: 8 }}>
                    <div className="hbar-fill" style={{ width: `${Math.max(4, (cost / maxCost) * 100)}%`, background: ep.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plan de Portabilidad Anti Lock-in en 4 bloques */}
      <div className="deck-card">
        <div className="card-head" style={{ marginBottom: 12 }}>
          <span className="card-head-title">
            <Compass size={16} /> Estrategia Anti Lock-in y Portabilidad (4 Etapas)
          </span>
          <span className="badge badge-gcp">
            <CheckCircle2 size={12} /> Contingencia ≠ Portabilidad
          </span>
        </div>
        <div className="bento-4" style={{ marginBottom: 0 }}>
          {PORTABILITY_STEPS.map((st) => (
            <div
              key={st.num}
              style={{
                background: 'var(--bg-soft)',
                border: '1px solid var(--border-light)',
                borderRadius: 12,
                padding: '12px 14px',
              }}
            >
              <span className="badge badge-navy mono" style={{ marginBottom: 6 }}>Paso {st.num}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'var(--vc-cobalt)' }}>
                {st.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

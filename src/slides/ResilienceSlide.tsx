import { useState } from 'react';
import { DonutChart } from '../components/DonutChart';
import { SectionHeader } from '../components/SectionHeader';
import { DR_INCREMENTAL_V3, RTO_RPO_CHART, RUNBOOK_TIMELINE } from '../data/valleclaroData';

export function ResilienceSlide() {
  const [step, setStep] = useState(5);
  const [metricView, setMetricView] = useState<'rto' | 'rpo'>('rto');
  const current = RUNBOOK_TIMELINE.find((r) => r.step === step) ?? RUNBOOK_TIMELINE[5];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SectionHeader
        kicker="08 · Resiliencia y DR"
        title={
          <>
            <strong>Tres regiones</strong>, regla <strong>3-2-1</strong> y RTO desde <strong>2 horas</strong>
          </>
        }
        subtitle="Dallas activa · Virginia pasivo tibio (MDR) · Querétaro bóveda inmutable 365 d."
      />

      <div className="g-3">
        {[
          { role: 'PRIMARIA', name: 'Dallas · us-south1', spec: '10.10.0.0/16 · Único escritor · Multizona', col: '#1f6e43' },
          { role: 'CONTINGENCIA TIBIA', name: 'Virginia · us-east4', spec: '10.11.0.0/16 · MDR 5m · Dual Turbo · E-3/E-4', col: '#f2991d' },
          { role: 'BÓVEDA INMUTABLE', name: 'Querétaro · México', spec: 'Sin VPN · Archive 365 d + Bucket Lock · 100 TB', col: '#475569' },
        ].map((r) => (
          <div key={r.name} className="panel" style={{ borderLeft: `3px solid ${r.col}`, padding: '10px 14px' }}>
            <div className="mono" style={{ fontSize: 10, color: r.col, letterSpacing: '0.1em' }}>{r.role}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15.5, fontWeight: 500, color: 'var(--ink)', marginTop: 2 }}>
              {r.name}
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{r.spec}</div>
          </div>
        ))}
      </div>

      <div className="g-60-40">
        {/* Gráfico de alta visibilidad RTO / RPO con escala normalizada explicada */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 18px' }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>
              {metricView === 'rto' ? 'RTO objetivo vs. Diseño y PoC simulada' : 'RPO objetivo vs. PoC simulada'}
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                type="button"
                className={`chip-btn ${metricView === 'rto' ? 'active' : ''}`}
                style={{ padding: '2px 9px', fontSize: 11 }}
                onClick={() => setMetricView('rto')}
              >
                Ver RTO
              </button>
              <button
                type="button"
                className={`chip-btn ${metricView === 'rpo' ? 'active' : ''}`}
                style={{ padding: '2px 9px', fontSize: 11 }}
                onClick={() => setMetricView('rpo')}
              >
                Ver RPO
              </button>
            </div>
          </div>

          {/* Regla de escala explícita */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8,
              background: 'var(--bg-subtle)',
              borderLeft: '2px solid var(--vc-cyan)',
              padding: '6px 10px',
              fontSize: 11.5,
              color: 'var(--ink-mid)',
            }}
          >
            <span>
              <strong style={{ color: 'var(--vc-cobalt)' }}>Cómo leer la escala:</strong> cada fila normaliza su propio
              límite del Anexo B al <strong>100 %</strong> · <strong>barra más corta = mayor margen</strong>.
            </span>
            <span style={{ display: 'inline-flex', gap: 10, fontSize: 11 }}>
              {metricView === 'rto' && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 9, height: 9, background: '#0f2d6b', display: 'inline-block' }} /> Diseño
                </span>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 9, height: 9, background: '#1f6e43', display: 'inline-block' }} /> PoC
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#c81e1e' }}>
                <span style={{ width: 2, height: 10, background: '#c81e1e', display: 'inline-block' }} /> Límite 100%
              </span>
            </span>
          </div>

          {/* Barras de alta visibilidad con marcas 0% / 50% / 100% */}
          <div style={{ display: 'grid', gap: 10 }}>
            {RTO_RPO_CHART.map((row) => {
              const designPct = Math.round((row.rtoDesignH / row.rtoObjH) * 100);
              const pocRtoPct = Math.round((row.rtoPocH / row.rtoObjH) * 100);
              const pocRpoPct = Math.round((row.rpoPocM / row.rpoObjM) * 100);
              const marginPct = 100 - (metricView === 'rto' ? pocRtoPct : pocRpoPct);

              return (
                <div key={row.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 12.5, marginBottom: 4 }}>
                    <span style={{ color: 'var(--ink)', fontWeight: 500 }}>
                      {row.name}{' '}
                      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                        (100 % = {metricView === 'rto' ? row.rtoObjLbl : row.rpoObjLbl})
                      </span>
                    </span>
                    <span className="mono" style={{ fontSize: 11, color: '#1f6e43' }}>
                      −{marginPct} % margen
                    </span>
                  </div>

                  <div style={{ display: 'grid', gap: 4 }}>
                    {metricView === 'rto' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 74px', alignItems: 'center', gap: 8 }}>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--vc-cobalt)' }}>Diseño</span>
                        <div className="bar-track" style={{ height: 11, borderRight: '2px dashed #c81e1e', background: '#e4ebf5' }}>
                          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(15,45,107,0.18)' }} />
                          <div className="bar-fill" style={{ width: `${designPct}%`, background: '#0f2d6b' }} />
                        </div>
                        <span className="mono" style={{ fontSize: 11, textAlign: 'right', color: 'var(--vc-cobalt)' }}>
                          {row.rtoDesignLbl} ({designPct}%)
                        </span>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 74px', alignItems: 'center', gap: 8 }}>
                      <span className="mono" style={{ fontSize: 10, color: '#1f6e43' }}>PoC</span>
                      <div className="bar-track" style={{ height: 11, borderRight: '2px dashed #c81e1e', background: '#e4ebf5' }}>
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(15,45,107,0.18)' }} />
                        <div
                          className="bar-fill"
                          style={{
                            width: `${metricView === 'rto' ? pocRtoPct : pocRpoPct}%`,
                            background: '#1f6e43',
                          }}
                        />
                      </div>
                      <span className="mono" style={{ fontSize: 11, textAlign: 'right', color: '#1f6e43' }}>
                        {metricView === 'rto' ? `${row.rtoPocLbl} (${pocRtoPct}%)` : `${row.rpoPocLbl} (${pocRpoPct}%)`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Eje inferior de referencia */}
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 74px', gap: 8, paddingTop: 2 }}>
            <span />
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-soft)' }}>
              <span>0 %</span>
              <span>50 %</span>
              <span style={{ color: '#c81e1e' }}>100 % límite</span>
            </div>
            <span />
          </div>
        </div>

        <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10, padding: '14px 18px' }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>Costo incremental DR</span>
            <span>Incluido en presupuesto</span>
          </div>
          <DonutChart
            slices={DR_INCREMENTAL_V3.map((d) => ({ label: d.label, value: d.usd, color: d.color }))}
            centerValue="$3.204"
            centerLabel="COP 11,2M/m"
            size={150}
          />
          <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', paddingTop: 10, borderTop: '1px solid var(--line-hair)' }}>
            Plan B inventario: stream activo en Virginia si DR-4 &gt; 5 min · 10 dependencias (D-1..D-10) cerradas.
          </div>
        </div>
      </div>

      <div className="panel-dark" style={{ padding: '11px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
          <span className="mono" style={{ fontSize: 10.5, color: '#7dd3fc', letterSpacing: '0.1em' }}>
            RUNBOOK DR-RB-01 (CAÍDA DALLAS)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {RUNBOOK_TIMELINE.map((r) => (
              <button
                key={r.step}
                type="button"
                onClick={() => setStep(r.step)}
                style={{
                  border: step === r.step ? '1px solid #0ea5e9' : '1px solid rgba(255,255,255,0.16)',
                  background: step === r.step ? 'rgba(14,165,233,0.22)' : 'transparent',
                  color: '#ffffff',
                  padding: '3px 8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                {r.at}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#f8fafc' }}>
            <strong className="mono" style={{ color: '#38bdf8', marginRight: 8 }}>Paso {current.step} · {current.label}</strong>
            {current.desc}
          </span>
          <span className="mono" style={{ fontSize: 11, color: '#fbbf24' }}>Acumulado {current.at} h</span>
        </div>
      </div>
    </div>
  );
}

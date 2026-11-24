import { useState } from 'react';
import { Archive, Check, Clock, RefreshCw, ShieldAlert, X } from 'lucide-react';
import { DonutChart } from '../components/DonutChart';
import { SectionHeader } from '../components/SectionHeader';
import { DR_INCREMENTAL_V3, RTO_RPO_CHART, RUNBOOK_TIMELINE } from '../data/valleclaroData';

export function ResilienciaTab() {
  const [activeStep, setActiveStep] = useState(5);
  const [selectedSlice, setSelectedSlice] = useState<number | null>(0);

  const currentRunbook = RUNBOOK_TIMELINE.find((r) => r.step === activeStep) ?? RUNBOOK_TIMELINE[5];

  return (
    <div className="slide-enter">
      <SectionHeader
        kicker="Slide 04 · Replicación y Continuidad (DR)"
        title="3 regiones, regla 3-2-1 y RTO desde 2 horas"
        tagline="Dallas activa, Virginia pasivo tibio (MDR + bucket dual turbo) y Querétaro bóveda inmutable anti-ransomware."
      />

      {/* Topología 3 Regiones */}
      <div className="bento-3">
        <div className="deck-card" style={{ borderTop: '4px solid #1f6e43' }}>
          <span className="badge badge-gcp" style={{ marginBottom: 6 }}>Primaria · Única Escritora</span>
          <h3 style={{ fontSize: 18 }}>Dallas · us-south1</h3>
          <div className="mono" style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '3px 0 8px' }}>10.10.0.0/16 · MED 100</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {['Síncrona multizona', 'Enterprise Plus', 'Bucket Dual', 'Vertex + Looker'].map((c) => (
              <span key={c} className="badge badge-navy">{c}</span>
            ))}
          </div>
        </div>

        <div className="deck-card" style={{ borderTop: '4px solid #f2991d' }}>
          <span className="badge badge-gold" style={{ marginBottom: 6 }}>Contingencia · Pasivo Tibio</span>
          <h3 style={{ fontSize: 18 }}>Virginia · us-east4</h3>
          <div className="mono" style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '3px 0 8px' }}>10.11.0.0/16 · E-3/E-4 Arriba</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {['MDR Forzado (5m)', 'Dual Turbo (15m)', 'Datastream DR', '5/5 Capacidades ✓'].map((c) => (
              <span key={c} className="badge badge-gold">{c}</span>
            ))}
          </div>
        </div>

        <div className="deck-card" style={{ borderTop: '4px solid #475569' }}>
          <span className="badge badge-slate" style={{ marginBottom: 6 }}>Bóveda Aislada · Inmutable</span>
          <h3 style={{ fontSize: 18 }}>Querétaro · México</h3>
          <div className="mono" style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '3px 0 8px' }}>Sin subred · Sin VPN · E-6 PSC</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {['Archive 365 días', 'Bucket Lock', '100 TB Presup.', 'Anti-Ransomware'].map((c) => (
              <span key={c} className="badge badge-slate">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Gráfico Comparativo RTO & RPO (Objetivo vs Diseño vs PoC Simulado) + Why Virginia */}
      <div className="bento-asymmetric">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <RefreshCw size={16} /> RTO y RPO: Objetivo vs. Diseño vs. PoC Simulada
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-navy">Diseño</span>
              <span className="badge badge-gcp">PoC Simulado</span>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {RTO_RPO_CHART.map((row) => {
              const designPct = (row.rtoDesignH / row.rtoObjH) * 100;
              const pocPct = (row.rtoPocH / row.rtoObjH) * 100;
              return (
                <div key={row.name} style={{ background: 'var(--bg-soft)', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                    <strong style={{ fontSize: 13, color: 'var(--vc-cobalt)' }}>{row.name}</strong>
                    <div style={{ display: 'flex', gap: 8, fontSize: 11.5 }}>
                      <span className="badge badge-cyan">RPO: {row.rpoPocLbl} / {row.rpoObjLbl}</span>
                      <span className="badge badge-slate">{row.pattern}</span>
                    </div>
                  </div>
                  {/* Barra de RTO Diseño vs Objetivo */}
                  <div style={{ display: 'grid', gap: 5 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 78px', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Diseño</span>
                      <div className="hbar-track" style={{ height: 8 }}>
                        <div className="hbar-fill" style={{ width: `${designPct}%`, background: '#0f2d6b' }} />
                      </div>
                      <span className="mono" style={{ textAlign: 'right', fontWeight: 700 }}>{row.rtoDesignLbl} / {row.rtoObjLbl}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 78px', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <span style={{ color: 'var(--vc-gcp-green)', fontWeight: 700 }}>PoC Sim.</span>
                      <div className="hbar-track" style={{ height: 8 }}>
                        <div className="hbar-fill" style={{ width: `${pocPct}%`, background: '#1f6e43' }} />
                      </div>
                      <span className="mono" style={{ textAlign: 'right', fontWeight: 700, color: '#1f6e43' }}>{row.rtoPocLbl} / {row.rtoObjLbl}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Por qué Virginia + Costo incremental DR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="deck-card">
            <div className="card-head" style={{ marginBottom: 10 }}>
              <span className="card-head-title">¿Por qué Virginia y no Querétaro en DR?</span>
            </div>
            {[
              'BigQuery MDR (conmutación forzada 5m)',
              'Bucket Dual con Turbo Replication (15m)',
              'Metastore BigLake (Iceberg Silver)',
              'Vertex AI disponible para modelos',
            ].map((cap) => (
              <div
                key={cap}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 0',
                  borderBottom: '1px solid #eef3f9',
                  fontSize: 12,
                }}
              >
                <span style={{ fontWeight: 600 }}>{cap}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="badge badge-danger"><X size={11} /> MX</span>
                  <span className="badge badge-gcp"><Check size={11} /> VA</span>
                </div>
              </div>
            ))}
          </div>

          <div className="deck-card">
            <div className="card-head" style={{ marginBottom: 10 }}>
              <span className="card-head-title">Costo Incremental DR (v3 · TRM 3.500)</span>
              <span className="badge badge-navy">Incluido en Sec. 5</span>
            </div>
            <DonutChart
              slices={DR_INCREMENTAL_V3.map((d) => ({ label: d.label, value: d.usd, color: d.color }))}
              centerValue="$3.204"
              centerLabel="USD/m (11,2M)"
              size={156}
              selectedIndex={selectedSlice}
              onSelect={(idx) => setSelectedSlice(idx)}
            />
          </div>
        </div>
      </div>

      {/* Runbook Interactivo DR-RB-01 */}
      <div className="deck-card dark" style={{ marginBottom: 0 }}>
        <div className="card-head">
          <span className="card-head-title">
            <Clock size={16} color="#38bdf8" /> Runbook Interactivo DR-RB-01 (Pérdida Total de Dallas)
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-cyan">10 Dependencias D-1..D-10 cerradas</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.12)', color: '#e2e8f0' }}>
              <Archive size={11} /> 9 pruebas DR-1..DR-8 + SEC-07
            </span>
          </div>
        </div>

        <div className="pill-row" style={{ marginBottom: 14 }}>
          {RUNBOOK_TIMELINE.map((r) => (
            <button
              key={r.step}
              type="button"
              onClick={() => setActiveStep(r.step)}
              style={{
                border: activeStep === r.step ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.18)',
                background: activeStep === r.step ? 'rgba(56,189,248,0.24)' : 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                padding: '6px 11px',
                borderRadius: 9,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
              }}
            >
              <span className="mono" style={{ color: '#7dd3fc', marginRight: 5 }}>{r.at}</span>
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.07)', padding: '14px 18px', borderRadius: 12 }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: 5 }}>Paso {currentRunbook.step} · Acumulado {currentRunbook.at} h</span>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17 }}>{currentRunbook.label}</div>
            <div style={{ fontSize: 13, color: '#dbeafe', marginTop: 2 }}>{currentRunbook.desc}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#fde68a' }}>
            <ShieldAlert size={16} />
            <span>Plan B: stream activo en Virginia si DR-4 &gt; 5 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

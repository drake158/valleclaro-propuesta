import { useState } from 'react';
import { DonutChart } from '../components/DonutChart';
import { SectionHeader } from '../components/SectionHeader';
import { DR_INCREMENTAL_V3, RTO_RPO_CHART, RUNBOOK_TIMELINE } from '../data/valleclaroData';

export function ResilienceSlide() {
  const [step, setStep] = useState(5);
  const current = RUNBOOK_TIMELINE.find((r) => r.step === step) ?? RUNBOOK_TIMELINE[5];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
          <div key={r.name} className="panel" style={{ borderLeft: `3px solid ${r.col}`, padding: '12px 16px' }}>
            <div className="mono" style={{ fontSize: 10, color: r.col, letterSpacing: '0.1em' }}>{r.role}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--ink)', marginTop: 2 }}>
              {r.name}
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 3 }}>{r.spec}</div>
          </div>
        ))}
      </div>

      <div className="g-60-40">
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>RTO objetivo vs. PoC simulada</span>
            <span>Azul: diseño · Verde: PoC</span>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {RTO_RPO_CHART.map((row) => (
              <div key={row.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                  <span style={{ color: 'var(--ink)' }}>{row.name}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                    RTO {row.rtoPocLbl} / {row.rtoObjLbl} · RPO {row.rpoPocLbl} / {row.rpoObjLbl}
                  </span>
                </div>
                <div style={{ display: 'grid', gap: 3 }}>
                  <div className="bar-track" style={{ height: 5 }}>
                    <div className="bar-fill" style={{ width: `${(row.rtoDesignH / row.rtoObjH) * 100}%`, background: '#0f2d6b' }} />
                  </div>
                  <div className="bar-track" style={{ height: 5 }}>
                    <div className="bar-fill" style={{ width: `${(row.rtoPocH / row.rtoObjH) * 100}%`, background: '#1f6e43' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', paddingTop: 10, borderTop: '1px solid var(--line-hair)' }}>
            Plan B inventario: stream activo en Virginia si DR-4 &gt; 5 min.
          </div>
        </div>

        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>Costo incremental DR</span>
            <span>Incluido en presupuesto</span>
          </div>
          <DonutChart
            slices={DR_INCREMENTAL_V3.map((d) => ({ label: d.label, value: d.usd, color: d.color }))}
            centerValue="$3.204"
            centerLabel="COP 11,2M/m"
            size={146}
          />
          <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', paddingTop: 10, borderTop: '1px solid var(--line-hair)' }}>
            10 dependencias ocultas (D-1..D-10) cerradas · 9 pruebas DR.
          </div>
        </div>
      </div>

      <div className="panel-dark" style={{ padding: '12px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
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

import { useState } from 'react';
import { Check } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { KPIS_INVARIANTS, KPIS_PROGRAM, OKRS_V3 } from '../data/valleclaroData';

type Milestone = 'm6' | 'm12' | 'm18';

export function OkrsKpisSlide() {
  const [milestone, setMilestone] = useState<Milestone>('m18');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader
        kicker="10 · Gobierno y Medición"
        title={
          <>
            <strong>Objetivos (OKRs)</strong> y <strong>KPIs</strong> del programa
          </>
        }
        subtitle="Medidos mensualmente en el tablero FinOps + Seguridad y validados con pruebas SEC/DR."
      />

      {/* 4 OKRs del programa (Sección 5.10.1) */}
      <div className="g-4">
        {OKRS_V3.map((okr) => (
          <div key={okr.id} className="panel" style={{ borderTop: `3px solid ${okr.color}`, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <strong className="mono" style={{ fontSize: 12, color: okr.color }}>{okr.id}</strong>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>3 KRs</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 600, color: 'var(--vc-cobalt)', marginBottom: 8, lineHeight: 1.25 }}>
              {okr.title}
            </div>
            <div style={{ display: 'grid', gap: 5 }}>
              {okr.krs.map((kr) => (
                <div key={kr} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 11.5, color: 'var(--ink-mid)' }}>
                  <Check size={12} color={okr.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{kr}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* KPIs evolutivos por hito + Invariantes de seguridad/operación (Sección 5.10.2) */}
      <div className="g-60-40">
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>KPIs evolutivos por fase (clic en hito)</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {(
                [
                  { id: 'm6', lbl: 'Mes 6' },
                  { id: 'm12', lbl: 'Mes 12' },
                  { id: 'm18', lbl: 'Mes 18' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`chip-btn ${milestone === tab.id ? 'active' : ''}`}
                  style={{ padding: '3px 9px', fontSize: 11 }}
                  onClick={() => setMilestone(tab.id)}
                >
                  {tab.lbl}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 9 }}>
            {KPIS_PROGRAM.map((kpi) => {
              const val = milestone === 'm6' ? kpi.m6 : milestone === 'm12' ? kpi.m12 : kpi.m18;
              const pct = milestone === 'm6' ? kpi.pct6 : milestone === 'm12' ? kpi.pct12 : kpi.pct18;
              return (
                <div key={kpi.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: 'var(--ink)' }}>
                      {kpi.name} <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-soft)' }}>· {kpi.owner}</span>
                    </span>
                    <strong className="mono" style={{ color: kpi.color }}>{val}</strong>
                  </div>
                  <div className="bar-track" style={{ height: 7 }}>
                    <div className="bar-fill" style={{ width: `${pct}%`, background: kpi.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel-dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
          <div className="panel-label" style={{ color: '#93c5fd', marginBottom: 0 }}>
            <span>Metas invariantes (M6 · M12 · M18)</span>
            <span>Tablero 5.5</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {KPIS_INVARIANTS.map((inv) => (
              <div key={inv.label} style={{ borderLeft: '2px solid #0ea5e9', paddingLeft: 10 }}>
                <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: '#ffffff' }}>{inv.value}</div>
                <div style={{ fontSize: 11.5, color: '#cbd5e1', marginTop: 1 }}>{inv.label}</div>
                <div style={{ fontSize: 10, color: '#7dd3fc' }}>{inv.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 11.5, color: '#94a3b8', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            Revisión mensual con Finanzas y Seguridad · recalibración trimestral contra factura real.
          </div>
        </div>
      </div>
    </div>
  );
}

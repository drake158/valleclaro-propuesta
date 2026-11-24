import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { GANTT_PHASES, MONTHLY_V3_SERIES, POC_SPRINTS } from '../data/valleclaroData';

const STACK_COL = {
  storage: '#0f2d6b',
  proc: '#0ea5e9',
  srv: '#f2991d',
  net: '#0078d4',
  sec: '#1f6e43',
  obs: '#7c3aed',
  res: '#94a3b8',
};

export function FinancePocSlide() {
  const [month, setMonth] = useState(18);
  const [retiredS, setRetiredS] = useState(85.3);

  const pt = MONTHLY_V3_SERIES.find((x) => x.m === month) ?? MONTHLY_V3_SERIES[17];
  const consolidated = Number((210 + 85.3 - retiredS).toFixed(1));
  const ok210 = consolidated <= 210.05;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SectionHeader
        kicker="09 · Finanzas, Plan y PoC"
        title={
          <>
            <strong>COP 879,95M</strong> Año 1 · PoC 4 semanas (<strong>COP 20,7M</strong>)
          </>
        }
        subtitle="Modelo conciliado a 83 TB + Virginia (TRM 3.500) · 3 fases sin contrataciones."
      />

      <div className="g-4">
        <div className="panel" style={{ borderTop: '2px solid #1f6e43', padding: '11px 14px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>AÑO 1 (TECHO 1.800M)</div>
          <div className="metric-lg" style={{ color: '#1f6e43', marginTop: 2, fontWeight: 600 }}>COP 879,9M</div>
        </div>
        <div className="panel" style={{ borderTop: '2px solid #0ea5e9', padding: '11px 14px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>MENSUAL MES 18</div>
          <div className="metric-lg" style={{ marginTop: 2, fontWeight: 600 }}>COP 85,3M</div>
        </div>
        <div className="panel" style={{ borderTop: '2px solid #0f2d6b', padding: '11px 14px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>TOTAL 18 MESES</div>
          <div className="metric-lg" style={{ marginTop: 2, fontWeight: 600 }}>COP 1.381M</div>
        </div>
        <div className="panel" style={{ borderTop: '2px solid #f2991d', padding: '11px 14px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>POC 4 SEM. (ANEXO A)</div>
          <div className="metric-lg" style={{ color: '#9a5700', marginTop: 2, fontWeight: 600 }}>COP 20,7M</div>
        </div>
      </div>

      <div className="g-60-40">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 16px' }}>
            <div className="panel-label" style={{ marginBottom: 2 }}>
              <span>Curva mensual recurrente (M1–M18 · COP M)</span>
              <span className="mono" style={{ color: 'var(--vc-cobalt)' }}>
                M{pt.m}: {pt.total.toFixed(1).replace('.', ',')}M
              </span>
            </div>

            <div className="m-chart">
              {MONTHLY_V3_SERIES.map((m) => {
                const s = 1.65;
                const sel = m.m === month;
                return (
                  <div
                    key={m.m}
                    className={`m-col ${m.m === 7 || m.m === 13 ? 'div' : ''} ${sel ? 'sel' : ''}`}
                    onClick={() => setMonth(m.m)}
                  >
                    {(m.m === 6 || m.m === 12 || m.m === 18 || sel) && (
                      <span className="m-val">{m.total.toFixed(0)}</span>
                    )}
                    <div className="m-stack">
                      <div style={{ height: m.storage * s, background: STACK_COL.storage }} />
                      <div style={{ height: m.proc * s, background: STACK_COL.proc }} />
                      <div style={{ height: m.srv * s, background: STACK_COL.srv }} />
                      <div style={{ height: m.net * s, background: STACK_COL.net }} />
                      <div style={{ height: m.sec * s, background: STACK_COL.sec }} />
                      <div style={{ height: m.obs * s, background: STACK_COL.obs }} />
                      <div style={{ height: m.res * s, background: STACK_COL.res }} />
                    </div>
                    <span className="m-lbl">{m.m}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="panel-dark" style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span className="mono" style={{ fontSize: 10.5, color: '#93c5fd' }}>
                EQUILIBRIO 210M · GASTO RETIRADO S = {retiredS.toFixed(1)}M
              </span>
              <span className="mono" style={{ fontSize: 15.5, color: ok210 ? '#4ade80' : '#f87171' }}>
                Consolidado: {consolidated.toFixed(1)}M {ok210 ? '✓' : '↑'}
              </span>
            </div>
            <input
              type="range"
              className="vc-slider"
              min={0}
              max={105}
              step={0.5}
              value={retiredS}
              onChange={(e) => setRetiredS(Number(e.target.value))}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="panel" style={{ padding: '14px 16px' }}>
            <div className="panel-label" style={{ marginBottom: 8 }}>
              <span>Plan 18 meses · 14 personas</span>
              <span>M6 · M12 · M18</span>
            </div>
            <div style={{ display: 'grid', gap: 7 }}>
              {GANTT_PHASES.slice(0, 5).map((g) => (
                <div key={g.label} style={{ display: 'grid', gridTemplateColumns: '1fr 110px', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11.5, color: 'var(--ink-mid)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {g.label}
                  </span>
                  <div className="bar-track" style={{ height: 8 }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: `${(g.start / 18) * 100}%`,
                        width: `${((g.end - g.start) / 18) * 100}%`,
                        top: 0,
                        bottom: 0,
                        background: g.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-tint" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 16px' }}>
            <div className="panel-label" style={{ marginBottom: 0 }}>
              <span>Anexo A · PoC Simulada</span>
              <span className="mono">100k reg · 280 h</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {POC_SPRINTS.map((sp) => (
                <div key={sp.week} style={{ background: '#ffffff', border: '1px solid var(--line-hair)', padding: '6px 7px' }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--vc-cyan)' }}>{sp.week}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink)' }}>{sp.title}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--ink-mid)', paddingTop: 8, borderTop: '1px solid var(--line-hair)' }}>
              <span>97,5% válidos · 96/100 ≤ 5m</span>
              <span className="mono" style={{ color: 'var(--vc-gcp)' }}>Baja 12m · DR-1 24m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

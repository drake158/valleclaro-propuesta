import { useState } from 'react';
import { Calendar, CheckCircle2, DollarSign, Sliders, Target, Users } from 'lucide-react';
import { DonutChart } from '../components/DonutChart';
import { SectionHeader } from '../components/SectionHeader';
import {
  GANTT_PHASES,
  M18_DONUT_SLICES,
  MONTHLY_V3_SERIES,
  OKRS_V3,
  SENSITIVITY_V3,
  TEAM_14,
} from '../data/valleclaroData';

const STACK_COLORS = {
  storage: '#0f2d6b',
  proc: '#0ea5e9',
  srv: '#f2991d',
  net: '#0078d4',
  sec: '#1f6e43',
  obs: '#7c3aed',
  res: '#94a3b8',
};

export function CostosTab() {
  const [selectedMonth, setSelectedMonth] = useState(18);
  const [selectedDonut, setSelectedDonut] = useState<number | null>(0);
  const [retiredS, setRetiredS] = useState<number>(85.3);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const activeM = MONTHLY_V3_SERIES.find((x) => x.m === selectedMonth) ?? MONTHLY_V3_SERIES[17];
  const sensDelta = SENSITIVITY_V3.reduce((acc, s) => (toggles[s.id] ? acc + s.deltaM18 : acc), 0);
  const adjustedM18 = Number((85.3 + sensDelta).toFixed(2));
  const consolidatedTotal = Number((210 + adjustedM18 - retiredS).toFixed(2));
  const withinLimit = consolidatedTotal <= 210.01;

  return (
    <div className="slide-enter">
      <SectionHeader
        kicker="Slide 05 · Finanzas Conciliadas, OKRs y Cronograma (v3)"
        title="COP 879,95M Año 1 · COP 85,30M/mes al M18"
        tagline="Modelo adaptado a 83 TB únicos (+4,3 TB/mes) y DR en Virginia; 100 % con el equipo actual de 14 personas."
      />

      {/* 4 KPIs Financieros Conciliados (v3) */}
      <div className="bento-4">
        <div className="kpi-tile green">
          <div className="kpi-tile-lbl">Presupuesto Año 1</div>
          <div className="kpi-tile-val">COP 879,95M</div>
          <div className="kpi-tile-sub">Techo 1.800M → margen 920M</div>
        </div>
        <div className="kpi-tile cyan">
          <div className="kpi-tile-lbl">Mensual Mes 18</div>
          <div className="kpi-tile-val">COP 85,30M</div>
          <div className="kpi-tile-sub">M6: 68,0M · M12: 79,2M ($22,6k)</div>
        </div>
        <div className="kpi-tile">
          <div className="kpi-tile-lbl">Total 18 Meses</div>
          <div className="kpi-tile-val">COP 1.381,1M</div>
          <div className="kpi-tile-sub">1.229,7M rec. + 151,4M únicos</div>
        </div>
        <div className="kpi-tile gold">
          <div className="kpi-tile-lbl">Eficiencia Mes 18</div>
          <div className="kpi-tile-val">COP 0,62M/TB</div>
          <div className="kpi-tile-sub">COP 74.176 / empleado · 138,6 TB</div>
        </div>
      </div>

      {/* Gráfico Mensual M1–M18 + Donut Composición Mes 18 */}
      <div className="bento-asymmetric">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <DollarSign size={16} /> Curva Mensual Recurrente (M1–M18 · COP M)
            </span>
            <span className="badge badge-navy mono">
              Mes {activeM.m} (F{activeM.phase}): COP {activeM.total.toFixed(1).replace('.', ',')}M
            </span>
          </div>

          <div className="stacked-chart">
            {MONTHLY_V3_SERIES.map((pt) => {
              const scale = 2.05; // 85.3 -> ~175px
              const isSel = pt.m === selectedMonth;
              return (
                <div
                  key={pt.m}
                  className={`bar-col ${pt.m === 7 || pt.m === 13 ? 'divider' : ''} ${isSel ? 'selected' : ''}`}
                  onClick={() => setSelectedMonth(pt.m)}
                  title={`Mes ${pt.m}: COP ${pt.total.toFixed(1)}M`}
                >
                  {(pt.m === 6 || pt.m === 12 || pt.m === 18 || isSel) && (
                    <span className="bar-val">{pt.total.toFixed(0)}</span>
                  )}
                  <div className="bar-stack">
                    <div style={{ height: pt.storage * scale, background: STACK_COLORS.storage }} />
                    <div style={{ height: pt.proc * scale, background: STACK_COLORS.proc }} />
                    <div style={{ height: pt.srv * scale, background: STACK_COLORS.srv }} />
                    <div style={{ height: pt.net * scale, background: STACK_COLORS.net }} />
                    <div style={{ height: pt.sec * scale, background: STACK_COLORS.sec }} />
                    <div style={{ height: pt.obs * scale, background: STACK_COLORS.obs }} />
                    <div style={{ height: pt.res * scale, background: STACK_COLORS.res }} />
                  </div>
                  <span className="bar-lbl">{pt.m}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10, fontSize: 11.5, color: 'var(--text-muted)' }}>
            <span><strong>M{activeM.m}:</strong> Proc. {activeM.proc.toFixed(1)}M</span>
            <span>· Alm. {activeM.storage.toFixed(1)}M</span>
            <span>· Srv. {activeM.srv.toFixed(1)}M</span>
            <span>· Red {activeM.net.toFixed(1)}M</span>
            <span>· Seg. {activeM.sec.toFixed(1)}M</span>
            <span>· Res. 15% {activeM.res.toFixed(1)}M</span>
          </div>
        </div>

        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">Composición Mes 18 (COP 85,30M)</span>
          </div>
          <DonutChart
            slices={M18_DONUT_SLICES}
            centerValue="85,3M"
            centerLabel="COP / mes"
            size={172}
            selectedIndex={selectedDonut}
            onSelect={(idx) => setSelectedDonut(idx)}
          />
          {selectedDonut !== null && M18_DONUT_SLICES[selectedDonut] && (
            <div style={{ marginTop: 10, padding: '8px 11px', borderRadius: 9, background: 'var(--bg-soft)', fontSize: 12, color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--vc-cobalt)' }}>
                {M18_DONUT_SLICES[selectedDonut].label} (COP {M18_DONUT_SLICES[selectedDonut].value.toFixed(2).replace('.', ',')}M):
              </strong>{' '}
              {M18_DONUT_SLICES[selectedDonut].detail}
            </div>
          )}
        </div>
      </div>

      {/* Simulador Interactivo: Equilibrio Límite 210M + Sensibilidad */}
      <div className="deck-card dark" style={{ marginBottom: 16 }}>
        <div className="card-head">
          <span className="card-head-title">
            <Sliders size={16} color="#38bdf8" /> Simulador Límite Consolidado 3 Nubes (Meta ≤ COP 210M / mes)
          </span>
          <span
            className="badge"
            style={{
              background: withinLimit ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.28)',
              color: withinLimit ? '#86efac' : '#fca5a5',
            }}
          >
            {withinLimit ? 'Cumple ≤ 210M ✓' : `Excede por +${(consolidatedTotal - 210).toFixed(1)}M`}
          </span>
        </div>

        <div className="bento-2" style={{ marginBottom: 0, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
              <span>Gasto previo retirado/sustituido (<strong>S</strong>):</span>
              <strong className="mono" style={{ color: '#38bdf8' }}>COP {retiredS.toFixed(1).replace('.', ',')}M / mes</strong>
            </div>
            <input
              type="range"
              className="vc-slider"
              min={0}
              max={110}
              step={0.5}
              value={retiredS}
              onChange={(e) => setRetiredS(Number(e.target.value))}
              style={{ marginBottom: 10 }}
            />
            <div className="pill-row">
              {[
                { lbl: 'S = 0 (sin bajas)', v: 0 },
                { lbl: 'S = 38M (solo egreso)', v: 38 },
                { lbl: 'S = 85,3M (equilibrio)', v: 85.3 },
              ].map((preset) => (
                <button
                  key={preset.lbl}
                  type="button"
                  className="btn-action"
                  onClick={() => setRetiredS(preset.v)}
                >
                  {preset.lbl}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', background: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700 }}>
                  Consolidado M18 (210 + {adjustedM18.toFixed(1)} − {retiredS.toFixed(1)})
                </div>
                <div style={{ fontSize: 12, color: '#cbd5e1' }}>
                  Máx. gasto previo permitido: <strong>COP 124,7M</strong>
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 30,
                  fontWeight: 800,
                  color: withinLimit ? '#4ade80' : '#f87171',
                }}
                className="num"
              >
                {consolidatedTotal.toFixed(1).replace('.', ',')}M
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {SENSITIVITY_V3.map((s) => {
                const on = !!toggles[s.id];
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setToggles((p) => ({ ...p, [s.id]: !p[s.id] }))}
                    style={{
                      border: on ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                      background: on ? 'rgba(56,189,248,0.22)' : 'rgba(255,255,255,0.06)',
                      color: '#ffffff',
                      padding: '5px 10px',
                      borderRadius: 8,
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {s.label} ({s.deltaM18 > 0 ? `+${s.deltaM18}` : s.deltaM18}M)
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Gantt Compacto + Equipo de 14 Personas */}
      <div className="bento-asymmetric">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <Calendar size={16} /> Hoja de Ruta 18 Meses (3 Fases)
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-cyan">F1 Piloto M6</span>
              <span className="badge badge-gcp">F2 Exp. M12</span>
              <span className="badge badge-navy">F3 Total M18</span>
            </div>
          </div>

          {GANTT_PHASES.map((t) => (
            <div className="gantt-row" key={t.label}>
              <div className="gantt-label">{t.label}</div>
              <div className="gantt-track">
                <div
                  className="gantt-bar"
                  style={{
                    left: `${(t.start / 18) * 100}%`,
                    width: `${((t.end - t.start) / 18) * 100}%`,
                    background: t.color,
                  }}
                >
                  M{t.start + 1}–{t.end}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <Users size={16} /> Equipo Actual (14 TI · 0 Contrataciones)
            </span>
          </div>
          <DonutChart
            slices={TEAM_14.map((t) => ({ label: t.area, value: t.count, color: t.color }))}
            centerValue="14 TI"
            centerLabel="Guardia 8 pers."
            size={152}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            <span className="badge badge-navy">109 p-mes (55% / 45% / 30%)</span>
            <span className="badge badge-gcp">FinOps ≥ 95% etiquetado</span>
            <span className="badge badge-gold">P1 ≤ 15m · P2 ≤ 30m</span>
          </div>
        </div>
      </div>

      {/* 4 OKRs del Programa (Nueva Sección 5.10 en v3) */}
      <div className="bento-4" style={{ marginBottom: 0 }}>
        {OKRS_V3.map((okr) => (
          <div key={okr.id} className="deck-card" style={{ borderTop: `4px solid ${okr.color}`, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <Target size={15} color={okr.color} />
              <span className="mono" style={{ fontWeight: 800, color: okr.color }}>{okr.id}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13.5, color: 'var(--vc-cobalt)', marginBottom: 8 }}>
              {okr.title}
            </div>
            <div style={{ display: 'grid', gap: 5 }}>
              {okr.krs.map((kr) => (
                <div key={kr} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 11.8, color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={13} color={okr.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{kr}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

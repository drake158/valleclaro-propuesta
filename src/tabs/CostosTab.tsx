import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  DollarSign,
  Sliders,
  Tags,
  Users,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import {
  BUDGET_18M,
  COST_COMPONENTS_TABLE,
  COST_RISKS,
  FINOPS_ALERTS,
  FINOPS_TAGS,
  GANTT_TASKS,
  KEY_REFERENCES,
  MONTHLY_COST_SERIES,
  PHASES_SUMMARY,
  RACI_MATRIX,
  SENSITIVITY_SCENARIOS,
  TEAM_ROLES,
} from '../data/valleclaroData';

const STACK_COLORS = {
  storage: '#1d6fa5',
  processing: '#2e6f56',
  network: '#b85d19',
  security: '#163560',
  obs: '#b3861e',
  contingency: '#64748b',
};

export function CostosTab() {
  const [selectedMonth, setSelectedMonth] = useState<number>(18);
  const [activeScenarios, setActiveScenarios] = useState<Record<string, boolean>>({});
  const [showRefs, setShowRefs] = useState(false);

  const monthDatum =
    MONTHLY_COST_SERIES.find((m) => m.month === selectedMonth) ?? MONTHLY_COST_SERIES[17];

  const toggleScenario = (id: string) => {
    setActiveScenarios((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const simDeltaY1 = SENSITIVITY_SCENARIOS.reduce(
    (sum, s) => (activeScenarios[s.id] ? sum + s.deltaY1 : sum),
    0
  );
  const simDeltaM18 = SENSITIVITY_SCENARIOS.reduce(
    (sum, s) => (activeScenarios[s.id] ? sum + s.deltaM18 : sum),
    0
  );

  const simulatedY1 = 466.5 + simDeltaY1;
  const simulatedM18 = 37.1 + simDeltaM18;

  return (
    <div className="tab-panel">
      <SectionHeader
        eyebrow="Sección 5 · Viabilidad Económica, Gobierno FinOps, Operación y Plan"
        title="5. Costos, FinOps, Operación y Cronograma"
        description="Modelo financiero preliminar (TRM 3.500 COP/USD), análisis de sensibilidad, tablero FinOps, observabilidad, redistribución del equipo de 14 personas y hoja de ruta en 3 fases a 18 meses."
        pagesLabel="Páginas 30–42 del PDF"
      />

      {/* Alerta ejecutiva de conciliación */}
      <div className="callout warn" style={{ marginTop: 0 }}>
        <div className="callout-icon">
          <AlertTriangle size={20} color="#b46900" />
        </div>
        <div>
          <div className="callout-title">Conciliación Económica Requerida Antes de la Expansión (Fase 2)</div>
          <div className="callout-body">
            Las cifras de esta sección usan el escenario preliminar de planeación (11→20 TiB, TRM 3.500 COP/USD, Coldline
            y BigQuery bajo demanda). Como advierte el Resumen Ejecutivo, aún debe conciliarse con los{' '}
            <strong>83 TB únicos</strong> (Sec. 2) y el costo incremental de <strong>resiliencia Enterprise Plus / TRM 4.000</strong>{' '}
            (Sec. 4) para demostrar cumplimiento del límite de <strong>COP 1.800M en Año 1</strong> y la meta de{' '}
            <strong>COP 210M/mes consolidados</strong> entre las tres nubes al mes 18.
          </div>
        </div>
      </div>

      {/* KPIs financieros */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">
            <DollarSign size={14} /> Recurrente Mes 6 / 12 / 18
          </div>
          <div className="kpi-value">COP 28,8 · 36,1 · 37,1M</div>
          <div className="kpi-sub">Mes 12 = USD 10.303/mes (TRM 3.500 COP/USD)</div>
        </div>
        <div className="kpi-card cyan">
          <div className="kpi-label">
            <BarChart3 size={14} /> Presupuesto Año 1
          </div>
          <div className="kpi-value">COP 466,5M</div>
          <div className="kpi-sub">315,1M recurrentes + 151,4M inversiones únicas</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">
            <CheckCircle2 size={14} /> Total 18 Meses
          </div>
          <div className="kpi-value">COP 687,4M</div>
          <div className="kpi-sub">≈ 20 % de la sanción máx. Ley 1581 (COP 3.502M)</div>
        </div>
        <div className="kpi-card gold">
          <div className="kpi-label">
            <Users size={14} /> Esfuerzo Interno
          </div>
          <div className="kpi-value">109 p-mes · 14 TI</div>
          <div className="kpi-sub">Sin contratar personal (55 % F1 · 45 % F2 · 30 % F3)</div>
        </div>
      </div>

      {/* Gráfico interactivo Mes 1–18 (fiel a Figura 5.1) */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">5.3</span> Evolución del Costo Mensual Recurrente por Categoría y Fase (COP Millones)
        </h2>

        <div className="chart-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Haz clic en cualquier mes para inspeccionar su composición exacta (<strong>Mes {monthDatum.month}</strong> ·
              Fase {monthDatum.phase}):
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12.5 }}>
              <span className="badge badge-navy">
                Total Mes {monthDatum.month}: <strong>COP {monthDatum.total.toFixed(1).replace('.', ',')}M</strong>
              </span>
              <span className="badge badge-gcp">Proc.: {monthDatum.processing.toFixed(1).replace('.', ',')}M</span>
              <span className="badge badge-cyan">Seg.: {monthDatum.security.toFixed(1).replace('.', ',')}M</span>
              <span className="badge badge-gold">Obs.: {monthDatum.obs.toFixed(1).replace('.', ',')}M</span>
            </div>
          </div>

          <div className="stacked-chart" role="img" aria-label="Gráfico de barras apiladas del costo mensual recurrente del mes 1 al mes 18">
            {MONTHLY_COST_SERIES.map((m) => {
              const scalePx = 4.9; // 40M -> ~196px
              const isSelected = m.month === selectedMonth;
              return (
                <div
                  key={m.month}
                  className={`bar-col ${m.month === 7 || m.month === 13 ? 'phase-divider' : ''} ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedMonth(m.month)}
                  title={`Mes ${m.month} (Fase ${m.phase}): COP ${m.total.toFixed(1)}M`}
                >
                  {(m.month === 6 || m.month === 12 || m.month === 18 || isSelected) && (
                    <span className="bar-top-val">{m.total.toFixed(1).replace('.', ',')}</span>
                  )}
                  <div className="bar-stack">
                    <div style={{ height: m.storage * scalePx, background: STACK_COLORS.storage }} />
                    <div style={{ height: m.processing * scalePx, background: STACK_COLORS.processing }} />
                    <div style={{ height: m.network * scalePx, background: STACK_COLORS.network }} />
                    <div style={{ height: m.security * scalePx, background: STACK_COLORS.security }} />
                    <div style={{ height: m.obs * scalePx, background: STACK_COLORS.obs }} />
                    <div style={{ height: m.contingency * scalePx, background: STACK_COLORS.contingency }} />
                  </div>
                  <span className="bar-month-lbl">{m.month}</span>
                </div>
              );
            })}
          </div>

          <div className="legend-row">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: STACK_COLORS.storage }} /> Almacenamiento (5 %)
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: STACK_COLORS.processing }} /> Procesamiento (56 %)
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: STACK_COLORS.network }} /> Transferencia y red
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: STACK_COLORS.security }} /> Seguridad e identidad (13 %)
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: STACK_COLORS.obs }} /> Observabilidad
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: STACK_COLORS.contingency }} /> Contingencia (15 %)
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 10 }}>
            <strong>Lectura clave:</strong> el procesamiento concentra el <strong>56 %</strong> del gasto recurrente (Looker
            10,5M + CDC 4,2M + BigQuery 3,0M al mes 18), mientras el almacenamiento representa solo el <strong>5 %</strong>.
            El presupuesto se controla en consultas, licencias de BI y logs, no en terabytes guardados.
          </p>
        </div>
      </div>

      {/* 5.3 & 5.4 Tablas presupuestales + Simulador de sensibilidad */}
      <div className="subsection-block">
        <div className="grid-2">
          <div>
            <h2 className="subsection-title">
              <span className="subsection-num">5.4</span> Presupuesto Año 1 y Proyección 18 Meses (COP M)
            </h2>
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th style={{ textAlign: 'right' }}>Año 1</th>
                    <th style={{ textAlign: 'right' }}>M 13–18</th>
                    <th style={{ textAlign: 'right' }}>Total 18 m</th>
                  </tr>
                </thead>
                <tbody>
                  {BUDGET_18M.map((b) => (
                    <tr
                      key={b.item}
                      className={b.type === 'total' ? 'row-total' : b.type === 'sub' ? 'row-highlight' : ''}
                    >
                      <td className={b.type === 'rec' || b.type === 'once' ? '' : 'cell-strong'}>{b.item}</td>
                      <td className="cell-num">{b.y1.toFixed(1).replace('.', ',')}</td>
                      <td className="cell-num">{b.m13_18.toFixed(1).replace('.', ',')}</td>
                      <td className="cell-num">{b.total.toFixed(1).replace('.', ',')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h2 className="subsection-title">
                <span className="subsection-num">5.3</span> Resumen por Componente (M6 / M12 / M18)
              </h2>
              <div className="table-wrap">
                <table className="vc-table">
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th style={{ textAlign: 'right' }}>M6</th>
                      <th style={{ textAlign: 'right' }}>M12</th>
                      <th style={{ textAlign: 'right' }}>M18</th>
                      <th style={{ textAlign: 'right' }}>M12 USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COST_COMPONENTS_TABLE.map((c) => (
                      <tr key={c.name} className={c.isTotal ? 'row-total' : ''}>
                        <td className="cell-strong">{c.name}</td>
                        <td className="cell-num">{c.m6}</td>
                        <td className="cell-num">{c.m12}</td>
                        <td className="cell-num">{c.m18}</td>
                        <td className="cell-num">{c.usd12}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Simulador interactivo de sensibilidad 5.4.1 */}
            <div className="card" style={{ background: 'var(--bg-tint)', borderColor: 'var(--border-medium)' }}>
              <div className="card-title">
                <Sliders size={17} color="#0f2d6b" /> 5.4.1 Simulador Interactivo de Sensibilidad
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10 }}>
                Activa o combina escenarios para ver su efecto en el presupuesto del Año 1 y en la cuota mensual del mes 18:
              </p>
              <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                {SENSITIVITY_SCENARIOS.map((s) => {
                  const checked = !!activeScenarios[s.id];
                  return (
                    <label
                      key={s.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: checked ? '#ffffff' : 'rgba(255,255,255,0.65)',
                        border: checked ? '1.5px solid var(--vc-cobalt)' : '1px solid var(--border-light)',
                        cursor: 'pointer',
                        fontSize: 13,
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleScenario(s.id)} />
                        <strong>{s.label}</strong>
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontWeight: 700,
                          color: s.deltaY1 < 0 ? 'var(--vc-gcp-green)' : 'var(--vc-danger)',
                        }}
                      >
                        {s.deltaY1 > 0 ? `+${s.deltaY1}` : s.deltaY1}M Año 1
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="grid-2" style={{ gap: 10 }}>
                <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Año 1 simulado
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 800, color: 'var(--vc-cobalt)' }}>
                    COP {simulatedY1.toFixed(1).replace('.', ',')}M
                  </div>
                </div>
                <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Mensual Mes 18 simulado
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 800, color: 'var(--vc-cobalt)' }}>
                    COP {simulatedM18.toFixed(1).replace('.', ',')}M
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5.5 Tablero FinOps y 5.6 Observabilidad */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">5.5 · 5.6</span> Gobierno FinOps (Etiquetas y Alertas) y Observabilidad
        </h2>
        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div className="card">
            <div className="card-title">
              <Tags size={17} color="#0f2d6b" /> 6 Etiquetas Obligatorias (Meta ≥ 95 % etiquetado)
            </div>
            <div className="table-wrap" style={{ marginTop: 8 }}>
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Etiqueta</th>
                    <th>Valores / Propósito</th>
                  </tr>
                </thead>
                <tbody>
                  {FINOPS_TAGS.map((t) => (
                    <tr key={t.tag}>
                      <td className="mono cell-strong">{t.tag}</td>
                      <td>
                        <div className="mono" style={{ fontSize: 11.5, color: 'var(--vc-royal)' }}>{t.values}</div>
                        <div>{t.purpose}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <Activity size={17} color="#0f2d6b" /> Observabilidad (Detección ≤ 5 min · Diagnóstico ≤ 15 min)
            </div>
            <ul className="clean-list" style={{ marginBottom: 12 }}>
              <li><strong>Métricas (13 meses):</strong> Cloud Monitoring + métricas AWS/Azure (retraso CDC, bytes, réplica us-east4).</li>
              <li><strong>Registros (90 d / 365 d):</strong> Cloud Logging en buckets regionales reutilizando esquema 3.7 (no pagar doble).</li>
              <li><strong>Trazas (30 días):</strong> Cloud Trace con OpenTelemetry (CDC → transformación → vista → Looker).</li>
              <li><strong>Alertas (12 meses historial):</strong> umbrales con dueño, runbook y ticket automático.</li>
            </ul>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ padding: '7px 10px', borderRadius: 7, background: 'var(--vc-danger-soft)', fontSize: 12.5 }}>
                <strong style={{ color: 'var(--vc-danger)' }}>P1 (24×7):</strong> reconocer ≤ 15 min · mitigar ≤ 1 h (ruptura RPO, IAM-01).
              </div>
              <div style={{ padding: '7px 10px', borderRadius: 7, background: 'var(--vc-gold-soft)', fontSize: 12.5 }}>
                <strong style={{ color: 'var(--vc-gold-dark)' }}>P2 (hábil):</strong> reconocer ≤ 30 min · resolver ≤ 4 h (Gold, huérfanas, sin logs 60 m).
              </div>
              <div style={{ padding: '7px 10px', borderRadius: 7, background: 'var(--bg-tint)', fontSize: 12.5 }}>
                <strong style={{ color: 'var(--vc-cobalt)' }}>P3 (estándar):</strong> reconocer ≤ 4 h · resolver ≤ 2 días (errores BI &gt; 2 %).
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Alerta FinOps</th>
                <th>Umbral</th>
                <th>Acción obligatoria</th>
                <th>Responsable</th>
              </tr>
            </thead>
            <tbody>
              {FINOPS_ALERTS.map((a) => (
                <tr key={a.alert}>
                  <td className="cell-strong">{a.alert}</td>
                  <td className="mono">{a.threshold}</td>
                  <td>{a.action}</td>
                  <td><span className="badge badge-navy">{a.owner}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5.7 Equipo de 14 personas y Matriz RACI */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">5.7</span> Modelo Operativo: Equipo de 14 Personas y Matriz RACI
        </h2>
        <div className="grid-2">
          <div className="table-wrap">
            <table className="vc-table">
              <thead>
                <tr>
                  <th>Rol redistribuido</th>
                  <th style={{ textAlign: 'right' }}>Pers.</th>
                  <th>Responsabilidades</th>
                  <th>Guardia</th>
                </tr>
              </thead>
              <tbody>
                {TEAM_ROLES.map((r) => (
                  <tr key={r.role}>
                    <td className="cell-strong">{r.role}</td>
                    <td className="cell-num">{r.count}</td>
                    <td>{r.duty}</td>
                    <td>{r.oncall}</td>
                  </tr>
                ))}
                <tr className="row-total">
                  <td>Total equipo (sin contrataciones)</td>
                  <td className="cell-num">14</td>
                  <td colSpan={2}>Guardia rotativa semanal de 8 personas (1 semana cada 8) + suplente por rol</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-wrap">
            <table className="vc-table">
              <thead>
                <tr>
                  <th>Proceso clave (RACI)</th>
                  <th>Líd.</th>
                  <th>Ing.</th>
                  <th>SRE</th>
                  <th>Sec.</th>
                  <th>Id.</th>
                  <th>Fin.</th>
                  <th>Gob.</th>
                </tr>
              </thead>
              <tbody>
                {RACI_MATRIX.map((r) => (
                  <tr key={r.process}>
                    <td className="cell-strong">{r.process}</td>
                    {[r.lider, r.ing, r.sre, r.secops, r.idnet, r.finops, r.gob].map((val, idx) => (
                      <td key={idx} style={{ textAlign: 'center' }}>
                        <span
                          className={`badge ${
                            val === 'R'
                              ? 'badge-gcp'
                              : val === 'A'
                              ? 'badge-navy'
                              : val === 'C'
                              ? 'badge-gold'
                              : 'badge-slate'
                          }`}
                        >
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5.8 Cronograma Visual Gantt 18 meses + 3 fases */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">5.8</span> Cronograma por Fases (18 Meses: Piloto M6 · Expansión M12 · Cobertura M18)
        </h2>

        <div className="chart-container" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12, fontWeight: 700, color: 'var(--vc-cobalt)' }}>
            <span>
              <Calendar size={14} style={{ verticalAlign: '-2px', marginRight: 5 }} /> Diagrama Gantt del Despliegue
            </span>
            <div style={{ display: 'flex', gap: 14 }}>
              <span>Fase 1: M1–6</span>
              <span>Fase 2: M7–12</span>
              <span>Fase 3: M13–18</span>
            </div>
          </div>

          {GANTT_TASKS.map((t) => {
            const leftPct = (t.start / 18) * 100;
            const widthPct = ((t.end - t.start) / 18) * 100;
            return (
              <div className="gantt-row" key={t.label}>
                <div className="gantt-label">{t.label}</div>
                <div className="gantt-track">
                  <div
                    className="gantt-bar"
                    style={{ left: `${leftPct}%`, width: `${widthPct}%`, background: t.color }}
                    title={`${t.label} (Mes ${t.start + 1} a Mes ${t.end})`}
                  >
                    M{t.start + 1}–{t.end}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid-3">
          {PHASES_SUMMARY.map((p, idx) => (
            <div
              key={p.phase}
              className="card"
              style={{
                borderTop: `4px solid ${idx === 0 ? 'var(--vc-cyan)' : idx === 1 ? 'var(--vc-gcp-green)' : 'var(--vc-cobalt)'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span className="badge badge-navy">{p.months}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>Hito M{(idx + 1) * 6}</span>
              </div>
              <h3 style={{ fontSize: 17, marginBottom: 8 }}>{p.phase}</h3>
              <p className="card-text" style={{ marginBottom: 8 }}>
                <strong>Entregables:</strong> {p.deliverables}
              </p>
              <p className="card-text" style={{ marginBottom: 8 }}>
                <strong>Éxito:</strong> {p.kpis}
              </p>
              <div style={{ fontSize: 12, color: 'var(--vc-royal)', fontWeight: 600 }}>Líder: {p.owner}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5.9 Riesgos C-1 a C-9 y decisiones pendientes */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">5.9</span> Riesgos Financieros/Operativos (C-1 a C-9) y Decisiones Pendientes
        </h2>
        <div className="table-wrap" style={{ marginBottom: 14 }}>
          <table className="vc-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Riesgo</th>
                <th>Consecuencia</th>
                <th>Mitigación y responsable</th>
              </tr>
            </thead>
            <tbody>
              {COST_RISKS.map((r) => (
                <tr key={r.id}>
                  <td className="mono cell-strong">{r.id}</td>
                  <td className="cell-strong">{r.risk}</td>
                  <td>{r.consequence}</td>
                  <td>{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout info">
          <div className="callout-icon">
            <CheckCircle2 size={18} color="#0ea5e9" />
          </div>
          <div>
            <div className="callout-title">4 Decisiones Pendientes para Cierre de Piloto</div>
            <div className="callout-body">
              (1) Confirmar con la Sección 2 los volúmenes definitivos de datos y fuentes; (2) ajustar réplica y bóveda
              con la Sección 4 definitiva; (3) validar el techo presupuestal consolidado aprobado por Valleclaro; (4)
              fijar con Legal la política formal de retención de registros (Sec. 3.7).
            </div>
          </div>
        </div>
      </div>

      {/* Referencias oficiales colapsables */}
      <div className="accordion-box">
        <button type="button" className="accordion-trigger" onClick={() => setShowRefs((v) => !v)}>
          <span>
            <BookOpen size={16} style={{ verticalAlign: '-3px', marginRight: 8 }} />
            Referencias Oficiales y Normativas del Documento (81 fuentes + S1–S25)
          </span>
          <span className="badge badge-navy">{showRefs ? 'Ocultar' : 'Ver síntesis'}</span>
        </button>
        {showRefs && (
          <div className="accordion-body">
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Citas</th>
                    <th>Fuente principal</th>
                    <th>Aplicación en la propuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {KEY_REFERENCES.map((ref) => (
                    <tr key={ref.ref}>
                      <td className="mono cell-strong">{ref.ref}</td>
                      <td className="cell-strong">{ref.title}</td>
                      <td>{ref.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

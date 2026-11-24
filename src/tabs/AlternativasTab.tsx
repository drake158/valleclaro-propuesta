import { useState } from 'react';
import { Award, Calculator, CheckCircle2, Info, Layers, ShieldAlert, TrendingUp } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import {
  CAPABILITIES_MATRIX,
  EGRESS_TARIFFS,
  EVALUATION_CRITERIA,
  GCP_RISKS_MITIGATION,
  PORTABILITY_PLAN,
  REFERENCE_SERVICES,
} from '../data/valleclaroData';

export function AlternativasTab() {
  const [selectedFlowId, setSelectedFlowId] = useState(EGRESS_TARIFFS[1].id);
  const [volumeGb, setVolumeGb] = useState(1000);
  const [useFreeTier, setUseFreeTier] = useState(true);

  const activeTariff = EGRESS_TARIFFS.find((t) => t.id === selectedFlowId) ?? EGRESS_TARIFFS[1];
  const billable = Math.max(0, volumeGb - (useFreeTier ? activeTariff.freeGb : 0));
  const estimatedUsd = (billable / 100) * activeTariff.ratePer100;

  return (
    <div className="tab-panel">
      <SectionHeader
        eyebrow="Sección 1 · Selección de Proveedor Cloud"
        title="1. Análisis de Alternativas"
        description="Evaluación ponderada de AWS, Azure y Google Cloud como ubicación del lago de datos central, manteniendo los sistemas operacionales en sus nubes actuales."
        pagesLabel="Páginas 2–7 del PDF"
      />

      {/* Podio de resultados */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div
          className="card"
          style={{
            borderTop: '4px solid var(--vc-gcp-green)',
            background: 'linear-gradient(180deg, #f2fbf6 0%, #ffffff 45%)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="badge badge-gcp">
              <Award size={13} /> Seleccionado #1
            </span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--vc-gcp-green)' }}>
              4,45 / 5
            </span>
          </div>
          <h3 style={{ fontSize: 20, marginBottom: 4 }}>Google Cloud (GCP)</h3>
          <div className="kpi-value" style={{ color: 'var(--vc-gcp-green)', fontSize: 34, marginBottom: 8 }}>
            89,00 <span style={{ fontSize: 15, fontWeight: 600 }}>/ 100</span>
          </div>
          <div className="score-bar-track" style={{ marginBottom: 12 }}>
            <div className="score-bar-fill" style={{ width: '89%', background: 'var(--vc-gcp-green)' }} />
          </div>
          <p className="card-text">
            Menor costo docente (<strong>USD 210/mes</strong>), máximo ajuste al equipo de datos (3 personas ya en GCP) y
            mejor adaptabilidad sin migrar AWS ni Azure.
          </p>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--vc-azure-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="badge badge-azure">2.º Lugar</span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--vc-azure-blue)' }}>
              3,69 / 5
            </span>
          </div>
          <h3 style={{ fontSize: 20, marginBottom: 4 }}>Microsoft Azure</h3>
          <div className="kpi-value" style={{ color: 'var(--vc-azure-blue)', fontSize: 34, marginBottom: 8 }}>
            73,75 <span style={{ fontSize: 15, fontWeight: 600 }}>/ 100</span>
          </div>
          <div className="score-bar-track" style={{ marginBottom: 12 }}>
            <div className="score-bar-fill" style={{ width: '73.75%', background: 'var(--vc-azure-blue)' }} />
          </div>
          <p className="card-text">
            Mejor nota en herramientas (<strong>4,75/5</strong> con Databricks, Purview, Entra ID y ADF), pero penalizado
            en adaptabilidad (2/5) por exigir traslados hacia el equipo analítico en GCP.
          </p>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--vc-aws-orange)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="badge badge-aws">3.er Lugar</span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--vc-aws-orange)' }}>
              3,33 / 5
            </span>
          </div>
          <h3 style={{ fontSize: 20, marginBottom: 4 }}>Amazon Web Services</h3>
          <div className="kpi-value" style={{ color: 'var(--vc-aws-orange)', fontSize: 34, marginBottom: 8 }}>
            66,50 <span style={{ fontSize: 15, fontWeight: 600 }}>/ 100</span>
          </div>
          <div className="score-bar-track" style={{ marginBottom: 12 }}>
            <div className="score-bar-fill" style={{ width: '66.5%', background: 'var(--vc-aws-orange)' }} />
          </div>
          <p className="card-text">
            Destaca en tarifa de egreso (5/5) y almacenamiento S3, pero tiene el mayor costo docente (USD 230/mes) y baja
            adaptabilidad/operabilidad para el equipo de datos actual.
          </p>
        </div>
      </div>

      {/* 1.1 & 1.5 Matriz general ponderada */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">1.1 · 1.6</span> Matriz Ponderada General y Justificación
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Criterio</th>
                <th style={{ textAlign: 'right' }}>Peso</th>
                <th style={{ textAlign: 'right' }}>AWS</th>
                <th style={{ textAlign: 'right' }}>Azure</th>
                <th style={{ textAlign: 'right' }}>GCP</th>
                <th>Justificación para Valleclaro</th>
              </tr>
            </thead>
            <tbody>
              {EVALUATION_CRITERIA.map((row) => {
                const maxScore = Math.max(row.aws, row.azure, row.gcp);
                return (
                  <tr key={row.criterion}>
                    <td className="cell-strong">{row.criterion}</td>
                    <td className="cell-num">{row.weight.toFixed(0)} %</td>
                    <td className={`cell-num ${row.aws === maxScore ? 'cell-winner' : ''}`}>{row.aws.toFixed(2)}</td>
                    <td className={`cell-num ${row.azure === maxScore ? 'cell-winner' : ''}`}>{row.azure.toFixed(2)}</td>
                    <td className={`cell-num ${row.gcp === maxScore ? 'cell-winner' : ''}`}>{row.gcp.toFixed(2)}</td>
                    <td>{row.justification}</td>
                  </tr>
                );
              })}
              <tr className="row-total">
                <td>Resultado ponderado sobre 5</td>
                <td className="cell-num">100 %</td>
                <td className="cell-num">3,33</td>
                <td className="cell-num">3,69</td>
                <td className="cell-num cell-winner">4,45</td>
                <td>Suma de puntuación × peso decimal (precisión completa).</td>
              </tr>
              <tr className="row-highlight">
                <td>Equivalente sobre 100</td>
                <td className="cell-num">—</td>
                <td className="cell-num">66,50</td>
                <td className="cell-num">73,75</td>
                <td className="cell-num cell-winner">89,00</td>
                <td>Google Cloud resulta ganador por +15,25 pts sobre Azure y +22,50 pts sobre AWS.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.4 Sub-matriz de Capacidades y Herramientas */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">1.4</span> Sub-matriz de Capacidades y Herramientas de Datos (25 % de la matriz)
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Factor funcional</th>
                <th style={{ textAlign: 'right' }}>Peso interno</th>
                <th style={{ textAlign: 'right' }}>AWS</th>
                <th style={{ textAlign: 'right' }}>Azure</th>
                <th style={{ textAlign: 'right' }}>GCP</th>
                <th>Valoración técnica</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES_MATRIX.map((r) => (
                <tr key={r.factor}>
                  <td className="cell-strong">{r.factor}</td>
                  <td className="cell-num">{r.weight}</td>
                  <td className="cell-num">{r.aws.toFixed(2)}</td>
                  <td className={`cell-num ${r.azure === 5 ? 'cell-winner' : ''}`}>{r.azure.toFixed(2)}</td>
                  <td className={`cell-num ${r.gcp === 5 ? 'cell-winner' : ''}`}>{r.gcp.toFixed(2)}</td>
                  <td>{r.note}</td>
                </tr>
              ))}
              <tr className="row-total">
                <td>Resultado ponderado (máx. 5)</td>
                <td className="cell-num">100 %</td>
                <td className="cell-num">4,10</td>
                <td className="cell-num cell-winner">4,75</td>
                <td className="cell-num">4,40</td>
                <td>Excluye precio para no duplicar peso; aporta × 0,25 a la matriz general.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout info">
          <div className="callout-icon">
            <Info size={18} color="#0ea5e9" />
          </div>
          <div className="callout-body">
            <strong>Vigencia de herramientas:</strong> Microsoft anunció la transición de las capacidades de gobierno de{' '}
            <strong>Purview hacia Fabric</strong> (sin nuevas cuentas de gobierno; mantenimiento hasta el 12 de noviembre
            de 2027). Las funciones de seguridad/cumplimiento continúan vigentes. Asimismo, AWS y GCP ofrecen modalidades
            serverless (EMR Serverless y Spark Serverless) que reducen gestión de clústeres.
          </div>
        </div>
      </div>

      {/* 1.2 Servicios de referencia + 1.3 Tarifas + Calculadora */}
      <div className="subsection-block">
        <div className="grid-2">
          <div>
            <h2 className="subsection-title">
              <span className="subsection-num">1.2</span> Servicios y Costos de Referencia
            </h2>
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>AWS</th>
                    <th>Azure</th>
                    <th>GCP</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_SERVICES.map((s) => (
                    <tr key={s.category} className={s.category.startsWith('Costo') ? 'row-highlight' : ''}>
                      <td className="cell-strong">{s.category}</td>
                      <td>{s.aws}</td>
                      <td>{s.azure}</td>
                      <td className={s.category.startsWith('Costo') ? 'cell-winner' : ''}>{s.gcp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
              Fuente: Diapositiva 18 de clase (marzo 2026, US East, 10 TB almacenados + 1 TB escaneado/mes). Estimación
              docente de comparación, no cotización completa.
            </p>
          </div>

          <div>
            <h2 className="subsection-title">
              <span className="subsection-num">1.3</span> Tarifas de Egreso y Simulador
            </h2>
            <div className="table-wrap" style={{ marginBottom: 14 }}>
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Flujo (Internet)</th>
                    <th>Tarifa</th>
                    <th>Tramo</th>
                  </tr>
                </thead>
                <tbody>
                  {EGRESS_TARIFFS.map((t) => (
                    <tr key={t.id}>
                      <td className="cell-strong">{t.flow}</td>
                      <td className="cell-num">{t.rateLabel}</td>
                      <td>{t.conditions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculadora interactiva basada en el ejemplo del PDF */}
            <div className="card" style={{ background: 'var(--bg-tint)', borderColor: 'var(--border-medium)' }}>
              <div className="card-title">
                <Calculator size={17} color="#0f2d6b" /> Calculadora Rápida de Salida (Ejemplo Sec. 1.3)
              </div>
              <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Flujo de salida:
                  <select
                    className="search-input"
                    style={{ width: '100%', marginTop: 4 }}
                    value={selectedFlowId}
                    onChange={(e) => setSelectedFlowId(e.target.value)}
                  >
                    {EGRESS_TARIFFS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.flow} ({t.rateLabel})
                      </option>
                    ))}
                  </select>
                </label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', flex: 1 }}>
                    Volumen mensual ({activeTariff.unit}):
                    <input
                      type="number"
                      min={0}
                      max={10000}
                      step={100}
                      className="search-input"
                      style={{ width: '100%', marginTop: 4 }}
                      value={volumeGb}
                      onChange={(e) => setVolumeGb(Math.max(0, Number(e.target.value) || 0))}
                    />
                  </label>
                  {activeTariff.freeGb > 0 && (
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12.5,
                        fontWeight: 600,
                        marginTop: 18,
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={useFreeTier}
                        onChange={(e) => setUseFreeTier(e.target.checked)}
                      />
                      Aplicar franquicia 100 GB gratis
                    </label>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                    Facturable: <strong className="mono">{billable.toLocaleString('es-CO')} {activeTariff.unit}</strong>
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--vc-cobalt)' }}>
                    USD {estimatedUsd.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                  Ejemplo del PDF: 1.000 GB Azure East US → GCP México = USD 78,30 con franquicia (USD 87,00 sin ella). No
                  incluye túneles HA VPN ni gateways.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.8 Riesgos en GCP y 1.8.1 Plan de portabilidad */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">1.8</span> Costo de Operar en GCP y Estrategias de Mitigación
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Riesgo o costo</th>
                <th>Efecto para Valleclaro</th>
                <th>Estrategia de mitigación propuesta</th>
              </tr>
            </thead>
            <tbody>
              {GCP_RISKS_MITIGATION.map((item) => (
                <tr key={item.risk}>
                  <td className="cell-strong">
                    <ShieldAlert size={14} style={{ verticalAlign: '-2px', marginRight: 6, color: 'var(--vc-gold-dark)' }} />
                    {item.risk}
                  </td>
                  <td>{item.impact}</td>
                  <td>{item.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">1.8.1</span> Plan de Portabilidad Futura (Independencia del Proveedor)
        </h2>
        <div className="steps-grid">
          {PORTABILITY_PLAN.map((p) => (
            <div className="step-card" key={p.stage}>
              <span className="step-badge">{p.stage}</span>
              <p className="card-text" style={{ marginBottom: 10 }}>
                {p.action}
              </p>
              <div
                style={{
                  fontSize: 12,
                  padding: '8px 10px',
                  borderRadius: 8,
                  background: 'var(--bg-tint)',
                  color: 'var(--vc-cobalt)',
                }}
              >
                <CheckCircle2 size={13} style={{ verticalAlign: '-2px', marginRight: 5 }} />
                <strong>Evidencia:</strong> {p.evidence}
              </div>
            </div>
          ))}
        </div>
        <div className="callout success" style={{ marginTop: 16 }}>
          <div className="callout-icon">
            <TrendingUp size={18} color="#1f6e43" />
          </div>
          <div className="callout-body">
            <strong>Contingencia ≠ Portabilidad:</strong> Recuperar el lago en otra región de GCP (Virginia) protege
            frente a fallas regionales, pero no demuestra independencia del proveedor. La portabilidad real se valida
            semestralmente ejecutando una muestra representativa (Parquet/Iceberg + Terraform) en AWS o Azure.
          </div>
        </div>
      </div>
    </div>
  );
}

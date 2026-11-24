import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Archive,
  CheckCircle2,
  Clock,
  DollarSign,
  HardDrive,
  RefreshCw,
  ServerCrash,
  Shield,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import {
  BACKUP_LAYERS,
  DR_INCREMENTAL_COSTS,
  DR_TESTS,
  HIDDEN_DEPENDENCIES,
  REGION_COMPARISON,
  REPLICATION_BY_DATA,
  RUNBOOK_STEPS,
} from '../data/valleclaroData';

export function ResilienciaTab() {
  const [activeStep, setActiveStep] = useState<number>(5);
  const [showDeps, setShowDeps] = useState(true);

  const selectedRunbook = RUNBOOK_STEPS.find((s) => s.step === activeStep) ?? RUNBOOK_STEPS[5];
  const totalDrUsd = DR_INCREMENTAL_COSTS.reduce((acc, item) => acc + item.usd, 0);

  return (
    <div className="tab-panel">
      <SectionHeader
        eyebrow="Sección 4 · Continuidad Operativa, Replicación y Recuperación ante Desastres"
        title="4. Datos, Replicación y Resiliencia"
        description="Topología de tres regiones (Dallas activa, Virginia pasivo tibio, Querétaro bóveda inmutable), replicación asíncrona con relectura idempotente, runbook DR-RB-01 y estrategia de copias 3-2-1."
        pagesLabel="Páginas 21–30 del PDF"
      />

      {/* Topología 3 regiones */}
      <div className="grid-3" style={{ marginBottom: 22 }}>
        <div className="card" style={{ borderTop: '4px solid var(--vc-gcp-green)' }}>
          <span className="badge badge-gcp" style={{ marginBottom: 8 }}>Región Primaria · Única Escritora</span>
          <h3 style={{ fontSize: 18, marginBottom: 4 }}>Dallas · us-south1 (EE. UU.)</h3>
          <p className="card-text" style={{ marginBottom: 10 }}>
            <span className="mono">10.10.0.0/16</span> · Activa (único escritor). BigQuery Enterprise Plus, Silver en
            bucket dual, Pub/Sub multizona, Vertex AI, Looker, HA VPN (MED 100) y KMS regional.
          </p>
          <span className="badge badge-navy">Síncrona entre zonas</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--vc-gold)' }}>
          <span className="badge badge-gold" style={{ marginBottom: 8 }}>Contingencia · Pasivo Tibio</span>
          <h3 style={{ fontSize: 18, marginBottom: 4 }}>Virginia del Norte · us-east4</h3>
          <p className="card-text" style={{ marginBottom: 10 }}>
            <span className="mono">10.11.0.0/16</span> · Réplicas MDR (solo lectura), 2.ª región del bucket dual turbo,
            metastore BigLake, VPN E-3/E-4 siempre arriba (MED 200), Datastream <span className="mono">10.11.42.0/29</span> en pausa.
          </p>
          <span className="badge badge-gold">Conmutación forzada probada</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--vc-vault-slate)' }}>
          <span className="badge badge-slate" style={{ marginBottom: 8 }}>Bóveda Aislada · Inmutable</span>
          <h3 style={{ fontSize: 18, marginBottom: 4 }}>Querétaro · northamerica-south1</h3>
          <p className="card-text" style={{ marginBottom: 10 }}>
            Proyecto separado sin cómputo, sin subred y sin VPN. Recibe exportes Parquet/Iceberg semanales y cierres de
            mes por API privada (<span className="mono">E-6</span>) con <strong>Archive + Bucket Lock</strong>.
          </p>
          <span className="badge badge-slate">Protección ransomware</span>
        </div>
      </div>

      {/* 4.1 Qué protegemos + Escenarios de falla */}
      <div className="callout info">
        <div className="callout-icon">
          <Shield size={19} color="#0ea5e9" />
        </div>
        <div className="callout-body">
          <strong>Principio de diseño:</strong> las 48 tiendas, la tienda en línea (AWS) y el ERP (Azure) siguen operando
          si cae GCP. Los objetivos RTO/RPO del Anexo B protegen al <strong>lago y al bus</strong>, diferenciando{' '}
          <strong>datos reproducibles</strong> (relectura desde binlog/CDC 72 h, Kinesis 24 h, cajas 7 días) de{' '}
          <strong>datos nacidos en el lago</strong> (Silver/Gold, cierres, modelos, Looker y políticas).
        </div>
      </div>

      {/* 4.2 Por qué Virginia y no Querétaro */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">4.2</span> Por qué Virginia del Norte (us-east4) para Contingencia y Querétaro como Bóveda
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Capacidad requerida (Anexo B)</th>
                <th>Dallas + Querétaro (northamerica-south1)</th>
                <th>Dallas + Virginia (us-east4 · Elegida)</th>
              </tr>
            </thead>
            <tbody>
              {REGION_COMPARISON.map((row) => (
                <tr key={row.capability}>
                  <td className="cell-strong">{row.capability}</td>
                  <td style={{ color: row.mexico.startsWith('No') ? 'var(--vc-danger)' : 'var(--text-secondary)' }}>
                    {row.mexico}
                  </td>
                  <td className="cell-winner">{row.virginia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4.4 & 4.6 Matriz de replicación, patrones y consistencia */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">4.4 · 4.6</span> Replicación, Patrones y RTO/RPO por Tipo de Dato
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Tipo de dato</th>
                <th>RTO Obj. / Diseño</th>
                <th>RPO Obj.</th>
                <th>Patrón elegido</th>
                <th>Almacenamiento y mecanismo</th>
              </tr>
            </thead>
            <tbody>
              {REPLICATION_BY_DATA.map((d) => (
                <tr key={d.type}>
                  <td className="cell-strong">{d.type}</td>
                  <td className="num cell-strong">
                    {d.rtoTarget} <span style={{ color: 'var(--vc-gcp-green)' }}>({d.rtoDesign})</span>
                  </td>
                  <td className="num cell-strong">{d.rpoTarget}</td>
                  <td><span className="badge badge-navy">{d.pattern}</span></td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{d.storage}</div>
                    <div>{d.mechanism}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-2" style={{ marginTop: 14 }}>
          <div className="card">
            <div className="card-title">
              <RefreshCw size={17} color="#0f2d6b" /> 4.4.2 Cinco Reglas de Consistencia
            </div>
            <ul className="clean-list">
              <li><strong>Un solo escritor:</strong> solo la región activa escribe; réplicas BigQuery son de solo lectura.</li>
              <li><strong>Marca de corte:</strong> <span className="mono">control.corte_replicacion</span>; Looker exhibe «datos al HH:MM».</li>
              <li><strong>CDC con tope:</strong> Datastream usa <span className="mono">max_staleness</span> sin estados parciales.</li>
              <li><strong>Bus idempotente:</strong> cada evento porta <span className="mono">event_id</span> y versión (ERP descarta duplicados; tienda usa versión mayor por SKU).</li>
              <li><strong>Cierres inmutables:</strong> el cierre mensual se congela como instantánea de tabla.</li>
            </ul>
          </div>

          <div className="card">
            <div className="card-title">
              <AlertTriangle size={17} color="#b46900" /> Plan B de Inventario y Replicación Asíncrona
            </div>
            <p className="card-text" style={{ marginBottom: 10 }}>
              La replicación elegida es <strong>síncrona entre zonas</strong> (misma región) y{' '}
              <strong>asíncrona entre regiones</strong> (evita latencia Dallas–Virginia y bloqueo mutuo; además BigQuery,
              GCS y Pub/Sub no ofrecen síncrona interregional).
            </p>
            <p className="card-text">
              Como la réplica asíncrona (≤ 15 min) por sí sola no alcanza el <strong>RPO de 5 min de inventario</strong>,
              se cierra con relectura CDC validada en <strong>DR-4</strong>. Si DR-4 falla, se activa el{' '}
              <strong>Plan B</strong>: segundo stream activo de Datastream en Virginia solo para inventario y catálogo
              (bajo costo: 0,6 TB/mes del ERP).
            </p>
          </div>
        </div>
      </div>

      {/* 4.7 Runbook Interactivo DR-RB-01 */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">4.7</span> Runbook Interactivo de Conmutación (DR-RB-01 · Pérdida de Dallas)
        </h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 14 }}>
          Ejecutado por <span className="mono">grp_dr</span>. Haz clic en cada paso para ver la acción exacta y su
          tiempo acumulado frente a los RTO objetivo (2 h · 4 h · 8 h · 24 h):
        </p>

        <div className="pill-group" style={{ marginBottom: 14 }}>
          {RUNBOOK_STEPS.map((s) => (
            <button
              key={s.step}
              type="button"
              className={`pill-btn ${activeStep === s.step ? 'active' : ''}`}
              onClick={() => setActiveStep(s.step)}
            >
              Paso {s.step} · {s.cumulativeLabel}
            </button>
          ))}
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--vc-cobalt)', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
            <div>
              <span className="badge badge-cyan" style={{ marginRight: 8 }}>Paso {selectedRunbook.step}</span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--vc-cobalt)' }}>
                {selectedRunbook.title}
              </strong>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-navy">
                <Clock size={12} /> Duración: {selectedRunbook.duration}
              </span>
              <span className="badge badge-gcp">Acumulado: {selectedRunbook.cumulativeLabel}</span>
            </div>
          </div>
          <p className="card-text" style={{ marginBottom: 12 }}>
            {selectedRunbook.detail}
          </p>
          {/* Barra visual frente a 16h */}
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
            Progreso del runbook (0:00 → 16:00 h de recuperación completa; RTO Inventario 2 h = 1:30 h · Ventas 4 h = 2:00 h · Clientes 8 h = 4:00 h):
          </div>
          <div className="score-bar-track">
            <div
              className="score-bar-fill"
              style={{
                width: `${Math.min(100, Math.max(5, (selectedRunbook.cumulativeMin / 960) * 100))}%`,
                background: 'linear-gradient(90deg, var(--vc-cyan), var(--vc-cobalt))',
              }}
            />
          </div>
        </div>

        {/* Tabla compacta de los 9 pasos */}
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Paso</th>
                <th>Acción clave del runbook</th>
                <th>Duración est.</th>
                <th>Acumulado</th>
              </tr>
            </thead>
            <tbody>
              {RUNBOOK_STEPS.map((s) => (
                <tr
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  style={{
                    cursor: 'pointer',
                    background: activeStep === s.step ? '#e0f2fe' : undefined,
                  }}
                >
                  <td className="mono cell-strong">Paso {s.step}</td>
                  <td>
                    <strong>{s.title}:</strong> {s.detail}
                  </td>
                  <td className="num">{s.duration}</td>
                  <td className="num cell-strong">{s.cumulativeLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4.7.2 Dependencias ocultas D-1 a D-10 */}
      <div className="accordion-box">
        <button type="button" className="accordion-trigger" onClick={() => setShowDeps((v) => !v)}>
          <span>
            <ServerCrash size={16} style={{ verticalAlign: '-3px', marginRight: 8 }} />
            4.7.2 Dependencias Ocultas que Rompen una Conmutación y Cómo se Cierran (D-1 a D-10)
          </span>
          <span className="badge badge-navy">{showDeps ? 'Ocultar' : 'Mostrar D-1 a D-10'}</span>
        </button>
        {showDeps && (
          <div className="accordion-body">
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Dependencia oculta</th>
                    <th>Por qué rompe la recuperación</th>
                    <th>Mitigación implementada</th>
                  </tr>
                </thead>
                <tbody>
                  {HIDDEN_DEPENDENCIES.map((d) => (
                    <tr key={d.id}>
                      <td className="mono cell-strong">{d.id}</td>
                      <td className="cell-strong">{d.dep}</td>
                      <td>{d.why}</td>
                      <td style={{ color: 'var(--vc-gcp-green)', fontWeight: 500 }}>{d.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4.8 Copias de seguridad 3-2-1 */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">4.8</span> Copias de Seguridad (Regla 3-2-1 e Inmutabilidad en Querétaro)
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Capa</th>
                <th>Mecanismo</th>
                <th>Frecuencia</th>
                <th>Retención</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {BACKUP_LAYERS.map((b) => (
                <tr key={b.layer}>
                  <td className="cell-strong">{b.layer}</td>
                  <td>{b.mechanism}</td>
                  <td>{b.freq}</td>
                  <td className="cell-strong">{b.retention}</td>
                  <td>{b.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="callout success" style={{ marginTop: 14 }}>
          <div className="callout-icon">
            <Archive size={18} color="#1f6e43" />
          </div>
          <div className="callout-body">
            <strong>Aislamiento anti-ransomware:</strong> la bóveda vive en un proyecto GCP independiente con
            administradores distintos y cuenta de servicio de solo escritura. Con <strong>Bucket Lock</strong> nadie
            puede borrar objetos antes de vencer la retención (Archive ≈ USD 0,0012/GiB-mes, permanencia mínima 365
            días).
          </div>
        </div>
      </div>

      {/* 4.9 Pruebas DR y 4.10 Costo incremental */}
      <div className="subsection-block">
        <div className="grid-2">
          <div>
            <h2 className="subsection-title">
              <span className="subsection-num">4.9</span> Pruebas de Recuperación (DR-1 a DR-8)
            </h2>
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Prueba</th>
                    <th>Frecuencia</th>
                    <th>Aceptación</th>
                  </tr>
                </thead>
                <tbody>
                  {DR_TESTS.map((t) => (
                    <tr key={t.id}>
                      <td className="mono cell-strong">{t.id}</td>
                      <td>
                        <strong>{t.name}:</strong> {t.method}
                      </td>
                      <td><span className="badge badge-navy">{t.freq}</span></td>
                      <td>{t.criteria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="subsection-title">
              <span className="subsection-num">4.10</span> Costo Incremental de Resiliencia (Mes 18)
            </h2>
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Concepto de resiliencia</th>
                    <th>Cálculo (lista USD)</th>
                    <th style={{ textAlign: 'right' }}>USD/mes</th>
                  </tr>
                </thead>
                <tbody>
                  {DR_INCREMENTAL_COSTS.map((c) => (
                    <tr key={c.item}>
                      <td className="cell-strong">{c.item}</td>
                      <td style={{ fontSize: 12.5 }}>{c.calc}</td>
                      <td className="cell-num">≈ {c.usd.toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                  <tr className="row-total">
                    <td>Total incremental estimado</td>
                    <td>≈ COP 12,2M/mes (TRM 4.000)</td>
                    <td className="cell-num">≈ {totalDrUsd.toLocaleString('es-CO')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="callout warn" style={{ marginTop: 12 }}>
              <div className="callout-icon">
                <DollarSign size={18} color="#b46900" />
              </div>
              <div className="callout-body">
                <strong>Conciliación pendiente con Sección 5:</strong> estos supuestos (Silver 40 TB, Archive 100 TB,
                Enterprise Plus 50 slots, TRM 4.000) difieren del escenario preliminar de la sección 5 y deben conciliarse
                sin sumar solapamientos. Alerta operativa: retraso de réplica &gt; 12 min (80 % del límite).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hitos de resiliencia */}
      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="card-title">
            <Activity size={17} color="#0ea5e9" /> Hito Mes 6 (Fase 1 · Piloto)
          </div>
          <p className="card-text">
            Bucket dual de Silver y MDR activos para ventas e inventario. Túneles E-3 y E-4 operativos. Subredes
            Datastream autorizadas en orígenes. Pruebas <strong>DR-1, DR-4, DR-4b y DR-6</strong> aprobadas y primera
            copia inmutable en la bóveda.
          </p>
        </div>
        <div className="card">
          <div className="card-title">
            <CheckCircle2 size={17} color="#1f6e43" /> Hito Mes 18 (Proyecto Completo)
          </div>
          <p className="card-text">
            Todos los tipos de dato en su patrón final. Pruebas <strong>DR-2, DR-3, DR-5, DR-7, DR-8 y SEC-07</strong>{' '}
            aprobadas con RTO y RPO medidos dentro del Anexo B. Runbooks firmados y dos líderes de incidente capacitados.
          </p>
        </div>
      </div>
    </div>
  );
}

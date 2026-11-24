import { useState } from 'react';
import {
  CheckCircle2,
  Database,
  Expand,
  Globe,
  Info,
  Layers,
  Lock,
  Network,
  Server,
  Shield,
  ZoomIn,
} from 'lucide-react';
import { ArchitectureLightbox } from '../components/ArchitectureLightbox';
import { SectionHeader } from '../components/SectionHeader';
import {
  ARCHITECTURE_COMPONENTS,
  DEDUP_STEPS,
  HISTORICAL_LOAD,
  INGESTION_FLOWS,
  IP_PLAN,
  LAKE_ZONES,
  NETWORK_LINKS,
} from '../data/valleclaroData';

const ARCH_IMAGE_PATH = `${import.meta.env.BASE_URL}assets/valleclaro-arquitectura-multinube.png`;

export function ArquitecturaTab() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState<string>(ARCHITECTURE_COMPONENTS[0].id);
  const [flowFilter, setFlowFilter] = useState<string>('Todas');
  const [cidrFilter, setCidrFilter] = useState<string>('Todas');
  const [showAssumptions, setShowAssumptions] = useState(false);

  const selectedLayer =
    ARCHITECTURE_COMPONENTS.find((c) => c.id === selectedLayerId) ?? ARCHITECTURE_COMPONENTS[0];

  const filteredFlows =
    flowFilter === 'Todas' ? INGESTION_FLOWS : INGESTION_FLOWS.filter((f) => f.cloud === flowFilter);

  const filteredCidrs =
    cidrFilter === 'Todas' ? IP_PLAN : IP_PLAN.filter((r) => r.cloud === cidrFilter);

  return (
    <div className="tab-panel">
      <SectionHeader
        eyebrow="Sección 2 · Topología Hub-and-Spoke y Flujo de Datos"
        title="2. Arquitectura Multinube y Lago Único"
        description="Google Cloud (us-south1 Dallas) actúa como hub central (lago único + bus Pub/Sub) conectando los spokes AWS y Azure mediante HA VPN y Private Service Connect sin tránsito directo entre ellos."
        pagesLabel="Páginas 7–13 del PDF + Diagrama Maestro"
      />

      {/* VISOR DE IMAGEN DE ARQUITECTURA EN ALTA CALIDAD CON LIGHTBOX */}
      <div className="arch-viewer-card">
        <div className="arch-toolbar">
          <div className="arch-toolbar-title">
            <Layers size={18} color="#0ea5e9" />
            <span>Diagrama Maestro · Valleclaro: Hub Multinube y Lago Único</span>
          </div>
          <div className="arch-toolbar-actions">
            <span className="badge badge-cyan" style={{ background: 'rgba(14,165,233,0.2)', color: '#7dd3fc' }}>
              PNG Alta Calidad
            </span>
            <button
              type="button"
              className="btn-action primary"
              onClick={() => setLightboxOpen(true)}
            >
              <Expand size={15} /> Vista ampliada / Zoom
            </button>
          </div>
        </div>

        <div
          className="arch-image-stage"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          aria-label="Ampliar diagrama de arquitectura Valleclaro"
        >
          <img
            src={ARCH_IMAGE_PATH}
            alt="Arquitectura Valleclaro: Un solo lago para tres nubes (hub-and-spoke) con AWS, Google Cloud Dallas, Azure East US y Querétaro"
          />
          <span className="arch-zoom-hint">
            <ZoomIn size={14} /> Clic para abrir lightbox con zoom interactivo
          </span>
        </div>
      </div>

      <ArchitectureLightbox
        src={ARCH_IMAGE_PATH}
        alt="Valleclaro: Hub Multinube y Lago Único"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* TARJETAS INTERACTIVAS QUE EXPLICAN CADA CAPA / COMPONENTE DEL DIAGRAMA */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">2.1</span> Explorador Interactivo por Capa y Componente del Diagrama
        </h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 14 }}>
          Selecciona cualquier componente para inspeccionar su papel técnico, servicios, protocolos y métricas en el
          diseño:
        </p>

        <div className="grid-4">
          {ARCHITECTURE_COMPONENTS.map((comp) => {
            const isSelected = comp.id === selectedLayer.id;
            return (
              <button
                key={comp.id}
                type="button"
                className={`arch-layer-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedLayerId(comp.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className={`badge ${comp.badgeClass}`}>{comp.badge}</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: 'var(--vc-cobalt)',
                    marginBottom: 4,
                  }}
                >
                  {comp.title}
                </div>
                <div className="mono" style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 8 }}>
                  {comp.regionOrNet}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {comp.summary}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel de detalle del componente seleccionado */}
        <div className="arch-detail-drawer">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: 8 }}>
                {selectedLayer.badge} · {selectedLayer.regionOrNet}
              </span>
              <h3 style={{ color: '#ffffff', fontSize: 21, marginTop: 4 }}>{selectedLayer.title}</h3>
            </div>
            <div
              style={{
                background: 'rgba(14, 165, 233, 0.16)',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                borderRadius: 10,
                padding: '10px 16px',
                minWidth: 210,
              }}
            >
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7dd3fc' }}>
                {selectedLayer.metricLabel}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#ffffff' }}>
                {selectedLayer.metricValue}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {selectedLayer.services.map((srv) => (
              <span
                key={srv}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 999,
                  padding: '4px 11px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#f1f5f9',
                }}
              >
                {srv}
              </span>
            ))}
          </div>

          <ul style={{ margin: 0, paddingLeft: 18, color: '#e2e8f0', fontSize: 13.8, display: 'grid', gap: 6 }}>
            {selectedLayer.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Zonas del lago + 3 principios */}
      <div className="subsection-block">
        <div className="grid-2">
          <div className="card">
            <div className="card-title">
              <Database size={18} color="#0f2d6b" /> Zonas del Lago Único y Bus de Integración
            </div>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              {LAKE_ZONES.map((z) => (
                <div
                  key={z.zone}
                  style={{
                    borderLeft: `4px solid ${z.color}`,
                    background: 'var(--bg-stripe)',
                    padding: '10px 14px',
                    borderRadius: '0 8px 8px 0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                    <strong style={{ color: 'var(--vc-cobalt)' }}>{z.zone}</strong>
                    <span className="mono" style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                      {z.tech}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{z.content}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <Globe size={18} color="#0f2d6b" /> Ubicación de Datos (Ley 1581 / SIC) y 3 Principios
            </div>
            <ul className="clean-list" style={{ marginBottom: 14 }}>
              <li>
                <strong>No migración de bases operativas:</strong> Datastream lee el log de transacciones (CDC) sin tocar
                la tienda AWS ni el ERP/cajas en Azure.
              </li>
              <li>
                <strong>100 % sin servidor (equipo de 14 TI):</strong> Datastream, Pub/Sub, Storage Transfer, BigQuery y
                Dataform eliminan administración de clústeres.
              </li>
              <li>
                <strong>Formato abierto Apache Iceberg (Silver):</strong> evita vendor lock-in; otro motor puede leer los
                mismos archivos.
              </li>
            </ul>
            <div
              style={{
                background: '#edf7ff',
                border: '1px solid #bae6fd',
                borderRadius: 10,
                padding: '12px 14px',
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}
            >
              <strong style={{ color: 'var(--vc-cobalt)' }}>¿Por qué Dallas (us-south1) y no Querétaro como principal?</strong>
              <br />
              Estados Unidos y México figuran en la lista de países con nivel adecuado de protección de la SIC (Art. 26
              Ley 1581). Sin embargo, en México <strong>Vertex AI no está disponible</strong> y sus zonas operan en 1–2
              centros físicos; por eso Dallas aloja el lago completo, Virginia la contingencia y Querétaro la bóveda
              inmutable.
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 Flujos de ingesta filtrables */}
      <div className="subsection-block">
        <div className="filter-bar">
          <h2 className="subsection-title" style={{ marginBottom: 0 }}>
            <span className="subsection-num">2.3</span> Flujo de Ingesta desde Cada Nube hacia el Lago
          </h2>
          <div className="pill-group">
            {['Todas', 'AWS', 'Azure', 'GCP'].map((cloud) => (
              <button
                key={cloud}
                type="button"
                className={`pill-btn ${flowFilter === cloud ? 'active' : ''}`}
                onClick={() => setFlowFilter(cloud)}
              >
                {cloud}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Nube</th>
                <th>Origen</th>
                <th>Datos</th>
                <th>Modo</th>
                <th>Servicio GCP</th>
                <th>Latencia est.</th>
                <th>Límite / RPO</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlows.map((f) => (
                <tr key={`${f.cloud}-${f.data}`}>
                  <td>
                    <span
                      className={`badge ${
                        f.cloud === 'AWS' ? 'badge-aws' : f.cloud === 'Azure' ? 'badge-azure' : 'badge-gcp'
                      }`}
                    >
                      {f.cloud}
                    </span>
                  </td>
                  <td className="cell-strong">{f.source}</td>
                  <td>{f.data}</td>
                  <td>{f.mode}</td>
                  <td className="mono">{f.service}</td>
                  <td className="cell-strong">{f.latency}</td>
                  <td className="num">{f.limitRpo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout info">
          <div className="callout-icon">
            <Info size={18} color="#0ea5e9" />
          </div>
          <div className="callout-body">
            <strong>Salidas desde el Hub:</strong> el ERP lee pedidos desde <span className="mono">pedidos.creados</span>;
            la tienda recibe stock desde <span className="mono">inventario.cambios</span> y consulta recomendaciones en
            una API interna (<span className="mono">Cloud Run</span>); <strong>Looker</strong> muestra a todas las áreas
            la cifra única oficial. Alerta operativa al 80 % del límite de latencia.
          </div>
        </div>
      </div>

      {/* 2.4 Red + 2.6 Volúmenes */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">2.4</span> Conectividad de Red Privada (Enlaces E-1 a E-6)
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Enlace</th>
                <th>Diseño Fase 1 / Resiliencia</th>
                <th>Capacidad / Uso en pico</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {NETWORK_LINKS.map((l) => (
                <tr key={l.id}>
                  <td className="mono cell-strong">{l.id}</td>
                  <td className="cell-strong">{l.link}</td>
                  <td>{l.phase1}</td>
                  <td>{l.capacity}</td>
                  <td>
                    <span className={`badge ${l.id === 'E-1' || l.id === 'E-2' || l.id === 'E-5' ? 'badge-gcp' : 'badge-navy'}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.5 Plan de direccionamiento IP */}
      <div className="subsection-block">
        <div className="filter-bar">
          <h2 className="subsection-title" style={{ marginBottom: 0 }}>
            <span className="subsection-num">2.5</span> Plan de Direccionamiento IP (Sin Solapamientos /16)
          </h2>
          <div className="pill-group">
            {['Todas', 'GCP', 'AWS', 'Azure', 'Tiendas', 'Túneles'].map((c) => (
              <button
                key={c}
                type="button"
                className={`pill-btn ${cidrFilter === c ? 'active' : ''}`}
                onClick={() => setCidrFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Entorno</th>
                <th>Región</th>
                <th>VPC / VNet</th>
                <th>Subred</th>
                <th>CIDR</th>
                <th>Propósito</th>
              </tr>
            </thead>
            <tbody>
              {filteredCidrs.map((r) => (
                <tr key={`${r.cloud}-${r.cidr}-${r.subnet}`}>
                  <td>
                    <span
                      className={`badge ${
                        r.cloud === 'GCP'
                          ? 'badge-gcp'
                          : r.cloud === 'AWS'
                          ? 'badge-aws'
                          : r.cloud === 'Azure'
                          ? 'badge-azure'
                          : 'badge-slate'
                      }`}
                    >
                      {r.cloud}
                    </span>
                  </td>
                  <td>{r.region}</td>
                  <td className="mono">{r.vpc}</td>
                  <td className="mono">{r.subnet}</td>
                  <td className="mono cell-strong">{r.cidr}</td>
                  <td>{r.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.6 Volúmenes y Carga Histórica */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">2.6</span> Volumen Diario (2,3 TB/mes) y Carga Histórica (83 TB Únicos)
        </h2>
        <div className="grid-2">
          <div className="table-wrap">
            <table className="vc-table">
              <thead>
                <tr>
                  <th>Flujo diario</th>
                  <th style={{ textAlign: 'right' }}>TB/mes</th>
                  <th style={{ textAlign: 'right' }}>GB/día</th>
                  <th style={{ textAlign: 'right' }}>Mbps prom.</th>
                  <th>Mbps pico (10×)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cell-strong">AWS (tienda y app)</td>
                  <td className="cell-num">1,20</td>
                  <td className="cell-num">40,00</td>
                  <td className="cell-num">3,70</td>
                  <td>37 Mbps</td>
                </tr>
                <tr>
                  <td className="cell-strong">Azure · ERP</td>
                  <td className="cell-num">0,60</td>
                  <td className="cell-num">20,00</td>
                  <td className="cell-num">1,90</td>
                  <td>13 (+13 lote nocturno)</td>
                </tr>
                <tr>
                  <td className="cell-strong">Azure · cajas (48 tiendas)</td>
                  <td className="cell-num">0,50</td>
                  <td className="cell-num">16,70</td>
                  <td className="cell-num">1,50</td>
                  <td>20 (298 MB en 2 min)</td>
                </tr>
                <tr className="row-total">
                  <td>Total hacia el lago</td>
                  <td className="cell-num">2,30</td>
                  <td className="cell-num">76,70</td>
                  <td className="cell-num">7,10</td>
                  <td>~70 Mbps pico</td>
                </tr>
                <tr>
                  <td>Analítica (ya en GCP)</td>
                  <td className="cell-num">2,00</td>
                  <td className="cell-num">interno</td>
                  <td className="cell-num">—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-wrap">
            <table className="vc-table">
              <thead>
                <tr>
                  <th>Carga histórica</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                  <th style={{ textAlign: 'right' }}>Duplicados</th>
                  <th>A mover</th>
                  <th>A 500 Mbps</th>
                </tr>
              </thead>
              <tbody>
                {HISTORICAL_LOAD.map((h) => (
                  <tr key={h.origin} className={h.origin === 'Total' ? 'row-total' : ''}>
                    <td className="cell-strong">{h.origin}</td>
                    <td className="cell-num">{h.total}</td>
                    <td className="cell-num" style={{ color: 'var(--vc-danger)' }}>
                      −{h.dup}
                    </td>
                    <td>{h.move}</td>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.7 Regla del único repositorio: 6 pasos y 4 controles automáticos */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">2.7</span> Regla del Único Repositorio: Eliminación de 30 TB Duplicados
        </h2>
        <div className="steps-grid" style={{ marginBottom: 16 }}>
          {DEDUP_STEPS.map((s) => (
            <div className="step-card" key={s.step}>
              <span className="step-badge">Paso {s.step}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--vc-cobalt)', marginBottom: 4 }}>
                {s.title}
              </div>
              <p className="card-text">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">
              <Lock size={17} color="#0f2d6b" /> 4 Controles Automáticos (Sin Depender de Buena Voluntad)
            </div>
            <ul className="clean-list">
              <li>
                <strong>AWS (SCP):</strong> políticas de organización impiden crear VPN o replicar buckets fuera de la cuenta.
              </li>
              <li>
                <strong>Azure Policy:</strong> deniega conexiones VPN fuera del hub de GCP.
              </li>
              <li>
                <strong>GCP (VPC Service Controls):</strong> el perímetro impide copiar el lago hacia otro proyecto.
              </li>
              <li>
                <strong>Tres nubes (Flow Logs):</strong> alerta automática ante cualquier tráfico entre{' '}
                <span className="mono">10.20.0.0/16</span> y <span className="mono">10.30.0.0/16</span>.
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="card-title">
              <Network size={17} color="#1f6e43" /> Reemplazo de Flujos Directos por el Hub
            </div>
            <ul className="clean-list">
              <li>
                <span className="mono">AWS → Nube 2</span> (copias pedidos) → <strong>AWS → Datastream / Pub/Sub → lago</strong>
              </li>
              <li>
                <span className="mono">Azure → Nube 2</span> (ventas/inv.) → <strong>Azure → Datastream / STS → lago</strong>
              </li>
              <li>
                <span className="mono">AWS → Azure</span> (facturar) → <strong>AWS → tema pedidos.creados → ERP</strong>
              </li>
              <li>
                <span className="mono">Azure → AWS</span> (stock web) → <strong>ERP → tema inventario.cambios → tienda</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2.8 Supuestos colapsables */}
      <div className="accordion-box">
        <button
          type="button"
          className="accordion-trigger"
          onClick={() => setShowAssumptions((v) => !v)}
        >
          <span>
            <Server size={16} style={{ verticalAlign: '-3px', marginRight: 8 }} />
            2.8 Supuestos de Diseño Arquitectónico y Planes de Ajuste (6 supuestos)
          </span>
          <span className="badge badge-navy">{showAssumptions ? 'Ocultar' : 'Ver detalle'}</span>
        </button>
        {showAssumptions && (
          <div className="accordion-body">
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Supuesto</th>
                    <th>¿Qué pasa si fuera distinto?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cell-strong">AWS opera en us-east-1 y Azure en East US (EE. UU.)</td>
                    <td>Si alguna base existe hoy en otro país (ej. Brasil), el lago no cambia; Legal revisa esa base sin moverla.</td>
                  </tr>
                  <tr>
                    <td className="cell-strong">AWS usa RDS/Aurora y Kinesis; ERP usa SQL Server</td>
                    <td>Datastream soporta también Oracle y PostgreSQL; solo cambia la configuración del conector.</td>
                  </tr>
                  <tr>
                    <td className="cell-strong">VPN Gateway Azure tiene SKU de 1 Gbps</td>
                    <td>Aun con un SKU menor, el pico de 33 Mbps cabe con amplia holgura.</td>
                  </tr>
                  <tr>
                    <td className="cell-strong">30 TB duplicados: ~20 GCP, ~6 Azure, ~4 AWS</td>
                    <td>Se confirma en el inventario de Fase 1; cambian los TB exactos, no el método de 6 pasos.</td>
                  </tr>
                  <tr>
                    <td className="cell-strong">El pico es 10× el promedio</td>
                    <td>Incluso a 20× el uso de los túneles sigue por debajo del 7 %.</td>
                  </tr>
                  <tr>
                    <td className="cell-strong">Los 15 min de cajas se cuentan al llegar a Azure</td>
                    <td>Si se cuentan desde la venta, el lote de cajas baja a 10 min (10 + 5 = 15 min).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="callout success" style={{ marginTop: 18 }}>
        <div className="callout-icon">
          <CheckCircle2 size={18} color="#1f6e43" />
        </div>
        <div className="callout-body">
          <strong>Cifra única garantizada:</strong> <span className="mono">gold_finanzas.ventas_mensuales</span>{' '}
          reemplaza definitivamente los tres informes contradictorios de COP 4.812M, 4.690M y 4.935M, manteniendo las
          bases operativas intactas para el negocio diario.
        </div>
      </div>
    </div>
  );
}

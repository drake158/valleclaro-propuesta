import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Cloud,
  Database,
  DollarSign,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ValleclaroLogo } from '../components/ValleclaroLogo';

interface ResumenTabProps {
  onNavigateTab: (index: number) => void;
}

export function ResumenTab({ onNavigateTab }: ResumenTabProps) {
  return (
    <div className="tab-panel">
      {/* Portada fiel a página 1 del PDF */}
      <section className="cover-hero">
        <div className="cover-hero-inner">
          <div className="cover-top-card">
            <ValleclaroLogo />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="badge-case">CASO DE ESTUDIO 2026</span>
              <span className="badge badge-navy">Documento técnico completo</span>
            </div>
          </div>

          <div className="cover-eyebrow">Integración de datos</div>
          <h1 className="cover-title">Propuesta de lago de datos</h1>
          <div className="cover-subtitle">Valleclaro Comercial</div>
          <div className="cover-accent-bar" />
          <p className="cover-lead">
            Análisis de alternativas y diseño de un lago central en Google Cloud para unificar la información de tres
            nubes (AWS, Azure y GCP), retirar 30 TB de copias duplicadas, garantizar trazabilidad de datos personales y
            asegurar continuidad operativa.
          </p>

          <div className="cover-meta-box">
            <div className="cover-meta-item">
              <span className="cover-meta-label">Asignatura</span>
              <span className="cover-meta-value">Integración de Datos</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-label">Proyecto</span>
              <span className="cover-meta-value">Valleclaro Comercial · Tercer corte</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-label">Fecha</span>
              <span className="cover-meta-value">21 de noviembre de 2026</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-label">Nube seleccionada</span>
              <span className="cover-meta-value">Google Cloud · 89,00 / 100 pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs ejecutivos */}
      <div className="kpi-grid">
        <div className="kpi-card green">
          <div className="kpi-label">
            <Award size={14} /> Decisión de Nube
          </div>
          <div className="kpi-value">89,00 / 100</div>
          <div className="kpi-sub">Google Cloud vs. Azure (73,75) y AWS (66,50)</div>
        </div>

        <div className="kpi-card cyan">
          <div className="kpi-label">
            <Database size={14} /> Inventario Único
          </div>
          <div className="kpi-value">83 TB</div>
          <div className="kpi-sub">−30 TB duplicados retirados (58 TB desde AWS/Azure)</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <ShieldCheck size={14} /> Cierre de Brecha IAM
          </div>
          <div className="kpi-value">≤ 5 / ≤ 15 min</div>
          <div className="kpi-sub">Bloqueo Entra ID / denegación lago (vs. 21 días previos)</div>
        </div>

        <div className="kpi-card gold">
          <div className="kpi-label">
            <Cloud size={14} /> Topología Resiliente
          </div>
          <div className="kpi-value">3 Regiones</div>
          <div className="kpi-sub">Dallas (activa) · Virginia (DR tibio) · Querétaro (bóveda)</div>
        </div>

        <div className="kpi-card azure">
          <div className="kpi-label">
            <Users size={14} /> Plan de Despliegue
          </div>
          <div className="kpi-value">18 meses · 14 TI</div>
          <div className="kpi-sub">3 fases sin contratar personal: Piloto M6 · Exp. M12 · Total M18</div>
        </div>
      </div>

      {/* Problemática actual vs Solución */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">
            <AlertTriangle size={18} color="#c81e1e" /> Problemática Actual de Valleclaro
          </div>
          <ul className="clean-list">
            <li>
              <strong>Tres cifras de venta mensual contradictorias:</strong> informes dispares de{' '}
              <span className="num">COP 4.812M</span>, <span className="num">COP 4.690M</span> y{' '}
              <span className="num">COP 4.935M</span> por múltiples copias sin gobierno.
            </li>
            <li>
              <strong>30 TB de datos duplicados</strong> repartidos entre AWS, Azure y GCP (de 113 TB totales) y un gasto
              de <strong>COP 38 millones/mes</strong> en transferencias entre nubes.
            </li>
            <li>
              <strong>Falla grave de control de acceso:</strong> cuenta de un exempleado activa durante{' '}
              <strong>21 días</strong> en GCP, tres directorios aislados y sin trazabilidad de consultas a datos
              personales (Ley 1581).
            </li>
            <li>
              <strong>Restricción operativa clave:</strong> 1.150 empleados, 48 tiendas y solo 14 personas de TI; las
              bases operativas (tienda AWS, ERP y cajas Azure) <strong>no pueden migrarse</strong>.
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-title">
            <CheckCircle2 size={18} color="#1f6e43" /> Solución Propuesta (Resumen Ejecutivo)
          </div>
          <ul className="clean-list">
            <li>
              <strong>Arquitectura Hub-and-Spoke en GCP (us-south1 Dallas):</strong> lago único 100 % serverless
              (Bronze, Silver en Apache Iceberg, Gold en BigQuery) y bus de eventos Pub/Sub.
            </li>
            <li>
              <strong>Ingesta sin tocar las bases operativas:</strong> Datastream (CDC), Pub/Sub y Storage Transfer
              ingieren ~2,3 TB/mes (~77 GB/día) con latencias de 1 a 5 min en datos críticos.
            </li>
            <li>
              <strong>Una identidad corporativa:</strong> Microsoft Entra ID federado a las 3 nubes (Workforce +
              Workload sin claves JSON), RBAC en 8 grupos, policy tags y auditoría auditable.
            </li>
            <li>
              <strong>Resiliencia probada con simulacros:</strong> RTO objetivo 2 h (inventario), 4 h (ventas), 8 h
              (clientes) y 24 h (analítica), respaldados en Virginia (MDR + bucket dual) y bóveda inmutable en Querétaro.
            </li>
          </ul>
        </div>
      </div>

      {/* Mapa interactivo de las 5 secciones */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <Layers size={19} /> Recorrido Estructurado de la Propuesta
        </h2>
        <div className="grid-3">
          {[
            {
              tabIdx: 1,
              badge: 'Sección 1',
              title: 'Análisis de Alternativas',
              metric: 'GCP 89,00 pts',
              text: 'Comparación ponderada de 6 criterios, 7 capacidades de herramientas, tarifas de egreso y plan de portabilidad a 4 etapas.',
            },
            {
              tabIdx: 2,
              badge: 'Sección 2 · Diagrama',
              title: 'Arquitectura Multinube',
              metric: '83 TB · Hub-and-Spoke',
              text: 'Diagrama interactivo con zoom, capas Bronze/Silver/Gold, flujos de ingesta, red HA VPN/BGP, plan CIDR y regla de repositorio único.',
            },
            {
              tabIdx: 3,
              badge: 'Sección 3',
              title: 'Seguridad y Cumplimiento',
              metric: 'Entra ID · Ley 1581',
              text: 'Federación única, RBAC por 8 grupos, protocolo de baja ≤ 15 min, auditoría, lista SIC, checklist DR 3.9.1 y 10 pruebas SEC.',
            },
            {
              tabIdx: 4,
              badge: 'Sección 4',
              title: 'Replicación y Resiliencia',
              metric: 'RTO 2h / 4h / 8h / 24h',
              text: 'Dallas + Virginia + Querétaro, runbook DR-RB-01 (pasos 0–8), dependencias D-1 a D-10, copias 3-2-1, pruebas DR y costo incremental.',
            },
            {
              tabIdx: 5,
              badge: 'Sección 5',
              title: 'Costos, FinOps y Cronograma',
              metric: 'COP 687,4M (18 m) · 3 Fases',
              text: 'Modelo financiero preliminar, sensibilidad, etiquetas y alertas FinOps, observabilidad, RACI de 14 personas y Gantt de 18 meses.',
            },
          ].map((item) => (
            <button
              key={item.tabIdx}
              type="button"
              className="arch-layer-card"
              onClick={() => onNavigateTab(item.tabIdx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span className="badge badge-navy">{item.badge}</span>
                <span className="badge badge-cyan">{item.metric}</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 16,
                  color: 'var(--vc-cobalt)',
                  marginBottom: 6,
                }}
              >
                {item.title}
              </div>
              <p className="card-text" style={{ marginBottom: 12 }}>
                {item.text}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: 'var(--vc-royal)',
                }}
              >
                Explorar sección <ArrowRight size={14} />
              </span>
            </button>
          ))}

          {/* Tarjeta de condición ejecutiva */}
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              borderColor: '#fcd34d',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <DollarSign size={18} color="#b46900" />
                <strong style={{ fontFamily: 'var(--font-display)', color: '#78350f', fontSize: 15 }}>
                  Condición de Aprobación Económica
                </strong>
              </div>
              <p style={{ fontSize: 13.5, color: '#78350f', lineHeight: 1.55 }}>
                El cálculo preliminar (Sec. 5) aún debe conciliarse con los volúmenes reales de diseño (83 TB, Sec. 2) y
                la capacidad de resiliencia Enterprise Plus / TRM (Sec. 4).
              </p>
            </div>
            <div
              style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: '1px solid rgba(180, 105, 0, 0.25)',
                fontSize: 12.5,
                fontWeight: 700,
                color: '#92400e',
              }}
            >
              Meta pendiente por demostrar: techo COP 1.800M Año 1 y COP 210M/mes consolidado 3 nubes al mes 18.
            </div>
          </div>
        </div>
      </div>

      {/* Recomendación Ejecutiva Final */}
      <div className="callout warn" style={{ marginTop: 24 }}>
        <div className="callout-icon">
          <Clock size={20} color="#b46900" />
        </div>
        <div>
          <div className="callout-title">Recomendación Ejecutiva: Avanzar con Piloto (Meses 1–6) y Cerrar Conciliación</div>
          <div className="callout-body">
            La recomendación formal del documento es <strong>iniciar la Fase 1 (piloto)</strong> para validar en campo
            los volúmenes reales, las latencias de ingesta, el protocolo de baja de usuarios (≤ 15 min) y la
            conciliación presupuestal consolidada (límite de COP 1.800 millones en año 1 y meta de COP 210 millones
            mensuales entre las tres nubes al mes 18) <strong>antes de comprometer la expansión de la Fase 2</strong>.
            Adicionalmente, el tratamiento de datos personales y los flujos internacionales requieren validación jurídica
            y contractual previa.
          </div>
        </div>
      </div>
    </div>
  );
}

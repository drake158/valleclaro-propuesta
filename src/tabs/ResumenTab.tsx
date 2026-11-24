import {
  ArrowRight,
  Award,
  CheckCircle2,
  FlaskConical,
  Layers,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ValleclaroLogo } from '../components/ValleclaroLogo';
import { BEFORE_AFTER } from '../data/valleclaroData';

interface ResumenTabProps {
  onNavigateTab: (index: number) => void;
}

export function ResumenTab({ onNavigateTab }: ResumenTabProps) {
  return (
    <div className="slide-enter">
      {/* Pitch Cover Hero */}
      <section className="pitch-hero">
        <div className="pitch-hero-grid">
          <div>
            <div className="hero-brand-chip">
              <ValleclaroLogo compact />
              <span className="badge-case">Pitch Técnico · 2026</span>
            </div>
            <h1 className="hero-headline">
              Un solo lago en <span>Google Cloud</span> para tres nubes
            </h1>
            <p className="hero-sub">
              Unifica ventas, retira 30 TB duplicados y blinda datos personales sin migrar AWS ni Azure — operado por el
              equipo actual de 14 personas.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button
                type="button"
                className="btn-action primary"
                style={{ padding: '10px 16px', fontSize: 13 }}
                onClick={() => onNavigateTab(2)}
              >
                <Layers size={15} /> Ver Arquitectura
              </button>
              <button
                type="button"
                className="btn-action"
                style={{ padding: '10px 16px', fontSize: 13 }}
                onClick={() => onNavigateTab(5)}
              >
                <TrendingUp size={15} /> Ver Finanzas Conciliadas
              </button>
              <button
                type="button"
                className="btn-action"
                style={{ padding: '10px 16px', fontSize: 13 }}
                onClick={() => onNavigateTab(6)}
              >
                <FlaskConical size={15} /> Ver PoC (4 semanas)
              </button>
            </div>
          </div>

          <div className="hero-kpi-quad">
            <div className="hero-stat">
              <div className="hero-stat-lbl">Decisión Cloud</div>
              <div className="hero-stat-val">89,0 / 100</div>
              <div className="hero-stat-sub">GCP #1 vs. Azure 73,8 · AWS 66,5</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-lbl">Presupuesto Año 1</div>
              <div className="hero-stat-val">COP 880M</div>
              <div className="hero-stat-sub">Bajo techo 1.800M (margen 920M)</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-lbl">Inventario Único</div>
              <div className="hero-stat-val">83 TB</div>
              <div className="hero-stat-sub">−30 TB duplicados · 138,6 TB M18</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-lbl">Despliegue</div>
              <div className="hero-stat-val">18m · 14 TI</div>
              <div className="hero-stat-sub">3 fases · 0 nuevas plazas · PoC 20,7M</div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformación visual Hoy -> Propuesta */}
      <div className="bento-4">
        {BEFORE_AFTER.map((item) => (
          <div className="deck-card" key={item.metric} style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 10 }}>
              {item.metric}
            </div>
            <div
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                background: 'var(--vc-danger-soft)',
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--vc-danger)', textTransform: 'uppercase' }}>Hoy</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#991b1b' }}>
                {item.before}
              </div>
              <div style={{ fontSize: 11.5, color: '#991b1b' }}>{item.beforeSub}</div>
            </div>

            <div
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                background: 'var(--vc-gcp-green-soft)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--vc-gcp-green)', textTransform: 'uppercase' }}>Con Lago Único</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#14532d' }}>
                {item.after}
              </div>
              <div style={{ fontSize: 11.5, color: '#166534' }}>{item.afterSub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Acceso rápido visual a cada slide del pitch */}
      <div className="bento-3">
        {[
          { idx: 1, icon: Award, tag: '01 · Nube', title: 'GCP gana 89/100', sub: 'Matriz 6 criterios + simulador egreso' },
          { idx: 2, icon: Layers, tag: '02 · Hub', title: 'Hub-and-Spoke Dallas', sub: 'Diagrama interactivo + latencias ≤ 5 min' },
          { idx: 3, icon: ShieldCheck, tag: '03 · Seguridad', title: 'Entra ID + Ley 1581', sub: 'Baja ≤ 15 min + RBAC 8 roles + SEC-01..10' },
          { idx: 4, icon: RefreshCw, tag: '04 · Resiliencia', title: 'Dallas · Virginia · Querétaro', sub: 'RTO 2h/4h/8h/24h + Runbook DR-RB-01' },
          { idx: 5, icon: TrendingUp, tag: '05 · Finanzas', title: 'COP 85,3M/mes al M18', sub: 'Simulador equilibrio 210M + OKRs + Gantt' },
          { idx: 6, icon: FlaskConical, tag: '06 · PoC', title: 'Anexo A · Piloto 4 Sem.', sub: '100k registros · 280 h · COP 20,7M' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.idx}
              type="button"
              className="node-btn"
              onClick={() => onNavigateTab(card.idx)}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8, padding: 16 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-navy">{card.tag}</span>
                <Icon size={17} color="#0ea5e9" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--vc-cobalt)' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{card.sub}</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: 'var(--vc-royal)' }}>
                Abrir slide <ArrowRight size={13} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Decisión ejecutiva en 1 línea */}
      <div
        className="deck-card dark"
        style={{
          padding: '16px 22px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CheckCircle2 size={22} color="#38bdf8" />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15 }}>
              Recomendación: Ejecutar Piloto (Meses 1–6) y verificar bajas de COP 85,3M/mes antes de expandir
            </div>
            <div style={{ fontSize: 12.5, color: '#cbd5e1' }}>
              Año 1 (COP 879,95M) cumple el techo de 1.800M; mantener el tope consolidado de COP 210M/mes exige bajas
              verificadas de gasto previo sin doble conteo.
            </div>
          </div>
        </div>
        <span className="badge" style={{ background: 'rgba(242,153,29,0.2)', color: '#fbbf24' }}>
          TRM 3.500 COP/USD
        </span>
      </div>
    </div>
  );
}

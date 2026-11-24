import { useState } from 'react';
import { CheckCircle2, Clock, DollarSign, FlaskConical, Info, ShieldCheck, Users } from 'lucide-react';
import { DonutChart } from '../components/DonutChart';
import { SectionHeader } from '../components/SectionHeader';
import { POC_BUDGET, POC_SPRINTS, RTO_RPO_CHART, TEAM_14 } from '../data/valleclaroData';

export function PocTab() {
  const [selectedBudgetIdx, setSelectedBudgetIdx] = useState<number | null>(0);
  const [lookerUsd, setLookerUsd] = useState<number>(3000);

  // Fórmula oficial Anexo A.6.2: (2.142 + Looker USD) * 3.500 * 1,15
  const totalPocCop = (2142 + lookerUsd) * 3500 * 1.15;
  const totalPocUsd = (2142 + lookerUsd) * 1.15;

  return (
    <div className="slide-enter">
      <SectionHeader
        kicker="Slide 06 · Anexo A · Prueba de Concepto Simulada"
        title="Piloto de 4 semanas: 100k registros y COP 20,70M"
        tagline="Simulación académica con datos sintéticos (3 tiendas, 100 productos, 14 personas / 280 h) para validar coherencia antes del despliegue real."
      />

      {/* 4 KPIs de la PoC */}
      <div className="bento-4">
        <div className="kpi-tile cyan">
          <div className="kpi-tile-lbl">Duración y Alcance</div>
          <div className="kpi-tile-val">4 Semanas</div>
          <div className="kpi-tile-sub">3 tiendas · 100 productos · 5 usuarios</div>
        </div>
        <div className="kpi-tile green">
          <div className="kpi-tile-lbl">Calidad Sintética</div>
          <div className="kpi-tile-val">97,5 % Válidos</div>
          <div className="kpi-tile-sub">97.500 OK · 2.000 dup. · 500 cuarentena</div>
        </div>
        <div className="kpi-tile">
          <div className="kpi-tile-lbl">Esfuerzo Interno</div>
          <div className="kpi-tile-val">280 Horas</div>
          <div className="kpi-tile-sub">14 personas existentes · 0 contrataciones</div>
        </div>
        <div className="kpi-tile gold">
          <div className="kpi-tile-lbl">Presupuesto PoC</div>
          <div className="kpi-tile-val">COP 20,70M</div>
          <div className="kpi-tile-sub">USD 5.913,30 (incluye 15 % reserva)</div>
        </div>
      </div>

      {/* Sprints 4 semanas */}
      <div className="bento-4">
        {POC_SPRINTS.map((sp, idx) => (
          <div
            key={sp.week}
            className="deck-card"
            style={{
              padding: '14px 16px',
              borderTop: `3px solid ${idx === 3 ? '#1f6e43' : '#0ea5e9'}`,
            }}
          >
            <span className="badge badge-navy mono" style={{ marginBottom: 6 }}>{sp.week}</span>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--vc-cobalt)' }}>
              {sp.title}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>{sp.deliverable}</div>
          </div>
        ))}
      </div>

      {/* Gráficos de resultados simulados: Calidad/Seguridad + Horas por equipo */}
      <div className="bento-2">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <ShieldCheck size={16} /> Resultados Simulados de Calidad y Seguridad (A.4)
            </span>
            <span className="badge badge-gcp">8/8 Criterios OK</span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { label: 'Oportunidad hasta Gold (≤ 5 min)', val: '96 / 100 ciclos', pct: 96, color: '#1f6e43', meta: 'Meta ≥ 95' },
              { label: 'Rechazo de consultas no autorizadas', val: '20 / 20 bloqueados', pct: 100, color: '#0f2d6b', meta: 'Meta 100 %' },
              { label: 'Baja efectiva de usuario (≤ 15 min)', val: '12 min', pct: 80, color: '#0ea5e9', meta: 'Meta ≤ 15m' },
              { label: 'Restauración tabla DR-1 (≤ 30 min)', val: '24 min (dif. 0)', pct: 80, color: '#f2991d', meta: 'Meta ≤ 30m' },
            ].map((m) => (
              <div className="hbar-row" key={m.label} style={{ marginBottom: 4 }}>
                <div className="hbar-meta">
                  <span style={{ fontWeight: 600 }}>{m.label}</span>
                  <span className="mono" style={{ fontWeight: 700, color: m.color }}>
                    {m.val} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({m.meta})</span>
                  </span>
                </div>
                <div className="hbar-track" style={{ height: 9 }}>
                  <div className="hbar-fill" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Mini resumen RTO/RPO simulados */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
            {RTO_RPO_CHART.map((r) => (
              <div key={r.name} style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-light)', borderRadius: 9, padding: '8px 9px', textAlign: 'center' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)' }}>{r.name.split(' ')[0]}</div>
                <div className="mono" style={{ fontWeight: 800, fontSize: 13, color: '#1f6e43', marginTop: 2 }}>{r.rtoPocLbl}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--vc-cobalt)' }}>RPO {r.rpoPocLbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Presupuesto PoC (Donut + Simulador Looker A.6.2) */}
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <DollarSign size={16} /> Presupuesto PoC (COP 20,70M · 4 Sem.)
            </span>
            <span className="badge badge-gold">Looker = 58 % subtotal</span>
          </div>

          <DonutChart
            slices={POC_BUDGET.map((b) => ({ label: b.item, value: b.usd, color: b.color }))}
            centerValue="$5.913"
            centerLabel="USD (20,7M)"
            size={162}
            selectedIndex={selectedBudgetIdx}
            onSelect={(idx) => setSelectedBudgetIdx(idx)}
          />

          <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-tint)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              <span>Simular costo mensual asignable Looker (A.6.2):</span>
              <span className="mono" style={{ color: 'var(--vc-cobalt)' }}>USD {lookerUsd.toLocaleString('es-CO')}</span>
            </div>
            <input
              type="range"
              className="vc-slider"
              min={0}
              max={5000}
              step={250}
              value={lookerUsd}
              onChange={(e) => setLookerUsd(Number(e.target.value))}
              style={{ marginBottom: 8 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total PoC (+15 % reserva):</span>
              <strong className="mono" style={{ color: 'var(--vc-cobalt)' }}>
                COP {(totalPocCop / 1_000_000).toFixed(2).replace('.', ',')}M (USD {totalPocUsd.toFixed(0)})
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Distribución de las 280 horas por equipo + Nota de alcance académico */}
      <div className="bento-2" style={{ marginBottom: 0 }}>
        <div className="deck-card">
          <div className="card-head" style={{ marginBottom: 10 }}>
            <span className="card-head-title">
              <Users size={16} /> Dedicación del Equipo en la PoC (280 h totales)
            </span>
            <span className="badge badge-navy">
              <Clock size={11} /> Sin doble conteo en Año 1
            </span>
          </div>
          {TEAM_14.map((t) => (
            <div className="hbar-row" key={t.area}>
              <div className="hbar-meta">
                <span style={{ fontWeight: 600 }}>{t.area} ({t.count} pers.)</span>
                <strong className="mono" style={{ color: t.color }}>{t.pocHours} h ({Math.round((t.pocHours / 280) * 100)} %)</strong>
              </div>
              <div className="hbar-track" style={{ height: 9 }}>
                <div className="hbar-fill" style={{ width: `${(t.pocHours / 150) * 100}%`, background: t.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="deck-card dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-head">
              <span className="card-head-title">
                <FlaskConical size={16} color="#38bdf8" /> Transparencia y Alcance Académico
              </span>
              <span className="badge badge-cyan">Simulación</span>
            </div>
            <p style={{ fontSize: 13, color: '#dbeafe', lineHeight: 1.55, marginBottom: 12 }}>
              Esta PoC es una <strong>simulación académica con datos sintéticos</strong> para verificar la coherencia del
              piloto. No acredita CDC real, túneles operativos ni escalado automático a los 83 TB de producción.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="badge" style={{ background: 'rgba(34,197,94,0.2)', color: '#86efac' }}>
              <CheckCircle2 size={12} /> Incluida dentro de Fase 1 (no suma doble)
            </span>
            <span className="badge" style={{ background: 'rgba(56,189,248,0.2)', color: '#7dd3fc' }}>
              <Info size={12} /> Cotizar Looker antes del Mes 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

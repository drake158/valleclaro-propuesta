import { ArrowDown } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { BEFORE_AFTER } from '../data/valleclaroData';

export function ProblemSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <SectionHeader
        kicker="02 · Diagnóstico"
        title="El problema actual y el salto operativo"
        subtitle="Cuatro brechas críticas resueltas con el equipo actual de 14 personas."
      />

      {/* 4 sharp vertical editorial columns */}
      <div className="g-4" style={{ flex: 1, alignItems: 'stretch', margin: '8px 0 16px' }}>
        {BEFORE_AFTER.map((item, idx) => (
          <div
            key={item.metric}
            className="panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '2px solid var(--vc-cobalt)',
            }}
          >
            <div className="panel-label">
              <span>0{idx + 1}</span>
              <span>{item.metric}</span>
            </div>

            {/* Estado actual */}
            <div style={{ padding: '14px 12px', background: 'var(--vc-danger-soft)', borderLeft: '2px solid var(--vc-danger)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--vc-danger)', letterSpacing: '0.1em' }}>HOY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: '#8f1616', marginTop: 4 }}>
                {item.before}
              </div>
              <div style={{ fontSize: 12, color: '#991b1b', marginTop: 2 }}>{item.beforeSub}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0', color: 'var(--ink-soft)' }}>
              <ArrowDown size={16} />
            </div>

            {/* Estado objetivo */}
            <div style={{ padding: '14px 12px', background: 'var(--vc-gcp-soft)', borderLeft: '2px solid var(--vc-gcp)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--vc-gcp)', letterSpacing: '0.1em' }}>LAGO ÚNICO</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: '#14532d', marginTop: 4 }}>
                {item.after}
              </div>
              <div style={{ fontSize: 12, color: '#166534', marginTop: 2 }}>{item.afterSub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 1-line design guardrail */}
      <div className="panel-tint" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, padding: '12px 18px' }}>
        <span style={{ fontSize: 13, color: 'var(--ink-mid)' }}>
          Restricción clave: las bases operativas (tienda AWS, ERP y 48 cajas Azure) no se migran.
        </span>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="tag tag-navy">1.150 empleados</span>
          <span className="tag tag-navy">48 tiendas</span>
          <span className="tag tag-cyan">14 personas TI</span>
        </div>
      </div>
    </div>
  );
}

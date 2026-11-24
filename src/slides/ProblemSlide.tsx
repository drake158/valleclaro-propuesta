import { ArrowDown } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { BEFORE_AFTER } from '../data/valleclaroData';

export function ProblemSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionHeader
        kicker="02 · Diagnóstico"
        title={
          <>
            Del <strong>desorden multinube</strong> a una <strong>sola verdad</strong>
          </>
        }
        subtitle="Cuatro brechas críticas resueltas con el equipo actual de 14 personas."
      />

      <div className="g-4">
        {BEFORE_AFTER.map((item, idx) => (
          <div
            key={item.metric}
            className="panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              borderTop: '2px solid var(--vc-cobalt)',
            }}
          >
            <div className="panel-label" style={{ marginBottom: 4 }}>
              <span>0{idx + 1}</span>
              <span>{item.metric}</span>
            </div>

            <div style={{ padding: '14px 12px', background: 'var(--vc-danger-soft)', borderLeft: '2px solid var(--vc-danger)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--vc-danger)', letterSpacing: '0.1em' }}>HOY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, color: '#8f1616', marginTop: 4 }}>
                {item.before}
              </div>
              <div style={{ fontSize: 12, color: '#991b1b', marginTop: 2 }}>{item.beforeSub}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--ink-soft)' }}>
              <ArrowDown size={15} />
            </div>

            <div style={{ padding: '14px 12px', background: 'var(--vc-gcp-soft)', borderLeft: '2px solid var(--vc-gcp)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--vc-gcp)', letterSpacing: '0.1em' }}>LAGO ÚNICO</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, color: '#14532d', marginTop: 4 }}>
                {item.after}
              </div>
              <div style={{ fontSize: 12, color: '#166534', marginTop: 2 }}>{item.afterSub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alcance y restricción operativa */}
      <div className="panel-dark" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, padding: '14px 20px' }}>
        <div style={{ fontSize: 13.5, color: '#e2e8f0' }}>
          <strong style={{ color: '#38bdf8' }}>Restricción clave:</strong> las bases operativas (tienda AWS, ERP y 48
          cajas Azure) permanecen en sus nubes actuales sin migrarse.
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="mono" style={{ fontSize: 11.5, color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 9px' }}>
            1.150 empleados
          </span>
          <span className="mono" style={{ fontSize: 11.5, color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 9px' }}>
            48 tiendas
          </span>
          <span className="mono" style={{ fontSize: 11.5, color: '#38bdf8', border: '1px solid rgba(56,189,248,0.4)', padding: '3px 9px' }}>
            14 TI · 0 plazas nuevas
          </span>
        </div>
      </div>
    </div>
  );
}

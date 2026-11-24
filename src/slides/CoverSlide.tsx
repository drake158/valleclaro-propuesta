import { ArrowRight } from 'lucide-react';
import { ValleclaroLogo } from '../components/ValleclaroLogo';

interface CoverSlideProps {
  onNext: () => void;
}

export function CoverSlide({ onNext }: CoverSlideProps) {
  return (
    <div className="cover-stage">
      {/* Top branding block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ background: '#ffffff', padding: '10px 18px', display: 'inline-flex', alignItems: 'center' }}>
          <ValleclaroLogo />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: '#7dd3fc' }}>
            INTEGRACIÓN DE DATOS · TERCER CORTE
          </span>
          <span
            style={{
              background: '#0ea5e9',
              color: '#071327',
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            CASO 2026
          </span>
        </div>
      </div>

      {/* Center hero statement */}
      <div style={{ margin: 'auto 0', padding: '24px 0' }}>
        <h1 className="cover-h1">
          Un solo <strong>lago de datos</strong> en <strong>Google Cloud</strong> para tres nubes
        </h1>
        <div className="cover-accent-line" />
        <p className="cover-lead">
          Cifra única de ventas, retiro de 30 TB duplicados y trazabilidad de datos personales — conservando AWS y Azure.
        </p>

        <button
          type="button"
          onClick={onNext}
          style={{
            marginTop: 26,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 18px',
            border: '1px solid #0ea5e9',
            background: 'rgba(14, 165, 233, 0.14)',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: 13.5,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Comenzar presentación <ArrowRight size={15} />
        </button>
      </div>

      {/* Bottom 4 executive metrics */}
      <div className="cover-kpi-strip">
        <div>
          <div className="cover-kpi-lbl">Nube elegida</div>
          <div className="cover-kpi-val">89,0 / 100</div>
          <div className="cover-kpi-sub">GCP #1 · Azure 73,8 · AWS 66,5</div>
        </div>
        <div>
          <div className="cover-kpi-lbl">Lago único</div>
          <div className="cover-kpi-val">83 TB</div>
          <div className="cover-kpi-sub">−30 TB duplicados retirados</div>
        </div>
        <div>
          <div className="cover-kpi-lbl">Presupuesto Año 1</div>
          <div className="cover-kpi-val">COP 880M</div>
          <div className="cover-kpi-sub">Techo 1.800M · M18: 85,3M/mes</div>
        </div>
        <div>
          <div className="cover-kpi-lbl">Ejecución</div>
          <div className="cover-kpi-val">18m · 14 TI</div>
          <div className="cover-kpi-sub">3 fases · PoC 4 sem. (20,7M)</div>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface TabMeta {
  id: string;
  shortLabel: string;
  fullLabel: string;
  num: string;
}

interface TabFooterNavProps {
  tabs: TabMeta[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function TabFooterNav({ tabs, activeIndex, onSelect }: TabFooterNavProps) {
  const prevTab = activeIndex > 0 ? tabs[activeIndex - 1] : null;
  const nextTab = activeIndex < tabs.length - 1 ? tabs[activeIndex + 1] : null;

  return (
    <nav className="tab-footer-nav" aria-label="Navegación entre secciones">
      <div>
        {prevTab ? (
          <button
            type="button"
            className="nav-step-btn"
            onClick={() => onSelect(activeIndex - 1)}
          >
            <ArrowLeft size={17} />
            <span style={{ textAlign: 'left' }}>
              <span className="nav-step-sub">Anterior sección</span>
              {prevTab.fullLabel}
            </span>
          </button>
        ) : (
          <span className="badge badge-navy">Inicio de la propuesta</span>
        )}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600 }}>
        Sección {activeIndex + 1} de {tabs.length} · Usa <span className="mono">←</span> /{' '}
        <span className="mono">→</span> para cambiar
      </div>

      <div>
        {nextTab ? (
          <button
            type="button"
            className="nav-step-btn next"
            onClick={() => onSelect(activeIndex + 1)}
          >
            <span style={{ textAlign: 'right' }}>
              <span className="nav-step-sub">Siguiente sección</span>
              {nextTab.fullLabel}
            </span>
            <ArrowRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            className="nav-step-btn next"
            onClick={() => onSelect(0)}
          >
            <span style={{ textAlign: 'right' }}>
              <span className="nav-step-sub">Volver al inicio</span>
              Resumen Ejecutivo
            </span>
            <ArrowRight size={17} />
          </button>
        )}
      </div>
    </nav>
  );
}

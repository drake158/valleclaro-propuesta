import { useEffect, useState } from 'react';
import { Maximize2, Minimize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';

interface ArchitectureLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureLightbox({ src, alt, isOpen, onClose }: ArchitectureLightboxProps) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    setZoom(1);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((z) => Math.min(2.6, Number((z + 0.25).toFixed(2))));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoom((z) => Math.max(0.6, Number((z - 0.25).toFixed(2))));
      } else if (e.key === '0') {
        e.preventDefault();
        setZoom(1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada del diagrama de arquitectura"
      onClick={onClose}
    >
      <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Maximize2 size={17} color="#0ea5e9" />
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>
            Valleclaro · Hub Multinube y Lago Único (Alta Resolución)
          </strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-action"
            onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.25).toFixed(2))))}
            title="Alejar (-)"
          >
            <ZoomOut size={15} />
          </button>
          <span className="mono" style={{ minWidth: 50, textAlign: 'center', fontSize: 13 }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            className="btn-action"
            onClick={() => setZoom((z) => Math.min(2.6, Number((z + 0.25).toFixed(2))))}
            title="Acercar (+)"
          >
            <ZoomIn size={15} />
          </button>
          <button
            type="button"
            className="btn-action"
            onClick={() => setZoom(1)}
            title="Restablecer zoom (0)"
          >
            <RotateCcw size={14} /> Ajustar
          </button>
          <button
            type="button"
            className="btn-action"
            onClick={() => setZoom((z) => (z === 1.75 ? 1 : 1.75))}
          >
            {zoom === 1.75 ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {zoom === 1.75 ? 'Normal' : '175%'}
          </button>
          <button
            type="button"
            className="btn-action primary"
            onClick={onClose}
            title="Cerrar (Esc)"
          >
            <X size={15} /> Cerrar
          </button>
        </div>
      </div>

      <div className="lightbox-viewport" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          style={{
            width: `${Math.round(zoom * 92)}vw`,
            maxHeight: zoom === 1 ? '82vh' : 'none',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
}

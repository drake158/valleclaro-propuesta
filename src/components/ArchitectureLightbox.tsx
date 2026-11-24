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
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Diagrama de arquitectura ampliado"
      onClick={onClose}
    >
      <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 500 }}>
          Valleclaro · Hub Multinube y Lago Único
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button type="button" className="btn-action" onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.25).toFixed(2))))}>
            <ZoomOut size={14} />
          </button>
          <span className="mono" style={{ minWidth: 46, textAlign: 'center', fontSize: 12 }}>
            {Math.round(zoom * 100)}%
          </span>
          <button type="button" className="btn-action" onClick={() => setZoom((z) => Math.min(2.6, Number((z + 0.25).toFixed(2))))}>
            <ZoomIn size={14} />
          </button>
          <button type="button" className="btn-action" onClick={() => setZoom(1)}>
            <RotateCcw size={13} /> Ajustar
          </button>
          <button type="button" className="btn-action" onClick={() => setZoom((z) => (z === 1.75 ? 1 : 1.75))}>
            {zoom === 1.75 ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button type="button" className="btn-action primary" onClick={onClose}>
            <X size={14} /> Cerrar
          </button>
        </div>
      </div>

      <div className="lightbox-viewport" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          style={{
            width: `${Math.round(zoom * 90)}vw`,
            maxHeight: zoom === 1 ? '84vh' : 'none',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
}

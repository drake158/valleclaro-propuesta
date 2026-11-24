import { useState } from 'react';
import { Expand } from 'lucide-react';
import { ArchitectureLightbox } from '../components/ArchitectureLightbox';
import { SectionHeader } from '../components/SectionHeader';

const ARCH_IMAGE_PATH = `${import.meta.env.BASE_URL}assets/valleclaro-arquitectura-multinube.png`;

export function ArchDiagramSlide() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
      <SectionHeader
        kicker="04 · Arquitectura · Diagrama"
        title={
          <>
            Topología <strong>Hub-and-Spoke</strong> en <strong>Dallas</strong>
          </>
        }
        subtitle="GCP concentra lago y bus; AWS y Azure conectan por túnel cifrado sin tránsito directo."
      />

      {/* Diagrama a máxima escala y limpieza */}
      <div
        className="panel"
        style={{
          flex: 1,
          minHeight: 0,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'zoom-in',
          background: '#ffffff',
        }}
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setLightboxOpen(true);
          }
        }}
      >
        <img
          src={ARCH_IMAGE_PATH}
          alt="Valleclaro: Hub Multinube y Lago Único"
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            border: '1px solid var(--vc-cobalt)',
            background: 'var(--vc-midnight)',
            color: '#ffffff',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          <Expand size={13} /> Ampliar / Zoom
        </button>
      </div>

      {/* Tira resumen inferior */}
      <div className="g-4">
        <div className="panel-tint" style={{ padding: '9px 14px', borderLeft: '2px solid #dd6b20' }}>
          <div className="mono" style={{ fontSize: 10, color: '#dd6b20' }}>SPOKE AWS</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mid)' }}>Tienda · App · RDS · Kinesis</div>
        </div>
        <div className="panel-tint" style={{ padding: '9px 14px', borderLeft: '2px solid #1f6e43' }}>
          <div className="mono" style={{ fontSize: 10, color: '#1f6e43' }}>HUB GCP DALLAS</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mid)' }}>Bronze · Silver Iceberg · Gold · Pub/Sub</div>
        </div>
        <div className="panel-tint" style={{ padding: '9px 14px', borderLeft: '2px solid #0078d4' }}>
          <div className="mono" style={{ fontSize: 10, color: '#0078d4' }}>SPOKE AZURE</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mid)' }}>ERP SQL · Heredados · 48 Cajas</div>
        </div>
        <div className="panel-tint" style={{ padding: '9px 14px', borderLeft: '2px solid #0f2d6b' }}>
          <div className="mono" style={{ fontSize: 10, color: '#0f2d6b' }}>RED PRIVADA</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mid)' }}>HA VPN 99,99 % · PSC · Cero tránsito</div>
        </div>
      </div>

      <ArchitectureLightbox
        src={ARCH_IMAGE_PATH}
        alt="Valleclaro: Hub Multinube y Lago Único"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}

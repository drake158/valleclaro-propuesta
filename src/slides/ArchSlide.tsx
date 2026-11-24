import { useState } from 'react';
import { Expand } from 'lucide-react';
import { ArchitectureLightbox } from '../components/ArchitectureLightbox';
import { SectionHeader } from '../components/SectionHeader';
import { ARCH_NODES } from '../data/valleclaroData';

const ARCH_IMAGE_PATH = `${import.meta.env.BASE_URL}assets/valleclaro-arquitectura-multinube.png`;

export function ArchSlide() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeId, setActiveId] = useState(ARCH_NODES[0].id);

  const active = ARCH_NODES.find((n) => n.id === activeId) ?? ARCH_NODES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, justifyContent: 'space-between', gap: 12 }}>
      <SectionHeader
        kicker="04 · Arquitectura"
        title="Hub-and-Spoke en Google Cloud Dallas"
        subtitle="Sin tránsito directo AWS ↔ Azure · 100 % serverless."
      />

      {/* Diagrama protagonista en alta calidad */}
      <div
        className="panel"
        style={{
          flex: 1,
          minHeight: 0,
          padding: 10,
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
            top: 10,
            right: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            border: '1px solid var(--vc-cobalt)',
            background: 'var(--vc-midnight)',
            color: '#ffffff',
            fontSize: 11.5,
            cursor: 'pointer',
          }}
        >
          <Expand size={13} /> Zoom
        </button>
      </div>

      {/* Selector horizontal minimalista de capas */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {ARCH_NODES.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`chip-btn ${n.id === active.id ? 'active' : ''}`}
              onClick={() => setActiveId(n.id)}
            >
              {n.title}
            </button>
          ))}
        </div>

        <div
          className="panel-dark"
          style={{
            padding: '12px 18px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span className="mono" style={{ color: '#38bdf8', fontSize: 11.5 }}>{active.net}</span>
            <span style={{ color: '#e2e8f0', fontSize: 13 }}>{active.bullets[0]}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {active.chips.slice(0, 3).map((c) => (
              <span key={c} className="mono" style={{ fontSize: 11, color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.18)', padding: '2px 7px' }}>
                {c}
              </span>
            ))}
            <span className="mono" style={{ color: '#fbbf24', fontSize: 12 }}>{active.kpi}</span>
          </div>
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

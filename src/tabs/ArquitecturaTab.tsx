import { useState } from 'react';
import { Database, Expand, Gauge, Layers, Lock, ZoomIn } from 'lucide-react';
import { ArchitectureLightbox } from '../components/ArchitectureLightbox';
import { SectionHeader } from '../components/SectionHeader';
import { ARCH_NODES, INGESTION_BARS, STORAGE_GROWTH } from '../data/valleclaroData';

const ARCH_IMAGE_PATH = `${import.meta.env.BASE_URL}assets/valleclaro-arquitectura-multinube.png`;

export function ArquitecturaTab() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeId, setActiveId] = useState(ARCH_NODES[0].id);

  const activeNode = ARCH_NODES.find((n) => n.id === activeId) ?? ARCH_NODES[0];

  return (
    <div className="slide-enter">
      <SectionHeader
        kicker="Slide 02 · Arquitectura Multinube"
        title="Topología Hub-and-Spoke en Dallas"
        tagline="GCP centraliza el lago (Bronze · Silver Iceberg · Gold) y el bus Pub/Sub; cero tránsito directo AWS ↔ Azure."
      />

      {/* Diagrama Maestro en Alta Calidad + Lightbox */}
      <div className="arch-showcase">
        <div className="arch-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700 }}>
            <Layers size={16} color="#38bdf8" />
            <span>Valleclaro · Hub Multinube y Lago Único</span>
          </div>
          <button type="button" className="btn-action primary" onClick={() => setLightboxOpen(true)}>
            <Expand size={14} /> Ampliar / Zoom
          </button>
        </div>

        <div
          className="arch-stage"
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
            alt="Diagrama de arquitectura Valleclaro: Hub Multinube y Lago Único"
          />
          <span className="arch-zoom-pill">
            <ZoomIn size={13} /> Clic para zoom interactivo
          </span>
        </div>
      </div>

      <ArchitectureLightbox
        src={ARCH_IMAGE_PATH}
        alt="Valleclaro: Hub Multinube y Lago Único"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Explorador Interactivo de los 8 Componentes */}
      <div className="bento-4" style={{ marginBottom: 12 }}>
        {ARCH_NODES.map((node) => {
          const selected = node.id === activeNode.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`node-btn ${selected ? 'active' : ''}`}
              onClick={() => setActiveId(node.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span className={`badge ${node.tagClass}`}>{node.tag}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13.5, color: 'var(--vc-cobalt)' }}>
                {node.title}
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                {node.kpi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Ficha oscura del componente activo */}
      <div className="deck-card dark" style={{ marginBottom: 16, padding: '18px 22px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div>
            <span className="badge badge-cyan" style={{ marginRight: 8 }}>{activeNode.tag}</span>
            <span className="mono" style={{ color: '#93c5fd', fontSize: 12 }}>{activeNode.net}</span>
            <h3 style={{ fontSize: 19, marginTop: 4 }}>{activeNode.title}</h3>
          </div>
          <div style={{ background: 'rgba(56,189,248,0.16)', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 10, padding: '8px 14px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
            {activeNode.kpi}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 10 }}>
          {activeNode.chips.map((c) => (
            <span key={c} style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.11)', color: '#f1f5f9' }}>
              {c}
            </span>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 10, fontSize: 12.5, color: '#dbeafe' }}>
          {activeNode.bullets.map((b) => (
            <div key={b} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 11px', borderRadius: 8 }}>
              • {b}
            </div>
          ))}
        </div>
      </div>

      {/* 2 Gráficos visuales lado a lado: Latencias vs SLA + Evolución TB */}
      <div className="bento-2">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <Gauge size={16} /> Latencia de Ingesta vs. Límite (Críticos)
            </span>
            <span className="badge badge-gcp">Todos ≤ 5 min</span>
          </div>

          {INGESTION_BARS.map((f) => {
            const pctActual = (f.actual / 15) * 100;
            const pctLimit = (f.limit / 15) * 100;
            const col = f.cloud === 'AWS' ? '#dd6b20' : '#0078d4';
            return (
              <div className="hbar-row" key={f.name}>
                <div className="hbar-meta">
                  <span style={{ fontWeight: 600 }}>
                    {f.name} <span className="mono" style={{ color: 'var(--text-muted)' }}>({f.service})</span>
                  </span>
                  <span className="mono" style={{ fontWeight: 700, color: col }}>
                    ≤ {f.actual}m <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>/ {f.limit}m</span>
                  </span>
                </div>
                <div className="hbar-track" style={{ height: 10 }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${pctLimit}%`,
                      background: `${col}22`,
                      borderRight: `2px dashed ${col}`,
                    }}
                  />
                  <div className="hbar-fill" style={{ width: `${pctActual}%`, background: col, position: 'relative' }} />
                </div>
              </div>
            );
          })}
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8 }}>
            Línea punteada = límite máximo permitido (Anexo A). Operación diaria total: <strong>76,7 GB/día (~70 Mbps pico)</strong>.
          </div>
        </div>

        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <Database size={16} /> Depuración (−30 TB) y Crecimiento (4,3 TB/m)
            </span>
            <span className="badge badge-navy">Carga 58 TB · ~11 días</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, alignItems: 'end', height: 155, paddingTop: 18 }}>
            {STORAGE_GROWTH.map((item) => {
              const hPx = (item.tb / 145) * 120;
              return (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 11.5, fontWeight: 800, color: item.color, marginBottom: 4 }}>
                    {item.tb} TB
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 46,
                      height: hPx,
                      borderRadius: '7px 7px 3px 3px',
                      background: item.dup
                        ? `linear-gradient(180deg, #ef4444 0%, #ef4444 ${(item.dup / item.tb) * 100}%, #0ea5e9 ${(item.dup / item.tb) * 100}%, #0ea5e9 100%)`
                        : item.color,
                    }}
                  />
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            <span className="badge badge-danger">Rojo: 30 TB duplicados retirados</span>
            <span className="badge badge-navy">
              <Lock size={11} /> 4 Controles: SCP · Azure Policy · VPC SC · Flow Logs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

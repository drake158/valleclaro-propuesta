import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ARCH_NODES } from '../data/valleclaroData';

const MEDALLION_LAYERS = [
  { name: 'Bronze', tech: 'GCS + CDC BigQuery', role: 'Copia fiel e inmutable del origen', color: '#dd6b20' },
  { name: 'Silver', tech: 'BigLake · Apache Iceberg', role: 'Datos limpios, deduplicados y abiertos', color: '#0078d4' },
  { name: 'Gold', tech: 'BigQuery Datasets', role: 'Cifra única de ventas, pronósticos e IA', color: '#f2991d' },
  { name: 'Bus Hub', tech: 'Pub/Sub Multizona', role: 'pedido → ERP · stock → tienda', color: '#0f2d6b' },
];

export function ArchSpecsSlide() {
  const [activeId, setActiveId] = useState(ARCH_NODES[0].id);
  const active = ARCH_NODES.find((n) => n.id === activeId) ?? ARCH_NODES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader
        kicker="05 · Arquitectura · Especificaciones"
        title={
          <>
            <strong>Capas del lago</strong>, red privada y <strong>componentes</strong>
          </>
        }
        subtitle="Arquitectura medallón 100 % serverless con bloques /16 sin solapamientos."
      />

      {/* 4 Zonas del Lago */}
      <div className="g-4">
        {MEDALLION_LAYERS.map((z) => (
          <div key={z.name} className="panel" style={{ borderTop: `3px solid ${z.color}`, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--vc-cobalt)' }}>{z.name}</strong>
              <span className="mono" style={{ fontSize: 10.5, color: z.color }}>{z.tech}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{z.role}</div>
          </div>
        ))}
      </div>

      {/* Selector 2x4 de los 8 componentes */}
      <div className="g-4" style={{ gap: 10 }}>
        {ARCH_NODES.map((node) => {
          const isSel = node.id === active.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              style={{
                padding: '12px 14px',
                border: isSel ? '1.5px solid var(--vc-cobalt)' : '1px solid var(--line-hair)',
                background: isSel ? 'var(--bg-subtle)' : '#ffffff',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              <div className="mono" style={{ fontSize: 10, color: isSel ? 'var(--vc-cyan)' : 'var(--ink-soft)', marginBottom: 3 }}>
                {node.tag}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: isSel ? 600 : 500, color: 'var(--vc-cobalt)' }}>
                {node.title}
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 3 }}>
                {node.kpi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Ficha técnica del componente seleccionado */}
      <div className="panel-dark" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div>
            <span className="mono" style={{ fontSize: 10.5, color: '#38bdf8', letterSpacing: '0.1em' }}>
              {active.tag} · {active.net}
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: '#ffffff', marginTop: 2 }}>
              {active.title}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {active.chips.map((c) => (
              <span key={c} className="mono" style={{ fontSize: 11, color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 8px' }}>
                {c}
              </span>
            ))}
            <span className="mono" style={{ fontSize: 12, color: '#fbbf24', padding: '3px 9px', background: 'rgba(242,153,29,0.16)' }}>
              {active.kpi}
            </span>
          </div>
        </div>

        <div className="g-3" style={{ gap: 12 }}>
          {active.bullets.map((b) => (
            <div key={b} style={{ borderLeft: '2px solid #0ea5e9', paddingLeft: 10, fontSize: 12.5, color: '#dbeafe' }}>
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

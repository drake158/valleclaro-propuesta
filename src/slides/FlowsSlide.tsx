import { SectionHeader } from '../components/SectionHeader';
import { INGESTION_BARS, STORAGE_GROWTH } from '../data/valleclaroData';

export function FlowsSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader
        kicker="06 · Flujo y Volumen"
        title={
          <>
            Ingesta <strong>≤ 5 min</strong> y depuración de <strong>30 TB</strong>
          </>
        }
        subtitle="76,7 GB/día en operación (~70 Mbps pico) · carga histórica de 58 TB en ~11 días."
      />

      <div className="g-2">
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>Latencia estimada vs. límite (min)</span>
            <span style={{ color: 'var(--vc-gcp)' }}>Todos dentro de meta</span>
          </div>

          <div style={{ display: 'grid', gap: 13 }}>
            {INGESTION_BARS.map((f) => {
              const col = f.cloud === 'AWS' ? '#dd6b20' : '#0078d4';
              return (
                <div key={f.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                    <span style={{ color: 'var(--ink)' }}>
                      {f.name} <span className="mono" style={{ color: 'var(--ink-soft)', fontSize: 11 }}>· {f.service}</span>
                    </span>
                    <span className="mono" style={{ color: col }}>
                      ≤ {f.actual}m / {f.limit}m
                    </span>
                  </div>
                  <div className="bar-track" style={{ height: 9 }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${(f.limit / 15) * 100}%`,
                        background: `${col}18`,
                        borderRight: `2px dashed ${col}`,
                      }}
                    />
                    <div className="bar-fill" style={{ width: `${(f.actual / 15) * 100}%`, background: col, position: 'relative' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line-hair)', fontSize: 12, color: 'var(--ink-soft)' }}>
            <span>HA VPN 99,99 % · uso pico &lt; 3,3 %</span>
            <span className="mono">Alerta al 80 %</span>
          </div>
        </div>

        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="panel-label" style={{ marginBottom: 0 }}>
            <span>Evolución de almacenamiento (TB)</span>
            <span>+4,3 TB/mes retenidos</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, alignItems: 'end', height: 210, paddingTop: 16 }}>
            {STORAGE_GROWTH.map((item) => {
              const hPx = (item.tb / 145) * 162;
              return (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 12, color: item.color, marginBottom: 5 }}>
                    {item.tb} TB
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 50,
                      height: hPx,
                      background: item.dup
                        ? `linear-gradient(180deg, #c81e1e 0%, #c81e1e ${(item.dup / item.tb) * 100}%, #0ea5e9 ${(item.dup / item.tb) * 100}%, #0ea5e9 100%)`
                        : item.color,
                    }}
                  />
                  <span style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 7, textAlign: 'center' }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line-hair)', fontSize: 12, color: 'var(--ink-soft)' }}>
            <span style={{ color: 'var(--vc-danger)' }}>Rojo: 30 TB duplicados eliminados</span>
            <span>2 cierres en paralelo</span>
          </div>
        </div>
      </div>

      <div className="g-4">
        {[
          { k: 'AWS', v: 'SCP bloquean VPN/réplicas externas' },
          { k: 'Azure', v: 'Policy niega VPN fuera del hub' },
          { k: 'GCP', v: 'VPC Service Controls anti-exfiltración' },
          { k: '3 Nubes', v: 'Flow Logs alertan tráfico 10.20 ↔ 10.30' },
        ].map((ctrl) => (
          <div key={ctrl.k} className="panel-tint" style={{ padding: '10px 14px' }}>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--vc-cyan)' }}>{ctrl.k}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-mid)', marginTop: 2 }}>{ctrl.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

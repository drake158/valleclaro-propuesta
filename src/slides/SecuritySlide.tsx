import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { OFFBOARDING_STEPS, RBAC_ROLES, SEC_TESTS_SHORT } from '../data/valleclaroData';

export function SecuritySlide() {
  const [roleId, setRoleId] = useState(RBAC_ROLES[2].id);
  const role = RBAC_ROLES.find((r) => r.id === roleId) ?? RBAC_ROLES[2];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: 14 }}>
      <SectionHeader
        kicker="06 · Seguridad y Ley 1581"
        title="Baja de accesos: de 21 días a ≤ 15 minutos"
        subtitle="Entra ID federado a 3 nubes · cero claves JSON · países avalados por la SIC."
      />

      {/* Línea de tiempo horizontal visual */}
      <div className="panel-dark" style={{ padding: '16px 20px' }}>
        <div className="panel-label" style={{ color: '#93c5fd', marginBottom: 12 }}>
          <span>Protocolo de baja inmediata</span>
          <span style={{ color: '#fca5a5' }}>&gt; 15 min = Incidente IAM-01</span>
        </div>

        <div style={{ height: 3, background: 'linear-gradient(90deg, #0ea5e9, #1f6e43, #f2991d)', marginBottom: 14 }} />

        <div className="g-4">
          {OFFBOARDING_STEPS.map((st) => (
            <div key={st.time} style={{ borderLeft: '1px solid rgba(255,255,255,0.18)', paddingLeft: 12 }}>
              <div className="mono" style={{ fontSize: 13, color: '#38bdf8' }}>{st.time}</div>
              <div style={{ fontSize: 13.5, color: '#ffffff', marginTop: 2 }}>{st.title}</div>
              <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 2 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RBAC interactivo + Federación/Cumplimiento */}
      <div className="g-60-40" style={{ flex: 1, minHeight: 0 }}>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="panel-label">
            <span>RBAC por grupo funcional (8 roles · clic para simular)</span>
            <span className="mono" style={{ color: 'var(--vc-cobalt)' }}>{role.grp}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {RBAC_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`chip-btn ${roleId === r.id ? 'active' : ''}`}
                onClick={() => setRoleId(r.id)}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: 'var(--vc-gcp-soft)', borderLeft: '2px solid var(--vc-gcp)' }}>
              <Check size={15} color="#1f6e43" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#14532d' }}>{role.allow}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: 'var(--vc-danger-soft)', borderLeft: '2px solid var(--vc-danger)' }}>
              <X size={15} color="#c81e1e" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#991b1b' }}>{role.deny}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="panel-tint">
            <div className="panel-label">
              <span>Identidad y Cumplimiento</span>
              <span style={{ color: 'var(--vc-cyan)' }}>SIC: EE. UU. & MX</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, color: 'var(--ink-mid)' }}>
              <div style={{ background: '#fff', padding: '8px 10px', border: '1px solid var(--line-hair)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--vc-cobalt)' }}>FEDERACIÓN</div>
                Entra ID + WIF sin JSON
              </div>
              <div style={{ background: '#fff', padding: '8px 10px', border: '1px solid var(--line-hair)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--vc-cobalt)' }}>PROTECCIÓN</div>
                Policy tags + CMEK + VPC SC
              </div>
              <div style={{ background: '#fff', padding: '8px 10px', border: '1px solid var(--line-hair)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--vc-cobalt)' }}>AUDITORÍA</div>
                Logs regionales 90d / 365d
              </div>
              <div style={{ background: '#fff', padding: '8px 10px', border: '1px solid var(--line-hair)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--vc-cobalt)' }}>LEY 1581</div>
                Circular 003/2025 + DR 3.9.1
              </div>
            </div>
          </div>

          <div className="panel" style={{ padding: '12px 16px', flex: 1 }}>
            <div className="panel-label" style={{ marginBottom: 8 }}>
              <span>10 pruebas auditables</span>
              <span>SEC-01 a SEC-10</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
              {SEC_TESTS_SHORT.map((t) => (
                <div key={t.id} style={{ border: '1px solid var(--line-hair)', padding: '5px 4px', textAlign: 'center' }} title={`${t.id}: ${t.name} (${t.meta})`}>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--vc-cobalt)' }}>{t.id}</div>
                  <div style={{ fontSize: 9.5, color: 'var(--ink-soft)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

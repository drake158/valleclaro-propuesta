import { useState } from 'react';
import { AlertOctagon, CheckCircle2, KeyRound, Scale, ShieldCheck, UserX, XCircle } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { OFFBOARDING_STEPS, RBAC_ROLES, SEC_TESTS_SHORT } from '../data/valleclaroData';

export function SeguridadTab() {
  const [selectedRoleId, setSelectedRoleId] = useState(RBAC_ROLES[2].id);
  const activeRole = RBAC_ROLES.find((r) => r.id === selectedRoleId) ?? RBAC_ROLES[2];

  return (
    <div className="slide-enter">
      <SectionHeader
        kicker="Slide 03 · Seguridad, Identidad y Ley 1581"
        title="Una identidad única: de 21 días a ≤ 15 min"
        tagline="Microsoft Entra ID federado a las 3 nubes, cero llaves JSON, RBAC granular y cumplimiento auditable ante la SIC."
      />

      {/* Línea de tiempo visual de baja de empleados */}
      <div className="deck-card dark" style={{ marginBottom: 16 }}>
        <div className="card-head">
          <span className="card-head-title">
            <UserX size={17} color="#38bdf8" /> Respuesta al Hallazgo de 21 Días · Protocolo de Baja
          </span>
          <span className="badge" style={{ background: 'rgba(220,38,38,0.25)', color: '#fca5a5' }}>
            <AlertOctagon size={12} /> &gt; 15 min = Incidente IAM-01
          </span>
        </div>

        <div style={{ position: 'relative', margin: '10px 0 18px' }}>
          <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.14)', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #38bdf8, #22c55e, #f59e0b)' }} />
          </div>
        </div>

        <div className="bento-4" style={{ marginBottom: 0 }}>
          {OFFBOARDING_STEPS.map((st) => (
            <div
              key={st.time}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(147,197,253,0.22)',
                borderRadius: 12,
                padding: '12px 14px',
              }}
            >
              <span className="badge badge-cyan mono" style={{ marginBottom: 6 }}>{st.time}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#ffffff' }}>
                {st.title}
              </div>
              <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 3 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Federación Visual + Selector Interactivo RBAC */}
      <div className="bento-2">
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <KeyRound size={16} /> Federación Multinube (Entra ID)
            </span>
            <span className="badge badge-gcp">0 claves JSON</span>
          </div>

          <div
            style={{
              background: 'var(--vc-cobalt)',
              color: '#ffffff',
              borderRadius: 10,
              padding: '10px 14px',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 13.5,
              marginBottom: 10,
            }}
          >
            RR. HH. → Microsoft Entra ID (MFA + 2 Cuentas Emergencia)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
            <div style={{ background: 'var(--vc-aws-soft)', border: '1px solid #fed7aa', borderRadius: 10, padding: 10 }}>
              <strong style={{ color: '#b45309', fontSize: 12 }}>AWS</strong>
              <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 2 }}>SAML + SCIM · WIF a GCP</div>
            </div>
            <div style={{ background: 'var(--vc-gcp-green-soft)', border: '1px solid #bbf7d0', borderRadius: 10, padding: 10 }}>
              <strong style={{ color: '#1f6e43', fontSize: 12 }}>GCP Lago</strong>
              <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 2 }}>Workforce + Tokens cortos</div>
            </div>
            <div style={{ background: 'var(--vc-azure-soft)', border: '1px solid #bae6fd', borderRadius: 10, padding: 10 }}>
              <strong style={{ color: '#0078d4', fontSize: 12 }}>Azure</strong>
              <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 2 }}>Entra nativo + Managed ID</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['CMEK Regional', 'Secret Manager US (no global)', 'VPC Service Controls', 'Audit Logs 90d / 365d'].map((c) => (
              <span key={c} className="badge badge-navy">{c}</span>
            ))}
          </div>
        </div>

        {/* Selector interactivo RBAC sin tabla gigante */}
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <ShieldCheck size={16} /> Simulador RBAC (8 Grupos Funcionales)
            </span>
            <span className="badge badge-danger">Sin acceso «TI» global</span>
          </div>

          <div className="pill-row" style={{ marginBottom: 12 }}>
            {RBAC_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`pill-btn ${selectedRoleId === r.id ? 'active' : ''}`}
                onClick={() => setSelectedRoleId(r.id)}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Grupo Entra: <strong className="mono" style={{ color: 'var(--vc-cobalt)' }}>{activeRole.grp}</strong> · Policy
              tags + RLS + enmascaramiento dinámico
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 10, background: 'var(--vc-gcp-green-soft)' }}>
              <CheckCircle2 size={17} color="#1f6e43" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 13 }}>
                <strong style={{ color: '#14532d' }}>Permitido:</strong> {activeRole.allow}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 10, background: 'var(--vc-danger-soft)' }}>
              <XCircle size={17} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 13 }}>
                <strong style={{ color: '#991b1b' }}>Bloqueado:</strong> {activeRole.deny}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ley 1581 + Checklist DR 3.9.1 + Matriz visual de 10 pruebas SEC */}
      <div className="bento-2" style={{ marginBottom: 0 }}>
        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">
              <Scale size={16} /> Cumplimiento Ley 1581 y Checklist DR 3.9.1
            </span>
            <span className="badge badge-cyan">Lista SIC: EE. UU. & México</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div style={{ background: 'var(--bg-soft)', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)' }}>
              <strong style={{ fontSize: 12.5, color: 'var(--vc-cobalt)' }}>Transmisión (Encargado)</strong>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                GCP procesa bajo contrato + Circular Externa 003/2025 SIC.
              </div>
            </div>
            <div style={{ background: 'var(--bg-soft)', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)' }}>
              <strong style={{ fontSize: 12.5, color: 'var(--vc-cobalt)' }}>Transferencia (Art. 26)</strong>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                A otro responsable: exige país adecuado o base legal explícita.
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            <strong>5 Checks antes de abrir PII en Virginia (3.9.1):</strong> 1) IdP + emergencia · 2) Policy tags/RLS · 3)
            Llaves CMEK · 4) Auditoría activa · 5) Perímetro VPC SC.
          </div>
        </div>

        <div className="deck-card">
          <div className="card-head">
            <span className="card-head-title">10 Pruebas de Aceptación (SEC-01 a SEC-10)</span>
            <span className="badge badge-gcp">Actas auditables</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 7 }}>
            {SEC_TESTS_SHORT.map((t) => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 9px',
                  borderRadius: 8,
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--border-light)',
                  fontSize: 11.5,
                }}
              >
                <span>
                  <strong className="mono" style={{ color: 'var(--vc-cobalt)' }}>{t.id}</strong> {t.name}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--vc-gcp-green)', whiteSpace: 'nowrap' }}>{t.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

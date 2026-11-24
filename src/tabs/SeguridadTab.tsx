import { useState } from 'react';
import {
  AlertOctagon,
  CheckCircle2,
  Eye,
  FileCheck2,
  KeyRound,
  Lock,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import {
  LEY_1581_ROWS,
  OFFBOARDING_TIMELINE,
  RBAC_GROUPS,
  SEC_TESTS,
  SECURITY_DIAGNOSIS,
  SECURITY_RISKS,
} from '../data/valleclaroData';

export function SeguridadTab() {
  const [rbacQuery, setRbacQuery] = useState('');
  const [showRisks, setShowRisks] = useState(false);

  const filteredRbac = RBAC_GROUPS.filter(
    (g) =>
      g.group.toLowerCase().includes(rbacQuery.toLowerCase()) ||
      g.allowed.toLowerCase().includes(rbacQuery.toLowerCase()) ||
      g.forbidden.toLowerCase().includes(rbacQuery.toLowerCase())
  );

  return (
    <div className="tab-panel">
      <SectionHeader
        eyebrow="Sección 3 · Identidad Única, Protección de Datos y Ley 1581"
        title="3. Seguridad, Identidad y Cumplimiento"
        description="Unifica tres directorios en Microsoft Entra ID, resuelve el hallazgo del exempleado con acceso durante 21 días, impone mínimo privilegio en 8 grupos y demuestra cumplimiento de la Ley 1581 de 2012."
        pagesLabel="Páginas 14–21 del PDF"
      />

      {/* KPIs de seguridad */}
      <div className="kpi-grid">
        <div className="kpi-card danger">
          <div className="kpi-label">
            <UserX size={14} /> Hallazgo Crítico
          </div>
          <div className="kpi-value">21 días → ≤ 15 min</div>
          <div className="kpi-sub">De cuenta huérfana activa a revocación verificada en el lago</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">
            <UserCheck size={14} /> Identidad Única
          </div>
          <div className="kpi-value">Entra ID</div>
          <div className="kpi-sub">Workforce + Workload Identity Federation sin llaves JSON</div>
        </div>
        <div className="kpi-card cyan">
          <div className="kpi-label">
            <Lock size={14} /> Gobierno RBAC
          </div>
          <div className="kpi-value">8 Grupos</div>
          <div className="kpi-sub">Policy tags, filtros por fila (RLS) y enmascaramiento dinámico</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">
            <Scale size={14} /> Cumplimiento
          </div>
          <div className="kpi-value">Ley 1581 · SIC</div>
          <div className="kpi-sub">EE. UU. y México en lista adecuada; 10 pruebas SEC-01 a SEC-10</div>
        </div>
      </div>

      {/* 3.1 Diagnóstico */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">3.1</span> Diagnóstico y Objetivos de Control (1.150 empleados · 14 TI)
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Hallazgo del caso</th>
                <th>Medida diseñada</th>
                <th>Prueba / evidencia verificable</th>
              </tr>
            </thead>
            <tbody>
              {SECURITY_DIAGNOSIS.map((d) => (
                <tr key={d.finding}>
                  <td className="cell-strong">{d.finding}</td>
                  <td>{d.measure}</td>
                  <td>{d.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.2 - 3.3 Arquitectura de Federación Visual (fiel a Figura 3.1) */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">3.2 · 3.3</span> Arquitectura de Identidad Federada (Entra ID)
        </h2>
        <div className="card" style={{ background: 'var(--bg-stripe)' }}>
          {/* Nivel 1: RRHH -> Entra */}
          <div
            style={{
              background: 'var(--vc-midnight)',
              color: '#ffffff',
              borderRadius: 10,
              padding: '14px 20px',
              textAlign: 'center',
              maxWidth: 520,
              margin: '0 auto 16px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15 }}>
              RR. HH. → Microsoft Entra ID (Identidad Corporativa Única)
            </div>
            <div style={{ fontSize: 12.5, color: '#93c5fd', marginTop: 3 }}>
              Altas · cambios · bajas · MFA resistente a phishing · grupos funcionales · 2 cuentas de emergencia
            </div>
          </div>

          {/* Nivel 2: 3 nubes */}
          <div className="grid-3" style={{ marginBottom: 16 }}>
            <div className="card" style={{ borderTop: '4px solid var(--vc-aws-orange)', padding: 14 }}>
              <span className="badge badge-aws" style={{ marginBottom: 6 }}>AWS · Comercio digital</span>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                <strong>Humanos:</strong> IAM Identity Center federado (SAML + SCIM).<br />
                <strong>Apps:</strong> Roles IAM + WIF hacia Google (sin JSON).
              </div>
            </div>
            <div className="card" style={{ borderTop: '4px solid var(--vc-gcp-green)', padding: 14 }}>
              <span className="badge badge-gcp" style={{ marginBottom: 6 }}>Google Cloud · Lago</span>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                <strong>Humanos:</strong> Workforce Identity Federation (OIDC/SAML).<br />
                <strong>Apps:</strong> Cuentas de servicio por flujo + tokens temporales.
              </div>
            </div>
            <div className="card" style={{ borderTop: '4px solid var(--vc-azure-blue)', padding: 14 }}>
              <span className="badge badge-azure" style={{ marginBottom: 6 }}>Azure · ERP y cajas</span>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                <strong>Humanos:</strong> Integración nativa y políticas de Entra ID.<br />
                <strong>Apps:</strong> Managed Identities + WIF hacia Google Cloud.
              </div>
            </div>
          </div>

          {/* Nivel 3: Destinos */}
          <div className="grid-3">
            <div style={{ background: '#1f6e43', color: '#fff', borderRadius: 8, padding: '10px 14px', textAlign: 'center', fontSize: 12.5 }}>
              <strong>LAGO PRINCIPAL</strong> · us-south1 (Dallas)
            </div>
            <div style={{ background: '#b47b00', color: '#fff', borderRadius: 8, padding: '10px 14px', textAlign: 'center', fontSize: 12.5 }}>
              <strong>CONTINGENCIA</strong> · us-east4 (Virginia)
            </div>
            <div style={{ background: '#475569', color: '#fff', borderRadius: 8, padding: '10px 14px', textAlign: 'center', fontSize: 12.5 }}>
              <strong>BÓVEDA AISLADA</strong> · Querétaro (México)
            </div>
          </div>
        </div>
      </div>

      {/* 3.6 Protocolo de baja de empleados */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">3.6</span> Protocolo de Baja de Empleados (Respuesta al Hallazgo de 21 Días)
        </h2>
        <div className="steps-grid">
          {OFFBOARDING_TIMELINE.map((st) => (
            <div className="step-card" key={st.stage} style={{ borderTop: '3px solid var(--vc-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span className="step-badge" style={{ marginBottom: 0 }}>{st.stage}</span>
                <span className="badge badge-danger">{st.target}</span>
              </div>
              <p className="card-text">{st.action}</p>
            </div>
          ))}
        </div>
        <div className="callout danger" style={{ marginTop: 14 }}>
          <div className="callout-icon">
            <AlertOctagon size={19} color="#c81e1e" />
          </div>
          <div className="callout-body">
            <strong>Incidente IAM-01 (¿Qué hacer si el token sigue vigente?):</strong> la revocación central puede no
            invalidar de inmediato sesiones activas en aplicaciones. Si pasados <strong>15 minutos</strong> una prueba
            negativa todavía permite consulta, se declara incidente <strong>IAM-01</strong>, se aplican bloqueos directos
            por recurso/aplicación, se alerta a SecOps y no se cierra la cuenta hasta confirmar denegación real.
          </div>
        </div>
      </div>

      {/* 3.4 RBAC con buscador */}
      <div className="subsection-block">
        <div className="filter-bar">
          <h2 className="subsection-title" style={{ marginBottom: 0 }}>
            <span className="subsection-num">3.4</span> Modelo de Acceso RBAC (Mínimo Privilegio por Grupo)
          </h2>
          <input
            type="search"
            className="search-input"
            placeholder="Filtrar grupo, dataset o prohibición..."
            value={rbacQuery}
            onChange={(e) => setRbacQuery(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Rol / Grupo funcional</th>
                <th>Acceso autorizado</th>
                <th>Datos o acciones prohibidas</th>
              </tr>
            </thead>
            <tbody>
              {filteredRbac.map((r) => (
                <tr key={r.group}>
                  <td className="mono cell-strong">{r.group}</td>
                  <td>{r.allowed}</td>
                  <td style={{ color: '#991b1b' }}>{r.forbidden}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 8 }}>
          <strong>Regla clave:</strong> prohibido otorgar acceso masivo por pertenecer a «TI». Un analista calcula ventas
          en <span className="mono">gold_ventas</span>, pero <span className="mono">SELECT silver.clientes.email</span>{' '}
          devuelve denegación o valor enmascarado. Recertificación trimestral de grupos y semanal de privilegios.
        </p>
      </div>

      {/* 3.5 Controles técnicos y 3.7 Auditoría */}
      <div className="subsection-block">
        <div className="grid-2">
          <div className="card">
            <div className="card-title">
              <KeyRound size={17} color="#0f2d6b" /> 3.5 Autenticación, Secretos y Protección Técnica
            </div>
            <ul className="clean-list">
              <li><strong>MFA y acceso condicional:</strong> MFA general + autenticación resistente a phishing para administradores.</li>
              <li><strong>Acceso privilegiado (PIM):</strong> elevación temporal con ticket, aprobador, bitácora y expiración automática.</li>
              <li><strong>Cuentas de servicio:</strong> una por flujo (CDC AWS, CDC Azure, transformación, BI); cero claves JSON estáticas.</li>
              <li><strong>Secret Manager regional:</strong> replicación administrada explícita (<span className="mono">us-south1</span> y <span className="mono">us-east4</span>), nunca global automática.</li>
              <li><strong>Cifrado CMEK (Cloud KMS):</strong> llaves regionales preparadas en sitio de recuperación con custodios separados.</li>
              <li><strong>VPC Service Controls:</strong> perímetro anti-exfiltración sobre BigQuery y Cloud Storage (complementa IAM).</li>
            </ul>
          </div>

          <div className="card">
            <div className="card-title">
              <Eye size={17} color="#0f2d6b" /> 3.7 Auditoría Verificable (6 Orígenes)
            </div>
            <ul className="clean-list">
              <li><strong>Orígenes integrados:</strong> Microsoft Entra ID, AWS Identity Center/CloudTrail, GCP IAM/STS, BigQuery Data Access, Cloud Storage/Secret Manager (habilitado explícitamente) y logs propios de aplicaciones.</li>
              <li><strong>Esquema por evento:</strong> timestamp UTC, identidad, proveedor, acción, recurso, decisión <span className="mono">PERMIT/DENY</span>, ID de correlación, IP y ticket (sin secretos ni documentos completos).</li>
              <li><strong>Retención y localización:</strong> 90 días operativos + archivo protegido hasta 365 días en <strong>buckets regionales</strong> (evitando buckets globales por defecto).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3.8 Cumplimiento Ley 1581 & 3.9.1 Checklist DR */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">3.8 · 3.9</span> Cumplimiento Ley 1581 de 2012 y Cierre de Brechas en DR
        </h2>
        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div className="callout info" style={{ margin: 0 }}>
            <div className="callout-icon">
              <Scale size={18} color="#0ea5e9" />
            </div>
            <div>
              <div className="callout-title">Transmisión ≠ Transferencia Internacional</div>
              <div className="callout-body">
                <strong>Transmisión:</strong> Google Cloud procesa datos como encargado bajo contrato e instrucciones de
                Valleclaro (Decreto 1377/2013 + Circular Externa 003/2025 SIC).<br />
                <strong>Transferencia:</strong> entrega a otro responsable para sus fines propios (Art. 26 Ley 1581).
              </div>
            </div>
          </div>
          <div className="callout warn" style={{ margin: 0 }}>
            <div className="callout-icon">
              <ShieldCheck size={18} color="#b46900" />
            </div>
            <div>
              <div className="callout-title">Checklist Obligatorio 3.9.1 antes de Abrir Datos en us-east4</div>
              <div className="callout-body">
                1) Identidad federada y 2 cuentas emergencia operativas · 2) Policy tags, RLS y máscaras restauradas · 3)
                Llaves CMEK descifrando · 4) Auditoría activa en secundaria · 5) Perímetro VPC SC intacto.
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>Obligación / Norma</th>
                <th>Decisión técnica aplicable</th>
                <th>Evidencia de auditoría</th>
              </tr>
            </thead>
            <tbody>
              {LEY_1581_ROWS.map((row) => (
                <tr key={row.norm}>
                  <td className="cell-strong">{row.norm}</td>
                  <td>{row.tech}</td>
                  <td>{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.10 Pruebas de aceptación SEC-01 a SEC-10 */}
      <div className="subsection-block">
        <h2 className="subsection-title">
          <span className="subsection-num">3.10</span> Pruebas de Aceptación de Seguridad (SEC-01 a SEC-10)
        </h2>
        <div className="table-wrap">
          <table className="vc-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prueba verificable</th>
                <th>Frecuencia</th>
                <th>Criterio objetivo de aceptación</th>
              </tr>
            </thead>
            <tbody>
              {SEC_TESTS.map((t) => (
                <tr key={t.id}>
                  <td className="mono cell-strong">{t.id}</td>
                  <td>{t.test}</td>
                  <td><span className="badge badge-navy">{t.freq}</span></td>
                  <td className="cell-strong" style={{ color: 'var(--vc-gcp-green)' }}>
                    <CheckCircle2 size={13} style={{ verticalAlign: '-2px', marginRight: 5 }} />
                    {t.target}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.11 Riesgos S-1 a S-8 */}
      <div className="accordion-box">
        <button type="button" className="accordion-trigger" onClick={() => setShowRisks((v) => !v)}>
          <span>
            <ShieldAlert size={16} style={{ verticalAlign: '-3px', marginRight: 8 }} />
            3.11 Matriz de Riesgos de Seguridad y Cumplimiento (S-1 a S-8)
          </span>
          <span className="badge badge-navy">{showRisks ? 'Ocultar' : 'Ver 8 riesgos'}</span>
        </button>
        {showRisks && (
          <div className="accordion-body">
            <div className="table-wrap">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Riesgo</th>
                    <th>Consecuencia</th>
                    <th>Mitigación y responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {SECURITY_RISKS.map((r) => (
                    <tr key={r.id}>
                      <td className="mono cell-strong">{r.id}</td>
                      <td className="cell-strong">{r.risk}</td>
                      <td>{r.consequence}</td>
                      <td>{r.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

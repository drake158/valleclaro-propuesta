// Datos 100 % actualizados y conciliados de:
// "Documento_tecnico_Valleclaro_Comercial 3.pdf" (50 páginas)
// y "Valleclaro_ Hub Multinube y Lago Único.png"

export const BEFORE_AFTER = [
  {
    metric: 'Cifra de ventas / mes',
    before: '3 cifras dispares',
    beforeSub: '4.812 · 4.690 · 4.935M',
    after: '1 cifra única',
    afterSub: 'Gold BigQuery + Looker',
  },
  {
    metric: 'Almacenamiento',
    before: '113 TB',
    beforeSub: '30 TB duplicados (26,5 %)',
    after: '83 TB únicos',
    afterSub: 'Silver abierto Iceberg',
  },
  {
    metric: 'Baja de exempleado',
    before: '21 días activa',
    beforeSub: 'Sin trazabilidad Ley 1581',
    after: '≤ 5 / ≤ 15 min',
    afterSub: 'Entra ID + auditoría 100 %',
  },
  {
    metric: 'Transferencias',
    before: 'COP 38M / mes',
    beforeSub: 'Copias punto-a-punto',
    after: 'Hub privado',
    afterSub: 'HA VPN 99,99 % · cero tránsito',
  },
];

export const EVALUATION_CRITERIA = [
  { id: 'adapt', criterion: 'Adaptabilidad', weight: 25, aws: 2.0, azure: 2.0, gcp: 5.0, takeaway: 'Acerca el lago al equipo de datos en GCP sin migrar AWS ni Azure.' },
  { id: 'caps', criterion: 'Capacidades y herram.', weight: 25, aws: 4.1, azure: 4.75, gcp: 4.4, takeaway: 'Azure lidera en herramientas (4,75), pero GCP mantiene 4,40 sólido.' },
  { id: 'cost', criterion: 'Costo del lago', weight: 20, aws: 3.0, azure: 4.0, gcp: 5.0, takeaway: 'Menor costo referencial docente: USD 210 vs. 220 (Azure) y 230 (AWS).' },
  { id: 'ops', criterion: 'Operabilidad y equipo', weight: 10, aws: 2.0, azure: 3.0, gcp: 4.0, takeaway: 'Las 3 personas de analítica ya operan en GCP; 100 % serverless.' },
  { id: 'res', criterion: 'Resiliencia', weight: 10, aws: 5.0, azure: 5.0, gcp: 5.0, takeaway: 'Empate técnico: referencia de replicación en 15 min en las tres nubes.' },
  { id: 'egress', criterion: 'Costo transferencia', weight: 10, aws: 5.0, azure: 4.0, gcp: 2.0, takeaway: 'Mayor tarifa de salida en GCP (USD 12/100 GiB): exige controlar egresos.' },
];

export const CAPABILITIES_7 = [
  { factor: 'Almacenamiento', weight: 10, aws: 5, azure: 4, gcp: 5 },
  { factor: 'Ingesta', weight: 15, aws: 5, azure: 5, gcp: 5 },
  { factor: 'Procesamiento', weight: 15, aws: 4, azure: 5, gcp: 4 },
  { factor: 'Análisis / SQL', weight: 15, aws: 4, azure: 4, gcp: 5 },
  { factor: 'Gobernanza*', weight: 15, aws: 4, azure: 5, gcp: 4 },
  { factor: 'Seguridad', weight: 15, aws: 4, azure: 5, gcp: 4 },
  { factor: 'Orquestación', weight: 15, aws: 3, azure: 5, gcp: 4 },
];

export const EGRESS_PROVIDERS = [
  { id: 'aws', label: 'AWS us-east-1 → GCP', rate: 9.0, freeGb: 100, color: '#dd6b20', unit: 'GB' },
  { id: 'azure', label: 'Azure East US → GCP', rate: 8.7, freeGb: 100, color: '#0078d4', unit: 'GB' },
  { id: 'gcp', label: 'GCP → AWS / Azure', rate: 12.0, freeGb: 0, color: '#1f6e43', unit: 'GiB' },
];

export const PORTABILITY_STEPS = [
  { num: '01', title: 'Diseño abierto', desc: 'Iceberg/Parquet + Terraform en Git' },
  { num: '02', title: 'Prueba semestral', desc: 'Muestra real ejecutada en AWS/Azure' },
  { num: '03', title: 'Evaluar salida', desc: 'Comparar TCO + sensibilidad 10/20/30 %' },
  { num: '04', title: 'Migrar por fases', desc: 'Conciliación cero y plan de reversión' },
];

// ==================== ARQUITECTURA ====================

export interface ArchNode {
  id: string;
  tag: string;
  tagClass: string;
  title: string;
  net: string;
  kpi: string;
  chips: string[];
  bullets: string[];
}

export const ARCH_NODES: ArchNode[] = [
  {
    id: 'aws',
    tag: 'Spoke · AWS',
    tagClass: 'badge-aws',
    title: 'Tienda en línea y App',
    net: 'us-east-1 · 10.20.0.0/16',
    kpi: '34 TB · 40 GB/día',
    chips: ['RDS/Aurora (binlog 72h)', 'Kinesis (24h)', 'S3', 'Transit Gateway'],
    bullets: [
      'Bases operativas intactas (regla de no migración).',
      'Solo acepta conexiones Datastream desde 10.10.42.0/29 y 10.11.42.0/29.',
      'SCP bloquean VPN o réplicas fuera del hub.',
    ],
  },
  {
    id: 'azure',
    tag: 'Spoke · Azure',
    tagClass: 'badge-azure',
    title: 'ERP, Heredados y 48 Cajas',
    net: 'East US · 10.30.0.0/16',
    kpi: '24 TB · 36,7 GB/día',
    chips: ['SQL Server (CDC 72h)', 'Blob cajas (7d)', 'VPN Activo-Activo', '48 tiendas'],
    bullets: [
      '48 tiendas envían archivos cada 15 min sin cambios.',
      'NSG en erp-db restringe TCP 1433 solo a Datastream.',
      'Azure Policy bloquea VPN fuera del hub GCP.',
    ],
  },
  {
    id: 'net',
    tag: 'Red Privada',
    tagClass: 'badge-navy',
    title: 'HA VPN, BGP y PSC',
    net: 'vpc-hub · 10.10.0.0/16',
    kpi: 'SLA 99,99 % · ~70 Mbps',
    chips: ['E-1: 4 túneles AWS', 'E-2: 2 túneles Azure', 'PSC 10.10.255.10', 'Cero tránsito'],
    bullets: [
      'Uso en pico < 3,3 % de capacidad (sin enlace dedicado en Fase 1).',
      'Firewall jerárquico niega 10.20.0.0/16 ↔ 10.30.0.0/16.',
      'APIs BigQuery y Pub/Sub corren por túnel privado PSC.',
    ],
  },
  {
    id: 'ingest',
    tag: 'Ingesta',
    tagClass: 'badge-cyan',
    title: 'Serverless: CDC, Eventos y Lotes',
    net: '100 % sin clústeres',
    kpi: '≤ 1 a 5 min críticos',
    chips: ['Datastream CDC', 'Pub/Sub Import', 'Storage Transfer', 'Dataflow'],
    bullets: [
      'Kinesis ≤ 1 min · Pedidos ≤ 3 min · ERP ≤ 4 min · Cajas ≤ 5 min.',
      'Carga histórica de 58 TB corre de noche vía Storage Transfer (~11 días).',
      'Alerta temprana al 80 % del límite de latencia.',
    ],
  },
  {
    id: 'lake',
    tag: 'Lago Único',
    tagClass: 'badge-gcp',
    title: 'Medallón: Bronze · Silver · Gold',
    net: 'us-south1 (Dallas)',
    kpi: '83 → 138,6 TB (M18)',
    chips: ['Bronze: GCS + CDC', 'Silver: BigLake Iceberg', 'Gold: BigQuery', 'Dataform'],
    bullets: [
      'Retira 30 TB duplicados en 6 pasos con 2 cierres en paralelo.',
      'Silver usa formato abierto Iceberg para evitar lock-in.',
      'Gold publica la cifra oficial única de ventas.',
    ],
  },
  {
    id: 'bus',
    tag: 'Bus Eventos',
    tagClass: 'badge-navy',
    title: 'Pub/Sub Desacoplado',
    net: 'Multizona · Retención 7 d',
    kpi: '4 flujos → 100 % Hub',
    chips: ['pedidos.creados', 'inventario.cambios', 'API Cloud Run', 'Idempotente'],
    bullets: [
      'Reemplaza integraciones directas AWS ↔ Azure.',
      'Eventos con event_id y versión: cero duplicados en ERP/tienda.',
      'ERP lee pedidos; tienda recibe stock y recomendaciones.',
    ],
  },
  {
    id: 'ai',
    tag: 'Analítica & IA',
    tagClass: 'badge-gcp',
    title: 'Dataplex · Vertex AI · Looker',
    net: 'us-south1 (Dallas)',
    kpi: '≥ 99 % frescura Gold',
    chips: ['Dataplex Catalog', 'Vertex AI', 'Looker BI', 'Marca HH:MM'],
    bullets: [
      'Dallas elegido sobre México porque Vertex AI no existe en Querétaro.',
      'Aprovecha directamente al equipo actual de 3 personas en GCP.',
      'Looker entrega una sola verdad con hora de corte visible.',
    ],
  },
  {
    id: 'vault',
    tag: 'Perímetro & DR',
    tagClass: 'badge-slate',
    title: 'VPC SC · Virginia · Querétaro',
    net: 'EE. UU. y México (Lista SIC)',
    kpi: 'Regla 3-2-1 Inmutable',
    chips: ['VPC Service Controls', 'DR us-east4', 'Bóveda Querétaro', 'Bucket Lock 365 d'],
    bullets: [
      'Perímetro VPC SC impide exfiltración a proyectos externos.',
      'Virginia (us-east4) es contingencia pasiva tibia; Querétaro bóveda aislada.',
      'Ambos países nombrados por la SIC bajo Ley 1581 de 2012.',
    ],
  },
];

export const INGESTION_BARS = [
  { name: 'AWS · Kinesis (eventos)', cloud: 'AWS', actual: 1, limit: 5, unit: 'min', service: 'Pub/Sub' },
  { name: 'AWS · Pedidos / Clientes', cloud: 'AWS', actual: 3, limit: 5, unit: 'min', service: 'Datastream' },
  { name: 'Azure · ERP Inventario', cloud: 'Azure', actual: 4, limit: 15, unit: 'min', service: 'Datastream' },
  { name: 'Azure · ERP Facturación', cloud: 'Azure', actual: 4, limit: 15, unit: 'min', service: 'Datastream' },
  { name: 'Azure · Cajas (48 tiendas)', cloud: 'Azure', actual: 5, limit: 15, unit: 'min', service: 'STS Eventos' },
];

export const STORAGE_GROWTH = [
  { label: 'Actual (c/dup)', tb: 113, dup: 30, color: '#94a3b8' },
  { label: 'Base única', tb: 83, dup: 0, color: '#0ea5e9' },
  { label: 'Mes 6', tb: 91.8, dup: 0, color: '#0078d4' },
  { label: 'Mes 12', tb: 112.8, dup: 0, color: '#0f2d6b' },
  { label: 'Mes 18', tb: 138.6, dup: 0, color: '#1f6e43' },
];

// ==================== SEGURIDAD ====================

export const OFFBOARDING_STEPS = [
  { time: 'T = 0', pct: 8, title: 'Aviso RR. HH.', desc: 'Evento único de cese' },
  { time: '≤ 5 min', pct: 33, title: 'Bloqueo Entra ID', desc: 'Corta login, grupos y sesiones' },
  { time: '≤ 10 min', pct: 66, title: 'Propagación 3 nubes', desc: 'Retira AWS, GCP y Azure' },
  { time: '≤ 15 min', pct: 100, title: 'Prueba negativa lago', desc: 'Si falla → Incidente IAM-01' },
];

export const RBAC_ROLES = [
  { id: 'ventas', name: 'Comercial', grp: 'grp_ventas', allow: 'gold_ventas agregada por canal y tienda', deny: 'Clientes individuales y extracción de Silver' },
  { id: 'fin', name: 'Finanzas', grp: 'grp_finanzas', allow: 'gold_finanzas, facturas y conciliaciones', deny: 'Navegación individual no pertinente al cierre' },
  { id: 'ana', name: 'Analítica', grp: 'grp_analitica', allow: 'silver_anon, features seudonimizadas y gold_analitica', deny: 'Correo, teléfono, cédula o dirección en claro' },
  { id: 'care', name: 'Servicio Cliente', grp: 'grp_care', allow: 'Consulta puntual vía API con ticket/caso', deny: 'Listados y exportaciones masivas' },
  { id: 'ing', name: 'Ingeniería', grp: 'grp_pipeline', allow: 'Ejecutar/actualizar ingesta y transformaciones', deny: 'Lectura humana arbitraria de datos personales' },
  { id: 'sec', name: 'SecOps', grp: 'grp_secops', allow: 'IAM, hallazgos y metadatos de auditoría', deny: 'Alterar cifras comerciales o borrar trazas' },
  { id: 'aud', name: 'Auditoría', grp: 'grp_auditoria', allow: 'Solo lectura de evidencias, políticas e inventario', deny: 'Modificar fuentes, datos o registros' },
  { id: 'dr', name: 'Admin DR', grp: 'grp_dr', allow: 'Conmutar recursos y restaurar llaves/políticas', deny: 'Leer información personal sin permiso aparte' },
];

export const SEC_TESTS_SHORT = [
  { id: 'SEC-01', name: 'Baja urgente', meta: '≤ 5 / ≤ 15 min' },
  { id: 'SEC-02', name: 'Máscara PII', meta: 'Denegado/enmascarado' },
  { id: 'SEC-03', name: 'Export Silver', meta: '0 objetos' },
  { id: 'SEC-04', name: 'Huérfanas', meta: '0 cuentas' },
  { id: 'SEC-05', name: 'WIF sin JSON', meta: 'Token temporal' },
  { id: 'SEC-06', name: 'Trazabilidad', meta: '100 % auditable' },
  { id: 'SEC-07', name: 'DR us-east4', meta: 'Políticas OK' },
  { id: 'SEC-08', name: 'Región datos', meta: '100 % aprobada' },
  { id: 'SEC-09', name: 'Emergencia IdP', meta: '2 cuentas OK' },
  { id: 'SEC-10', name: 'Fuga servicio', meta: 'Revocación total' },
];

// ==================== RESILIENCIA ====================

export const RTO_RPO_CHART = [
  {
    name: 'Inventario y Catálogo',
    rtoObjH: 2,
    rtoDesignH: 1.5,
    rtoPocH: 1.43,
    rtoObjLbl: '2 h',
    rtoDesignLbl: '1 h 30 m',
    rtoPocLbl: '1 h 26 m',
    rpoObjM: 5,
    rpoPocM: 3.67,
    rpoObjLbl: '5 min',
    rpoPocLbl: '3 m 40 s',
    pattern: 'Pasivo tibio + Plan B',
  },
  {
    name: 'Ventas y Facturación',
    rtoObjH: 4,
    rtoDesignH: 2,
    rtoPocH: 1.87,
    rtoObjLbl: '4 h',
    rtoDesignLbl: '2 h 00 m',
    rtoPocLbl: '1 h 52 m',
    rpoObjM: 15,
    rpoPocM: 8.33,
    rpoObjLbl: '15 min',
    rpoPocLbl: '8 m 20 s',
    pattern: 'Pasivo tibio (MDR)',
  },
  {
    name: 'Datos Personales',
    rtoObjH: 8,
    rtoDesignH: 4,
    rtoPocH: 3.63,
    rtoObjLbl: '8 h',
    rtoDesignLbl: '4 h 00 m',
    rtoPocLbl: '3 h 38 m',
    rpoObjM: 60,
    rpoPocM: 12,
    rpoObjLbl: '1 h',
    rpoPocLbl: '12 min',
    pattern: 'Tibio + Checklist 3.9.1',
  },
  {
    name: 'Analítica e IA',
    rtoObjH: 24,
    rtoDesignH: 16,
    rtoPocH: 14.33,
    rtoObjLbl: '24 h',
    rtoDesignLbl: '16 h 00 m',
    rtoPocLbl: '14 h 20 m',
    rpoObjM: 1440,
    rpoPocM: 1080,
    rpoObjLbl: '24 h',
    rpoPocLbl: '18 h',
    pattern: 'Frío (reconstruir)',
  },
];

export const RUNBOOK_TIMELINE = [
  { step: 0, at: '0:30', label: 'Detección', desc: 'Sondas fallan 10 min; declaración oficial de desastre' },
  { step: 1, at: '0:40', label: 'BigQuery MDR', desc: 'Conmutación forzada (5 min) + metastore; bucket dual RTO 0' },
  { step: 2, at: '0:45', label: 'Red BGP', desc: 'E-3 y E-4 convergen tráfico AWS/Azure hacia Virginia' },
  { step: 3, at: '0:55', label: 'Bus Pub/Sub', desc: 'Publicadores cambian a endpoint regional us-east4' },
  { step: 4, at: '1:15', label: 'Datastream', desc: 'Arranca desde 10.11.42.0/29 releyendo log (idempotente)' },
  { step: 5, at: '1:30', label: 'Stock OK', desc: 'Hito Inventario (meta 2 h): foto republicada y conciliada' },
  { step: 6, at: '2:00', label: 'Ventas OK', desc: 'Terraform restaura IAM/tags/queries + Dataform y Cloud Run' },
  { step: 7, at: '4:00', label: 'Clientes OK', desc: 'Checklist 3.9.1 (SEC-07) + Looker restaurado desde Git' },
  { step: 8, at: '16:00', label: 'IA & Gold OK', desc: 'Reconstrucción gold_analitica y modelos en us-east4' },
];

export const DR_INCREMENTAL_V3 = [
  { label: 'Dif. Enterprise Plus vs. Ent.', usd: 1314.0, color: '#0f2d6b' },
  { label: '2.ª región Silver + dual', usd: 931.32, color: '#0ea5e9' },
  { label: 'VPN Virginia + remoto', usd: 319.0, color: '#dd6b20' },
  { label: 'Réplica BigQuery crítica', usd: 257.05, color: '#1f6e43' },
  { label: 'Bóveda Archive + ops', usd: 161.76, color: '#475569' },
  { label: 'Turbo Silver/BQ + trans.', usd: 221.07, color: '#f2991d' },
];

// ==================== FINANZAS V3 (RECONCILIADO 83 TB + VIRGINIA) ====================

// Curva mensual v3 fiel a Figura 5.1 (pág. 33) y tabla 5.3 (M6=68.00, M12=79.20, M18=85.30)
export const MONTHLY_V3_SERIES = [
  { m: 1, phase: 1, storage: 1.9, proc: 2.6, srv: 0.4, net: 0.4, sec: 1.0, obs: 0.8, res: 1.1, total: 8.2 },
  { m: 2, phase: 1, storage: 4.2, proc: 17.8, srv: 0.9, net: 7.4, sec: 1.6, obs: 0.8, res: 4.9, total: 37.6 },
  { m: 3, phase: 1, storage: 6.5, proc: 29.5, srv: 1.4, net: 7.5, sec: 2.2, obs: 2.0, res: 7.4, total: 56.5 },
  { m: 4, phase: 1, storage: 8.2, proc: 30.6, srv: 1.8, net: 7.5, sec: 2.6, obs: 2.0, res: 7.9, total: 60.6 },
  { m: 5, phase: 1, storage: 9.8, proc: 31.6, srv: 2.1, net: 7.6, sec: 2.9, obs: 2.0, res: 8.4, total: 64.4 },
  { m: 6, phase: 1, storage: 11.38, proc: 32.49, srv: 2.31, net: 7.66, sec: 3.29, obs: 2.0, res: 8.87, total: 68.0 },
  { m: 7, phase: 2, storage: 11.8, proc: 33.6, srv: 2.6, net: 4.43, sec: 3.6, obs: 2.0, res: 8.7, total: 66.7 },
  { m: 8, phase: 2, storage: 12.3, proc: 34.7, srv: 2.8, net: 4.43, sec: 4.0, obs: 2.0, res: 9.0, total: 69.2 },
  { m: 9, phase: 2, storage: 12.8, proc: 35.8, srv: 3.1, net: 4.43, sec: 4.3, obs: 2.0, res: 9.4, total: 71.8 },
  { m: 10, phase: 2, storage: 13.3, proc: 36.9, srv: 3.3, net: 4.43, sec: 4.7, obs: 2.0, res: 9.7, total: 74.3 },
  { m: 11, phase: 2, storage: 13.8, proc: 38.0, srv: 3.6, net: 4.43, sec: 5.0, obs: 2.0, res: 10.0, total: 76.8 },
  { m: 12, phase: 2, storage: 14.21, proc: 39.01, srv: 3.83, net: 4.43, sec: 5.39, obs: 2.0, res: 10.33, total: 79.2 },
  { m: 13, phase: 3, storage: 14.7, proc: 39.3, srv: 4.9, net: 4.43, sec: 5.39, obs: 2.0, res: 10.6, total: 81.3 },
  { m: 14, phase: 3, storage: 15.2, proc: 39.5, srv: 5.0, net: 4.43, sec: 5.39, obs: 2.0, res: 10.7, total: 82.2 },
  { m: 15, phase: 3, storage: 15.8, proc: 39.8, srv: 5.05, net: 4.43, sec: 5.39, obs: 2.0, res: 10.9, total: 83.4 },
  { m: 16, phase: 3, storage: 16.3, proc: 39.9, srv: 5.05, net: 4.43, sec: 5.39, obs: 2.0, res: 11.0, total: 84.1 },
  { m: 17, phase: 3, storage: 16.8, proc: 40.0, srv: 5.05, net: 4.43, sec: 5.39, obs: 2.0, res: 11.1, total: 84.8 },
  { m: 18, phase: 3, storage: 17.3, proc: 40.01, srv: 5.05, net: 4.43, sec: 5.39, obs: 2.0, res: 11.13, total: 85.3 },
];

export const M18_DONUT_SLICES = [
  { label: 'Procesamiento', value: 40.01, color: '#0ea5e9', detail: 'Ent. Plus 11,5M · Looker 10,5M · CDC 9,8M · BQ 3,0M' },
  { label: 'Almacenamiento', value: 17.3, color: '#0f2d6b', detail: 'Bronze 5,2M · Silver 3,8M · Dual 3,3M · BigLake 2,5M' },
  { label: 'Reserva 15 %', value: 11.13, color: '#94a3b8', detail: 'Colchón presupuestal único' },
  { label: 'Seguridad e ID', value: 5.39, color: '#1f6e43', detail: 'Entra Gov. 4,4M · P2 · KMS · Audit Logs' },
  { label: 'Servicios datos', value: 5.05, color: '#f2991d', detail: 'Vertex AI 3,1M · Cloud Run 1,0M · Dataplex 0,9M' },
  { label: 'Red y egreso', value: 4.43, color: '#0078d4', detail: 'VPN principal + Virginia + transferencia DR' },
  { label: 'Observabilidad', value: 2.0, color: '#7c3aed', detail: 'Monitoring · Logging · Trace · Guardias' },
];

export const SENSITIVITY_V3 = [
  { id: 'trm', label: 'TRM +10 % (3.850 COP)', deltaM18: 8.53 },
  { id: 'looker', label: 'Looker +USD 1.000/mes', deltaM18: 4.03 },
  { id: 'no-genai', label: 'Retirar Vertex GenAI (USD 675)', deltaM18: -2.72 },
];

export const OKRS_V3 = [
  {
    id: 'O1',
    title: 'Lago único y trazable en presupuesto',
    color: '#0f2d6b',
    krs: ['Real ±10 % (68 / 79,2 / 85,3M)', '≥ 95 % gasto etiquetado (M3)', '−15 % costo/TiB (M6→M12)'],
  },
  {
    id: 'O2',
    title: 'Datos personales solo a quien debe',
    color: '#0ea5e9',
    krs: ['Baja ≤ 15 min en 100 % SEC-01', '0 cuentas huérfanas (diario)', 'SEC-01..10 + Ley 1581 firmada'],
  },
  {
    id: 'O3',
    title: 'Datos confiables, frescos y completos',
    color: '#1f6e43',
    krs: ['58 TB históricos al M6 · 100 % M12', 'Gold actualizado ≥ 99 % días', '≥ 95 % calidad Dataplex al M18'],
  },
  {
    id: 'O4',
    title: 'Continuidad sostenible con 14 TI',
    color: '#f2991d',
    krs: ['2 simulacros DR en RTO/RPO Año 1', 'Detección ≤ 5 m · P1 ≤ 15 m', '100 % runbooks · < 15 % ruido'],
  },
];

export const GANTT_PHASES = [
  { label: 'Gobierno, legal y etiquetas FinOps', start: 0, end: 4, color: '#f2991d' },
  { label: 'Federación Entra ID y cuentas emergencia', start: 1, end: 6, color: '#0f2d6b' },
  { label: 'Piloto Dallas (55 % fuentes + 58 TB + Iceberg)', start: 2, end: 7, color: '#1f6e43' },
  { label: 'SEC-01/02/05/06/07 y observabilidad base', start: 3, end: 6, color: '#0ea5e9' },
  { label: 'Réplica us-east4, bóveda y 100 % fuentes CDC', start: 6, end: 12, color: '#1f6e43' },
  { label: 'Simulacro DR completo + Pentest', start: 10, end: 12, color: '#0078d4' },
  { label: 'Cobertura total, SEC-01..10, compromisos y cierre', start: 12, end: 18, color: '#0f2d6b' },
];

export const TEAM_14 = [
  { area: 'Comercio digital (AWS)', count: 5, pocHours: 40, color: '#dd6b20' },
  { area: 'Redes y seguridad', count: 4, pocHours: 64, color: '#0f2d6b' },
  { area: 'Datos y analítica (GCP)', count: 3, pocHours: 144, color: '#1f6e43' },
  { area: 'Sistemas y ERP (Azure)', count: 2, pocHours: 32, color: '#0078d4' },
];

// ==================== ANEXO A: POC SIMULADA ====================

export const POC_BUDGET = [
  { item: 'Looker (provisión)', usd: 3000, copM: 10.5, color: '#0f2d6b' },
  { item: 'Pruebas DR y réplicas', usd: 500, copM: 1.75, color: '#f2991d' },
  { item: 'Orquestación / Dataform', usd: 450, copM: 1.575, color: '#0ea5e9' },
  { item: 'VPN y conectividad', usd: 430, copM: 1.505, color: '#0078d4' },
  { item: 'Observabilidad + ID + KMS', usd: 532, copM: 1.862, color: '#1f6e43' },
  { item: 'Storage + BQ + CDC + Red', usd: 230, copM: 0.805, color: '#64748b' },
  { item: 'Reserva 15 %', usd: 771.3, copM: 2.7, color: '#94a3b8' },
];

export const POC_SPRINTS = [
  { week: 'Sem 1', title: 'Base y acceso', deliverable: 'Inventario, 100k sintéticos y RBAC' },
  { week: 'Sem 2', title: 'Ingesta + DR', deliverable: 'Bronze, CDC simulado y Virginia' },
  { week: 'Sem 3', title: 'Silver & Gold', deliverable: 'Iceberg limpio y tablero ventas/stock' },
  { week: 'Sem 4', title: 'Pruebas & cierre', deliverable: 'Fallas DR, baja 12m y presupuesto' },
];

// Datos completos estructurados extraídos de:
// "Documento_tecnico_Valleclaro_Comercial 1.pdf" (43 páginas)
// y "Valleclaro_ Hub Multinube y Lago Único.png"

export const EVALUATION_CRITERIA = [
  {
    criterion: 'Costo del lago',
    weight: 20,
    aws: 3.0,
    azure: 4.0,
    gcp: 5.0,
    description:
      'Almacenar, transformar y consultar datos (referencia: 10 TB almacenados + 1 TB procesado/mes, sin transferencias entre nubes).',
    justification:
      'GCP tiene el menor costo referencial docente (USD 210/mes) frente a Azure (USD 220) y AWS (USD 230).',
  },
  {
    criterion: 'Operabilidad y habilidades',
    weight: 10,
    aws: 2.0,
    azure: 3.0,
    gcp: 4.0,
    description:
      'Facilidad de administrar la plataforma, atender incidentes y capacitar al equipo actual de 14 personas.',
    justification:
      'El equipo de datos (3 personas) ya opera analítica, pronósticos y recomendaciones en GCP, reduciendo el esfuerzo de adaptación.',
  },
  {
    criterion: 'Resiliencia',
    weight: 10,
    aws: 5.0,
    azure: 5.0,
    gcp: 5.0,
    description:
      'Capacidad de recuperar el servicio y limitar pérdida de datos (RTO y RPO corporativos).',
    justification:
      'Empate técnico en replicación de referencia 15 min: AWS S3 RTC (SLA 99,9%), Azure Geo Priority Replication (99% mes) y GCS Turbo Replication (RPO 15 min).',
  },
  {
    criterion: 'Costo de transferencia',
    weight: 10,
    aws: 5.0,
    azure: 4.0,
    gcp: 2.0,
    description:
      'Mover datos desde AWS y Azure al lago y devolver resultados a sistemas consumidores.',
    justification:
      'GCP recibe menor puntaje por su tarifa nominal de salida (USD 12/100 GiB vs. USD 9 AWS y USD 8,70 Azure). Exige controlar datos devueltos.',
  },
  {
    criterion: 'Adaptabilidad',
    weight: 25,
    aws: 2.0,
    azure: 2.0,
    gcp: 5.0,
    description:
      'Ajuste a la analítica existente, flujos de información y conservación de sistemas operativos en AWS y Azure.',
    justification:
      'Valleclaro gasta COP 38M/mes en transferencias hacia analítica en GCP. Consolidar allí evita traslados adicionales sin migrar tienda, ERP ni cajas.',
  },
  {
    criterion: 'Capacidades y herramientas',
    weight: 25,
    aws: 4.1,
    azure: 4.75,
    gcp: 4.4,
    description:
      'Evaluación funcional (7 factores) de almacenamiento, ingesta, procesamiento, consultas, gobernanza, seguridad y orquestación.',
    justification:
      'Azure lidera en herramientas (4,75/5) seguido de GCP (4,40/5) y AWS (4,10/5), pero no compensa la ventaja global de GCP.',
  },
];

export const CAPABILITIES_MATRIX = [
  {
    factor: 'Almacenamiento',
    weight: '10 %',
    aws: 5.0,
    azure: 4.0,
    gcp: 5.0,
    note: 'Flexibilidad de S3 y GCS; GCP ya concentra 45 TB actuales de la entidad.',
  },
  {
    factor: 'Ingesta',
    weight: '15 %',
    aws: 5.0,
    azure: 5.0,
    gcp: 5.0,
    note: 'Los tres cubren ingesta continua y por lotes para intervalos de 5 min, 15 min y 1 h.',
  },
  {
    factor: 'Procesamiento',
    weight: '15 %',
    aws: 4.0,
    azure: 5.0,
    gcp: 4.0,
    note: 'Azure Databricks destaca por enfoque lakehouse; EMR y Dataproc conllevan mayor gestión en clústeres.',
  },
  {
    factor: 'Análisis y consultas',
    weight: '15 %',
    aws: 4.0,
    azure: 4.0,
    gcp: 5.0,
    note: 'BigQuery serverless encaja directamente con el equipo de datos actual en GCP.',
  },
  {
    factor: 'Gobernanza',
    weight: '15 %',
    aws: 4.0,
    azure: 5.0,
    gcp: 4.0,
    note: 'Se valora Purview multicloud (atención: transición de gobierno hacia Fabric con fin de mantenimiento nov 2027).',
  },
  {
    factor: 'Seguridad',
    weight: '15 %',
    aws: 4.0,
    azure: 5.0,
    gcp: 4.0,
    note: 'Microsoft Entra ID centraliza identidades y ciclo de vida; bajas exigen integración.',
  },
  {
    factor: 'Orquestación',
    weight: '15 %',
    aws: 3.0,
    azure: 5.0,
    gcp: 4.0,
    note: 'Data Factory facilita flujos visuales para un equipo compacto de 14 personas de TI.',
  },
];

export const REFERENCE_SERVICES = [
  { category: 'Almacenamiento', aws: 'Amazon S3', azure: 'ADLS Gen2', gcp: 'Google Cloud Storage' },
  { category: 'Ingesta', aws: 'Kinesis, AWS Glue', azure: 'Event Hub, Data Factory', gcp: 'Pub/Sub, Dataflow' },
  { category: 'Procesamiento', aws: 'EMR, AWS Glue', azure: 'Azure Databricks, Synapse Spark', gcp: 'Dataproc, Dataflow' },
  { category: 'Análisis y consultas', aws: 'Athena, Redshift', azure: 'Synapse SQL, Power BI', gcp: 'BigQuery, Looker' },
  { category: 'Gobernanza', aws: 'Lake Formation, Glue Catalog', azure: 'Microsoft Purview', gcp: 'Dataplex, Data Catalog' },
  { category: 'Seguridad', aws: 'KMS, Macie, Security Hub', azure: 'Azure AD, Defender, Key Vault', gcp: 'Cloud IAM, CMEK, VPC SC' },
  { category: 'Orquestación', aws: 'MWAA, Step Functions', azure: 'Azure Data Factory, Logic Apps', gcp: 'Cloud Composer, Workflows' },
  {
    category: 'Costo mensual ref. (10 TB + 1 TB/mes)',
    aws: '≈ USD 230,00 (S3 + Athena)',
    azure: '≈ USD 220,00 (ADLS Gen2 + Synapse SQL)',
    gcp: '≈ USD 210,00 (GCS Standard + BigQuery)',
  },
];

export const EGRESS_TARIFFS = [
  {
    id: 'aws-gcp',
    flow: 'AWS Virginia (us-east-1) → GCP México',
    rateLabel: 'USD 9,00 / 100 GB',
    ratePer100: 9.0,
    freeGb: 100,
    unit: 'GB',
    conditions: 'Primer tramo de 10 TB tras franquicia agregada de 100 GB/mes.',
  },
  {
    id: 'azure-gcp',
    flow: 'Azure East US → GCP México',
    rateLabel: 'USD 8,70 / 100 GB',
    ratePer100: 8.7,
    freeGb: 100,
    unit: 'GB',
    conditions: 'Microsoft Premium Global Network; primeros 100 GB/mes gratuitos, siguientes 10 TB a esta tarifa.',
  },
  {
    id: 'gcp-other',
    flow: 'Cloud Storage México → AWS Virginia / Azure East US',
    rateLabel: 'USD 12,00 / 100 GiB',
    ratePer100: 12.0,
    freeGb: 0,
    unit: 'GiB',
    conditions: 'Tramo 0 a 10 TiB/mes por destino (salida general; no es tarifa de Cloud VPN).',
  },
];

export const GCP_RISKS_MITIGATION = [
  {
    risk: 'Aumento de tarifas o fin de descuentos',
    impact: 'El costo mensual crece aunque el volumen se mantenga constante.',
    mitigation: 'Revisar condiciones comerciales, comparar con AWS/Azure y modelar sensibilidad +10 %, +20 % y +30 %.',
  },
  {
    risk: 'Crecimiento del consumo',
    impact: 'Más datos, consultas, copias y transferencias elevan la factura sin alzas tarifarias.',
    mitigation: 'Presupuestos y alertas FinOps, chargeback por área, cuotas de consultas y políticas de ciclo de vida.',
  },
  {
    risk: 'Dependencia de servicios específicos de GCP',
    impact: 'Cambiar BigQuery, Dataflow o Vertex AI puede exigir reescribir consultas e integraciones.',
    mitigation: 'Inventariar dependencias/sustitutos, separar reglas de negocio y versionar código, esquemas e IaC.',
  },
  {
    risk: 'Salida costosa o lenta',
    impact: 'Exportar histórico requiere tiempo, transferencia y operar dos nubes en paralelo.',
    mitigation: 'Conservar base y exportes en formatos abiertos (Iceberg/Parquet) y medir tiempos/costos de exportación.',
  },
  {
    risk: 'Pérdida de controles o diferencias al migrar',
    impact: 'Permisos, metadatos y funciones pueden comportarse distinto en otra nube.',
    mitigation: 'Documentar/versionar políticas y validar conteos, sumas de ventas, duplicados y accesos antes del cambio.',
  },
  {
    risk: 'Conocimiento concentrado en pocas personas',
    impact: 'La operación y una migración dependen de pocos especialistas GCP.',
    mitigation: 'Runbooks de despliegue/DR, capacitación cruzada y pruebas ejecutadas por suplentes.',
  },
];

export const PORTABILITY_PLAN = [
  {
    stage: '1. Preparar desde el diseño',
    action: 'Versionar código, esquemas e IaC (Terraform) en Git; datos base en Iceberg/Parquet; inventario de equivalencias.',
    evidence: 'Inventario de dependencias, repositorio versionado y procedimiento de exportación.',
  },
  {
    stage: '2. Probar cada seis meses',
    action: 'Trasladar una muestra representativa (con datos sensibles protegidos) a AWS o Azure, transformar, consultar y recrear permisos.',
    evidence: 'Registro de tiempo, costo, diferencias funcionales e integridad de datos y accesos.',
  },
  {
    stage: '3. Evaluar la salida',
    action: 'Ante alzas sostenidas o fallas, comparar TCO permanecer vs. migrar (egreso, reescritura, capacitación y operación paralela).',
    evidence: 'Comparación formal de costo total, impacto y viabilidad aprobada por TI y negocio.',
  },
  {
    stage: '4. Migrar por etapas',
    action: 'Preparar destino, copiar histórico, sincronizar cambios, validar y migrar consumidores con plan de reversión activo.',
    evidence: 'Conciliación cero diferencias, pruebas de acceso y acta de aceptación de negocio.',
  },
];

// ==================== SECCIÓN 2: ARQUITECTURA ====================

export interface ArchComponentItem {
  id: string;
  badge: string;
  badgeClass: string;
  title: string;
  regionOrNet: string;
  summary: string;
  services: string[];
  details: string[];
  metricLabel: string;
  metricValue: string;
}

export const ARCHITECTURE_COMPONENTS: ArchComponentItem[] = [
  {
    id: 'aws-spoke',
    badge: 'Spoke · AWS',
    badgeClass: 'badge-aws',
    title: 'Comercio Digital (Tienda y App)',
    regionOrNet: 'us-east-1 · 10.20.0.0/16',
    summary: 'Conserva sus bases operativas intactas (regla de no migración). Publica pedidos, clientes, catálogo y navegación al hub.',
    services: ['RDS / Aurora (binlog 72 h)', 'Amazon Kinesis (24 h)', 'Amazon S3', 'AWS Transit Gateway'],
    details: [
      'Equipo actual: 5 personas de comercio digital.',
      'Solo recibe conexiones entrantes desde subredes de Datastream (10.10.42.0/29 y 10.11.42.0/29).',
      'Consume stock en tiempo casi real desde inventario.cambios y recomendaciones desde API interna en Cloud Run.',
      'SCP de AWS bloquean crear VPN o replicar buckets fuera de la arquitectura hub-and-spoke.',
    ],
    metricLabel: 'Tráfico diario / pico',
    metricValue: '40 GB/día · 37 Mbps pico',
  },
  {
    id: 'azure-spoke',
    badge: 'Spoke · Azure',
    badgeClass: 'badge-azure',
    title: 'ERP, Heredados y 48 Tiendas (Cajas)',
    regionOrNet: 'East US · 10.30.0.0/16 (+10.40.0.0/16 tiendas)',
    summary: 'Mantiene SQL Server del ERP, sistemas heredados de Distribuciones del Norte y recepción de archivos de las 48 sucursales.',
    services: ['SQL Server ERP (CDC 72 h)', 'Azure Blob (cajas 7 días)', 'VPN Gateway activo-activo', 'Private Endpoints'],
    details: [
      'Las 48 tiendas en Colombia siguen enviando archivos de ventas cada 15 min a Azure sin cambios.',
      'NSG en erp-db (10.30.16.0/23) restringe TCP 1433 únicamente a las dos subredes Datastream.',
      'El ERP consume nuevos pedidos en línea desde el tema Pub/Sub pedidos.creados.',
      'Azure Policy prohíbe conexiones VPN fuera del hub de GCP.',
    ],
    metricLabel: 'Tráfico ERP + Cajas',
    metricValue: '36,7 GB/día · 33 Mbps pico',
  },
  {
    id: 'connectivity',
    badge: 'Red Privada',
    badgeClass: 'badge-navy',
    title: 'HA VPN, BGP y Private Service Connect',
    regionOrNet: 'vpc-hub · 10.10.0.0/16 · PSC 10.10.255.10',
    summary: 'Conectividad cifrada orientada a SLA de 99,99 % con aislamiento estricto: cero tránsito directo entre AWS y Azure.',
    services: ['HA VPN (4 túneles AWS · 2 Azure)', 'Cloud Router BGP (MED 100/200)', 'PSC APIs 10.10.255.10/32', 'Firewall jerárquico'],
    details: [
      'Sin tránsito entre spokes: Cloud Router no reanuncia rutas entre vecinos BGP y el firewall niega 10.20.0.0/16 ↔ 10.30.0.0/16.',
      'Uso en pico estimado ~70 Mbps (< 3,3 % de capacidad), evitando pagar enlaces dedicados en Fase 1.',
      'Evolución desde mes 6 a AWS Interconnect / Cross-Cloud Interconnect solo si el tráfico sostenido supera 1 Gbps.',
      'APIs de BigQuery y Pub/Sub accesibles por túnel privado vía PSC sin salir a Internet.',
    ],
    metricLabel: 'SLA túneles / Pico total',
    metricValue: '99,99 % · ~70 Mbps',
  },
  {
    id: 'ingestion',
    badge: 'Ingesta Serverless',
    badgeClass: 'badge-cyan',
    title: 'Captura Continua (CDC), Eventos y Lotes',
    regionOrNet: '100 % sin servidor (equipo de 14 TI)',
    summary: 'Datastream lee el log de transacciones sin impactar aplicaciones; Pub/Sub ingiere eventos y Storage Transfer mueve lotes e histórico.',
    services: ['Datastream (CDC)', 'Pub/Sub Import Topic', 'Storage Transfer Service', 'Dataflow (procesamiento)'],
    details: [
      'Pedidos AWS y ERP Azure vía Datastream CDC en ≤ 3 min y ≤ 4 min respectivamente.',
      'Eventos de navegación y pedido creado desde Kinesis vía Pub/Sub en ≤ 1 min.',
      'Archivos de cajas (298 MB cada 15 min) vía Storage Transfer por eventos en ≤ 5 min.',
      'Carga histórica de 58 TB entre nubes corre de noche con Storage Transfer sin saturar la VPN.',
    ],
    metricLabel: 'Latencia crítica objetivo',
    metricValue: '≤ 1 a 5 min',
  },
  {
    id: 'lake-zones',
    badge: 'Lago Único · GCP',
    badgeClass: 'badge-gcp',
    title: 'Arquitectura Medallón: Bronze, Silver y Gold',
    regionOrNet: 'us-south1 (Dallas) · Formato Abierto Iceberg',
    summary: 'Centraliza 83 TB únicos retirando 30 TB duplicados y elimina las 3 cifras contradictorias de ventas mensuales.',
    services: ['Bronze: GCS + tablas CDC BigQuery', 'Silver: BigLake + Apache Iceberg', 'Gold: Datasets BigQuery', 'Dataform'],
    details: [
      'Bronze: copia fiel e inmutable de lo que llega de cada sistema operativo.',
      'Silver: datos limpios, deduplicados y conciliados en formato abierto Apache Iceberg (limita vendor lock-in).',
      'Gold: cifra única oficial de ventas (gold_finanzas.ventas_mensuales), pronósticos y recomendaciones.',
      'Cierres mensuales congelados como instantáneas inmutables de tabla.',
    ],
    metricLabel: 'Inventario único / Ahorro',
    metricValue: '83 TB únicos (−30 TB dup.)',
  },
  {
    id: 'event-bus',
    badge: 'Integración',
    badgeClass: 'badge-navy',
    title: 'Bus de Eventos Pub/Sub (Desacoplado)',
    regionOrNet: 'Escritura síncrona multizona · Retención 7 días',
    summary: 'Reemplaza todos los flujos directos punto-a-punto entre AWS y Azure por eventos gobernados e idempotentes en el hub.',
    services: ['Tema pedidos.creados', 'Tema inventario.cambios', 'API interna Cloud Run', 'Política almacenamiento US'],
    details: [
      'Flujo pedido → ERP: AWS publica pedido creado y el ERP en Azure lo consume del bus.',
      'Flujo stock → tienda: ERP actualiza inventario y la tienda en AWS consume cambios + API de recomendaciones.',
      'Cada evento lleva event_id y versión: el ERP descarta duplicados y la tienda conserva la última versión por SKU.',
    ],
    metricLabel: 'Flujos directos eliminados',
    metricValue: '4 flujos → 100 % Hub',
  },
  {
    id: 'analytics-ai',
    badge: 'Analítica e IA',
    badgeClass: 'badge-gcp',
    title: 'Dataplex, Vertex AI y Looker',
    regionOrNet: 'us-south1 (Dallas) · Única cifra oficial',
    summary: 'Gobierno de catálogo/linaje, modelos de pronóstico y recomendación en Vertex AI y tableros corporativos unificados en Looker.',
    services: ['Dataplex Universal Catalog', 'Vertex AI (pronóstico y recomendación)', 'Looker (us-south1)', 'Dataform'],
    details: [
      'Por qué Dallas y no México: todos los servicios, incluido Vertex AI, existen en us-south1 (en Querétaro Vertex AI no está disponible).',
      'Looker entrega a Comercial, Finanzas y Dirección la misma cifra de ventas con marca de corte «datos al HH:MM».',
      'Permite aprovechar directamente la experiencia del equipo actual de 3 personas de datos en GCP.',
    ],
    metricLabel: 'Ciclo analítica e IA',
    metricValue: 'Lote horario (≤ 1 h)',
  },
  {
    id: 'security-vault',
    badge: 'Perímetro y Respaldo',
    badgeClass: 'badge-slate',
    title: 'VPC Service Controls, Virginia DR y Bóveda Querétaro',
    regionOrNet: 'us-east4 (Contingencia) · northamerica-south1 (Bóveda)',
    summary: 'Perímetro anti-exfiltración en el lago, contingencia pasiva tibia en Virginia y bóveda aislada inmutable en Querétaro (EE. UU. y México avalados por la SIC).',
    services: ['VPC Service Controls', 'Cloud KMS / CMEK', 'Réplica MDR + Bucket Dual (us-east4)', 'Bóveda Archive + Bucket Lock (Querétaro)'],
    details: [
      'Datos personales solo en EE. UU. y México, países nombrados por la SIC (Circular Externa 002/2018) bajo Ley 1581 de 2012.',
      'Nota clave de diseño: el diagrama inicial señala Querétaro para copias/contingencia; la sección 4 precisó que la contingencia operativa activa es us-east4 (Virginia) y Querétaro opera como bóveda aislada inmutable sin subred ni VPN.',
      'VPC Service Controls bloquea copias o extracciones hacia proyectos no autorizados.',
    ],
    metricLabel: 'Regla de respaldo',
    metricValue: '3-2-1 Inmutable (Bucket Lock)',
  },
];

export const LAKE_ZONES = [
  {
    zone: 'Bronze',
    color: '#dd6b20',
    tech: 'Cloud Storage + tablas CDC de BigQuery',
    content: 'Copia fiel e inmutable de lo que sale de cada sistema operativo.',
  },
  {
    zone: 'Silver',
    color: '#0078d4',
    tech: 'Tablas BigLake en formato abierto Apache Iceberg',
    content: 'Datos limpios, deduplicados y conciliados: ventas, inventario, clientes.',
  },
  {
    zone: 'Gold',
    color: '#d97706',
    tech: 'Datasets de BigQuery',
    content: 'Cifra única de ventas, pronósticos de demanda y recomendaciones.',
  },
  {
    zone: 'Bus de integración',
    color: '#0f2d6b',
    tech: 'Temas de Pub/Sub',
    content: 'Eventos desacoplados entre sistemas: pedido → ERP, stock → tienda.',
  },
];

export const INGESTION_FLOWS = [
  {
    cloud: 'AWS',
    source: 'Base de la tienda (RDS/Aurora)',
    data: 'Pedidos, clientes, catálogo',
    mode: 'Continua (CDC)',
    service: 'Datastream → BigQuery',
    latency: '≤ 3 min',
    limitRpo: '5 min / 5 min',
  },
  {
    cloud: 'AWS',
    source: 'Kinesis',
    data: 'Navegación y evento "pedido creado"',
    mode: 'Continua (eventos)',
    service: 'Tema de importación Pub/Sub',
    latency: '≤ 1 min',
    limitRpo: '5 min / 24 h',
  },
  {
    cloud: 'AWS',
    source: 'S3',
    data: 'Exportaciones y logs',
    mode: 'Lote diario',
    service: 'Storage Transfer Service',
    latency: '≤ 24 h',
    limitRpo: '24 h / 24 h',
  },
  {
    cloud: 'Azure',
    source: 'ERP (SQL Server)',
    data: 'Inventario',
    mode: 'Continua (CDC)',
    service: 'Datastream para SQL Server',
    latency: '≤ 4 min',
    limitRpo: '15 min / 5 min',
  },
  {
    cloud: 'Azure',
    source: 'ERP (SQL Server)',
    data: 'Facturación y proveedores',
    mode: 'Continua (CDC)',
    service: 'Datastream para SQL Server',
    latency: '≤ 4 min',
    limitRpo: '15 min / 15 min',
  },
  {
    cloud: 'Azure',
    source: 'ERP (SQL Server)',
    data: 'Contabilidad',
    mode: 'Lote nocturno',
    service: 'Parquet 23:00 + Storage Transfer 00:30',
    latency: '≤ 2,5 h',
    limitRpo: '24 h / 15 min',
  },
  {
    cloud: 'Azure',
    source: 'Cajas (48 tiendas · Blob)',
    data: 'Ventas por transacción (archivo c/15 min)',
    mode: 'Micro-lote por evento',
    service: 'Storage Transfer por eventos desde Blob',
    latency: '≤ 5 min desde llegada',
    limitRpo: '15 min / 15 min',
  },
  {
    cloud: 'GCP',
    source: 'Analítica interna',
    data: 'Modelos y resultados',
    mode: 'Lote horario (interno)',
    service: 'Dataform + Vertex AI en us-south1',
    latency: '≤ 1 h',
    limitRpo: '1 h / 24 h',
  },
];

export const NETWORK_LINKS = [
  {
    id: 'E-1',
    link: 'AWS us-east-1 ↔ GCP us-south1',
    phase1: 'HA VPN + Transit Gateway: 4 túneles IPsec, BGP (ASN 64512 ↔ 64520)',
    evolution: 'AWS Interconnect – multicloud (> 1 Gbps sostenido)',
    capacity: '4 × 1,25 Gbps · Pico 37 Mbps (0,7 %)',
    status: 'Activo, preferido',
  },
  {
    id: 'E-2',
    link: 'Azure East US ↔ GCP us-south1',
    phase1: 'HA VPN + VPN Gateway activo-activo: 2 túneles, BGP APIPA (ASN 64514 ↔ 65515)',
    evolution: 'Cross-Cloud Interconnect o ExpressRoute + Partner',
    capacity: '1 Gbps (SKU) · Pico 33 Mbps (3,3 %)',
    status: 'Activo, preferido',
  },
  {
    id: 'E-3',
    link: 'AWS us-east-1 ↔ Virginia (us-east4)',
    phase1: 'HA VPN de respaldo: 4 túneles nuevos (ASN 64521, MED 100/200)',
    evolution: 'BGP de respaldo automático ante caída de Dallas',
    capacity: '4 × 1,25 Gbps · ≈ USD 146/mes',
    status: 'Arriba (BGP respaldo)',
  },
  {
    id: 'E-4',
    link: 'Azure East US ↔ Virginia (us-east4)',
    phase1: 'HA VPN de respaldo: 2 túneles nuevos (ASN 64515, APIPA)',
    evolution: 'BGP de respaldo automático ante caída de Dallas',
    capacity: 'SKU Azure · ≈ USD 73/mes lado GCP',
    status: 'Arriba (BGP respaldo)',
  },
  {
    id: 'E-5',
    link: 'Dallas (us-south1) ↔ Virginia (us-east4)',
    phase1: 'Replicación gestionada por red interna Google (MDR BigQuery, bucket dual turbo, metastore)',
    evolution: 'Mismo VPC global, sin VPN',
    capacity: 'Replicación continua (≤ 15 min)',
    status: 'Replicando',
  },
  {
    id: 'E-6',
    link: 'Dallas / Virginia → Querétaro',
    phase1: 'Envío de copias por API privada (PSC 10.10.255.10) hacia proyecto aislado sin subred ni VPN',
    evolution: 'Solo respaldo inmutable (no se usa para conmutar)',
    capacity: 'Exportes semanales y cierres de mes',
    status: 'Programado',
  },
];

export const IP_PLAN = [
  { cloud: 'GCP', region: 'us-south1', vpc: 'vpc-hub', subnet: '(bloque primario)', cidr: '10.10.0.0/16', purpose: 'Prefijo anunciado a AWS y Azure (MED 100)' },
  { cloud: 'GCP', region: 'us-south1', vpc: 'vpc-hub', subnet: 'snet-processing', cidr: '10.10.16.0/20', purpose: 'Dataflow' },
  { cloud: 'GCP', region: 'us-south1', vpc: 'vpc-hub', subnet: 'snet-serving', cidr: '10.10.40.0/24', purpose: 'API interna (Cloud Run + balanceador interno)' },
  { cloud: 'GCP', region: 'us-south1', vpc: 'vpc-hub', subnet: 'snet-proxy-only', cidr: '10.10.41.0/24', purpose: 'Proxy del balanceador interno' },
  { cloud: 'GCP', region: 'us-south1', vpc: 'vpc-hub', subnet: 'datastream-private', cidr: '10.10.42.0/29', purpose: 'Conexión privada PSC de Datastream (Dallas)' },
  { cloud: 'GCP', region: 'us-south1', vpc: 'vpc-hub', subnet: 'snet-ml', cidr: '10.10.48.0/22', purpose: 'Vertex AI' },
  { cloud: 'GCP', region: 'global', vpc: 'vpc-hub', subnet: 'Endpoint PSC APIs', cidr: '10.10.255.10/32', purpose: 'Acceso privado a BigQuery y Pub/Sub desde spokes' },
  { cloud: 'GCP', region: 'us-east4', vpc: 'vpc-hub', subnet: 'snet-dr (bloque DR)', cidr: '10.11.0.0/16', purpose: 'Contingencia del lago (replica octetos de Dallas)' },
  { cloud: 'GCP', region: 'us-east4', vpc: 'vpc-hub', subnet: 'datastream-dr', cidr: '10.11.42.0/29', purpose: 'Adjunto PSC Datastream en Virginia (autorizada Fase 1)' },
  { cloud: 'AWS', region: 'us-east-1', vpc: 'vpc-ecom-prod', subnet: 'app (3 zonas)', cidr: '10.20.0.0/18', purpose: 'Tienda en línea y app móvil' },
  { cloud: 'AWS', region: 'us-east-1', vpc: 'vpc-ecom-prod', subnet: 'data (3 zonas)', cidr: '10.20.64.0/20', purpose: 'RDS/Aurora: pedidos, clientes, catálogo' },
  { cloud: 'AWS', region: 'us-east-1', vpc: 'vpc-ecom-prod', subnet: 'tgw', cidr: '10.20.96.0/26', purpose: 'Adjuntos del Transit Gateway' },
  { cloud: 'Azure', region: 'East US', vpc: 'vnet-hub-azure', subnet: 'GatewaySubnet', cidr: '10.30.0.0/27', purpose: 'VPN Gateway activo-activo' },
  { cloud: 'Azure', region: 'East US', vpc: 'vnet-erp', subnet: 'erp-app / erp-db', cidr: '10.30.16.0/23', purpose: 'ERP (aplicación y SQL Server)' },
  { cloud: 'Azure', region: 'East US', vpc: 'vnet-erp', subnet: 'legacy-ddn', cidr: '10.30.18.0/24', purpose: 'Heredados de Distribuciones del Norte' },
  { cloud: 'Azure', region: 'East US', vpc: 'vnet-erp', subnet: 'pos-ingest', cidr: '10.30.19.0/24', purpose: 'Recepción de archivos de cajas' },
  { cloud: 'Azure', region: 'East US', vpc: 'vnet-erp', subnet: 'private-endpoints', cidr: '10.30.20.0/24', purpose: 'Endpoints privados de SQL y Blob' },
  { cloud: 'Tiendas', region: 'Colombia', vpc: 'Red sucursales', subnet: 'tienda-01 a 48', cidr: '10.40.0.0/16', purpose: 'Cajas físicas; solo se enrutan hacia Azure' },
  { cloud: 'Túneles', region: '—', vpc: 'HA VPN', subnet: 'BGP Dallas & Virginia', cidr: '169.254.10/11/21/22', purpose: 'Sesiones BGP APIPA de E-1, E-2, E-3 y E-4' },
];

export const HISTORICAL_LOAD = [
  { origin: 'AWS', total: '38 TB', dup: '4 TB', move: '34 TB', time: '6,3 días' },
  { origin: 'Azure (ERP + cajas)', total: '30 TB', dup: '6 TB', move: '24 TB', time: '4,4 días' },
  { origin: 'GCP (Nube 2)', total: '45 TB', dup: '20 TB', move: '25 TB (interno GCP)', time: '—' },
  { origin: 'Total', total: '113 TB', dup: '30 TB', move: '83 TB únicos (58 TB entre nubes)', time: '~11 días a 500 Mbps' },
];

export const DEDUP_STEPS = [
  { step: '01', title: 'Inventario', desc: 'Listar objetos en S3, Blob y GCS con checksums, y tablas con huella por fila.' },
  { step: '02', title: 'Clasificación', desc: 'Etiquetar duplicado exacto, lógico o derivado. Siempre gana la copia del sistema de origen.' },
  { step: '03', title: 'Carga solo único', desc: 'Storage Transfer carga 83 TB únicos y Datastream las bases; cero pago por los 30 TB duplicados.' },
  { step: '04', title: 'Conciliación', desc: 'Conteos y montos por día/tienda con diferencia cero; regla única de venta (IVA, devoluciones, corte).' },
  { step: '05', title: '2 cierres en paralelo', desc: 'Reportes simultáneos del lago y copias viejas hasta igualar la venta del mes con el ERP.' },
  { step: '06', title: 'Eliminación auditada', desc: 'Solo lectura → borrado recuperable a los 30 días, con acta por objeto para auditoría.' },
];

// ==================== SECCIÓN 3: SEGURIDAD ====================

export const SECURITY_DIAGNOSIS = [
  {
    finding: 'Tres directorios y permisos inconsistentes',
    measure: 'Microsoft Entra ID como directorio corporativo único con federación por nube',
    evidence: 'Usuarios y grupos trazables 1:1 a identidad de RR. HH.',
  },
  {
    finding: 'Cuenta de exempleado activa 21 días tras baja',
    measure: 'Deshabilitación automatizada y revocación de sesiones/permisos en cascada',
    evidence: 'Prueba negativa de baja con registro de tiempos (≤ 5 / ≤ 15 min)',
  },
  {
    finding: 'Auditoría sin trazabilidad de acceso a clientes',
    measure: 'Data Access Logs en BigQuery, Cloud Storage, Secret Manager y apps',
    evidence: 'Consulta auditable por usuario, recurso, acción, hora y decisión',
  },
  {
    finding: 'Copias y extracciones no autorizadas',
    measure: 'RBAC por grupo funcional, policy tags, enmascaramiento y VPC Service Controls',
    evidence: 'Intentos de consulta sensible o exportación masiva bloqueados',
  },
  {
    finding: 'Brecha de seguridad tras falla regional',
    measure: 'Permisos, llaves CMEK, secretos y auditoría preconfigurados y probados en us-east4',
    evidence: 'Conmutación DR sin exponer datos personales (lista 3.9.1 / SEC-07)',
  },
];

export const RBAC_GROUPS = [
  { group: 'Comercial / grp_ventas', allowed: 'gold_ventas agregada, totales por canal y tienda', forbidden: 'Identificación individual de clientes y extracción de Silver' },
  { group: 'Finanzas / grp_finanzas', allowed: 'gold_finanzas, facturas y conciliaciones necesarias', forbidden: 'Navegación individual no pertinente al cierre' },
  { group: 'Analítica / grp_analitica', allowed: 'silver_anon, features seudonimizadas y gold_analitica', forbidden: 'Correo, teléfono, cédula o dirección en texto claro' },
  { group: 'Servicio cliente / grp_care', allowed: 'Consulta puntual vía API con caso/ticket y cliente autorizado', forbidden: 'Consultas de listados y exportaciones masivas' },
  { group: 'Ingeniería / grp_pipeline', allowed: 'Ejecución/actualización de ingesta y transformaciones', forbidden: 'Lectura humana arbitraria de datos personales' },
  { group: 'Seguridad / grp_secops', allowed: 'Configuración IAM, eventos, hallazgos y metadatos de auditoría', forbidden: 'Alterar cifras comerciales o borrar trazas' },
  { group: 'Auditoría / grp_auditoria', allowed: 'Lectura de evidencias, políticas e inventario de permisos', forbidden: 'Modificar fuentes, datos y registros' },
  { group: 'Administrador DR / grp_dr', allowed: 'Activar recursos, restaurar llaves/políticas según runbook', forbidden: 'Leer información personal salvo autorización separada' },
];

export const OFFBOARDING_TIMELINE = [
  { stage: '0. Aviso', target: 'T = 0', action: 'RR. HH. registra cese y tipo de salida; se genera evento con ID único.' },
  { stage: '1. Contención', target: '≤ 5 min', action: 'Entra ID bloquea autenticación, retira grupos e inicia revocación de sesiones.' },
  { stage: '2. Propagación', target: '≤ 10 min', action: 'Se retiran asignaciones AWS, bindings federados/permisos en GCP y accesos en Azure.' },
  { stage: '3. Verificación', target: '≤ 15 min', action: 'Pruebas negativas en SSO, BigQuery, Cloud Storage, APIs y Looker; cierre de sesiones activas.' },
  { stage: '4. Evidencia', target: 'Mismo día', action: 'Ticket con hora, identidad, resultado y responsable; control diario de cuentas huérfanas.' },
];

export const SEC_TESTS = [
  { id: 'SEC-01', test: 'Baja urgente de exempleado con tokens y sesión previos', freq: 'Mensual piloto / Trimestral', target: 'Bloqueo central ≤ 5 min y lago denegado ≤ 15 min' },
  { id: 'SEC-02', test: 'Rol analista intenta leer columna correo/teléfono', freq: 'Por despliegue / Trimestral', target: 'Denegado o enmascarado; evento en auditoría' },
  { id: 'SEC-03', test: 'Comercial intenta exportación masiva desde Silver', freq: 'Trimestral', target: 'Denegado; cero objetos exportados' },
  { id: 'SEC-04', test: 'Revisión de permisos y cuentas huérfanas vs. nómina', freq: 'Diaria / Mensual', target: '0 cuentas huérfanas sin justificación' },
  { id: 'SEC-05', test: 'Acceso técnico AWS/Azure a Google sin claves JSON', freq: 'Semestral', target: 'Token temporal WIF, trazable y permiso mínimo' },
  { id: 'SEC-06', test: 'Trazabilidad de consulta autorizada a cliente', freq: 'Trimestral', target: 'Usuario, hora, recurso y acción identificables' },
  { id: 'SEC-07', test: 'Conmutar permisos a us-east4 (dep. DR D-5/D-10)', freq: 'Antes Fase 2 y anual', target: 'Políticas restauradas; cero consultas indebidas' },
  { id: 'SEC-08', test: 'Comprobar región de buckets, datasets, secretos y logs', freq: 'Mensual', target: '100 % ajustado al inventario regional aprobado' },
  { id: 'SEC-09', test: 'Probar cuenta de emergencia durante fallo del IdP', freq: 'Semestral', target: 'Admin operativo, uso alertado y rotación posterior' },
  { id: 'SEC-10', test: 'Simular filtración de credencial de servicio', freq: 'Anual', target: 'Clave/tokens revocados y alcance rastreable' },
];

export const LEY_1581_ROWS = [
  { norm: 'Art. 4 · Finalidad, circulación restringida y seguridad', tech: 'Clasificación (4 niveles), acceso mínimo, enmascaramiento y segregación', evidence: 'Políticas de clasificación, catálogo y ensayos' },
  { norm: 'Art. 9 y 12 · Autorización e información al titular', tech: 'Validar avisos de privacidad y base legal antes de extraer al lago', evidence: 'Versiones de avisos y mapa de finalidades' },
  { norm: 'Art. 17 · Deberes del responsable (Valleclaro)', tech: 'Políticas, atención de solicitudes, medidas de seguridad y trazabilidad', evidence: 'Matriz de responsables, casos y actas' },
  { norm: 'Art. 18 · Deberes del encargado (Google/proveedores)', tech: 'Contratos/instrucciones, confidencialidad y controles de tratamiento', evidence: 'Anexos contractuales y revisiones periódicas' },
  { norm: 'Art. 26 · Transferencias internacionales', tech: 'Verificar país adecuado (lista SIC: EE. UU. y México) o base legal', evidence: 'Concepto legal por flujo y jurisdicción' },
  { norm: 'Decreto 1377/2013 · Transmisión internacional', tech: 'Contrato responsable-encargado + cláusulas Circular Externa 003/2025 SIC', evidence: 'Contrato firmado y validación de subencargados' },
];

export const SECURITY_RISKS = [
  { id: 'S-1', risk: 'Falta de licencias Entra Governance', consequence: 'No automatizar bajas ni recertificación según diseño', mitigation: 'Validar licenciamiento en presupuesto (Sec. 5) o automatización alterna.' },
  { id: 'S-2', risk: 'Tokens/sesiones no revocados', consequence: 'Acceso residual tras deshabilitar cuenta en Entra', mitigation: 'Bloqueo por recurso, prueba negativa real y escalación IAM-01 (SecOps).' },
  { id: 'S-3', risk: 'Política de datos no replicada en DR', consequence: 'Exposición de datos personales tras conmutación a Virginia', mitigation: 'Terraform + prueba SEC-07 obligatoria antes de abrir consultas.' },
  { id: 'S-4', risk: 'Llave o secreto no disponible en Virginia', consequence: 'Incumplimiento de RTO aunque existan réplicas', mitigation: 'Llaves CMEK y secretos regionales probados con doble custodio.' },
  { id: 'S-5', risk: 'Lecturas de objetos sin auditoría', consequence: 'Imposible demostrar quién consultó o extrajo datos', mitigation: 'Habilitar Data Access explícitamente en Cloud Storage y ensayar SEC-06.' },
  { id: 'S-6', risk: 'Logs en región no aprobada (global)', consequence: 'Brecha de localización o acuerdo contractual', mitigation: 'Buckets regionales explícitos de Cloud Logging y concepto legal.' },
  { id: 'S-7', risk: 'Roles amplios o claves estáticas JSON', consequence: 'Extracción masiva y compromiso transversal', mitigation: 'Workload Identity Federation, mínimo privilegio y perímetro VPC SC.' },
  { id: 'S-8', risk: 'Tratamiento internacional mal clasificado', consequence: 'Incumplimiento legal (transferencia vs. transmisión)', mitigation: 'Matriz transmisión/transferencia validada por el área legal.' },
];

// ==================== SECCIÓN 4: RESILIENCIA ====================

export const REGION_COMPARISON = [
  {
    capability: 'Recuperación gestionada BigQuery (MDR · RTO 5 min / RPO 15 min)',
    mexico: 'No: los pares deben estar en la misma geografía (US, EU, CA…)',
    virginia: 'Sí: Dallas y Virginia están en US',
  },
  {
    capability: 'Promover réplica BigQuery con la primaria caída',
    mexico: 'No: replicación estándar no promueve durante caída',
    virginia: 'Sí: conmutación forzada soportada',
  },
  {
    capability: 'Bucket dual con replicación turbo (RPO 15 min con SLA)',
    mexico: 'No: México no pertenece a un código dual configurable',
    virginia: 'Sí: ambas en código de ubicación US',
  },
  {
    capability: 'Recuperación del metastore BigLake (Iceberg Silver)',
    mexico: 'No: requiere bucket dual o multirregional',
    virginia: 'Sí',
  },
  {
    capability: 'Vertex AI para reentrenar y servir modelos',
    mexico: 'No disponible en México',
    virginia: 'Sí disponible',
  },
  {
    capability: 'Ubicación de datos personales (Ley 1581 / Lista SIC)',
    mexico: 'EE. UU. y México nombrados por la SIC',
    virginia: 'Ambas en EE. UU., país nombrado por la SIC',
  },
];

export const REPLICATION_BY_DATA = [
  {
    type: 'Catálogo e inventario',
    rtoTarget: '2 h',
    rtoDesign: '1 h 30 min',
    rpoTarget: '5 min',
    pattern: 'Activo-pasivo tibio (Bus activo-activo en suscripción)',
    storage: 'Silver Iceberg bucket dual + BigQuery MDR + Pub/Sub {us-south1, us-east4}',
    mechanism: 'Réplica ≤ 15 min + relectura CDC origen + republicación foto de stock. Plan B: stream activo en Virginia.',
  },
  {
    type: 'Ventas y facturación',
    rtoTarget: '4 h',
    rtoDesign: '2 h',
    rpoTarget: '15 min',
    pattern: 'Activo-pasivo tibio',
    storage: 'Silver Iceberg bucket dual + BigQuery Enterprise Plus MDR',
    mechanism: 'Silver turbo ≤ 15 min (SLA), Gold MDR ≤ 15 min, CDC y cajas releídos (7 días en Blob).',
  },
  {
    type: 'Datos personales',
    rtoTarget: '8 h',
    rtoDesign: '4 h',
    rpoTarget: '1 h',
    pattern: 'Activo-pasivo tibio con apertura controlada',
    storage: 'Iceberg bucket dual + CMEK (replica_kms_key us-east4)',
    mechanism: 'Turbo ≤ 15 min + relectura tienda. Etiquetas de política recreadas con Terraform y checklist 3.9.1.',
  },
  {
    type: 'Analítica e IA',
    rtoTarget: '24 h',
    rtoDesign: '16 h',
    rpoTarget: '24 h',
    pattern: 'Activo-pasivo frío (copia y reconstrucción)',
    storage: 'BigQuery y GCS regionales en us-south1',
    mechanism: 'Copia diaria de artefactos + reconstrucción de gold_analitica desde Silver y reentrenamiento en us-east4.',
  },
];

export const RUNBOOK_STEPS = [
  { step: 0, title: 'Detección y declaración', duration: '≤ 30 min', cumulativeMin: 30, cumulativeLabel: '0:30', detail: 'Sondas sintéticas y alertas fallan 10 min; líder del incidente declara desastre.' },
  { step: 1, title: 'Conmutación forzada BigQuery y BigLake', duration: '≤ 10 min', cumulativeMin: 40, cumulativeLabel: '0:40', detail: 'Promoción MDR (RTO 5 min), metastore BigLake; bucket dual sigue sirviendo (RTO 0).' },
  { step: 2, title: 'Convergencia de red BGP', duration: '≤ 5 min', cumulativeMin: 45, cumulativeLabel: '0:45', detail: 'E-3 y E-4 ya están arriba; al caer anuncios de Dallas, BGP converge a Virginia.' },
  { step: 3, title: 'Cambio de endpoint del bus Pub/Sub', duration: '≤ 10 min', cumulativeMin: 55, cumulativeLabel: '0:55', detail: 'Publicadores apuntan a endpoint regional us-east4; suscripciones ya estaban abiertas.' },
  { step: 4, title: 'Arranque de ingesta Datastream', duration: '≤ 20 min', cumulativeMin: 75, cumulativeLabel: '1:15', detail: 'Streams en espera salen desde 10.11.42.0/29 desde posición anterior al último cambio replicado.' },
  { step: 5, title: 'Hito Inventario (RTO objetivo 2 h)', duration: '≤ 15 min', cumulativeMin: 90, cumulativeLabel: '1:30', detail: 'Se republica foto de stock desde silver.inventario_estado y se concilia con el ERP.' },
  { step: 6, title: 'Restauración Terraform + Ventas (RTO 4 h)', duration: '≤ 30 min', cumulativeMin: 120, cumulativeLabel: '2:00', detail: 'Terraform restaura IAM, policy tags, consultas programadas, Dataform y Cloud Run.' },
  { step: 7, title: 'Checklist 3.9.1 + Clientes + Looker (RTO 8 h)', duration: '≤ 2 h', cumulativeMin: 240, cumulativeLabel: '4:00', detail: 'Validación seguridad/máscaras/llaves/auditoría/perímetro (SEC-07) y despliegue Looker desde Git.' },
  { step: 8, title: 'Analítica e IA (RTO 24 h)', duration: '≤ 12 h', cumulativeMin: 960, cumulativeLabel: '16:00', detail: 'Reconstrucción completa de gold_analitica y reentrenamiento de modelos en us-east4.' },
];

export const HIDDEN_DEPENDENCIES = [
  { id: 'D-1', dep: 'HA VPN y Cloud Router son regionales', why: 'Si cae Dallas caen E-1 y E-2', fix: 'E-3 y E-4 siempre arriba con BGP de respaldo' },
  { id: 'D-2', dep: 'Orígenes aceptaban solo 10.10.42.0/29', why: 'Datastream Virginia quedaría bloqueado', fix: 'Autorizar 10.11.42.0/29 desde Fase 1 con alerta de uso indebido' },
  { id: 'D-3', dep: 'Retención del log en origen (72 h)', why: 'Caídas mayores a 72 h pierden historial de cambios', fix: 'Alerta si baja de 72 h; si se excede, backfill controlado' },
  { id: 'D-4', dep: 'CDC se replica con mejor esfuerzo', why: 'Tablas CDC pueden quedar atrasadas en secundaria', fix: 'Arrancar stream desde posición anterior (relectura idempotente)' },
  { id: 'D-5', dep: 'Policy tags, ACL y scheduled queries no se replican', why: 'Datos personales quedarían sin protección de columnas', fix: 'Terraform en paso 6 + lista 3.9.1 y prueba SEC-07' },
  { id: 'D-6', dep: 'Escritura en MDR exige Enterprise Plus', why: 'Cargas de otra edición fallan al escribir', fix: 'Asignación PIPELINE verificada en Fase 1' },
  { id: 'D-7', dep: 'Copias de Looker atadas a su instancia', why: 'No existe restauración directa entre regiones', fix: 'LookML en Git e instancia en frío en us-east4' },
  { id: 'D-8', dep: 'Cuotas y capacidad en us-east4', why: 'La conmutación falla sin slots ni CPU disponibles', fix: 'Línea base de slots reservada y cuotas solicitadas por adelantado' },
  { id: 'D-9', dep: 'Llaves CMEK y secretos regionales', why: 'Datos ilegibles o streams sin credenciales', fix: 'Llaves y secretos replicados en us-east4 antes del simulacro' },
  { id: 'D-10', dep: 'Identidad federada caída', why: 'Sin administradores autenticados no hay conmutación', fix: '2 cuentas de emergencia independientes probadas en cada DR' },
];

export const BACKUP_LAYERS = [
  { layer: 'Todas las tablas BigQuery', mechanism: 'Time travel + fail-safe', freq: 'Continuo', retention: '7 días + 7 fail-safe', location: 'Región del conjunto' },
  { layer: 'Tablas críticas', mechanism: 'Instantánea de tabla', freq: 'Diaria', retention: '35 días', location: 'Dallas, replicada' },
  { layer: 'Cierres mensuales', mechanism: 'Instantánea + exporte Parquet', freq: 'Mensual', retention: 'Política legal (sup. 10 años)', location: 'Bóveda Querétaro, Bucket Lock' },
  { layer: 'Silver, Gold y Bronze histórico', mechanism: 'Exporte Parquet/Iceberg + checksum', freq: 'Semanal (inc. diario)', retention: '90 días', location: 'Bóveda: Archive + Bucket Lock' },
  { layer: 'Buckets Cloud Storage', mechanism: 'Borrado recuperable (soft delete)', freq: 'Continuo', retention: '30 días', location: 'Mismo bucket' },
  { layer: 'Modelos Vertex AI', mechanism: 'Artefactos versionados', freq: 'Por entrenamiento', retention: '10 versiones', location: 'Bucket dual' },
  { layer: 'Looker', mechanism: 'Copia automática + Git (LookML)', freq: 'Diaria', retention: '30 días', location: 'Instancia y Git' },
];

export const DR_TESTS = [
  { id: 'DR-1', name: 'Restaurar tabla borrada', method: 'Time travel e instantánea en proyecto de pruebas', freq: 'Mensual', criteria: '≤ 30 min; conteo y montos iguales' },
  { id: 'DR-2', name: 'Conmutación planificada', method: 'Switchover suave BigQuery + metastore (ambas arriba)', freq: 'Semestral', criteria: 'Cero pérdida; RTO ≤ 15 min; retorno a Dallas' },
  { id: 'DR-3', name: 'Simulacro pérdida de región', method: 'Proyecto espejo bloqueando Dallas + runbook completo', freq: 'Anual y cierre Fase 2', criteria: 'RTO/RPO ≤ Anexo B; diferencia cero' },
  { id: 'DR-4', name: 'Relectura del origen', method: 'Stream detenido 2 h y recuperado desde log', freq: 'Trimestral', criteria: 'Inventario RPO medido ≤ 5 min; diferencia cero' },
  { id: 'DR-4b', name: 'Conectividad contingencia', method: 'Conexión desde 10.11.42.0/29 por E-3 y E-4', freq: 'Trimestral', criteria: 'Conexión exitosa + alerta de uso registrada' },
  { id: 'DR-5', name: 'Conmutación del bus', method: 'Cambio de endpoint inyectando duplicados', freq: 'Trimestral', criteria: 'Cero facturas duplicadas; stock exacto' },
  { id: 'DR-6', name: 'Caída de túneles', method: 'Apagado controlado de E-1 y E-2', freq: 'Trimestral', criteria: 'BGP converge a Virginia; validación MED' },
  { id: 'DR-7', name: 'Bóveda inmutable', method: 'Restaurar 1 TB desde Archive + intento de borrado admin', freq: 'Semestral', criteria: 'Restauración íntegra; borrado bloqueado' },
  { id: 'DR-8', name: 'Looker y Gold analítico', method: 'Instancia desde Git + reconstrucción Dataform', freq: 'Semestral', criteria: 'Tablero idéntico; Gold ≤ 12 h' },
];

export const DR_INCREMENTAL_COSTS = [
  { item: 'Segunda copia de Silver (bucket dual 40 TB)', calc: '40 TB × USD 0,022/GiB + dif. dual', usd: 983 },
  { item: 'Replicación turbo de Silver', calc: '≈ 1 TB nuevo/mes × USD 0,04/GiB', usd: 41 },
  { item: 'Réplicas de BigQuery (MDR 12 TB)', calc: '12 TB × USD 0,023 + 1,5 TB × USD 0,02', usd: 314 },
  { item: 'Enterprise Plus frente a Enterprise', calc: '50 slots × 730 h × (0,09 − 0,054)', usd: 1314 },
  { item: 'VPN de respaldo E-3 y E-4 (6 túneles)', calc: '6 túneles × 730 h × USD 0,05', usd: 219 },
  { item: 'Bóveda de Querétaro (100 TB Archive)', calc: '100 TB × USD 0,0012 + 3 TB × USD 0,02', usd: 184 },
];

// ==================== SECCIÓN 5: COSTOS, FINOPS Y CRONOGRAMA ====================

// Serie mensual recurrente fiel a Figura 5.1 (COP millones, TRM 3.500)
export const MONTHLY_COST_SERIES = [
  { month: 1, phase: 1, storage: 0.3, processing: 1.0, network: 0.1, security: 0.4, obs: 0.4, contingency: 0.3, total: 2.5 },
  { month: 2, phase: 1, storage: 0.5, processing: 2.8, network: 1.8, security: 1.2, obs: 0.8, contingency: 1.1, total: 8.2 },
  { month: 3, phase: 1, storage: 0.8, processing: 14.2, network: 2.0, security: 2.1, obs: 2.0, contingency: 3.1, total: 24.2 },
  { month: 4, phase: 1, storage: 0.9, processing: 15.0, network: 2.1, security: 2.5, obs: 2.0, contingency: 3.3, total: 25.8 },
  { month: 5, phase: 1, storage: 1.1, processing: 15.7, network: 2.2, security: 2.9, obs: 2.0, contingency: 3.5, total: 27.4 },
  { month: 6, phase: 1, storage: 1.2, processing: 16.4, network: 2.2, security: 3.3, obs: 2.0, contingency: 3.8, total: 28.8 },
  { month: 7, phase: 2, storage: 1.4, processing: 17.0, network: 1.9, security: 3.7, obs: 2.0, contingency: 3.9, total: 29.9 },
  { month: 8, phase: 2, storage: 1.5, processing: 17.6, network: 1.9, security: 4.1, obs: 2.0, contingency: 4.1, total: 31.2 },
  { month: 9, phase: 2, storage: 1.7, processing: 18.2, network: 1.9, security: 4.5, obs: 2.0, contingency: 4.2, total: 32.5 },
  { month: 10, phase: 2, storage: 1.8, processing: 18.8, network: 1.9, security: 4.8, obs: 2.0, contingency: 4.4, total: 33.7 },
  { month: 11, phase: 2, storage: 2.0, processing: 19.3, network: 1.9, security: 5.1, obs: 2.0, contingency: 4.6, total: 34.9 },
  { month: 12, phase: 2, storage: 2.1, processing: 19.9, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.7, total: 36.1 },
  { month: 13, phase: 3, storage: 2.2, processing: 20.1, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.7, total: 36.3 },
  { month: 14, phase: 3, storage: 2.3, processing: 20.3, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.8, total: 36.7 },
  { month: 15, phase: 3, storage: 2.3, processing: 20.5, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.8, total: 36.9 },
  { month: 16, phase: 3, storage: 2.4, processing: 20.5, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.8, total: 37.0 },
  { month: 17, phase: 3, storage: 2.4, processing: 20.5, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.8, total: 37.0 },
  { month: 18, phase: 3, storage: 2.5, processing: 20.5, network: 1.9, security: 5.4, obs: 2.0, contingency: 4.8, total: 37.1 },
];

export const COST_COMPONENTS_TABLE = [
  { name: 'Almacenamiento (Bronze, Silver/Gold, Réplica, Bóveda, Logs)', m6: '1,2', m12: '2,1', m18: '2,5', usd12: '608', isGroup: true },
  { name: 'Procesamiento (BigQuery, CDC, Orquestación, Looker 10,5M, No-prod)', m6: '16,4', m12: '19,9', m18: '20,5', usd12: '5.700', isGroup: true },
  { name: 'Transferencia y red (Egreso, Réplica, Salida, HA VPN)', m6: '2,2', m12: '1,9', m18: '1,9', usd12: '540', isGroup: true },
  { name: 'Seguridad e identidad (Entra Gov., Entra P2, KMS/Secrets, Audit Logs)', m6: '3,3', m12: '5,4', m18: '5,4', usd12: '1.541', isGroup: true },
  { name: 'Observabilidad (Monitoring, Logging, Trace, Guardias)', m6: '2,0', m12: '2,0', m18: '2,0', usd12: '570', isGroup: true },
  { name: 'Contingencia (15 %)', m6: '3,8', m12: '4,7', m18: '4,8', usd12: '1.344', isGroup: true },
  { name: 'Total mensual recurrente', m6: '28,8', m12: '36,1', m18: '37,1', usd12: '10.303', isTotal: true },
];

export const BUDGET_18M = [
  { item: 'Almacenamiento', y1: 14.9, m13_18: 14.0, total: 28.9, type: 'rec' },
  { item: 'Procesamiento (56 % del recurrente)', y1: 177.0, m13_18: 122.5, total: 299.5, type: 'rec' },
  { item: 'Transferencia y red', y1: 21.3, m13_18: 11.3, total: 32.6, type: 'rec' },
  { item: 'Seguridad e identidad (13 % del recurrente)', y1: 39.2, m13_18: 32.4, total: 71.5, type: 'rec' },
  { item: 'Observabilidad', y1: 21.5, m13_18: 12.0, total: 33.5, type: 'rec' },
  { item: 'Contingencia (15 %)', y1: 41.1, m13_18: 28.8, total: 69.9, type: 'rec' },
  { item: 'Subtotal recurrente', y1: 315.1, m13_18: 221.0, total: 536.0, type: 'sub' },
  { item: 'Consultoría especializada (federación, WIF, DR · 280 h)', y1: 58.8, m13_18: 0, total: 58.8, type: 'once' },
  { item: 'Capacitación y certificaciones (14 personas)', y1: 31.9, m13_18: 0, total: 31.9, type: 'once' },
  { item: 'Pruebas de penetración y revisión auditoría', y1: 26.3, m13_18: 0, total: 26.3, type: 'once' },
  { item: 'Concepto legal Ley 1581 (matriz flujos y contratos)', y1: 24.0, m13_18: 0, total: 24.0, type: 'once' },
  { item: 'Simulacros DR año 1 (2) · recursos temporales', y1: 10.5, m13_18: 0, total: 10.5, type: 'once' },
  { item: 'Subtotal inversiones únicas', y1: 151.4, m13_18: 0, total: 151.4, type: 'sub' },
  { item: 'TOTAL PROYECTO (COP millones)', y1: 466.5, m13_18: 221.0, total: 687.4, type: 'total' },
];

export const SENSITIVITY_SCENARIOS = [
  { id: 'trm', label: 'TRM +10 % (3.850 COP/USD)', deltaY1: 44.2, deltaM18: 3.7, note: 'Aumenta proporcionalmente todo el costo en dólares.' },
  { id: 'bq', label: 'Consultas BigQuery ×2 (sin cuotas/particiones)', deltaY1: 23.5, deltaM18: 3.9, note: 'Refleja riesgo C-1 por falta de gobierno de consultas.' },
  { id: 'size', label: 'Lago 50 % más grande que lo supuesto', deltaY1: 8.5, deltaM18: 1.5, note: 'Impacto moderado: almacenamiento es solo 5 % del gasto.' },
  { id: 'looker', label: 'Valleclaro ya cuenta con licencia de Looker', deltaY1: -120.8, deltaM18: -12.1, note: 'Ahorro más relevante del presupuesto recurrente.' },
];

export const FINOPS_TAGS = [
  { tag: 'cost_center', values: 'ventas, finanzas, analitica, plataforma, seguridad', purpose: 'Cobro (chargeback) a la unidad dueña del gasto' },
  { tag: 'env', values: 'prod, dev, dr, vault', purpose: 'Separa productivo de pruebas, contingencia y bóveda' },
  { tag: 'data_layer', values: 'bronze, silver, gold, vault, logs', purpose: 'Costo granular por capa del lago' },
  { tag: 'pipeline', values: 'cdc-aws, cdc-azure, transform, bi, ops', purpose: 'Costo por flujo alineado a cuenta de servicio' },
  { tag: 'data_class', values: 'publico_interno, operativo, restringido, personal', purpose: 'Cruza gasto con clasificación de seguridad (3.4)' },
  { tag: 'owner / phase', values: 'grupo funcional · f1, f2, f3', purpose: 'Responsable operativo y fase del cronograma' },
];

export const FINOPS_ALERTS = [
  { alert: 'Presupuesto mensual', threshold: '50 / 75 / 90 / 100 %', action: '50% aviso · 75% revisión · 90% congelar nuevos · 100% Finanzas 24 h', owner: 'FinOps' },
  { alert: 'Pronóstico de cierre', threshold: '> 110 % presupuesto', action: 'Revisión extraordinaria y plan de contención', owner: 'FinOps + Líder' },
  { alert: 'Anomalía gasto diario', threshold: '> 1,25× media móvil 7 d', action: 'Triage en 4 horas; causa documentada en ticket', owner: 'FinOps + SRE' },
  { alert: 'Bytes procesados BigQuery', threshold: '80 % cuota diaria', action: 'Cuotas diarias y tope por consulta; optimizar SQL', owner: 'Ing. Datos' },
  { alert: 'Egreso entre nubes', threshold: '> 150 % promedio mes', action: 'Revisar CDC, filtros en origen y réplicas', owner: 'Plataforma' },
  { alert: 'Ingestión de logs auditoría', threshold: '> 1,5× línea base', action: 'Ajustar exclusiones sin perder trazabilidad', owner: 'SecOps' },
  { alert: 'Gasto sin etiquetar', threshold: '> 5 %', action: 'Corrección obligatoria en 5 días hábiles', owner: 'Dueño recurso' },
  { alert: 'Recursos sin uso', threshold: 'Sin acceso en 90 días', action: 'Ciclo de vida, almacenamiento frío o eliminación', owner: 'FinOps' },
];

export const TEAM_ROLES = [
  { role: 'Líder técnico del programa', count: 1, duty: 'Plan, presupuesto, hitos, riesgos y relación con RR. HH., Legal y dueños de datos', oncall: 'Escalamiento' },
  { role: 'Ingeniería de datos', count: 3, duty: 'CDC AWS/Azure, transformación Bronze/Silver/Gold, calidad y frescura', oncall: 'Sí (3)' },
  { role: 'Analytics engineering y BI', count: 1, duty: 'Vistas Gold, Looker, rendimiento y costo de consultas', oncall: 'No' },
  { role: 'Plataforma cloud y SRE', count: 2, duty: 'Terraform (IaC), réplica us-east4, bóveda, observabilidad y simulacros DR', oncall: 'Sí (2)' },
  { role: 'Seguridad (SecOps)', count: 2, duty: 'Hallazgos, auditoría, revisión de accesos, pruebas SEC-01 a SEC-10', oncall: 'Sí (2)' },
  { role: 'Identidad y redes', count: 2, duty: 'Federación Entra ID, WIF, HA VPN, cuentas de emergencia', oncall: 'Sí (1)' },
  { role: 'FinOps y proveedores', count: 1, duty: 'Tablero, presupuesto, alertas, cierre mensual y licencias', oncall: 'No' },
  { role: 'Gobierno de datos y cumplimiento', count: 1, duty: 'Clasificación, policy tags y matriz de flujos Ley 1581 junto con Legal', oncall: 'No' },
  { role: 'Dueño técnico de sistemas fuente', count: 1, duty: 'AWS tienda/app, Azure ERP/cajas: cambios, ventanas y CDC', oncall: 'No' },
];

export const RACI_MATRIX = [
  { process: 'Ingesta CDC y transformación', lider: 'A', ing: 'R', sre: 'C', secops: 'C', idnet: 'I', finops: 'I', gob: 'C' },
  { process: 'Operación del lago, réplica y DR', lider: 'A', ing: 'C', sre: 'R', secops: 'C', idnet: 'C', finops: 'I', gob: 'I' },
  { process: 'Federación, altas y bajas', lider: 'A', ing: 'I', sre: 'I', secops: 'C', idnet: 'R', finops: 'I', gob: 'I' },
  { process: 'Permisos, policy tags y auditoría', lider: 'A', ing: 'C', sre: 'I', secops: 'R', idnet: 'C', finops: 'I', gob: 'R' },
  { process: 'Presupuesto y alertas de costo', lider: 'A', ing: 'C', sre: 'C', secops: 'I', idnet: 'I', finops: 'R', gob: 'I' },
  { process: 'Observabilidad y guardias', lider: 'A', ing: 'R', sre: 'R', secops: 'C', idnet: 'C', finops: 'I', gob: 'I' },
  { process: 'Cumplimiento Ley 1581 y evidencia', lider: 'A', ing: 'I', sre: 'I', secops: 'C', idnet: 'I', finops: 'I', gob: 'R' },
];

export const GANTT_TASKS = [
  { label: 'Gobierno, línea base y concepto legal', start: 0, end: 2, color: '#475569' },
  { label: 'Federación Entra (AWS, GCP, Azure) y emergencia', start: 1, end: 6, color: '#0f2d6b' },
  { label: 'Lago us-south1: Bronze / Silver / Gold piloto', start: 2, end: 7, color: '#1f6e43' },
  { label: 'RBAC, policy tags, auditoría y SEC-01/02/05/06', start: 3, end: 6, color: '#1f6e43' },
  { label: 'Etiquetado FinOps, presupuestos y alertas', start: 1, end: 4, color: '#b46900' },
  { label: 'Observabilidad base y runbooks', start: 2, end: 6, color: '#0078d4' },
  { label: 'SEC-07: 1.ª prueba permisos us-east4', start: 5, end: 6, color: '#0ea5e9' },
  { label: 'Consolidación réplica us-east4 y bóveda Querétaro', start: 6, end: 10, color: '#1f6e43' },
  { label: 'Incorporación resto de fuentes (CDC AWS/Azure)', start: 6, end: 12, color: '#1f6e43' },
  { label: 'Simulacro DR completo y prueba de penetración', start: 10, end: 12, color: '#0078d4' },
  { label: 'Recertificación de accesos, SEC-01 a SEC-10', start: 12, end: 18, color: '#0f2d6b' },
  { label: 'Optimización FinOps (compromisos, ciclo de vida)', start: 12, end: 18, color: '#b46900' },
  { label: 'Cierre: evidencia legal firmada y traspaso operación', start: 16, end: 18, color: '#64748b' },
];

export const PHASES_SUMMARY = [
  {
    phase: 'Fase 1 · Piloto',
    months: 'Meses 1–6',
    deliverables: 'Gobierno y línea base; federación Entra y cuentas de emergencia; RBAC ventas/inventario; lago piloto (55 % fuentes); etiquetas y alertas FinOps; observabilidad base; SEC-07 primera prueba.',
    kpis: 'SEC-01, 02, 05, 06 y SEC-08 aprobadas; ≥ 95 % gasto etiquetado desde mes 3; costo real ±10 %; P1 ≤ 15 min.',
    owner: 'Seguridad y redes + dueños de datos; Líder técnico',
  },
  {
    phase: 'Fase 2 · Expansión',
    months: 'Meses 7–12',
    deliverables: '100 % fuentes CDC; consolidación réplica us-east4 y bóveda Querétaro; simulacro DR completo (DR-3); optimización de consultas (particiones y cuotas); primera recertificación trimestral.',
    kpis: '100 % fuentes críticas; DR dentro de RTO/RPO Anexo B; SEC-04 = 0 huérfanas; −15 % costo/TiB consultado vs. mes 6.',
    owner: 'Plataforma / SRE + Ingeniería de datos',
  },
  {
    phase: 'Fase 3 · Cobertura completa',
    months: 'Meses 13–18',
    deliverables: 'Cobertura total del lago; recertificación; evaluación de capacidad reservada (slots); evidencia legal firmada; traspaso formal a operación.',
    kpis: 'SEC-01 a SEC-10 y DR-1 a DR-8 aprobadas; costo mes 18 ≤ presupuesto; 100 % runbooks; matriz flujos firmada por Legal.',
    owner: 'Seguridad / auditoría / legal / plataforma',
  },
];

export const COST_RISKS = [
  { id: 'C-1', risk: 'Consultas sin control de bytes procesados', consequence: 'Consumo ×2 del costo de consultas', mitigation: 'Cuotas por proyecto/usuario, particiones y revisión mes 9 (Ing. Datos).' },
  { id: 'C-2', risk: 'Licencias Looker y Entra Governance mayores', consequence: 'Presupuesto recurrente subestimado', mitigation: 'Cotizar antes del mes 2; acotar Governance a usuarios del lago.' },
  { id: 'C-3', risk: 'Alza del dólar (TRM +8,8 % en nov 2026)', consequence: 'Aumento proporcional de toda la factura USD', mitigation: 'TRM 3.500 + reserva del 10 % y revisión trimestral (FinOps).' },
  { id: 'C-4', risk: 'Exceso de registros Data Access', consequence: 'Costo creciente de ingestión y retención', mitigation: 'Exclusiones justificadas y alerta 1,5× línea base (SecOps).' },
  { id: 'C-5', risk: 'Concentración de conocimiento en 14 personas', consequence: 'Indisponibilidad operativa en una nube/flujo', mitigation: 'Suplentes por rol, capacitación cruzada y consultoría.' },
  { id: 'C-6', risk: 'Transferencia entre nubes mayor a la prevista', consequence: 'Sobrecosto de egreso y retraso CDC', mitigation: 'Filtrado origen, compresión y evaluar interconexión si > 150 %.' },
  { id: 'C-7', risk: 'Cambios en réplica y bóveda (Sec. 4 vs. Sec. 5)', consequence: 'Desajuste presupuestal frente a arquitectura final', mitigation: 'Conciliar volúmenes 83 TB, Archive, Enterprise Plus y TRM antes de expandir.' },
  { id: 'C-8', risk: 'Simulacros DR omitidos por costo', consequence: 'Réplica sin valor real demostrado', mitigation: 'Partida dedicada en 5.4 y calendario fijo obligatorio.' },
  { id: 'C-9', risk: 'Fatiga de alertas', consequence: 'Alertas ignoradas y fallos tardíos', mitigation: 'Severidades P1–P3, dueños y depuración trimestral.' },
];

export const KEY_REFERENCES = [
  { ref: '[5]', title: 'Material de clase · Data Lakes Modernos en la Nube (Diapositiva 18)', note: 'Servicios y costos referenciales AWS/Azure/GCP' },
  { ref: '[6–9]', title: 'Catálogos oficiales de Data Transfer (AWS, Azure Bandwidth, GCS Pricing)', note: 'Tarifas de egreso consultadas el 21 de noviembre de 2026' },
  { ref: '[13]', title: 'Caso "Un solo lago para tres nubes" · Valleclaro Comercial', note: 'Sistemas, equipo de 14 personas, COP 38M/mes egreso y restricciones' },
  { ref: '[22–24, 63–65]', title: 'Ley 1581 de 2012, Decreto 1377/2013 y Circulares SIC 002/2018 y 003/2025', note: 'Países con nivel adecuado (EE. UU. y México) y cláusulas modelo' },
  { ref: '[34–42, 80]', title: 'Google Cloud: Datastream, BigQuery, Pub/Sub, HA VPN y Private Service Connect', note: 'Conectividad hub-and-spoke, CDC y acceso privado a APIs' },
  { ref: '[47–59]', title: 'Google Cloud: BigQuery MDR, Dual-Region Turbo, BigLake Metastore, Bucket Lock y Looker DR', note: 'Diseño de replicación, RTO/RPO y bóveda inmutable' },
  { ref: '[66–78]', title: 'Microsoft Entra ID, AWS IAM Identity Center, Google Workforce & Workload Identity Federation, VPC SC', note: 'Federación única, revocación de emergencia, RBAC y auditoría' },
  { ref: '[S18–S25]', title: 'Google Cloud Pricing, TRM nov 2026 (SFC) y Decreto 159 de 2026 (SMMLV 2026)', note: 'Base económica de la sección 5 y referencia sancionatoria Ley 1581' },
];

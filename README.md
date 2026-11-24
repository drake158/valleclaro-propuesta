# Valleclaro Comercial · Propuesta de Lago de Datos Central

Aplicación web interactiva organizada por pestañas que presenta el caso técnico y comercial completo de **Valleclaro Comercial** (*Un solo lago para tres nubes: AWS, Azure y Google Cloud*).

🌐 **Sitio publicado (GitHub Pages):** https://drake158.github.io/valleclaro-propuesta/

## Contenido por pestañas

0. **Resumen Ejecutivo:** Portada corporativa, indicadores clave, problemática actual y recomendación ejecutiva.
1. **Análisis de Alternativas:** Matriz ponderada (GCP 89,00 vs. Azure 73,75 vs. AWS 66,50), capacidades, servicios de referencia, simulador de tarifas de egreso y plan de portabilidad.
2. **Arquitectura Multinube:** Visor de alta resolución con lightbox/zoom del diagrama *Valleclaro: Hub Multinube y Lago Único*, explorador interactivo de componentes, zonas Bronze/Silver/Gold, flujos de ingesta, red HA VPN/BGP, plan CIDR y eliminación de 30 TB duplicados.
3. **Seguridad y Cumplimiento:** Federación con Microsoft Entra ID, protocolo de baja ≤ 15 min (IAM-01), RBAC por 8 grupos, auditoría, Ley 1581 de 2012 (SIC), checklist DR 3.9.1 y pruebas SEC-01 a SEC-10.
4. **Replicación y Resiliencia:** Topología de 3 regiones (Dallas, Virginia y Querétaro), runbook interactivo DR-RB-01, RTO/RPO, dependencias D-1 a D-10, copias 3-2-1 y pruebas DR.
5. **Costos, FinOps y Cronograma:** Evolución mensual interactiva (Mes 1–18), presupuesto Año 1 y 18 meses, simulador de sensibilidad, etiquetas/alertas FinOps, observabilidad, equipo de 14 personas (RACI) y Gantt de 3 fases.

## Desarrollo local

```bash
npm install
npm run dev
npm run build
```

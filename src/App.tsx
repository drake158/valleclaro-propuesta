import { useCallback, useEffect, useState } from 'react';
import {
  BarChart3,
  Coins,
  FileText,
  Layers,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { TabFooterNav, type TabMeta } from './components/TabFooterNav';
import { ValleclaroLogo } from './components/ValleclaroLogo';
import { AlternativasTab } from './tabs/AlternativasTab';
import { ArquitecturaTab } from './tabs/ArquitecturaTab';
import { CostosTab } from './tabs/CostosTab';
import { ResilienciaTab } from './tabs/ResilienciaTab';
import { ResumenTab } from './tabs/ResumenTab';
import { SeguridadTab } from './tabs/SeguridadTab';

const TABS: TabMeta[] = [
  { id: 'resumen', num: '0', shortLabel: 'Resumen Ejecutivo', fullLabel: 'Resumen Ejecutivo' },
  { id: 'alternativas', num: '1', shortLabel: 'Alternativas', fullLabel: '1. Análisis de Alternativas' },
  { id: 'arquitectura', num: '2', shortLabel: 'Arquitectura Multinube', fullLabel: '2. Arquitectura Multinube' },
  { id: 'seguridad', num: '3', shortLabel: 'Seguridad y Ley 1581', fullLabel: '3. Seguridad y Cumplimiento' },
  { id: 'resiliencia', num: '4', shortLabel: 'Replicación y DR', fullLabel: '4. Replicación y Resiliencia' },
  { id: 'costos', num: '5', shortLabel: 'Costos y Cronograma', fullLabel: '5. Costos, FinOps y Plan' },
];

const TAB_ICONS = [FileText, BarChart3, Layers, ShieldCheck, RefreshCw, Coins];

function getInitialTabIndex(): number {
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  const idx = TABS.findIndex((t) => t.id === hash);
  return idx >= 0 ? idx : 0;
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(getInitialTabIndex);

  const selectTab = useCallback((nextIdx: number) => {
    const bounded = Math.max(0, Math.min(TABS.length - 1, nextIdx));
    setActiveIndex(bounded);
    const nextHash = `#${TABS[bounded].id}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sincronización con hash del navegador
  useEffect(() => {
    const onHashChange = () => {
      setActiveIndex(getInitialTabIndex());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Navegación fluida por teclado (ArrowLeft / ArrowRight)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      // No cambiar de pestaña si el lightbox modal está abierto
      if (document.querySelector('[role="dialog"]')) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        selectTab((activeIndex + 1) % TABS.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        selectTab((activeIndex - 1 + TABS.length) % TABS.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, selectTab]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de navegación superior fija con pestañas */}
      <header className="top-header">
        <div className="top-header-inner">
          <div className="brand-bar">
            <div
              className="brand-left"
              onClick={() => selectTab(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') selectTab(0);
              }}
            >
              <span className="brand-pill-wrap">
                <ValleclaroLogo compact />
              </span>
              <div className="brand-meta">
                <span className="brand-eyebrow">Integración de Datos · Tercer Corte</span>
                <span className="brand-title">Propuesta de Lago de Datos Central</span>
              </div>
            </div>

            <div className="brand-right">
              <span className="kbd-hint" title="Navega entre pestañas con las flechas del teclado">
                <kbd>←</kbd> <kbd>→</kbd> Pestañas
              </span>
              <span className="badge-case">Caso 2026</span>
            </div>
          </div>

          <nav className="tabs-nav" role="tablist" aria-label="Secciones de la propuesta Valleclaro">
            {TABS.map((tab, idx) => {
              const Icon = TAB_ICONS[idx];
              const isActive = idx === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  className={`tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => selectTab(idx)}
                >
                  <span className="tab-num">{tab.num}</span>
                  <Icon size={15} />
                  <span>{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Contenido de la pestaña activa */}
      <main className="main-content" id={`panel-${TABS[activeIndex].id}`} role="tabpanel" style={{ flex: 1 }}>
        {activeIndex === 0 && <ResumenTab onNavigateTab={selectTab} />}
        {activeIndex === 1 && <AlternativasTab />}
        {activeIndex === 2 && <ArquitecturaTab />}
        {activeIndex === 3 && <SeguridadTab />}
        {activeIndex === 4 && <ResilienciaTab />}
        {activeIndex === 5 && <CostosTab />}

        <TabFooterNav tabs={TABS} activeIndex={activeIndex} onSelect={selectTab} />
      </main>

      {/* Pie institucional */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong style={{ color: '#ffffff' }}>Valleclaro Comercial</strong> · Propuesta Técnica y Comercial de Lago
            de Datos Central (AWS · Azure · Google Cloud)
          </div>
          <div>Integración de Datos · 21 de noviembre de 2026 · Hub us-south1 / DR us-east4 / Bóveda Querétaro</div>
        </div>
      </footer>
    </div>
  );
}

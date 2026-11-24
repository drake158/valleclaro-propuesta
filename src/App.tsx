import { useCallback, useEffect, useState } from 'react';
import {
  Award,
  Coins,
  FlaskConical,
  Layers,
  Presentation,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { TabFooterNav, type TabMeta } from './components/TabFooterNav';
import { ValleclaroLogo } from './components/ValleclaroLogo';
import { AlternativasTab } from './tabs/AlternativasTab';
import { ArquitecturaTab } from './tabs/ArquitecturaTab';
import { CostosTab } from './tabs/CostosTab';
import { PocTab } from './tabs/PocTab';
import { ResilienciaTab } from './tabs/ResilienciaTab';
import { ResumenTab } from './tabs/ResumenTab';
import { SeguridadTab } from './tabs/SeguridadTab';

const TABS: TabMeta[] = [
  { id: 'resumen', num: '00', shortLabel: 'Pitch', fullLabel: 'Pitch Ejecutivo' },
  { id: 'alternativas', num: '01', shortLabel: 'Nube (89/100)', fullLabel: '01 · Selección Cloud' },
  { id: 'arquitectura', num: '02', shortLabel: 'Arquitectura', fullLabel: '02 · Arquitectura Multinube' },
  { id: 'seguridad', num: '03', shortLabel: 'Seguridad', fullLabel: '03 · Seguridad y Ley 1581' },
  { id: 'resiliencia', num: '04', shortLabel: 'Resiliencia', fullLabel: '04 · Replicación y DR' },
  { id: 'costos', num: '05', shortLabel: 'Finanzas & Plan', fullLabel: '05 · Finanzas, OKRs y Plan' },
  { id: 'poc', num: '06', shortLabel: 'PoC (Anexo A)', fullLabel: '06 · PoC Simulada (4 Sem.)' },
];

const TAB_ICONS = [Presentation, Award, Layers, ShieldCheck, RefreshCw, Coins, FlaskConical];

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

  useEffect(() => {
    const onHashChange = () => setActiveIndex(getInitialTabIndex());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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

  const progressPct = ((activeIndex + 1) / TABS.length) * 100;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="deck-header">
        <div className="deck-progress-rail">
          <div className="deck-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="deck-header-inner">
          <div className="deck-brand-row">
            <div
              className="deck-brand-left"
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
              <div className="deck-subtitle">
                <span>Integración de Datos · v3</span>
                <span>Propuesta Lago de Datos Central</span>
              </div>
            </div>

            <div className="deck-controls">
              <span className="kbd-hint">
                <kbd>←</kbd> <kbd>→</kbd> Slides
              </span>
              <span className="slide-counter">
                0{activeIndex + 1} / 0{TABS.length}
              </span>
              <span className="badge-case">Pitch 2026</span>
            </div>
          </div>

          <nav className="deck-tabs" role="tablist" aria-label="Slides del pitch Valleclaro">
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
                  className={`deck-tab ${isActive ? 'active' : ''}`}
                  onClick={() => selectTab(idx)}
                >
                  <span className="deck-tab-num">{tab.num}</span>
                  <Icon size={14} />
                  <span>{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="deck-stage" id={`panel-${TABS[activeIndex].id}`} role="tabpanel">
        {activeIndex === 0 && <ResumenTab onNavigateTab={selectTab} />}
        {activeIndex === 1 && <AlternativasTab />}
        {activeIndex === 2 && <ArquitecturaTab />}
        {activeIndex === 3 && <SeguridadTab />}
        {activeIndex === 4 && <ResilienciaTab />}
        {activeIndex === 5 && <CostosTab />}
        {activeIndex === 6 && <PocTab />}

        <TabFooterNav tabs={TABS} activeIndex={activeIndex} onSelect={selectTab} />
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong style={{ color: '#ffffff' }}>Valleclaro Comercial</strong> · Pitch Deck Interactivo · Lago Único
            Multinube (v3)
          </div>
          <div>Dallas (Primaria) · Virginia (DR Tibio) · Querétaro (Bóveda 365 d) · 2026</div>
        </div>
      </footer>
    </div>
  );
}

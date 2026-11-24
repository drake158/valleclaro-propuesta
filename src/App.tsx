import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { ValleclaroLogo } from './components/ValleclaroLogo';
import { ArchSlide } from './slides/ArchSlide';
import { CloudSlide } from './slides/CloudSlide';
import { CoverSlide } from './slides/CoverSlide';
import { FinancePocSlide } from './slides/FinancePocSlide';
import { FlowsSlide } from './slides/FlowsSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { ResilienceSlide } from './slides/ResilienceSlide';
import { SecuritySlide } from './slides/SecuritySlide';

const SLIDES = [
  { id: 'portada', label: 'Portada', dark: true },
  { id: 'diagnostico', label: 'Diagnóstico', dark: false },
  { id: 'nube', label: 'Cloud 89/100', dark: false },
  { id: 'arquitectura', label: 'Arquitectura', dark: false },
  { id: 'flujo', label: 'Flujo & TB', dark: false },
  { id: 'seguridad', label: 'Seguridad', dark: false },
  { id: 'resiliencia', label: 'Resiliencia', dark: false },
  { id: 'finanzas', label: 'Finanzas & PoC', dark: false },
];

function getInitialSlide(): number {
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  const idx = SLIDES.findIndex((s) => s.id === hash);
  return idx >= 0 ? idx : 0;
}

export default function App() {
  const [index, setIndex] = useState<number>(getInitialSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
    setIndex(clamped);
    const nextHash = `#${SLIDES[clamped].id}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const onHash = () => setIndex(getInitialSlide());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }
      if (document.querySelector('[role="dialog"]')) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(SLIDES.length - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key >= '1' && e.key <= String(SLIDES.length)) {
        goTo(Number(e.key) - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, goTo, toggleFullscreen]);

  const currentSlide = SLIDES[index];

  return (
    <div className={`deck-shell ${currentSlide.dark ? 'dark-mode' : ''}`}>
      {/* Barra superior minimalista */}
      <header className="deck-topbar">
        <div
          className="topbar-left"
          onClick={() => goTo(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') goTo(0);
          }}
        >
          <span className="logo-plate">
            <ValleclaroLogo compact />
          </span>
          <span className="topbar-sep" />
          <span className="topbar-caption">Lago de Datos Central · Pitch Deck</span>
        </div>

        <div className="topbar-right">
          <span className="mono" style={{ fontSize: 11.5, color: currentSlide.dark ? '#94a3b8' : 'var(--ink-soft)' }}>
            ← → navegar
          </span>
          <button type="button" className="icon-btn" onClick={toggleFullscreen} title="Pantalla completa (F)">
            {isFullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
            <span>{isFullscreen ? 'Salir' : 'Presentar'}</span>
          </button>
        </div>
      </header>

      {/* Escenario literal de slide (100% viewport) */}
      <main className="slide-viewport">
        <button
          type="button"
          className="edge-arrow left"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <section key={currentSlide.id} className="slide-frame" aria-live="polite">
          {index === 0 && <CoverSlide onNext={() => goTo(1)} />}
          {index === 1 && <ProblemSlide />}
          {index === 2 && <CloudSlide />}
          {index === 3 && <ArchSlide />}
          {index === 4 && <FlowsSlide />}
          {index === 5 && <SecuritySlide />}
          {index === 6 && <ResilienceSlide />}
          {index === 7 && <FinancePocSlide />}
        </section>

        <button
          type="button"
          className="edge-arrow right"
          onClick={() => goTo(index + 1)}
          disabled={index === SLIDES.length - 1}
          aria-label="Siguiente slide"
        >
          <ChevronRight size={20} />
        </button>
      </main>

      {/* Dock inferior de slides literales */}
      <footer className="deck-dock">
        <button
          type="button"
          className="icon-btn"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          style={{ opacity: index === 0 ? 0.35 : 1 }}
        >
          <ChevronLeft size={14} /> Anterior
        </button>

        <nav className="dock-segments" aria-label="Selector de slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`dock-seg ${i === index ? 'active' : i < index ? 'passed' : ''}`}
              onClick={() => goTo(i)}
              aria-current={i === index ? 'step' : undefined}
            >
              <span className="dock-seg-bar" />
              <span className="dock-seg-lbl">
                0{i + 1} {s.label}
              </span>
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="dock-counter">
            0{index + 1} / 0{SLIDES.length}
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={() => goTo(index === SLIDES.length - 1 ? 0 : index + 1)}
            style={{
              background: currentSlide.dark ? '#0ea5e9' : 'var(--vc-cobalt)',
              borderColor: currentSlide.dark ? '#0ea5e9' : 'var(--vc-cobalt)',
              color: currentSlide.dark ? '#071327' : '#ffffff',
            }}
          >
            {index === SLIDES.length - 1 ? 'Reiniciar' : 'Siguiente'} <ChevronRight size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}

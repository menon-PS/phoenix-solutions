/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { AscentBackground } from './components/AscentBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PhoenixAiBot } from './components/PhoenixAiBot';
import { FloatingWhatsappWidget } from './components/FloatingWhatsappWidget';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { OnePagerPage } from './pages/OnePagerPage';
import { CrmPage } from './pages/CrmPage';
import { SITE_CONTENT, ASSETS } from './data/siteContent';
import { trackVisitorPageView } from './services/supabaseService';

// Custom Sharp Arrowhead Phoenix Bird Cursor Component (Zero Text Blur & Precise Tip)
function CrimsonPhoenixCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const rotation = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prevPos = useRef({ x: -100, y: -100 });

  // Check if current device supports hover and a fine pointer (true desktop mouse/trackpad)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasMouse(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setHasMouse(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Hyper-sensitive spring configuration for zero-latency, instant response
  const springConfig = { damping: 28, stiffness: 1400, mass: 0.03 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorRotation = useSpring(rotation, { damping: 22, stiffness: 500 });

  useEffect(() => {
    if (!hasMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      // Calculate flight banking angle based on movement direction vector
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        rotation.set(angle);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };

      // Precise arrowhead tip alignment
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 2);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.style.cursor === 'pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Inject CSS to hide default cursor globally on mouse-enabled viewports without applying blur
    const style = document.createElement('style');
    style.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        *, html, body, #root, a, button, input, select, textarea, [role="button"] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [hasMouse, isVisible, mouseX, mouseY, rotation]);

  if (!hasMouse) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            rotate: cursorRotation,
            position: 'fixed',
            left: 0,
            top: 0,
          }}
          className="pointer-events-none z-[2147483647] select-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: isHovered ? 1.35 : 1,
          }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.08 }}
        >
          {/* Sharp Aerodynamic Arrowhead Phoenix Bird SVG (No Blur) */}
          <div className="relative flex items-center justify-center pointer-events-none">
            {/* Sharp Metallic Crisp Glow Ring on Hover (Zero Blur filters) */}
            {isHovered && (
              <div className="absolute inset-0 rounded-full border-2 border-[#00b4d8] opacity-80 animate-ping pointer-events-none" />
            )}

            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none"
            >
              <defs>
                <linearGradient id="arrowheadGradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#ff7b00" />
                  <stop offset="70%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#00b4d8" />
                </linearGradient>
                <linearGradient id="arrowheadWingLeft" x1="4" y1="20" x2="16" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="60%" stopColor="#ff7b00" />
                  <stop offset="100%" stopColor="#ffd700" />
                </linearGradient>
              </defs>

              {/* Arrowhead Bird Left Swept Wing */}
              <path
                d="M 16 2 L 4 20 L 11 17 L 16 24 Z"
                fill="url(#arrowheadWingLeft)"
              />

              {/* Arrowhead Bird Right Swept Wing */}
              <path
                d="M 16 2 L 28 20 L 21 17 L 16 24 Z"
                fill="url(#arrowheadGradient)"
              />

              {/* Arrowhead Bird Center Fuselage & Tail Feathers */}
              <path
                d="M 16 2 L 18 16 L 23 28 L 16 24 L 9 28 L 14 16 Z"
                fill="url(#arrowheadGradient)"
              />

              {/* Precision Arrowhead Pointer Tip Dot */}
              <circle cx="16" cy="3" r="1.5" fill="#ffffff" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AppShell({ reducedMotion }: { reducedMotion: boolean }) {
  const location = useLocation();
  const isInitialMount = useRef(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync favicon with inlined Aqua Logo so it is always visible in published website
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon && ASSETS.logoEmblem) {
      favicon.href = ASSETS.logoEmblem;
    }
  }, []);

  // Global Copy-Proofing and Download-Prevention Engine
  useEffect(() => {
    // 1. Disable Right-Click Context Menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable dragging on all elements globally (especially images and text)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Disable Keyboard shortcuts (Copy, Save, Print, View Source, DevTools)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      // Block Copy (Cmd/Ctrl + C)
      if (isCmdOrCtrl && key === 'c') {
        e.preventDefault();
        return;
      }

      // Block Save Page (Cmd/Ctrl + S)
      if (isCmdOrCtrl && key === 's') {
        e.preventDefault();
        return;
      }

      // Block Print / Save PDF (Cmd/Ctrl + P)
      if (isCmdOrCtrl && key === 'p') {
        e.preventDefault();
        return;
      }

      // Block View Page Source (Cmd/Ctrl + U)
      if (isCmdOrCtrl && key === 'u') {
        e.preventDefault();
        return;
      }

      // Block Inspect Element / DevTools (F12 or Ctrl+Shift+I / Cmd+Opt+I)
      if (
        e.key === 'F12' ||
        (isCmdOrCtrl && e.shiftKey && key === 'i') ||
        (isMac && e.altKey && e.metaKey && key === 'i')
      ) {
        e.preventDefault();
        return;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // On every route change: update document.title, scroll to top, track analytics visitor stat, and focus h1
  useEffect(() => {
    const matchedNav = SITE_CONTENT.navigation.find(
      (item) => item.path === location.pathname
    );
    document.title = matchedNav
      ? matchedNav.pageTitle
      : 'Phoenix Solutions';

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Track visitor page view in Supabase PostgreSQL for site statistics tracking
    trackVisitorPageView(location.pathname);

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const focusDelay = reducedMotion ? 220 : 340;
    const timer = window.setTimeout(() => {
      const heading = document.querySelector<HTMLElement>(
        '#page-main-heading, main h1'
      );
      if (heading) {
        heading.focus({ preventScroll: true });
      }
    }, focusDelay);

    return () => window.clearTimeout(timer);
  }, [location.pathname, reducedMotion]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-[#042440] selection:bg-[#00b4d8]/20 selection:text-[#03396c]">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          const heading = document.querySelector<HTMLElement>(
            '#page-main-heading, main h1'
          );
          if (heading) {
            heading.focus();
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#034078] focus:text-white focus:font-semibold focus:rounded-sm"
      >
        Skip to main content
      </a>

      {/* Crimson Red Phoenix Custom Mouse Cursor */}
      <CrimsonPhoenixCursor />

      {/* Route-Aware White & Aqua 3D Background */}
      <AscentBackground
        currentPath={location.pathname}
        reducedMotion={reducedMotion}
      />

      {/* Persistent Sticky Header */}
      <Header reducedMotion={reducedMotion} />

      {/* Main View Area with min-height to prevent footer jump during AnimatePresence mode="wait" */}
      <main
        id="main-content"
        className="relative z-10 flex-1 min-h-[calc(100vh-4rem)] flex flex-col"
      >
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<HomePage reducedMotion={reducedMotion} />}
            />
            <Route
              path="/about"
              element={<AboutPage reducedMotion={reducedMotion} />}
            />
            <Route
              path="/founder"
              element={<Navigate to="/about?modal=founder" replace />}
            />
            <Route
              path="/cofounder"
              element={<Navigate to="/about?modal=cofounder" replace />}
            />
            <Route
              path="/co-founder"
              element={<Navigate to="/about?modal=cofounder" replace />}
            />
            <Route
              path="/services"
              element={<ServicesPage reducedMotion={reducedMotion} />}
            />
            <Route
              path="/updates"
              element={<UpdatesPage reducedMotion={reducedMotion} />}
            />
            <Route
              path="/contact"
              element={<ContactPage reducedMotion={reducedMotion} />}
            />
            <Route
              path="/one-pager"
              element={<OnePagerPage reducedMotion={reducedMotion} />}
            />
            <Route
              path="/onepager"
              element={<Navigate to="/one-pager" replace />}
            />
            <Route
              path="/crm"
              element={<CrmPage reducedMotion={reducedMotion} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Persistent Footer with Admin CMS Trigger */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Admin CMS & Site Statistics Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Floating Secure AI Bot Assistant */}
      <PhoenixAiBot onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Round Floating WhatsApp Action Icon Widget */}
      <FloatingWhatsappWidget />
    </div>
  );
}

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <HashRouter>
      <AppShell reducedMotion={reducedMotion} />
    </HashRouter>
  );
}

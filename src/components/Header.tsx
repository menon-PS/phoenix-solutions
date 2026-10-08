import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { PhoenixLogo } from './PhoenixLogo';
import { SITE_CONTENT } from '../data/siteContent';

interface HeaderProps {
  reducedMotion: boolean;
}

export const Header: React.FC<HeaderProps> = ({ reducedMotion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  // Trigger the top aqua-blue sweep bar and close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSweepKey((prev) => prev + 1);
  }, [location.pathname]);

  // Track scroll position for the scroll-driven logo blend & fade on the Home route ('/')
  useEffect(() => {
    if (location.pathname !== '/') {
      setScrollY(0);
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Close mobile menu on Escape key or window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Keep logo fully visible constantly at 100% opacity as requested
  const logoOpacity = 1;
  const isLogoVisible = true;

  return (
    <header
      className="sticky top-0 inset-x-0 z-50 h-20 bg-white/92 backdrop-blur-md border-b border-[#0077b6]/18 shadow-[0_6px_20px_-8px_rgba(4,36,64,0.08)]"
      role="banner"
    >
      {/* Top Phoenix Aqua-to-Navy Progress Sweep Bar on Route Transitions */}
      <div
        className="absolute top-0 inset-x-0 h-[2.5px] overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          key={sweepKey}
          initial={{ scaleX: 0, opacity: 1, transformOrigin: '0% 50%' }}
          animate={{
            scaleX: [0, 0.65, 1],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.75,
            times: [0, 0.6, 1],
            ease: 'easeOut',
          }}
          className="w-full h-full bg-gradient-to-r from-[#ffffff] via-[#00b4d8] to-[#034078] shadow-[0_0_8px_rgba(0,180,216,0.45)]"
        />
      </div>

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Lockup containing ONLY the symbol/emblem to maximize Phoenix visibility */}
        <div
          style={{
            opacity: logoOpacity,
            pointerEvents: isLogoVisible ? 'auto' : 'none',
            transition: 'opacity 100ms linear',
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6] rounded-sm"
            aria-label="Phoenix Solutions — Go to Home page"
          >
            <div className="relative p-2 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-[0_4px_14px_-2px_rgba(3,64,120,0.06)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-white/60 group-hover:scale-115 group-hover:shadow-[0_12px_24px_-4px_rgba(0,180,216,0.22)]">
              <PhoenixLogo
                size={80}
                variant="emblem"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>
        </div>

        {/* Zone 2: Desktop Navigation (Exactly Five Links now: Home, About Us, Services, Updates & Gallery, Contact) */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Primary Navigation"
        >
          {SITE_CONTENT.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6] rounded-sm ${
                  isActive
                    ? 'text-[#0077b6] font-semibold'
                    : 'text-[#1e3a5f] hover:text-[#034078]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00b4d8] to-[#034078] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: WhatsApp Round Icon Action & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/918179093087?text=Hello%20Phoenix%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20strategic%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            aria-label="Chat with Phoenix Solutions on WhatsApp (+91 8179093087)"
            title="Chat directly on WhatsApp (+91 8179093087)"
          >
            <svg
              className="w-5 h-5 fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#042440] hover:text-[#0077b6] rounded-md btn-3d-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077b6] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-b border-[#0077b6]/25 px-4 pt-3 pb-6 shadow-xl"
          >
            <ul className="flex flex-col space-y-1">
              {SITE_CONTENT.navigation.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-3 text-base font-medium rounded-md transition-colors ${
                        isActive
                          ? 'text-[#0077b6] bg-[#f0f7fe] border-l-2 border-[#0077b6] font-semibold'
                          : 'text-[#1e3a5f] hover:text-[#0077b6] hover:bg-[#f8fbff]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#0077b6]" aria-hidden="true">
                      →
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-[#0077b6]/15">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 px-4 text-sm font-semibold rounded-md btn-3d-primary"
              >
                Get in Touch
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

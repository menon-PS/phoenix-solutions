import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../data/siteContent';

interface AscentBackgroundProps {
  currentPath: string;
  reducedMotion: boolean;
}

export const AscentBackground: React.FC<AscentBackgroundProps> = ({
  currentPath,
  reducedMotion,
}) => {
  const [bannerSrc, setBannerSrc] = useState<string>(ASSETS.heroBanner);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  const handleBannerError = () => {
    if (bannerSrc !== ASSETS.heroBannerFallback) {
      setBannerSrc(ASSETS.heroBannerFallback);
    }
  };

  const isHome = currentPath === '/';
  // Fade out the hero banner on scroll on home page
  const bannerScrollOpacity = isHome ? Math.max(0, 1 - scrollY / 400) : 0;
  const bannerOpacityValue = isHome ? 0.95 * bannerScrollOpacity : 0;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      {/* LAYER 1: Pure White Canvas */}
      <div className="absolute inset-0 bg-white" />

      {/* LAYER 2: 3D Phoenix Rising Banner (White Background Version) */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: bannerOpacityValue,
          scale: isHome && !reducedMotion ? 1 + (scrollY / 2000) : 1,
          y: isHome && !reducedMotion ? scrollY * -0.05 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <img
          src={bannerSrc}
          alt=""
          referrerPolicy="no-referrer"
          onError={handleBannerError}
          className="w-full h-full object-cover object-center block"
        />
      </motion.div>

      {/* LAYER 3: Readability scrim (Ensures absolute perfect readability with pure white overlay towards bottom) */}
      {isHome && (
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
          }}
        />
      )}

      {/* LAYER 4: Animated Blue Flares Rising from the Bottom of the Screen */}
      {!reducedMotion && (
        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => {
            const size = 6 + (i % 5) * 4; // sizes from 6px to 22px (perfect small sparks!)
            const left = `${(i * 7) % 100}%`; // distributed horizontally
            const delay = i * 0.4; // staggered delays
            const duration = 12 + (i % 4) * 3; // speeds from 12s to 21s
            const driftX = (i % 2 === 0 ? 50 : -50) * ((i % 3) + 1); // tight horizontal drift
            
            return (
              <motion.div
                key={i}
                initial={{ y: '110vh', x: 0, opacity: 0, scale: 0.8 }}
                animate={{
                  y: '-10vh',
                  x: [0, driftX * 0.4, driftX * 0.8, driftX],
                  opacity: [0, 0.75, 0.95, 0.4, 0],
                  scale: [0.8, 1.2, 1.2, 0.9, 0.6],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full blur-[1px]"
                style={{
                  width: size,
                  height: size,
                  left: left,
                  bottom: '-10vh',
                  background: i % 2 === 0 
                    ? 'radial-gradient(circle, rgba(0, 180, 216, 0.9) 0%, rgba(3, 64, 120, 0.3) 70%, transparent 100%)'
                    : 'radial-gradient(circle, rgba(56, 189, 248, 0.9) 0%, rgba(0, 119, 182, 0.3) 70%, transparent 100%)',
                  boxShadow: i % 2 === 0
                    ? '0 0 8px rgba(0, 180, 216, 0.65)'
                    : '0 0 8px rgba(56, 189, 248, 0.65)',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

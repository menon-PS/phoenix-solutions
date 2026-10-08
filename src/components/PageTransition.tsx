import React from 'react';
import { motion, Variants } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  reducedMotion: boolean;
  className?: string;
}

export function getStaggerContainerVariants(reducedMotion: boolean): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.05,
      },
    },
  };
}

export function getFadeUpItemVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.25 },
      },
    };
  }

  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.48,
        ease: 'easeOut',
      },
    },
  };
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  reducedMotion,
  className = '',
}) => {
  const pageVariants: Variants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.25, ease: 'easeOut' },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.2, ease: 'easeIn' },
        },
      }
    : {
        initial: { opacity: 0, y: 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
        exit: {
          opacity: 0,
          y: -20,
          transition: { duration: 0.3, ease: 'easeIn' },
        },
      };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

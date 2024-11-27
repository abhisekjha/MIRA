import { animate, spring } from 'framer-motion';

// Enhanced haptic patterns for different interactions
export function triggerHapticFeedback(type: 'open' | 'close' | 'send' | 'receive' = 'open') {
  if (!('vibrate' in navigator)) return;

  const patterns = {
    open: [100, 50, 200, 50, 300], // Strong initial feedback
    close: [50, 25, 100],
    send: [50],
    receive: [25, 25]
  };

  navigator.vibrate(patterns[type]);
}

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const portalAnimationVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    x: '100%',
    filter: 'brightness(0.5) blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: 'brightness(1) blur(0px)',
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: '100%',
    filter: 'brightness(0.5) blur(10px)',
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.3,
    }
  }
};

export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
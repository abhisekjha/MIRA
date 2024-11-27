import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={clsx(
        'p-6 rounded-2xl bg-mistGray/50 border border-moonlitSilver/10',
        'hover:border-solarPurple/50 transition-all backdrop-blur-sm',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
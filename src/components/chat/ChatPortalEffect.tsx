import React from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  delay: number;
  x: number;
  size: number;
}

function Particle({ delay, x, size }: ParticleProps) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-gradient-to-t from-auroraBlue to-solarPurple"
      style={{ left: `${x}%`, width: size, height: size }}
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: -200,
        opacity: [0, 1, 0],
        transition: {
          delay,
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }
      }}
    />
  );
}

export function ChatPortalEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial Burst Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-auroraBlue/20 to-solarPurple/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      />

      {/* Light Rays */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 h-[300px] w-[2px] origin-bottom"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.2), transparent)',
              rotate: `${i * 30}deg`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.2, 1.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.2}
          x={Math.random() * 100}
          size={Math.random() * 4 + 2}
        />
      ))}
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/50 transition-all cursor-pointer group"
    >
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 tracking-tight text-zinc-200">{title}</h3>
      <p className="text-zinc-500">{description}</p>
    </motion.div>
  );
}
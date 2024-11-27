import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveSphere } from '../three/InteractiveSphere';

export function InteractiveSphereSection() {
  return (
    <section className="relative min-h-screen bg-obsidianBlack py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-auroraBlue via-quantumCyan to-solarPurple bg-clip-text text-transparent mb-4"
          >
            Explore MiRA's Neural Network
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-moonlitSilver text-lg max-w-2xl mx-auto"
          >
            Interact with our advanced AI visualization system. Rotate, zoom, and explore
            the complex neural pathways that power MiRA's intelligence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-auroraBlue/10 to-solarPurple/10 backdrop-blur-xl border border-moonlitSilver/10"
        >
          <InteractiveSphere />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidianBlack/80 to-transparent">
            <div className="flex flex-wrap gap-4 justify-center text-sm text-moonlitSilver">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-auroraBlue" />
                <span>Neural Connections</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-quantumCyan" />
                <span>Data Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-solarPurple" />
                <span>Active Pathways</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
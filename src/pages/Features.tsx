import React from 'react';
import { Brain, Sparkles, Users, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-violet-400" />,
      title: "Predictive Intelligence",
      description: "Advanced AI that learns from your patterns and provides personalized insights for better decision-making."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-violet-400" />,
      title: "Adaptive Interface",
      description: "A beautiful, intuitive interface that adjusts to your preferences and needs in real-time."
    },
    {
      icon: <Users className="w-6 h-6 text-violet-400" />,
      title: "Community Insights",
      description: "Learn from collective experiences while maintaining privacy and security."
    },
    {
      icon: <Shield className="w-6 h-6 text-violet-400" />,
      title: "Privacy First",
      description: "Your data is encrypted and secure. You're always in control of your information."
    },
    {
      icon: <Zap className="w-6 h-6 text-violet-400" />,
      title: "Real-time Sync",
      description: "Seamlessly sync your data across all devices with instant updates and backups."
    },
    {
      icon: <Globe className="w-6 h-6 text-violet-400" />,
      title: "Global Network",
      description: "Connect with a worldwide community of users sharing insights and experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      {/* Gradient Orb */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Discover how MiRA's innovative features can transform your daily life and enhance your personal growth journey.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/50 transition-all cursor-pointer group"
            >
              <div className="mb-4 p-3 bg-violet-500/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-200">
                {feature.title}
              </h3>
              <p className="text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
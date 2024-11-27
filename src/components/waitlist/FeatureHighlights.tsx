import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6 text-auroraBlue" />,
    title: "AI-Powered Assistance",
    description: "Advanced machine learning algorithms that adapt to your needs"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-quantumCyan" />,
    title: "Personalized Experience",
    description: "Tailored recommendations and insights just for you"
  },
  {
    icon: <Shield className="w-6 h-6 text-solarPurple" />,
    title: "Privacy First",
    description: "Your data is encrypted and secure, always under your control"
  },
  {
    icon: <Zap className="w-6 h-6 text-hyperLime" />,
    title: "Real-time Updates",
    description: "Instant synchronization across all your devices"
  }
];

export function FeatureHighlights() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="mt-12">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left mb-4 text-moonlitSilver hover:text-auroraBlue transition-colors"
      >
        <h3 className="text-xl font-semibold">
          {isExpanded ? "Hide Features" : "View Features"}
        </h3>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-mistGray/50 border border-moonlitSilver/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-obsidianBlack/30 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-lunarWhite mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-moonlitSilver">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
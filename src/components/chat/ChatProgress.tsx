import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface ChatProgressProps {
  step: 'sending' | 'processing' | 'receiving' | 'formatting' | 'rendering' | 'complete' | 'error';
}

export function ChatProgress({ step }: ChatProgressProps) {
  const steps = [
    { id: 'sending', label: 'Sending request to OpenAI...' },
    { id: 'processing', label: 'Processing your prompt...' },
    { id: 'receiving', label: 'Receiving response...' },
    { id: 'formatting', label: 'Formatting content...' },
    { id: 'rendering', label: 'Rendering response...' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="relative">
        {/* Progress Bar */}
        <div className="h-1 bg-mistGray/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-auroraBlue to-solarPurple"
            initial={{ width: '0%' }}
            animate={{ 
              width: step === 'complete' 
                ? '100%' 
                : step === 'error'
                ? '100%'
                : `${(currentStepIndex + 1) * 20}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="mt-4">
          {step === 'error' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-crimsonGlare"
            >
              <XCircle className="w-5 h-5" />
              <span>Error processing request. Please try again.</span>
            </motion.div>
          ) : step === 'complete' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-hyperLime"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Response complete</span>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-moonlitSilver">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{steps[currentStepIndex]?.label}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
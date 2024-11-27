import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Loader, AlertCircle } from 'lucide-react';

interface ResponseDisplayProps {
  response: string | null;
  loading: boolean;
  error?: string;
}

export function ResponseDisplay({ response, loading, error }: ResponseDisplayProps) {
  if (!response && !loading && !error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-mistGray/30 rounded-xl border border-moonlitSilver/10"
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${error ? 'bg-crimsonGlare/10' : 'bg-auroraBlue/10'}`}>
          {error ? (
            <AlertCircle className="w-6 h-6 text-crimsonGlare" />
          ) : (
            <Bot className="w-6 h-6 text-auroraBlue" />
          )}
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center gap-2 text-moonlitSilver">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Generating response...</span>
            </div>
          ) : error ? (
            <p className="text-crimsonGlare">{error}</p>
          ) : (
            <p className="text-moonlitSilver whitespace-pre-wrap">{response}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
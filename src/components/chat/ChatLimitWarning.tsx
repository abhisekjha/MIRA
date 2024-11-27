import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatLimitWarningProps {
  remainingChats: number;
}

export function ChatLimitWarning({ remainingChats }: ChatLimitWarningProps) {
  if (remainingChats > 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-horizonCoral/10 border border-horizonCoral/20 rounded-lg"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-horizonCoral shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-moonlitSilver">
            {remainingChats === 0 ? (
              "You've reached your chat limit"
            ) : (
              `You have ${remainingChats} free ${remainingChats === 1 ? 'chat' : 'chats'} remaining`
            )}
          </p>
          <Link
            to="/waitlist"
            className="text-sm text-horizonCoral hover:text-solarPurple transition-colors"
          >
            Join our waitlist for unlimited access →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
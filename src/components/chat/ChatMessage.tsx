import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../services/openai/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-4 ${isBot ? 'bg-mistGray/20' : ''} p-6 rounded-xl`}
    >
      <div className={`p-3 rounded-xl ${
        isBot ? 'bg-auroraBlue/10 ring-1 ring-auroraBlue/20' : 'bg-solarPurple/10 ring-1 ring-solarPurple/20'
      }`}>
        {isBot ? (
          <Bot className="w-6 h-6 text-auroraBlue" />
        ) : (
          <User className="w-6 h-6 text-solarPurple" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium text-moonlitSilver/70">
          {isBot ? 'MiRA' : 'You'}
        </p>
        <p className="text-lunarWhite whitespace-pre-wrap leading-relaxed">
          {message.content || 'No response generated. Please try again.'}
        </p>
      </div>
    </motion.div>
  );
}
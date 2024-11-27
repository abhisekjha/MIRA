import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  loading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSubmit, loading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    if (disabled) {
      toast.error('Please sign in to continue chatting');
      return;
    }
    
    if (loading) {
      toast.error('Please wait for the current message to process');
      return;
    }
    
    onSubmit(message);
    setMessage('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-auroraBlue to-solarPurple rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
      <div className="relative flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "Please sign in to continue chatting" : "Type your message..."}
          className="w-full px-6 py-4 bg-obsidianBlack/50 border border-moonlitSilver/10 rounded-l-xl 
            focus:outline-none focus:border-solarPurple text-moonlitSilver text-lg 
            placeholder-moonlitSilver/50 disabled:opacity-50"
          disabled={loading || disabled}
        />
        <motion.button
          type="submit"
          disabled={!message.trim() || loading || disabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-aurora-glow hover:animate-glow rounded-r-xl text-lunarWhite 
            flex items-center justify-center transition-all disabled:opacity-50 font-medium"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-lunarWhite border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </form>
  );
}
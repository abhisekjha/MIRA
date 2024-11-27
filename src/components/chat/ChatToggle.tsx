import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useChatUI } from '../../contexts/ChatUIContext';
import { triggerHapticFeedback } from '../../utils/animations';
import { playSound } from '../../utils/sound';

export function ChatToggle() {
  const { isChatVisible, toggleChat } = useChatUI();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleToggle = () => {
    toggleChat();
    triggerHapticFeedback(isChatVisible ? 'close' : 'open');
    playSound(isChatVisible ? 'close' : 'portal');
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 p-4 bg-aurora-glow hover:animate-glow rounded-full text-lunarWhite 
        focus:outline-none focus:ring-2 focus:ring-auroraBlue transition-all duration-300
        shadow-lg hover:shadow-auroraBlue/25"
      aria-label={isChatVisible ? "Hide chat" : "Show chat"}
    >
      <MessageSquare className="w-6 h-6" />
    </motion.button>
  );
}
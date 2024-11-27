import React from 'react';
import { motion } from 'framer-motion';
import { Home, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../contexts/ChatContext';
import { useChatUI } from '../../contexts/ChatUIContext';
import { triggerHapticFeedback } from '../../utils/animations';
import { playSound } from '../../utils/sound';

export function NavigationButtons() {
  const navigate = useNavigate();
  const { resetChat } = useChat();
  const { toggleChat } = useChatUI();
  const [isResetting, setIsResetting] = React.useState(false);

  const handleReset = async () => {
    if (isResetting) return;
    setIsResetting(true);
    resetChat();
    playSound('click');
    triggerHapticFeedback('send');
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsResetting(false);
  };

  const handleHome = () => {
    toggleChat();
    playSound('close');
    triggerHapticFeedback('close');
    navigate('/');
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <motion.button
        onClick={handleHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-aurora-glow rounded-xl text-lunarWhite 
          hover:animate-glow focus:outline-none focus:ring-2 focus:ring-auroraBlue 
          transition-all duration-300 group"
        aria-label="Return to home"
      >
        <div className="relative flex items-center gap-2">
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">Home</span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-auroraBlue to-solarPurple opacity-0 
          group-hover:opacity-20 transition-opacity duration-300 blur-md" />
      </motion.button>

      <motion.button
        onClick={handleReset}
        disabled={isResetting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-aurora-glow rounded-xl text-lunarWhite 
          hover:animate-glow focus:outline-none focus:ring-2 focus:ring-auroraBlue 
          disabled:opacity-50 transition-all duration-300 group"
        aria-label="New chat"
      >
        <div className="relative flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">
            {isResetting ? 'Resetting...' : 'New Chat'}
          </span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-auroraBlue to-solarPurple opacity-0 
          group-hover:opacity-20 transition-opacity duration-300 blur-md" />
      </motion.button>
    </div>
  );
}
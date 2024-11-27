import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChatUI } from '../../contexts/ChatUIContext';
import { triggerHapticFeedback } from '../../utils/animations';
import { playSound } from '../../utils/sound';

export function NavigationIcon() {
  const navigate = useNavigate();
  const { toggleChat } = useChatUI();
  const [showTooltip, setShowTooltip] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleClick = () => {
    const currentTime = Date.now();
    
    if (currentTime - lastClickTime < 300) {
      // Double click detected
      toggleChat();
      triggerHapticFeedback('close');
      playSound('close');
      setClickCount(0);
    } else {
      // Single click
      navigate('/');
      triggerHapticFeedback('click');
      playSound('click');
      setClickCount(clickCount + 1);
    }
    
    setLastClickTime(currentTime);
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 bg-aurora-glow hover:animate-glow rounded-lg text-lunarWhite 
          focus:outline-none focus:ring-2 focus:ring-auroraBlue transition-all duration-300
          shadow-lg hover:shadow-auroraBlue/25"
        aria-label="Navigation: Click once for home, double click to minimize chat"
      >
        <Home className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5
              bg-mistGray/95 backdrop-blur-sm border border-moonlitSilver/10 rounded-lg
              text-moonlitSilver text-sm whitespace-nowrap"
          >
            Click: Home • Double Click: Minimize
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
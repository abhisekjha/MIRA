import React from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../contexts/ChatContext';

export function HomeButton() {
  const navigate = useNavigate();
  const { resetChat } = useChat();
  const [isResetting, setIsResetting] = React.useState(false);

  const handleReset = async () => {
    if (isResetting) return;
    
    setIsResetting(true);
    resetChat();
    
    // Animate transition
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate('/');
    setIsResetting(false);
  };

  return (
    <motion.button
      onClick={handleReset}
      disabled={isResetting}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-50 p-3 bg-aurora-glow rounded-xl text-lunarWhite 
        hover:animate-glow focus:outline-none focus:ring-2 focus:ring-auroraBlue 
        disabled:opacity-50 transition-all duration-300 group"
      aria-label="Return to home"
    >
      <div className="relative flex items-center gap-2">
        <motion.div
          animate={isResetting ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={isResetting ? "opacity-100" : "opacity-0"}
        >
          <RotateCcw className="w-5 h-5" />
        </motion.div>
        
        <motion.div
          animate={isResetting ? { opacity: 0 } : { opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Home className="w-5 h-5" />
        </motion.div>
        
        {/* <span className="ml-6 text-sm font-medium">
          {isResetting ? 'Resetting...' : 'Return Home'}
        </span> */}
      </div>

      {/* Pulsing Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-auroraBlue to-solarPurple opacity-0 
        group-hover:opacity-20 transition-opacity duration-300 blur-md" />
    </motion.button>
  );
}
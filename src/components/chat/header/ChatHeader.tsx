import React from 'react';
import { motion } from 'framer-motion';
import { Home, Plus, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../../contexts/ChatContext';
import { useChatUI } from '../../../contexts/ChatUIContext';
import { UserMenu } from './UserMenu';
import { triggerHapticFeedback } from '../../../utils/animations';

interface ChatHeaderProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export function ChatHeader({ onFullscreen, isFullscreen }: ChatHeaderProps) {
  const navigate = useNavigate();
  const { resetChat } = useChat();
  const { toggleChat } = useChatUI();
  const [isResetting, setIsResetting] = React.useState(false);

  const handleReset = async () => {
    if (isResetting) return;
    setIsResetting(true);
    resetChat();
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsResetting(false);
  };

  const handleHome = () => {
    toggleChat(); // Minimize chat
    triggerHapticFeedback('close');
    navigate('/'); // Navigate home
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-obsidianBlack/80 backdrop-blur-xl border-b border-moonlitSilver/10"
      role="banner"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-aurora-glow rounded-lg text-lunarWhite hover:animate-glow transition-all"
              aria-label="Return to home"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </motion.button>

            <motion.button
              onClick={handleReset}
              disabled={isResetting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-mistGray/50 rounded-lg text-moonlitSilver hover:text-lunarWhite hover:bg-mistGray transition-all"
              aria-label="New chat"
            >
              <Plus className="w-5 h-5" />
              <span>{isResetting ? 'Resetting...' : 'New Chat'}</span>
            </motion.button>

            <motion.button
              onClick={onFullscreen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-mistGray/50 rounded-lg text-moonlitSilver hover:text-lunarWhite hover:bg-mistGray transition-all"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
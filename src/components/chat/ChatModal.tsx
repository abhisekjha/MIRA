import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatProgress } from './ChatProgress';
import { ChatLimitWarning } from './ChatLimitWarning';
import { ChatSidebar } from './ChatSidebar';
import { UserMenu } from './header/UserMenu';
import { NavigationIcon } from '../navigation/NavigationIcon';
import { useChat } from '../../contexts/ChatContext';
import { useChatUI } from '../../contexts/ChatUIContext';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  loading?: boolean;
}

export function ChatModal({ isOpen, onClose, onSubmit, loading }: ChatModalProps) {
  const { messages, remainingChats, requiresAuth, currentChatId, selectChat } = useChat();
  const { isChatVisible } = useChatUI();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isChatVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-50 bg-obsidianBlack flex"
        >
          {/* Navigation Icon */}
          <NavigationIcon />

          {/* Sidebar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isSidebarOpen ? 320 : 0 }}
            className="relative h-full overflow-hidden"
          >
            <ChatSidebar
              onSelectChat={selectChat}
              currentChatId={currentChatId}
            />
          </motion.div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="h-16 px-6 bg-obsidianBlack/80 backdrop-blur-xl border-b border-moonlitSilver/10 flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
              >
                <ChevronLeft className={`w-6 h-6 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
              </button>
              <UserMenu />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Progress Indicator */}
            {loading && (
              <div className="px-6 py-4 border-t border-moonlitSilver/10">
                <ChatProgress step="sending" />
              </div>
            )}

            {/* Chat Limit Warning */}
            {remainingChats <= 2 && (
              <div className="px-6 py-4 border-t border-moonlitSilver/10">
                <ChatLimitWarning remainingChats={remainingChats} />
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t border-moonlitSilver/10">
              <ChatInput 
                onSubmit={onSubmit}
                loading={loading}
                disabled={requiresAuth}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
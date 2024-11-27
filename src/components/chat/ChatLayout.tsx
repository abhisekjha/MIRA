import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus } from 'lucide-react';
import { ChatSidebar } from './ChatSidebar';
import { useChat } from '../../contexts/ChatContext';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  const { currentChatId, selectChat, resetChat } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="fixed inset-0 bg-obsidianBlack flex">
      {/* Left Sidebar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isSidebarOpen ? 320 : 0 }}
        className="relative h-full border-r border-moonlitSilver/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-mistGray/30 backdrop-blur-xl">
          {/* New Chat Button */}
          <button
            onClick={resetChat}
            className="w-full p-4 flex items-center gap-2 text-moonlitSilver hover:text-auroraBlue transition-colors border-b border-moonlitSilver/10"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>

          {/* Chat History */}
          <ChatSidebar 
            onSelectChat={selectChat}
            currentChatId={currentChatId}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-mistGray/30 text-moonlitSilver hover:text-auroraBlue transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
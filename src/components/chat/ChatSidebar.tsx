import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Trash2, Download, Plus } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import type { ChatMessage } from '../../services/openai/types';

interface ChatSidebarProps {
  onSelectChat: (chatId: string) => void;
  currentChatId: string | null;
}

export function ChatSidebar({ onSelectChat, currentChatId }: ChatSidebarProps) {
  const { savedChats, deleteChat, exportChat, resetChat } = useChat();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPreview = (messages: ChatMessage[]) => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage?.content.slice(0, 50) + (lastMessage?.content.length > 50 ? '...' : '');
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 h-full bg-mistGray/30 border-r border-moonlitSilver/10 flex flex-col"
    >
      <div className="p-4 border-b border-moonlitSilver/10">
        <button
          onClick={resetChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-aurora-glow hover:animate-glow rounded-lg text-lunarWhite transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {savedChats.length === 0 ? (
          <div className="p-4 text-center text-moonlitSilver/50">
            No saved chats yet
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {savedChats.map((chat) => (
              <motion.button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  currentChatId === chat.id
                    ? 'bg-auroraBlue/20 border border-auroraBlue/30'
                    : 'hover:bg-mistGray/50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-lunarWhite truncate">
                      {chat.title || 'Untitled Chat'}
                    </p>
                    <p className="text-xs text-moonlitSilver mt-1">
                      {formatDate(chat.createdAt)}
                    </p>
                    <p className="text-xs text-moonlitSilver/70 mt-1 truncate">
                      {getPreview(chat.messages)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="p-1 text-moonlitSilver hover:text-crimsonGlare transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        exportChat(chat.id);
                      }}
                      className="p-1 text-moonlitSilver hover:text-auroraBlue transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
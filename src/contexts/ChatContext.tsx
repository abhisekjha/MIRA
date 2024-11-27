import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import type { ChatMessage } from '../services/openai/types';
import { nanoid } from 'nanoid';

interface SavedChat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  remainingChats: number;
  savedChats: SavedChat[];
  currentChatId: string | null;
  addMessage: (message: ChatMessage) => void;
  requiresAuth: boolean;
  resetChat: () => void;
  saveChat: (title?: string) => void;
  deleteChat: (chatId: string) => void;
  exportChat: (chatId: string) => void;
  selectChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const MAX_FREE_CHATS = 5;
const STORAGE_KEY = 'mira_saved_chats';

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [remainingChats, setRemainingChats] = useState(MAX_FREE_CHATS);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load saved chats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSavedChats(JSON.parse(saved));
    }
  }, []);

  // Save chats to localStorage when updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedChats));
  }, [savedChats]);

  useEffect(() => {
    const chatCount = Math.floor(messages.length / 2);
    const remaining = user ? Infinity : Math.max(0, MAX_FREE_CHATS - chatCount);
    setRemainingChats(remaining);

    if (remaining === 0) {
      toast((t) => (
        <div className="flex items-center gap-2">
          <span>You've reached the chat limit.</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate('/login');
            }}
            className="text-auroraBlue hover:text-solarPurple transition-colors"
          >
            Sign in to continue
          </button>
        </div>
      ), { duration: 5000 });
    }
  }, [messages, user, navigate]);

  const addMessage = (message: ChatMessage) => {
    if (remainingChats === 0 && !user) {
      navigate('/login');
      return;
    }
    setMessages(prev => [...prev, message]);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    if (!user) {
      setRemainingChats(MAX_FREE_CHATS);
    }
  };

  const saveChat = (title?: string) => {
    if (messages.length === 0) return;

    const chatId = currentChatId || nanoid();
    const chat: SavedChat = {
      id: chatId,
      title: title || `Chat ${savedChats.length + 1}`,
      messages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSavedChats(prev => {
      const existing = prev.findIndex(c => c.id === chatId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = chat;
        return updated;
      }
      return [...prev, chat];
    });

    setCurrentChatId(chatId);
    toast.success('Chat saved successfully');
  };

  const deleteChat = (chatId: string) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      resetChat();
    }
    toast.success('Chat deleted successfully');
  };

  const exportChat = (chatId: string) => {
    const chat = savedChats.find(c => c.id === chatId);
    if (!chat) return;

    const content = chat.messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Chat exported successfully');
  };

  const selectChat = (chatId: string) => {
    const chat = savedChats.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      remainingChats,
      savedChats,
      currentChatId,
      addMessage,
      requiresAuth: remainingChats === 0 && !user,
      resetChat,
      saveChat,
      deleteChat,
      exportChat,
      selectChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
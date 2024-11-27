import React, { createContext, useContext, useState } from 'react';

interface ChatUIContextType {
  isChatVisible: boolean;
  toggleChat: () => void;
}

const ChatUIContext = createContext<ChatUIContextType | undefined>(undefined);

export function ChatUIProvider({ children }: { children: React.ReactNode }) {
  const [isChatVisible, setIsChatVisible] = useState(true);

  const toggleChat = () => {
    setIsChatVisible(prev => !prev);
  };

  return (
    <ChatUIContext.Provider value={{ isChatVisible, toggleChat }}>
      {children}
    </ChatUIContext.Provider>
  );
}

export function useChatUI() {
  const context = useContext(ChatUIContext);
  if (context === undefined) {
    throw new Error('useChatUI must be used within a ChatUIProvider');
  }
  return context;
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { useChat } from '../../contexts/ChatContext';
import { useChatUI } from '../../contexts/ChatUIContext';
import { generateResponse } from '../../services/openai';
import toast from 'react-hot-toast';

export function ChatWindow() {
  const { messages, addMessage, remainingChats, requiresAuth } = useChat();
  const { isChatVisible } = useChatUI();
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (message: string) => {
    if (loading || requiresAuth) return;
    
    setLoading(true);
    addMessage({ role: 'user', content: message });
    
    try {
      const response = await generateResponse(message);
      
      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (!response.message) {
        toast.error('No response generated. Please try again.');
        return;
      }

      addMessage({ role: 'assistant', content: response.message });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isChatVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-obsidianBlack border-l border-moonlitSilver/10
        flex flex-col shadow-2xl"
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-moonlitSilver/10">
        {remainingChats <= 2 && !requiresAuth && (
          <div className="mb-4 p-4 bg-horizonCoral/10 border border-horizonCoral/20 rounded-lg">
            <p className="text-moonlitSilver">
              {remainingChats === 0 
                ? "You've reached your chat limit. Please sign in to continue."
                : `You have ${remainingChats} free ${remainingChats === 1 ? 'chat' : 'chats'} remaining.`
              }
            </p>
          </div>
        )}
        
        <ChatInput
          onSubmit={handleSubmit}
          loading={loading}
          disabled={requiresAuth}
        />
      </div>
    </motion.div>
  );
}
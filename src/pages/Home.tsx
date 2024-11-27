import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, MessageSquare } from 'lucide-react';
import { generateResponse } from '../services/openai';
import { ChatModal } from '../components/chat/ChatModal';
import { ChatToggle } from '../components/chat/ChatToggle';
import { HolographicSphere } from '../components/three/HolographicSphere';
import { InteractiveSphereSection } from '../components/sections/InteractiveSphereSection';
import { useChat } from '../contexts/ChatContext';
import toast from 'react-hot-toast';

export function Home() {
  const { addMessage } = useChat();
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const suggestions = [
    {
      icon: <Brain className="w-5 h-5" />,
      text: "Help me plan my day efficiently",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Generate creative project ideas",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Get personalized advice",
    },
  ];

  const handleSubmit = async (prompt: string) => {
    setLoading(true);
    setIsChatOpen(true);
    
    addMessage({ role: 'user', content: prompt });

    try {
      const response = await generateResponse(prompt);
      if (response.error) {
        toast.error(response.error);
      } else {
        addMessage({ role: 'assistant', content: response.message });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate response';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-obsidianBlack flex flex-col relative overflow-hidden">
        {/* 3D Sphere Background */}
        <div className="absolute inset-0 opacity-50">
          <HolographicSphere />
        </div>

        <main className="flex-grow flex flex-col items-center justify-center px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl w-full text-center mb-8 relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-auroraBlue via-quantumCyan to-solarPurple bg-clip-text text-transparent mb-4">
              How can MiRA assist you today?
            </h1>
            <p className="text-moonlitSilver text-lg md:text-xl">
              Your AI companion for personal growth and productivity
            </p>
          </motion.div>

          <div className="w-full max-w-2xl space-y-6 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-auroraBlue to-solarPurple rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <input
                type="text"
                placeholder="Type your request..."
                className="w-full px-6 py-4 bg-obsidianBlack/80 backdrop-blur-sm border border-moonlitSilver/10 rounded-lg 
                  focus:outline-none focus:border-solarPurple text-moonlitSilver text-lg placeholder-moonlitSilver/50 relative"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => handleSubmit(suggestion.text)}
                  disabled={loading}
                  className="p-4 bg-mistGray/30 backdrop-blur-sm border border-moonlitSilver/10 rounded-lg 
                    hover:border-solarPurple/50 hover:bg-mistGray/50 transition-all group text-left disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-solarPurple/10 rounded-lg text-solarPurple group-hover:scale-110 transition-transform">
                      {suggestion.icon}
                    </div>
                    <span className="text-moonlitSilver group-hover:text-lunarWhite transition-colors">
                      {suggestion.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </main>

        <ChatToggle />
        
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* Interactive Sphere Section */}
      <InteractiveSphereSection />
    </>
  );
}
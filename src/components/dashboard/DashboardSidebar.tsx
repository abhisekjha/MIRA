import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ isOpen, onToggle }: DashboardSidebarProps) {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat', path: '/chat' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.aside
      initial={{ width: isOpen ? 240 : 0 }}
      animate={{ width: isOpen ? 240 : 0 }}
      className="h-screen bg-mistGray/30 backdrop-blur-xl border-r border-moonlitSilver/10 relative"
    >
      <div className="p-4">
        <button
          onClick={onToggle}
          className="absolute -right-4 top-8 p-2 rounded-full bg-mistGray text-moonlitSilver hover:text-auroraBlue transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-auroraBlue/20 text-auroraBlue'
                    : 'text-moonlitSilver hover:text-auroraBlue hover:bg-mistGray/50'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
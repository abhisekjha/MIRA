import React from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { User as UserType } from '../../services/auth/types';

interface DashboardHeaderProps {
  user: UserType | null;
  onToggleSidebar: () => void;
}

export function DashboardHeader({ user, onToggleSidebar }: DashboardHeaderProps) {
  const { logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <header className="h-16 border-b border-moonlitSilver/10 bg-mistGray/30 backdrop-blur-xl">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="text-2xl font-bold bg-aurora-glow bg-clip-text text-transparent">
            MiRA
          </Link>
        </div>

        {user && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-mistGray/50 flex items-center justify-center">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <span>{user.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 py-2 bg-mistGray/95 backdrop-blur-xl rounded-lg shadow-xl border border-moonlitSilver/10"
              >
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-moonlitSilver hover:text-crimsonGlare hover:bg-mistGray transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
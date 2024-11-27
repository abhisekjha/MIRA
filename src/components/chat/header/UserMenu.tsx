import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!user) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 bg-aurora-glow rounded-lg text-lunarWhite hover:animate-glow transition-all"
      >
        <User className="w-5 h-5" />
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-mistGray/50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-mistGray/50 flex items-center justify-center border border-moonlitSilver/10">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
          ) : (
            <User className="w-5 h-5 text-moonlitSilver" />
          )}
        </div>
        <span className="text-moonlitSilver">{user.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 py-2 bg-mistGray/95 backdrop-blur-xl rounded-lg shadow-xl border border-moonlitSilver/10"
          >
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-moonlitSilver hover:text-auroraBlue hover:bg-mistGray/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-moonlitSilver hover:text-crimsonGlare hover:bg-mistGray/50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
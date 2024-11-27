import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  User,
  LogOut,
  MessageSquare,
  ChevronDown,
  Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { resetChat } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    resetChat();
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-obsidianBlack/80 backdrop-blur-xl border-b border-moonlitSilver/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Primary Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Brain className="w-8 h-8 text-auroraBlue group-hover:text-solarPurple transition-colors" />
              <span className="text-2xl font-bold bg-aurora-glow bg-clip-text text-transparent">
                MiRA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link to="/features" className="text-moonlitSilver hover:text-auroraBlue transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-moonlitSilver hover:text-auroraBlue transition-colors">
                About
              </Link>
              <Link to="/blog" className="text-moonlitSilver hover:text-auroraBlue transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-moonlitSilver hover:text-auroraBlue transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-mistGray/50 border border-moonlitSilver/10 flex items-center justify-center">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-mistGray/95 backdrop-blur-xl rounded-lg shadow-xl border border-moonlitSilver/10"
                    >
                      <Link
                        to="/chat"
                        className="flex items-center px-4 py-2 text-moonlitSilver hover:text-auroraBlue hover:bg-mistGray transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-moonlitSilver hover:text-crimsonGlare hover:bg-mistGray transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-6 py-2 rounded-lg bg-aurora-glow hover:animate-glow text-lunarWhite transition-all"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-moonlitSilver hover:text-auroraBlue transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4"
            >
              <Link
                to="/"
                className="flex items-center space-x-2 py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/features"
                className="block py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
              >
                Features
              </Link>
              <Link
                to="/about"
                className="block py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="block py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
              >
                Blog
              </Link>

              {user ? (
                <>
                  <div className="py-2 flex items-center space-x-2 text-moonlitSilver">
                    <div className="w-8 h-8 rounded-full bg-mistGray/50 border border-moonlitSilver/10 flex items-center justify-center">
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <Link
                    to="/chat"
                    className="flex items-center py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Chat
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 text-moonlitSilver hover:text-crimsonGlare transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center w-full py-2 text-moonlitSilver hover:text-auroraBlue transition-colors"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center w-full px-6 py-2 rounded-lg bg-aurora-glow hover:animate-glow text-lunarWhite transition-all"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
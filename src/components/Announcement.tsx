import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnnouncementProps {
  message: string;
  link?: {
    text: string;
    url: string;
  };
}

const Announcement: React.FC<AnnouncementProps> = ({ message, link }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-aurora-glow bg-opacity-5 border-b border-moonlitSilver/10"
    >
      <div className="container mx-auto py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <p className="text-moonlitSilver text-sm">
              <span className="md:hidden">{message}</span>
              <span className="hidden md:inline">{message}</span>
            </p>
          </div>
          {link && (
            <div className="ml-4 flex-shrink-0">
              <Link
                to={link.url}
                className="text-sm font-medium text-auroraBlue hover:text-solarPurple transition-colors"
              >
                {link.text} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
          <button
            type="button"
            className="ml-4 flex-shrink-0 p-1 rounded-lg hover:bg-mistGray transition-colors"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-5 w-5 text-moonlitSilver" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Announcement;
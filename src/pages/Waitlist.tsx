import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { waitlistStorage, type WaitlistEntry } from '../utils/storage';
import { WaitlistCard } from '../components/waitlist/WaitlistCard';
import { FeatureHighlights } from '../components/waitlist/FeatureHighlights';

export function Waitlist() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [entry, setEntry] = useState<WaitlistEntry | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const referralCode = searchParams.get('ref');
    const newEntry = waitlistStorage.add(name, email, referralCode);
    setEntry(newEntry);
    setSubmitted(true);
    
    if (referralCode) {
      const referrer = waitlistStorage.getByReferralCode(referralCode);
      if (referrer) {
        toast.success(`Thanks for using ${referrer.name}'s referral!`);
      }
    }
  };

  if (submitted && entry) {
    return (
      <div className="min-h-[80vh] bg-obsidianBlack py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-auroraBlue to-solarPurple rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-lunarWhite" />
            </div>
            <h2 className="text-3xl font-bold bg-aurora-glow bg-clip-text text-transparent mb-4">
              You're on the list!
            </h2>
            <p className="text-moonlitSilver text-lg">
              Share your referral code to move up the waitlist faster.
            </p>
          </motion.div>

          <WaitlistCard entry={entry} />
          <FeatureHighlights />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-obsidianBlack py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-aurora-glow bg-clip-text text-transparent mb-4">
            Join the Waitlist
          </h1>
          <p className="text-moonlitSilver text-lg">
            Be among the first to experience MiRA and help shape the future of personal AI assistance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-aurora-glow rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="relative w-full px-6 py-4 bg-mistGray border border-moonlitSilver/10 rounded-lg focus:outline-none focus:border-solarPurple text-moonlitSilver text-lg placeholder-moonlitSilver/50"
                placeholder="Enter your name"
              />
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-aurora-glow rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative w-full px-6 py-4 bg-mistGray border border-moonlitSilver/10 rounded-lg focus:outline-none focus:border-solarPurple text-moonlitSilver text-lg placeholder-moonlitSilver/50"
                placeholder="Enter your email"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-aurora-glow hover:animate-glow rounded-lg text-lunarWhite font-semibold text-lg shadow-lg shadow-auroraBlue/25 transition-all"
            >
              Join Waitlist
            </motion.button>

            <p className="text-sm text-moonlitSilver/70 text-center">
              By joining, you agree to receive updates about MiRA. You can unsubscribe at any time.
            </p>
          </form>
        </motion.div>

        <FeatureHighlights />
      </div>
    </div>
  );
}
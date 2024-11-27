import React from 'react';
import { motion } from 'framer-motion';
import { Download, Twitter, Linkedin, Facebook, Cpu, CircuitBoard } from 'lucide-react';
import domtoimage from 'dom-to-image';
import { TwitterShareButton, LinkedinShareButton, FacebookShareButton } from 'react-share';
import type { WaitlistEntry } from '../../utils/storage';

interface WaitlistCardProps {
  entry: WaitlistEntry;
}

export function WaitlistCard({ entry }: WaitlistCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const shareUrl = `https://mira.ai?ref=${entry.referralCode}`;
  const shareTitle = `I just joined the MiRA waitlist! Join me and be part of the future: `;

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await domtoimage.toPng(cardRef.current);
        const link = document.createElement('a');
        link.download = 'mira-waitlist-card.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating card image:', error);
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspect-[1.586/1] relative rounded-2xl overflow-hidden backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(89, 203, 232, 0.2), rgba(174, 103, 250, 0.2))',
        }}
      >
        {/* Holographic Effect Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-auroraBlue/10 via-transparent to-solarPurple/10 animate-gradient-xy" />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <CircuitBoard className="w-full h-full text-quantumCyan" />
        </div>

        {/* Glass Effect Border */}
        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/5 to-black/5 backdrop-blur-xl" />

        {/* Card Content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-5 h-5 text-quantumCyan animate-pulse" />
                <h3 className="text-lg font-medium text-lunarWhite tracking-wider">
                  MiRA ACCESS
                </h3>
              </div>
              <p className="text-moonlitSilver/80 text-sm">
                Early Access Member
              </p>
            </div>
            <div className="flex items-center gap-2 bg-obsidianBlack/30 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-hyperLime animate-pulse" />
              <span className="text-sm text-moonlitSilver">#{entry.position}</span>
            </div>
          </div>

          {/* Card Number / Referral Code */}
          <div className="my-6">
            <div className="font-mono text-2xl tracking-wider text-lunarWhite space-x-4">
              {entry.referralCode.match(/.{1,4}/g)?.map((group, index) => (
                <span key={index} className="inline-block">{group}</span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-moonlitSilver/80 text-xs mb-1">MEMBER NAME</p>
              <p className="text-lunarWhite font-medium tracking-wide">{entry.name}</p>
            </div>
            <div className="text-right">
              <p className="text-moonlitSilver/80 text-xs mb-1">JOINED</p>
              <p className="text-lunarWhite font-medium">
                {new Date(entry.joinedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Referral Stats */}
          {entry.referralCount > 0 && (
            <div className="absolute top-6 right-6 bg-hyperLime/20 px-3 py-1 rounded-full">
              <p className="text-hyperLime text-sm font-medium">
                {entry.referralCount} Referral{entry.referralCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-4">
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-auroraBlue to-solarPurple rounded-lg text-lunarWhite font-medium transition-all hover:shadow-lg hover:shadow-solarPurple/25"
        >
          <Download className="w-5 h-5" />
          Download Digital Card
        </motion.button>

        <div className="flex justify-center gap-4">
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-br from-auroraBlue/20 to-solarPurple/20 hover:from-auroraBlue/30 hover:to-solarPurple/30 transition-all"
            >
              <Twitter className="w-5 h-5 text-lunarWhite" />
            </motion.div>
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-br from-auroraBlue/20 to-solarPurple/20 hover:from-auroraBlue/30 hover:to-solarPurple/30 transition-all"
            >
              <Linkedin className="w-5 h-5 text-lunarWhite" />
            </motion.div>
          </LinkedinShareButton>

          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-br from-auroraBlue/20 to-solarPurple/20 hover:from-auroraBlue/30 hover:to-solarPurple/30 transition-all"
            >
              <Facebook className="w-5 h-5 text-lunarWhite" />
            </motion.div>
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
}
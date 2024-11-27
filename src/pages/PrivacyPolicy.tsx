import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/shared/PageHeader';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      {/* Subtle Gradient Glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        <PageHeader 
          title="Privacy Policy" 
          description="Updated: March 2024"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="prose prose-invert prose-violet max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide, including:</p>
            <ul>
              <li>Account details (name, email, profile info)</li>
              <li>Usage data and interactions</li>
              <li>Device details and analytics</li>
            </ul>

            <h2>2. How We Use It</h2>
            <p>Your data helps us:</p>
            <ul>
              <li>Enhance our services</li>
              <li>Personalize your experience</li>
              <li>Communicate updates and features</li>
              <li>Maintain security and prevent fraud</li>
            </ul>

            <h2>3. Data Protection</h2>
            <p>We safeguard your data with:</p>
            <ul>
              <li>End-to-end encryption</li>
              <li>Regular security audits</li>
              <li>Strict access controls</li>
            </ul>

            <h2>4. Your Rights</h2>
            <ul>
              <li>Access and review your data</li>
              <li>Request corrections or deletion</li>
              <li>Opt-out of marketing</li>
              <li>Data portability</li>
            </ul>

            <h2>5. Policy Updates</h2>
            <p>We may update this policy. Changes will be reflected here with an updated date.</p>

            <h2>6. Contact</h2>
            <ul>
              <li>Email: privacy@mira.ai</li>
              <li>Address: 123 AI Street, Tech City, TC 12345</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

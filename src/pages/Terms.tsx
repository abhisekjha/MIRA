import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/shared/PageHeader';

export function Terms() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      {/* Subtle Gradient Glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        <PageHeader 
          title="Terms of Service"
          description="Updated: March 2024"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="prose prose-invert prose-violet max-w-none">
            <h2>1. Acceptance</h2>
            <p>
              By using MiRA, you accept these terms. If you disagree, refrain from using our services.
            </p>

            <h2>2. License</h2>
            <p>Use MiRA for personal, non-commercial purposes. Restrictions include:</p>
            <ul>
              <li>No modification or copying</li>
              <li>No commercial use</li>
              <li>No reverse engineering</li>
              <li>No removal of proprietary notices</li>
            </ul>

            <h2>3. Responsibilities</h2>
            <ul>
              <li>Maintain account security</li>
              <li>Comply with laws</li>
              <li>Provide accurate details</li>
            </ul>

            <h2>4. Modifications</h2>
            <ul>
              <li>We may change or discontinue services</li>
              <li>Features and pricing are subject to updates</li>
            </ul>

            <h2>5. Liability</h2>
            <p>
              MiRA isn’t responsible for indirect or consequential damages from service use.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              Terms are governed by local laws where MiRA operates.
            </p>

            <h2>7. Contact</h2>
            <ul>
              <li>Email: legal@mira.ai</li>
              <li>Address: 123 AI Street, Tech City, TC 12345</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

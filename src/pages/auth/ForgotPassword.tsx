import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { emailSchema } from '../../services/auth/validation';
import { z } from 'zod';
import toast from 'react-hot-toast';

export function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      await emailSchema.parseAsync(email);
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        toast.error('Failed to send reset instructions. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidianBlack flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Gradient Orb */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-solarPurple/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-md w-full space-y-8 relative">
        <Link
          to="/login"
          className="inline-flex items-center text-moonlitSilver hover:text-auroraBlue transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <KeyRound className="mx-auto h-12 w-12 text-auroraBlue" />
          <h2 className="mt-6 text-3xl font-bold text-lunarWhite">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-moonlitSilver">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-hyperLime/10 border border-hyperLime/20 rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-medium text-hyperLime mb-2">
              Check your email
            </h3>
            <p className="text-moonlitSilver">
              We've sent password reset instructions to your email address.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-moonlitSilver" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none relative block w-full px-12 py-3 bg-mistGray/30 border ${
                    error ? 'border-crimsonGlare' : 'border-moonlitSilver/10'
                  } rounded-lg text-lunarWhite placeholder-moonlitSilver/50 focus:outline-none focus:ring-2 focus:ring-auroraBlue focus:border-transparent`}
                  placeholder="Email address"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-crimsonGlare">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-lunarWhite bg-aurora-glow hover:animate-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroraBlue disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-lunarWhite border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send reset instructions
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
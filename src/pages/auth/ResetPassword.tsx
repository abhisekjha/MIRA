import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { passwordSchema } from '../../services/auth/validation';
import { z } from 'zod';
import toast from 'react-hot-toast';

export function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await passwordSchema.parseAsync(password);
      await resetPassword(token, password);
      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        toast.error('Failed to reset password. Please try again.');
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <KeyRound className="mx-auto h-12 w-12 text-auroraBlue" />
          <h2 className="mt-6 text-3xl font-bold text-lunarWhite">
            Set new password
          </h2>
          <p className="mt-2 text-sm text-moonlitSilver">
            Enter your new password below.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                New password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-moonlitSilver" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-12 py-3 bg-mistGray/30 border ${
                    error ? 'border-crimsonGlare' : 'border-moonlitSilver/10'
                  } rounded-lg text-lunarWhite placeholder-moonlitSilver/50 focus:outline-none focus:ring-2 focus:ring-auroraBlue focus:border-transparent`}
                  placeholder="New password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm new password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-moonlitSilver" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-12 py-3 bg-mistGray/30 border ${
                    error ? 'border-crimsonGlare' : 'border-moonlitSilver/10'
                  } rounded-lg text-lunarWhite placeholder-moonlitSilver/50 focus:outline-none focus:ring-2 focus:ring-auroraBlue focus:border-transparent`}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-crimsonGlare">{error}</p>
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
                  Reset password
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
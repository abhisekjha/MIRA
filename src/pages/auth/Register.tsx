import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { registerSchema } from '../../services/auth/validation';
import { z } from 'zod';
import toast from 'react-hot-toast';

export function Register() {
  const { register } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      await registerSchema.parseAsync(data);
      await register(data.email, data.password, data.name);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error('Failed to register. Please try again.');
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
          <UserPlus className="mx-auto h-12 w-12 text-auroraBlue" />
          <h2 className="mt-6 text-3xl font-bold text-lunarWhite">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-moonlitSilver">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-auroraBlue hover:text-solarPurple transition-colors"
            >
              Sign in
            </Link>
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
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-moonlitSilver" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`appearance-none relative block w-full px-12 py-3 bg-mistGray/30 border ${
                    errors.name ? 'border-crimsonGlare' : 'border-moonlitSilver/10'
                  } rounded-lg text-lunarWhite placeholder-moonlitSilver/50 focus:outline-none focus:ring-2 focus:ring-auroraBlue focus:border-transparent`}
                  placeholder="Full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-crimsonGlare">{errors.name}</p>
              )}
            </div>

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
                    errors.email ? 'border-crimsonGlare' : 'border-moonlitSilver/10'
                  } rounded-lg text-lunarWhite placeholder-moonlitSilver/50 focus:outline-none focus:ring-2 focus:ring-auroraBlue focus:border-transparent`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-crimsonGlare">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
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
                    errors.password ? 'border-crimsonGlare' : 'border-moonlitSilver/10'
                  } rounded-lg text-lunarWhite placeholder-moonlitSilver/50 focus:outline-none focus:ring-2 focus:ring-auroraBlue focus:border-transparent`}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-crimsonGlare">{errors.password}</p>
              )}
            </div>
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
                  Create account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-moonlitSilver text-center">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-auroraBlue hover:text-solarPurple">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-auroraBlue hover:text-solarPurple">
              Privacy Policy
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
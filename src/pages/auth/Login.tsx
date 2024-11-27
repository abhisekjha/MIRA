import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { loginSchema } from '../../services/auth/validation';
import { z } from 'zod';
import toast from 'react-hot-toast';

export function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      await loginSchema.parseAsync(data);
      await login(data.email, data.password);
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
        toast.error('Failed to login. Please try again.');
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
          <LogIn className="mx-auto h-12 w-12 text-auroraBlue" />
          <h2 className="mt-6 text-3xl font-bold text-lunarWhite">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-moonlitSilver">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-auroraBlue hover:text-solarPurple transition-colors"
            >
              Sign up
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
                  autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-mistGray border-moonlitSilver/10 rounded focus:ring-auroraBlue"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-moonlitSilver">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-auroraBlue hover:text-solarPurple transition-colors"
              >
                Forgot your password?
              </Link>
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
                  Sign in
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
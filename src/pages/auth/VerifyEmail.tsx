import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { verifyEmail } from '../../services/auth/api';
import toast from 'react-hot-toast';

export function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');

  React.useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus('success');
        toast.success('Email verified successfully');
      })
      .catch(() => {
        setStatus('error');
        toast.error('Failed to verify email');
      });
  }, [token]);

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
          {status === 'loading' ? (
            <div className="w-12 h-12 border-2 border-auroraBlue border-t-transparent rounded-full animate-spin mx-auto" />
          ) : status === 'success' ? (
            <CheckCircle className="mx-auto h-12 w-12 text-hyperLime" />
          ) : (
            <XCircle className="mx-auto h-12 w-12 text-crimsonGlare" />
          )}
          
          <h2 className="mt-6 text-3xl font-bold text-lunarWhite">
            {status === 'loading'
              ? 'Verifying your email'
              : status === 'success'
              ? 'Email verified'
              : 'Verification failed'}
          </h2>
          
          <p className="mt-2 text-sm text-moonlitSilver">
            {status === 'loading'
              ? 'Please wait while we verify your email address...'
              : status === 'success'
              ? 'Your email has been verified successfully.'
              : 'Unable to verify your email address. The link may be invalid or expired.'}
          </p>
        </motion.div>

        {status !== 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => navigate('/login')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-lunarWhite bg-aurora-glow hover:animate-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroraBlue"
            >
              Continue to login
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
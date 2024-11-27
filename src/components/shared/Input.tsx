import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-moonlitSilver">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-3 bg-mistGray/50 border border-moonlitSilver/10 rounded-lg',
          'focus:outline-none focus:border-solarPurple text-moonlitSilver placeholder-moonlitSilver/50',
          'transition-all duration-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-crimsonGlare">{error}</p>
      )}
    </div>
  );
}
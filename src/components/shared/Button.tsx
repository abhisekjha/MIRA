import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  to?: string;
  onClick?: () => void;
  icon?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary', 
  to, 
  onClick,
  icon = false,
  className,
  type = 'button'
}: ButtonProps) {
  const baseStyles = clsx(
    'btn',
    {
      'bg-aurora-glow hover:animate-glow text-lunarWhite': variant === 'primary',
      'bg-mistGray hover:bg-cosmic-sunset text-moonlitSilver border border-moonlitSilver/10': variant === 'secondary'
    },
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
    className
  );

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="w-5 h-5 ml-2" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles}>
      {content}
    </button>
  );
}
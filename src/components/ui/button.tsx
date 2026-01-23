'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    if (variant === 'primary') {
      return (
        <button
          ref={ref}
          className={`analyze-btn ${isLoading ? 'loading' : ''} ${className}`}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading && (
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {children}
        </button>
      );
    }

    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-lg';

    const variantStyles = {
      secondary: 'bg-white/[0.03] border border-white/[0.08] text-text-secondary hover:border-cyan-500/50 hover:text-cyan-400',
      ghost: 'text-text-secondary hover:text-cyan-400 hover:bg-white/[0.03]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

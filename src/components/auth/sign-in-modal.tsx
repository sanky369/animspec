'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/contexts/auth-context';
import { XIcon } from '@/components/ui/icons';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function SignInModal({ isOpen, onClose, onSuccess, defaultMode = 'signin' }: SignInModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        onClose();
        onSuccess?.();
      } else if (mode === 'signup') {
        await signUpWithEmail(email, password);
        onClose();
        onSuccess?.();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await signInWithGoogle();
      onClose();
      onSuccess?.();
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/popup-closed-by-user':
        return 'Sign-in cancelled';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const modal = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <XIcon />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'signin' && 'Welcome back'}
            {mode === 'signup' && 'Create account'}
            {mode === 'forgot' && 'Reset password'}
          </h2>
          {mode === 'signup' && (
            <p className="modal-subtitle">Get 20 free credits to start analyzing animations</p>
          )}
        </div>

        {mode !== 'forgot' && (
          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" className="google-icon">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        )}

        {mode !== 'forgot' && <div className="divider">or</div>}

        <form onSubmit={handleEmailAuth}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>
          )}

          {error && <p className="form-error">{error}</p>}
          {resetSent && (
            <p className="form-success">Password reset email sent! Check your inbox.</p>
          )}

          <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : (
              <>
                {mode === 'signin' && 'Sign in'}
                {mode === 'signup' && 'Create account'}
                {mode === 'forgot' && 'Send reset email'}
              </>
            )}
          </button>
        </form>

        <div className="modal-footer">
          {mode === 'signin' && (
            <>
              <button
                type="button"
                className="link-button"
                onClick={() => { setMode('forgot'); setError(null); setResetSent(false); }}
              >
                Forgot password?
              </button>
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => { setMode('signup'); setError(null); }}
                >
                  Sign up
                </button>
              </p>
            </>
          )}
          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-button"
                onClick={() => { setMode('signin'); setError(null); }}
              >
                Sign in
              </button>
            </p>
          )}
          {mode === 'forgot' && (
            <button
              type="button"
              className="link-button"
              onClick={() => { setMode('signin'); setError(null); setResetSent(false); }}
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document === 'undefined' ? null : createPortal(modal, document.body);
}

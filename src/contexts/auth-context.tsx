'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuthInstance, getGoogleProvider, getDbInstance } from '@/lib/firebase/client';
import { COLLECTIONS, DEFAULT_FREE_CREDITS, type UserProfile } from '@/types/database';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ref for promise resolver - avoids stale closure in useEffect
  const authReadyResolverRef = useRef<(() => void) | null>(null);

  // Fetch or create user profile
  const fetchOrCreateProfile = async (firebaseUser: User): Promise<UserProfile | null> => {
    try {
      const db = getDbInstance();
      const profileRef = doc(db, COLLECTIONS.PROFILES, firebaseUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();

        // Update profile if Google provides name/avatar that we don't have
        const updates: Record<string, unknown> = {};
        if (!data.fullName && firebaseUser.displayName) {
          updates.fullName = firebaseUser.displayName;
        }
        if (!data.avatarUrl && firebaseUser.photoURL) {
          updates.avatarUrl = firebaseUser.photoURL;
        }

        // Apply updates if any
        if (Object.keys(updates).length > 0) {
          updates.updatedAt = serverTimestamp();
          await setDoc(profileRef, updates, { merge: true });
        }

        return {
          id: profileSnap.id,
          email: data.email,
          fullName: updates.fullName as string || data.fullName,
          avatarUrl: updates.avatarUrl as string || data.avatarUrl,
          creditsBalance: data.creditsBalance,
          creditsExpiresAt: data.creditsExpiresAt?.toDate() || null,
          hasUsedFreeTrial: data.hasUsedFreeTrial,
          isPaidUser: data.isPaidUser,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      }

      // Create new profile for new users
      const newProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> & { createdAt: ReturnType<typeof serverTimestamp>; updatedAt: ReturnType<typeof serverTimestamp> } = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        fullName: firebaseUser.displayName || null,
        avatarUrl: firebaseUser.photoURL || null,
        creditsBalance: DEFAULT_FREE_CREDITS,
        creditsExpiresAt: null,
        hasUsedFreeTrial: false,
        isPaidUser: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(profileRef, newProfile);

      return {
        ...newProfile,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error fetching/creating profile:', error);
      return null;
    }
  };

  // Set session cookie for middleware
  const setSessionCookie = async (firebaseUser: User | null, forceRefresh = false) => {
    if (firebaseUser) {
      // forceRefresh=true forces a new token from Firebase servers
      const token = await firebaseUser.getIdToken(forceRefresh);
      // Set a session cookie that expires in 7 days
      // Include Secure flag for HTTPS (production)
      const isSecure = window.location.protocol === 'https:';
      const domain = COOKIE_DOMAIN ? `; domain=${COOKIE_DOMAIN}` : '';
      document.cookie = `__session=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${isSecure ? '; Secure' : ''}${domain}`;
    } else {
      // Clear the session cookie
      const domain = COOKIE_DOMAIN ? `; domain=${COOKIE_DOMAIN}` : '';
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `__session=; path=/; max-age=0; SameSite=Lax${isSecure ? '; Secure' : ''}${domain}`;
    }
  };

  // Refresh the session token (call before API requests to ensure fresh token)
  // Returns the fresh token so callers can use it directly in Authorization header
  const refreshToken = async (): Promise<string | null> => {
    if (user) {
      const token = await user.getIdToken(true);
      await setSessionCookie(user, true);
      return token;
    }
    return null;
  };

  // Listen for auth state changes
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    const auth = getAuthInstance();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await setSessionCookie(firebaseUser);

      if (firebaseUser) {
        const userProfile = await fetchOrCreateProfile(firebaseUser);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setIsLoading(false);

      // Resolve any pending auth wait promise (for sign-in flows)
      if (authReadyResolverRef.current) {
        authReadyResolverRef.current();
        authReadyResolverRef.current = null;
      }
    });

    return () => unsubscribe();
  }, []);

  // Periodic token refresh - Firebase ID tokens expire after 1 hour
  // Refresh every 50 minutes to ensure token is always valid
  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(async () => {
      try {
        await setSessionCookie(user, true);
        console.log('Session token refreshed');
      } catch (error) {
        console.error('Failed to refresh session token:', error);
      }
    }, 50 * 60 * 1000); // 50 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  // Helper to wait for auth state to be ready after sign-in
  const waitForAuthReady = (): Promise<void> => {
    return new Promise((resolve) => {
      authReadyResolverRef.current = resolve;
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    const auth = getAuthInstance();
    const authReadyPromise = waitForAuthReady();
    await signInWithEmailAndPassword(auth, email, password);
    await authReadyPromise; // Wait for cookie to be set
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const auth = getAuthInstance();
    const authReadyPromise = waitForAuthReady();
    await createUserWithEmailAndPassword(auth, email, password);
    await authReadyPromise; // Wait for cookie to be set
  };

  const signInWithGoogle = async () => {
    const auth = getAuthInstance();
    const provider = getGoogleProvider();
    const authReadyPromise = waitForAuthReady();
    await signInWithPopup(auth, provider);
    await authReadyPromise; // Wait for cookie to be set
  };

  const signOut = async () => {
    const auth = getAuthInstance();
    await firebaseSignOut(auth);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    const auth = getAuthInstance();
    await sendPasswordResetEmail(auth, email);
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchOrCreateProfile(user);
      setProfile(userProfile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        resetPassword,
        refreshProfile,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

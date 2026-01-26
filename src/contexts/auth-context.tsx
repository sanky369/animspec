'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  const setSessionCookie = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      // Set a session cookie that expires in 7 days
      // Include Secure flag for HTTPS (production)
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `__session=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${isSecure ? '; Secure' : ''}`;
    } else {
      // Clear the session cookie
      document.cookie = '__session=; path=/; max-age=0';
    }
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
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const auth = getAuthInstance();
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const auth = getAuthInstance();
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const auth = getAuthInstance();
    const provider = getGoogleProvider();
    await signInWithPopup(auth, provider);
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

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy initialization variables
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;
let _googleProvider: GoogleAuthProvider | null = null;

// Get or initialize Firebase app
function getFirebaseApp(): FirebaseApp {
  if (_app) return _app;

  // Check if running in browser
  if (typeof window === 'undefined') {
    throw new Error('Firebase client should only be used in browser');
  }

  _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return _app;
}

// Lazy getters for Firebase services
export function getAuthInstance(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getDbInstance(): Firestore {
  if (!_db) {
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
}

export function getStorageInstance(): FirebaseStorage {
  if (!_storage) {
    _storage = getStorage(getFirebaseApp());
  }
  return _storage;
}

export function getGoogleProvider(): GoogleAuthProvider {
  if (!_googleProvider) {
    _googleProvider = new GoogleAuthProvider();
  }
  return _googleProvider;
}

// For backwards compatibility, export getters that will be called
// These will throw if called during SSR/static generation
export const auth = {
  get instance() { return getAuthInstance(); },
  get currentUser() { return getAuthInstance().currentUser; },
  onAuthStateChanged: (...args: Parameters<Auth['onAuthStateChanged']>) =>
    getAuthInstance().onAuthStateChanged(...args),
  signInWithEmailAndPassword: (...args: [string, string]) =>
    import('firebase/auth').then(m => m.signInWithEmailAndPassword(getAuthInstance(), ...args)),
  createUserWithEmailAndPassword: (...args: [string, string]) =>
    import('firebase/auth').then(m => m.createUserWithEmailAndPassword(getAuthInstance(), ...args)),
  signInWithPopup: (provider: GoogleAuthProvider) =>
    import('firebase/auth').then(m => m.signInWithPopup(getAuthInstance(), provider)),
  signOut: () => getAuthInstance().signOut(),
};

export const googleProvider = {
  get instance() { return getGoogleProvider(); },
};

export const db = {
  get instance() { return getDbInstance(); },
};

export const storage = {
  get instance() { return getStorageInstance(); },
};

export default getFirebaseApp;

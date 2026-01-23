import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

// Lazy initialization to avoid build-time errors
let _adminApp: App | null = null;
let _adminAuth: Auth | null = null;
let _adminDb: Firestore | null = null;
let _adminStorage: Storage | null = null;

function initializeAdminApp(): App {
  if (_adminApp) {
    return _adminApp;
  }

  if (getApps().length > 0) {
    _adminApp = getApps()[0];
    return _adminApp;
  }

  // Parse service account from environment variable
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }

  _adminApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return _adminApp;
}

// Lazy getters - only initialize when actually needed
export function getAdminAuth(): Auth {
  if (!_adminAuth) {
    _adminAuth = getAuth(initializeAdminApp());
  }
  return _adminAuth;
}

export function getAdminDb(): Firestore {
  if (!_adminDb) {
    _adminDb = getFirestore(initializeAdminApp());
  }
  return _adminDb;
}

export function getAdminStorage(): Storage {
  if (!_adminStorage) {
    _adminStorage = getStorage(initializeAdminApp());
  }
  return _adminStorage;
}

// For backwards compatibility, export as const using getters
// These will throw at runtime if env vars aren't set, but won't throw at build time
export const adminAuth = {
  get instance() { return getAdminAuth(); },
  verifyIdToken: (...args: Parameters<Auth['verifyIdToken']>) => getAdminAuth().verifyIdToken(...args),
  createSessionCookie: (...args: Parameters<Auth['createSessionCookie']>) => getAdminAuth().createSessionCookie(...args),
  verifySessionCookie: (...args: Parameters<Auth['verifySessionCookie']>) => getAdminAuth().verifySessionCookie(...args),
};

export const adminDb = {
  get instance() { return getAdminDb(); },
  collection: (...args: Parameters<Firestore['collection']>) => getAdminDb().collection(...args),
  doc: (...args: Parameters<Firestore['doc']>) => getAdminDb().doc(...args),
  runTransaction: (...args: Parameters<Firestore['runTransaction']>) => getAdminDb().runTransaction(...args),
  batch: () => getAdminDb().batch(),
};

export const adminStorage = {
  get instance() { return getAdminStorage(); },
  bucket: (...args: Parameters<Storage['bucket']>) => getAdminStorage().bucket(...args),
};

export default initializeAdminApp;

// Firebase client configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that all required config values are present
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  const errorMessage = `Missing Firebase configuration: ${missingFields.join(', ')}. ` +
    `Please check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_* variables are set. ` +
    `Make sure to restart your dev server (npm run dev) after creating/updating .env.local file.`;
  
  console.error('Firebase Configuration Error:', errorMessage);
  console.error('Missing fields:', missingFields);
  console.error('Current env values:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓' : '✗',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✓' : '✗',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✓' : '✗',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✓' : '✗',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✓' : '✗',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✓' : '✗',
  });
  
  throw new Error(errorMessage);
}

// Initialize Firebase
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  console.error('Firebase initialization error:', error);
  console.error('Firebase config:', { ...firebaseConfig, apiKey: firebaseConfig.apiKey ? '***' : 'MISSING' });
  throw error;
}

// Initialize Firebase Auth
export const auth = getAuth(app);
export default app;


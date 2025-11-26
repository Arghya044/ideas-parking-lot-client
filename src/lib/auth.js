// Firebase Auth helper functions
import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';

// Get current user's ID token
export const getIdToken = async () => {
  if (auth.currentUser) {
    try {
      return await auth.currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }
  return null;
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Register with email and password
export const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update user profile with name
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    // Check if auth is initialized
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your configuration.');
    }

    const provider = new GoogleAuthProvider();
    // Add additional scopes if needed
    provider.addScope('profile');
    provider.addScope('email');
    // Set custom parameters
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    const userCredential = await signInWithPopup(auth, provider);
    
    if (userCredential && userCredential.user) {
      return { success: true, user: userCredential.user };
    } else {
      return { success: false, error: 'Failed to sign in with Google' };
    }
  } catch (error) {
    console.error('Google sign-in error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = error.message || 'Failed to sign in with Google';
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign-in popup was closed. Please try again.';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMessage = 'Only one popup request is allowed at a time. Please try again.';
    } else if (error.code === 'auth/unauthorized-domain') {
      errorMessage = 'This domain is not authorized for Google sign-in. Please contact support.';
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMessage = 'Google sign-in is not enabled. Please contact support.';
    }
    
    return { success: false, error: errorMessage, code: error.code };
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

// Subscribe to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Legacy functions for backward compatibility (now using Firebase tokens)
export const setToken = async (token) => {
  // This is now handled by Firebase Auth automatically
  // Token is stored in Firebase Auth state
  console.warn('setToken is deprecated. Firebase Auth handles tokens automatically.');
};

export const getToken = async () => {
  return await getIdToken();
};

export const removeToken = async () => {
  await logout();
};


# Firebase Authentication Setup Guide

This project has been migrated from NextAuth.js to Firebase Authentication. Follow these steps to complete the setup.

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBeGyNjc6INKEU-STYk-kpwsZVSmGhg6gg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ideas-parking-lot-28e59.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ideas-parking-lot-28e59
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ideas-parking-lot-28e59.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=790741024572
NEXT_PUBLIC_FIREBASE_APP_ID=1:790741024572:web:0e38a1dfb110afd252e839

# API Configuration
NEXT_PUBLIC_API_URL=https://ideas-parking-lot-server.vercel.app
```

## 2. Install Dependencies

Run the following command to install Firebase SDK:

```bash
npm install
```

This will install the `firebase` package and remove `next-auth`.

## 3. Vercel Deployment

When deploying to Vercel, add all the environment variables from `.env.local` to your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable from the `.env.local` file
4. Make sure to add them for all environments (Production, Preview, Development)

## 4. Firebase Console Configuration

Make sure your Firebase project has the following authentication methods enabled:

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** authentication
3. Enable **Google** authentication (if you want Google sign-in)

## 5. What Changed

### Removed:
- NextAuth.js dependency
- NextAuth API routes (`/api/auth/callback/google/route.js`)
- JWT token storage in localStorage
- Custom JWT authentication system

### Added:
- Firebase Authentication SDK
- Firebase client configuration (`src/lib/firebase.js`)
- Firebase Auth helpers (`src/lib/auth.js`)
- Automatic token management via Firebase

### Updated:
- Login page now uses Firebase Auth
- Protected routes use Firebase Auth state
- API calls automatically include Firebase ID tokens
- Navbar uses Firebase Auth for user state

## 6. Authentication Flow

1. **Email/Password**: Users can register or sign in with email and password
2. **Google Sign-In**: Users can sign in with their Google account
3. **Token Management**: Firebase automatically manages ID tokens and refreshes them
4. **API Authentication**: All API requests include Firebase ID tokens in the Authorization header

## 7. Testing

After setup, test the following:
- [ ] User registration with email/password
- [ ] User login with email/password
- [ ] Google sign-in
- [ ] Protected routes (add-idea, manage-ideas)
- [ ] API calls with authentication
- [ ] User logout

## 8. Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all environment variables are set correctly
- Restart your development server after adding environment variables

### "Firebase: Error (auth/popup-closed-by-user)"
- User closed the Google sign-in popup - this is normal behavior

### API returns 401 Unauthorized
- Check that Firebase tokens are being sent correctly
- Verify the server is configured to accept Firebase tokens
- Check browser console for token errors

### User state not updating
- Firebase Auth state changes are handled automatically
- Check that `onAuthStateChange` is properly subscribed in components

## 9. Server Configuration

The server (index.js) is already configured to:
- Accept Firebase ID tokens in the Authorization header
- Verify tokens using Firebase Admin SDK
- Create/update user records in MongoDB based on Firebase authentication

No changes are needed on the server side.


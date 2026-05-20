import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, hasFirebaseConfig } from './firebase';

export async function loginWithGoogle(): Promise<UserCredential> {
  if (!hasFirebaseConfig() || !auth) {
    throw new Error(
      'Google login is not configured. Add Firebase env keys in .env.local and restart the app.'
    );
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  return signInWithPopup(auth, provider);
}

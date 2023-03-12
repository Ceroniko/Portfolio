import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { firebaseAuth } from '@configs';
import { firebaseUtils } from '../utils/firebaseUtils';
import { logUtils } from '../utils/logUtils';

const auth = {
  async signIn(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password);

      return userCredentials.user;
    } catch (error) {
      if (firebaseUtils.isFirebaseError(error)) {
        logUtils.error(error, 'Sign in Failed! Code - %s. Message - %s', error.code, error.message);
      }

      throw error;
    }
  },

  async signOut() {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      if (firebaseUtils.isFirebaseError(error)) {
        logUtils.error(error, 'Sign out Failed! Code - %s. Message - %s', error.code, error.message);
      }

      throw error;
    }
  },
};

export { auth };

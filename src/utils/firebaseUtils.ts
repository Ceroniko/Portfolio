import { FirebaseError } from '@firebase/util';

const firebaseUtils = {
  isFirebaseError(error: unknown): error is FirebaseError {
    return error instanceof FirebaseError;
  },
};

export { firebaseUtils };

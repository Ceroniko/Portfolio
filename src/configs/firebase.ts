import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { APP_CONFIG } from './app';

const firebaseConfig = {
  apiKey: APP_CONFIG.API_KEY,
  authDomain: APP_CONFIG.AUTH_DOMAIN,
  projectId: APP_CONFIG.PROJECT_ID,
  storageBucket: APP_CONFIG.STORAGE_BUCKET,
  messagingSenderId: APP_CONFIG.MESSAGING_SENDER_ID,
  appId: APP_CONFIG.APP_ID,
};

const firebase = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebase);
const firebaseStorage = getStorage(firebase);
const firebaseStore = getFirestore(firebase);

export { firebase, firebaseAuth, firebaseConfig, firebaseStorage, firebaseStore };

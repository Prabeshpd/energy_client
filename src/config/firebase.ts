import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';

import FirebaseError from '@/lib/FirebaseError';
import { IFirebaseServices } from '../types/firebase';

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  databaseURL: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  databaseURL: process.env.FIREBASE_DATABASE_URL || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_APP_ID || '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
};

export default class Firebase {
  private static app: FirebaseApp;
  private static database: Database;
  private static storage: FirebaseStorage;

  public static getFirebaseServices(): IFirebaseServices {
    const isValidFirebaseConfig = validateFirebaseConfig(firebaseConfig);

    if (!isValidFirebaseConfig) {
      throw new FirebaseError({
        message: 'Firebase application must be initialized and set in the environment variables',
      });
    }

    if (!Firebase.app) {
      Firebase.app = initializeApp(firebaseConfig);
      Firebase.database = getDatabase(Firebase.app);
      Firebase.storage = getStorage(Firebase.app);
    }

    return { app: Firebase.app, database: Firebase.database, storage: Firebase.storage };
  }
}

const validateFirebaseConfig = (firebaseConfig: IFirebaseConfig) => {
  return Object.values(firebaseConfig).every((value) => value);
};

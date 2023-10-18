import { FirebaseApp } from "firebase/app";
import { Database } from "firebase/database";
import { FirebaseStorage } from "firebase/storage";

export interface IFirebaseServices {
  app: FirebaseApp;
  database: Database;
  storage: FirebaseStorage;
}

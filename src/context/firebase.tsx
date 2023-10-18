import { createContext } from "react";

import Firebase from "../config/firebase";
import { IFirebaseServices } from "../types/firebase";

const FirebaseContext = createContext<IFirebaseServices | null>(null);

const FirebaseProvider = ({ children }: any) => {
  const firebase = Firebase.getFirebaseServices();

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

export { FirebaseProvider, FirebaseContext };

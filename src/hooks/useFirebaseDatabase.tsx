import { useContext } from 'react';
import { ref, set } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';

import { FirebaseContext } from '@/context/firebase';
import { IFirebaseServices } from '@/types/firebase';

export const useUserFirebaseDatabase = (userId: string) => {
  const firebase = useContext<IFirebaseServices | null>(FirebaseContext);
  const database = firebase?.database;

  if (!database) return { loading: true, snapshots: [], error: null };
  const [snapshots, loading, error] = useObjectVal(ref(database, 'projects' + userId));

  return { snapshots, loading, error };
};

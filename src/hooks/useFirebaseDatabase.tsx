import { useContext } from 'react';
import { ref, set } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';

import { FirebaseContext } from '@/context/firebase';
import { IFirebaseServices } from '@/types/firebase';
import { RealTimeProjectData } from '@/types/projects';

export const useUserFirebaseDatabase = (userId: string) => {
  const firebase = useContext<IFirebaseServices | null>(FirebaseContext);
  const database = firebase?.database;

  if (!database) return null;

  const [snapshots, loading, error] = useList(ref(database, '/projects' + userId));

  return { snapshots, loading, error };
};

import { useState, useContext } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { FirebaseContext } from '@/context/firebase';
import { IFirebaseServices } from '@/types/firebase';

export const useFirebaseStorage = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const firebase = useContext<IFirebaseServices | null>(FirebaseContext);
  const storage = firebase?.storage;

  const uploadFile = async (file: File) => {
    if (!storage) return;
    setIsUploading(true);
    const fileName = `${file.name}/${uuidv4()}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  return { uploadFile, imageUrl, progressPercent, isUploading };
};

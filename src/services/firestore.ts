import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { TLeaderboardData } from '../../typings';
import { db } from '../firebase/firebase';

export async function addEntryToLeaderboard(data: TLeaderboardData) {
  // Check if collection for current date exists
  const docRef = doc(db, 'leaderboards', data.createdAt);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // If it does, add entry to it
    await updateDoc(docRef, {
      entries: increment(1),
    });
  } else {
    await setDoc(docRef, {
      entries: 1,
    });

    const colRef = collection(docRef, 'leaderboard');
    await addDoc(colRef, data);
  }
}

export async function getLeaderboard() {
  return 'hj';
}

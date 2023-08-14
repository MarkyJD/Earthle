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

export async function checkNameIsAvailable(name: string) {
  const docRef = doc(db, 'leaderboards', new Date().toDateString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const q = query(
      collection(db, 'leaderboards', new Date().toDateString(), 'leaderboard'),
      where('name', '==', name)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.size === 0;
  }

  return true;
}

export async function addEntryToLeaderboard(data: TLeaderboardData) {
  // Check if collection for current date exists
  const docRef = doc(db, 'leaderboards', data.date);

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
  }
  const colRef = collection(docRef, 'leaderboard');
  await addDoc(colRef, data);
}

export async function getLeaderboard(date?: string) {
  const docName = date
    ? new Date(date).toDateString()
    : new Date().toDateString();

  const q = query(collection(db, 'leaderboards', docName, 'leaderboard'));

  const querySnapshot = await getDocs(q);

  const leaderboard = querySnapshot.docs.map((d) => d.data());

  return leaderboard;
}

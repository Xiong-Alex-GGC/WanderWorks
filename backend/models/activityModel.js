// models/activityModel.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const activityCollection = collection(db, 'Activity');

export const getAllActivities = async () => {
  const snapshot = await getDocs(activityCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createActivity = async (data) => {
  await addDoc(activityCollection, data);
};

export const updateActivity = async (id, data) => {
  await updateDoc(doc(activityCollection, id), data);
};

export const getActivityById = async (id) => {
  const docSnapshot = await getDoc(doc(activityCollection, id));
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};

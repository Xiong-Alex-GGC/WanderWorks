// models/activityModel.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const activityCollection = collection(db, 'Activity'); //connecting to the database by specifying table name

export const getAllActivities = async () => { //get is, well, getting; post is writing to the database
  const snapshot = await getDocs(activityCollection); //get current snapshot of the collection
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //returns the data to whatever is calling it
};

export const createActivity = async (data) => {
  await addDoc(activityCollection, data); //add document to the collection
};

export const updateActivity = async (id, data) => {
  await updateDoc(doc(activityCollection, id), data); //update a pre-existing document
};

export const getActivityById = async (id) => {
  const docSnapshot = await getDoc(doc(activityCollection, id));
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};

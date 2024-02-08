// models/activityModel.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const activityCollection = collection(db, 'Activity'); //connecting to the database by specifying table name

export const getAllActivities = async () => { //get is, well, getting; post is writing to the database
  const snapshot = await getDocs(activityCollection); //get current snapshot of the collection
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //returns the data to whatever is calling it
};

export const getAllItineraryActivities = async (itinID) => {
  const queryItin = query(activityCollection, where('itineraryID', '==', itinID));
  const snapshot = await getDocs(queryItin);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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


export const deleteActivity = async (activityID) => {

  //checks if activity exists
  const activityDoc = await getDoc(doc(activityCollection, activityID));

  if (activityDoc.exists()) {
    await deleteDoc(doc(activityCollection, activityID));
    return true; // Deletion successful
  }

  return false; // Activity not found 
};

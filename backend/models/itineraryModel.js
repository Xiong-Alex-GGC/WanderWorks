// models/itineraryModel.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const itinCollection = collection(db, 'Itinerary');

export const getAllItineraries = async () => {
  const snapshot = await getDocs(itinCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createItinerary = async (data) => {
  try {
    const docRef = await addDoc(itinCollection, data);
    // Fetch the ID from the document reference
    return docRef.id;
  } catch (error) {
    // Handle errors
    console.error('Error creating itinerary:', error);
    throw error; // Rethrow the error to handle it at the calling site if needed
  }
};

export const updateItinerary = async (id, data) => {
  await updateDoc(doc(itinCollection, id), data);
};

export const getItineraryById = async (id) => {
  const docSnapshot = await getDoc(doc(itinCollection, id));
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};

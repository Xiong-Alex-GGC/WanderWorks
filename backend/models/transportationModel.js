import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const transportationCollection = collection(db, 'Transportation'); //connecting to the database by specifying table name

export const getAllTransportations = async () => { //get is, well, getting; post is writing to the database
  const snapshot = await getDocs(transportationCollection); //get current snapshot of the collection
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //returns the data to whatever is calling it
};

export const getAllItineraryTransportation = async (itinID) => {
  const queryItin = query(transportationCollection, where('itineraryID', '==', itinID));
  const snapshot = await getDocs(queryItin);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTransportation = async (data) => {
  await addDoc(transportationCollection, data); //add document to the collection
};

export const updateTransportation = async (id, data) => {
  await updateDoc(doc(transportationCollection, id), data); //update a pre-existing document
  };
  
  export const getTransportationById = async (id) => {
    const docSnapshot = await getDoc(doc(transportationCollection, id));
    return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
  };
  
  
  export const deleteTransportation = async (transportationID) => {
  
    //checks if activity exists
    const transportationDoc = await getDoc(doc(transportationCollection, transportationID));
  
    if (transportationDoc.exists()) {
      await deleteDoc(doc(transportationCollection, transportationID));
      return true; // Deletion successful
    }
  
    return false; // Transportation not found 
  };
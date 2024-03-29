import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';
import * as itineraryController from '../controllers/itineraryController.js';

const accommodationCollection = collection(db, 'Accommodation'); //connecting to the database by specifying table name

export const getAllAccommodations = async () => { //get is, well, getting; post is writing to the database
  const snapshot = await getDocs(accommodationCollection); //get current snapshot of the collection
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //returns the data to whatever is calling it
};

export const getAllItineraryAccommodations = async (itinID) => {
  const queryItin = query(accommodationCollection, where('itineraryID', '==', itinID));
  const snapshot = await getDocs(queryItin);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createAccommodation = async (data) => {
  //ensure the accommodation is within the confines of the itinerary start and end dates

  //ensure the accommodation does not overlap with other accommodations (for some reason)


  //throw an error if one of the fail conditions above is met, otherwise complete request
  const itinID = data.itineraryID;
  await itineraryController.addExpenses(itinID, data.expenses); 
  await addDoc(accommodationCollection, data); //add document to the collection
};

export const updateAccommodation = async (id, data) => {
  const itinID = data.itineraryID;
  //get before and after expenses
  const accommodationData = await getAccommodationById(id);
  const beforeExpense = accommodationData.expenses;
  const afterExpense = data.expenses;
  const expenseChange = afterExpense - beforeExpense;
  itineraryController.addExpenses(itinID, expenseChange);
  await updateDoc(doc(accommodationCollection, id), data); //update a pre-existing document
};

export const getAccommodationById = async (id) => {
  const docSnapshot = await getDoc(doc(accommodationCollection, id));
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};


export const deleteAccommodation = async (accommodationID) => {

  //checks if activity exists
  const accommodationDoc = await getDoc(doc(accommodationCollection, accommodationID));

  if (accommodationDoc.exists()) {
    //first remove the expense
    const accommodationData = await getAccommodationById(accommodationID);
    const expense = -1 * accommodationData.expenses;
    const itinID = accommodationData.itineraryID;
    itineraryController.addExpenses(itinID, expense);
    
    await deleteDoc(doc(accommodationCollection, accommodationID));
    return true; // Deletion successful
  }

  return false; // Accommodation not found 
};
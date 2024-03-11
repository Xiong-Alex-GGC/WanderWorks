// models/activityModel.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';
import * as itineraryController from '../controllers/itineraryController.js';

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
  const itinID = data.itineraryID;
  //ensure new activity is within the confines of the itinerary start and end dates

  //ensure new activity does not overlap with other activities

  //throw an error if one of the fail conditions above is met, otherwise complete request
  await itineraryController.addExpenses(itinID, data.expense);
  await addDoc(activityCollection, data); //add document to the collection
};

export const updateActivity = async (id, data) => {
  const itinID = data.itineraryID;
  //get the before and after expenses
  const activityData = getActivityById(id);
  const beforeExpense = activityData.expense;
  const afterExpense = data.expense;
  const expenseChange = afterExpense - beforeExpense;
  itineraryController.addExpenses(itinID, expenseChange);
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
    //first remove the expense
    const activityData = getActivityById(activityID);
    const expense = -1 * activityData.expense; //by multiplying by -1, "adding" the expense actually subtracts it
    const itinID = activityData.itineraryID;
    itineraryController.addExpenses(itinID, expense);
    
    await deleteDoc(doc(activityCollection, activityID));
    return true; // Deletion successful
  }

  return false; // Activity not found 
};

import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';
import * as itineraryController from '../controllers/itineraryController.js';

const expenseCollection = collection(db, 'Expense'); //connecting to the database by specifying table name

export const getAllExpenses = async () => { //get is, well, getting; post is writing to the database
  const snapshot = await getDocs(expenseCollection); //get current snapshot of the collection
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //returns the data to whatever is calling it
};

export const getAllItineraryExpenses = async (itinID) => {
  const queryItin = query(expenseCollection, where('itineraryID', '==', itinID));
  const snapshot = await getDocs(queryItin);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createExpense = async (data) => {
  const itinID = data.itineraryID;

  //throw an error if one of the fail conditions above is met, otherwise complete request
  await itineraryController.addExpenses(itinID, data.spendings);
  await addDoc(expenseCollection, data); //add document to the collection
};

/*
export const updateExpense = async (id, data) => {
  const itinID = data.itineraryID;
  //get the before and after expenses
  const expenseData = getExpenseById(id);
  const beforeExpense = expenseData.spendings;
  const afterExpense = data.expense;
  const expenseChange = afterExpense - beforeExpense;
  itineraryController.addExpenses(itinID, expenseChange);
  await updateDoc(doc(activityCollection, id), data); //update a pre-existing document
};
*/

export const getExpenseById = async (id) => {
  const docSnapshot = await getDoc(doc(expenseCollection, id));
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};


export const deleteExpense = async (expenseID) => {

  //checks if expense exists
  const expenseDoc = await getDoc(doc(expenseCollection, expenseID));

  if (expenseDoc.exists()) {
    //first remove the expense
    const expenseData = getExpenseById(expenseID);
    const expense = -1 * expenseData.spendings; //by multiplying by -1, "adding" the expense actually subtracts it
    const itinID = expenseData.itineraryID;
    itineraryController.addExpenses(itinID, expense);
    
    await deleteDoc(doc(expenseCollection, expenseID));
    return true; // Deletion successful
  }

  return false; // Expense not found 
};
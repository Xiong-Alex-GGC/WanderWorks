// models/activityModel.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';
import * as itineraryController from '../controllers/itineraryController.js';
import * as OverlappingItemError from '../errors/OverlappingItemError.js';
import * as ItemOutOfBoundsError from '../errors/ItemOutOfBoundsError.js';
import * as itineraryModel from './itineraryModel.js';

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

export const isActivityOverlapping = (existingActivities, newActivity) => {
  return existingActivities.some(activity => {
    // Check for overlap using start and end times
    const existingActivityDate = extractDate(activity.date);
    const newActivityDate = extractDate(newActivity.date);
    
    //as part of this logic, backup activities need to be ignored

    //ignore activities with matching id's.
    if(activity.id == newActivity.id) {
      return false;
    }
    if(existingActivityDate != newActivityDate) {
      return false;
    } else return (
      (newActivity.startTime >= activity.startTime && newActivity.startTime < activity.endTime) ||
      (newActivity.endTime > activity.startTime && newActivity.endTime <= activity.endTime) ||
      (newActivity.startTime <= activity.startTime && newActivity.endTime >= activity.endTime)
    );
  });
};

export const extractDate = (dateString) => {
  return dateString.split('T')[0];
}

function segmentExtractedDate(dateString) {
  return dateString.split('-');
}

function compareDates(date1, date2) { //returns -1 if date1 is before date2, 0 if date1 and date2 are the same, and 1 if date1 is after date2
  //extracted date format: YYYY-MM-DD
  const date1Split = segmentExtractedDate(date1);
  const date2Split = segmentExtractedDate(date2);
  if(date1Split[0] == date2Split[0]) { //years are equal
    if(date1Split[1] == date2Split[1]) { //months are equal
      if(date1Split[2] == date2Split[2]) { //days are equal
        return 0; //dates match up perfectly
      } else if(date1Split[2] < date2Split[2]) { //day1 is before day2
        return -1;
      } else { //day 1 is after day2
        return 1;
      }
    } else if(date1Split[1] < date2Split[1]) { //date1's month is before date2's
      return -1;
    } else { //month1 is after month2
      return 1;
    }
  } else if(date1Split[0] < date2Split[0]) { //date1's year is before date2's
    return -1;
  } else { //year1 is after year2
    return 1;
  }
}

export const createActivity = async (data) => {
  const itinID = data.itineraryID;
  //ensure new activity is within the confines of the itinerary start and end dates
  const itinData = await itineraryModel.getItineraryById(itinID);
  const itinStartDate = extractDate(itinData.startDate);
  const itinEndDate = extractDate(itinData.endDate);
  const activityDate = extractDate(data.date);

  //check to see if the activity is set to take place before the trip starts
  if(compareDates(activityDate, itinStartDate) == -1) {
    throw new ItemOutOfBoundsError("Your activity cannot take place before the trip starts.");
  }
  //check to see if the activity takes place after the trip ends
  if(compareDates(activityDate, itinEndDate) == 1) {
    throw new ItemOutOfBoundsError("Your activity cannot take place after the trip ends.");
  }
  //ensure new activity does not overlap with other activities
  //SKIP THE BLOCK BELOW IF THIS IS A BACKUP ACTIVITY
  const existingActivities = await getAllItineraryActivities(itinID);
  if(isActivityOverlapping(existingActivities, data)) {
    console.error('Activity overlaps with existing activity.');
    throw new OverlappingItemError("Activity overlaps with existing activity.");
  }
  //throw an error if one of the fail conditions above is met, otherwise complete request
  await itineraryController.addExpenses(itinID, data.expense);
  await addDoc(activityCollection, data); //add document to the collection
};

export const updateActivity = async (id, data) => {
  const itinID = data.itineraryID;
  //make sure activity would still be within the confines of the itinerary
  //turn this block into a function later
  const itinData = await itineraryModel.getItineraryById(itinID);
  const itinStartDate = extractDate(itinData.startDate);
  const itinEndDate = extractDate(itinData.endDate);
  const activityDate = extractDate(data.date);

  //check to see if the activity is set to take place before the trip starts
  if(compareDates(activityDate, itinStartDate) == -1) {
    throw new ItemOutOfBoundsError("Your activity cannot take place before the trip starts.");
  }
  //check to see if the activity takes place after the trip ends
  if(compareDates(activityDate, itinEndDate) == 1) {
    throw new ItemOutOfBoundsError("Your activity cannot take place after the trip ends.");
  }
  //

  //make sure the activity wouldn't overlap with other activities
  //SKIP THIS BLOCK IF THIS IS A BACKUP ACTIVITY
  const existingActivities = await getAllItineraryActivities(itinID);
  if(isActivityOverlapping(existingActivities, data)) {
    console.error('Activity overlaps with existing activity.');
    throw new OverlappingItemError("Activity overlaps with existing activity.");
  }
  //get the before and after expenses
  const activityData = await getActivityById(id);
  const beforeExpense = activityData.expense;
  const afterExpense = data.expense;
  const expenseChange = afterExpense - beforeExpense;
  itineraryController.addExpenses(itinID, expenseChange);
  await updateDoc(doc(activityCollection, id), data); //update a pre-existing document
  console.log("document updated");
};

export const getActivityById = async (id) => {
  //console.log("attempting to retrieve activity with id: " + id);
  const docSnapshot = await getDoc(doc(activityCollection, id));
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};


export const deleteActivity = async (activityID) => {
  
  //checks if activity exists
  const activityDoc = await getDoc(doc(activityCollection, activityID));

  if (activityDoc.exists()) {
    //first remove the expense
    const activityData = await getActivityById(activityID);
    const expense = -1 * activityData.expense; //by multiplying by -1, "adding" the expense actually subtracts it
    console.log("expense to delete: $" + expense);
    const itinID = activityData.itineraryID;
    itineraryController.addExpenses(itinID, expense);
    
    await deleteDoc(doc(activityCollection, activityID));
    return true; // Deletion successful
  }

  return false; // Activity not found 
};

//Forgot to create a new branch before commit

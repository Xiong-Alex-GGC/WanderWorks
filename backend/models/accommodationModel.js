import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';
import * as itineraryController from '../controllers/itineraryController.js';
import * as itineraryModel from './itineraryModel.js';
import * as OverlappingItemError from '../errors/OverlappingItemError.js';
import * as ItemOutOfBoundsError from '../errors/ItemOutOfBoundsError.js';

const accommodationCollection = collection(db, 'Accommodation'); //connecting to the database by specifying table name

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

function checkOverlappingAccommodations(existingAccommodations, newAccommodation) {
  return existingAccommodations.some(accommodation => {
    const first = compareDates(extractDate(accommodation.startDate), extractDate(newAccommodation.startDate));
    if(first == 0) {//they both start on the same date and thus definitely overlap
      throw new OverlappingItemError("This accommodation would overlap with another accommodation you've set");
    } else if(accommodation.id == newAccommodation.id) { //this accommodation is being updated, thus ignore
      return false;
    } else {
      //if first is -1, the existing accommodation comes first
      if(first == -1) {
        if(compareDates(extractDate(accommodation.endDate), extractDate(newAccommodation.startDate)) == 1) {
          //earlier accommodation's end date is after later accommodation's start date
          throw new OverlappingItemError("This accommodation would overlap with another accommodation you've set");
        }
      } else { //first is 1, new activity comes first
        if(compareDates(extractDate(newAccommodation.endDate), extractDate(accommodation.startDate)) == 1) {
          throw new OverlappingItemError("This accommodation would overlap with another accommodation you've set");
        }
      }
    }
    //no fail scenarios have been met, return true
    return false;
  });
}

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
  const itinID = data.itineraryID;
  const itinData = await itineraryModel.getItineraryById(itinID);
  const itinStartDate = extractDate(itinData.startDate);
  const itinEndDate = extractDate(itinData.endDate);
  const accStartDate = extractDate(data.startDate);
  const accEndDate = extractDate(data.endDate);

  //ensure accStartDate is not before itinStartDate
  if(compareDates(accStartDate, itinStartDate) == -1) {
    throw new ItemOutOfBoundsError("Accommodation cannot start before your trip's start date.");
  }

  //ensure accEndDate is not after itinEndDate
  if(compareDates(accEndDate, itinEndDate) == 1) {
    throw new ItemOutOfBoundsError("Accommodation cannot extend beyond the duration of your trip.");
  }
  //ensure the accommodation does not overlap with other accommodations
  //some people may opt to stay at one hotel for the start of a trip, and stay at a different hotel for the rest, so this is
  //a scenario we should probably account for
  const existingAccommodations = await getAllItineraryAccommodations(itinID);
  try {
    checkOverlappingAccommodations(existingAccommodations, data);
  } catch (OverlappingItemError) {
    console.error('Overlapping accommodations:', OverlappingItemError);
    throw new OverlappingItemError("This accommodation would overlap with other accommodations");
  }

  //throw an error if one of the fail conditions above is met, otherwise complete request
  await itineraryController.addExpenses(itinID, data.expenses); 
  await addDoc(accommodationCollection, data); //add document to the collection
};

export const updateAccommodation = async (id, data) => {
  const itinID = data.itineraryID;
  //ensure the accommodaation will still be within the confines of the itinerary
  const itinData = await itineraryModel.getItineraryById(itinID);
  const itinStartDate = extractDate(itinData.startDate);
  const itinEndDate = extractDate(itinData.endDate);
  const accStartDate = extractDate(data.startDate);
  const accEndDate = extractDate(data.endDate);
  //ensure accStartDate is not before itinStartDate
  if(compareDates(accStartDate, itinStartDate) == -1) {
    throw new ItemOutOfBoundsError("Accommodation cannot start before your trip's start date.");
  }

  //ensure accEndDate is not after itinEndDate
  if(compareDates(accEndDate, itinEndDate) == 1) {
    throw new ItemOutOfBoundsError("Accommodation cannot extend beyond the duration of your trip.");
  }

  //Ensure accommodations will not overlap
  const existingAccommodations = await getAllItineraryAccommodations(itinID);
  try {
    checkOverlappingAccommodations(existingAccommodations, data);
  } catch (OverlappingItemError) {
    console.error('Overlapping accommodations:', OverlappingItemError);
    throw new OverlappingItemError("This accommodation would overlap with other accommodations");
  }

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
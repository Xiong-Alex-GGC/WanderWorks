import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import db from "../firebaseConfig.js";
import Schema from "schema-js/lib/schema.js";

export const itinCollection = collection(db, "Itinerary");

export const getAllItineraries = async () => {
  const snapshot = await getDocs(itinCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserItineraries = async (userID) => {
  const queryItin = query(itinCollection, where("userID", "==", userID));
  const snapshot = await getDocs(queryItin);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createItinerary = async (data) => {
  try {
    const docRef = await addDoc(itinCollection, data);
    // Fetch the ID from the document reference
    return docRef.id;
  } catch (error) {
    // Handle errors
    console.error("Error creating itinerary:", error);
    throw error; // Rethrow the error to handle it at the calling site if needed
  }
};

export const updateItinerary = async (id, data) => {
  await updateDoc(doc(itinCollection, id), data);
};

export const getItineraryById = async (id) => {
  const docSnapshot = await getDoc(doc(itinCollection, id));
  return docSnapshot.exists()
    ? { id: docSnapshot.id, ...docSnapshot.data() }
    : null;
};

export const deleteItinerary = async (itineraryID) => {
  //checks if itinerary exists
  const itineraryDoc = await getDoc(doc(itinCollection, itineraryID));

  if (itineraryDoc.exists()) {
    await deleteDoc(doc(itinCollection, itineraryID));
    return true; // Deletion successful
  }

  return false; // Itinerary not found
};
<<<<<<< HEAD
=======

// Add to your Itinerary schema in itineraryModel.js

const itinerarySchema = new Schema({
  // ... other fields ...
  backupPlan: {
    type: String,
    default: "",
  },
  // ... other fields ...
});

// ... rest of your model code ...
>>>>>>> Thu

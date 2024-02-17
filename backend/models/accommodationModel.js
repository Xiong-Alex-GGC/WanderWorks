import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const accommodationCollection = collection(db, 'Accommodation'); //connecting to the database by specifying table name


export const createAccommodation = async (data) => {
    await addDoc(accommodationCollection, data); //add document to the collection
  };
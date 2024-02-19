import { addDoc, collection, getDocs, updateDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const transportationCollection = collection(db, 'Transportation'); //connecting to the database by specifying table name


export const createTransportation = async (data) => {
    await addDoc(transportationCollection, data); //add document to the collection
  };
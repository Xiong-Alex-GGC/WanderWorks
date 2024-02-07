// models/userModels.js
import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig.js';

const userCollection = collection(db, 'User');

export const getAllUsers = async () => {
    const snapshot = await getDocs(userCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
  export const createUser = async (data) => {
    await addDoc(userCollection, data);
  };
  
  export const updateUser = async (id, data) => {
    await updateDoc(doc(userCollection, id), data);
  };
  
  export const getUserById = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
  };
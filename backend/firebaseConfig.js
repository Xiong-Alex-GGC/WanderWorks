import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe_KKeGFKEgWZEMfw4gHf_T_U1UbcSCJg",
  authDomain: "wanderworks-itinerary.firebaseapp.com",
  projectId: "wanderworkss-itinerary",
  storageBucket: "wanderworks-itinerary.appspot.com",
  messagingSenderId: "190469468391",
  appId: "1:190469468391:web:c9528ebc38b2b9ac28f242",
  measurementId: "G-T5XG15PNE0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);

// Export Firestore instance
export default db;
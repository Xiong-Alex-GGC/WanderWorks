import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCe_KKeGFKEgWZEMfw4gHf_T_U1UbcSCJg",
  authDomain: "wanderworks-itinerary.firebaseapp.com",
  projectId: "wanderworks-itinerary",
  storageBucket: "wanderworks-itinerary.appspot.com",
  messagingSenderId: "190469468391",
  appId: "1:190469468391:web:c9528ebc38b2b9ac28f242",
  measurementId: "G-T5XG15PNE0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, app};


var trips1 = [3920, 13674, 495021];
var trips2 = [15920, 103930, 362838, 102138];
//writeUserData("testId", "test", "testemail@gmail.com", "myimageurl", trips1);
//writeUserData("otherTest", "test2", "fakeemail@gmail.com", "myimageurl2", trips2);
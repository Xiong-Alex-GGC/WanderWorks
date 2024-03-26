import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider(); // Add this line for GitHub

const db = getFirestore(app);

export { auth, googleProvider, facebookProvider, githubProvider, db, app }; 
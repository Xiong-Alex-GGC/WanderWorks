import { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    sendPasswordResetEmail, 
    signInWithPopup, 
    signOut, 
    updatePassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";


export const signUpWithEmailandPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result =  await signInWithPopup(auth, provider);

    return result;
};

export const signUserOut = () => {
    return auth.signOut();
};



















//For Later

// export const passwordReset = (email) => {
//     return sendPasswordResetEmail (auth, email);
// };

// export const passwordchange = (password) => {
//     return updatePassword(auth.currentUser, password);
// }

// export const emailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };










// export const Auth = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState ("");

//     const signIn = async () => {
//         try {
//             await createUserWithEmailAndPassword(auth, email, password);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const signInWithGoogle = async () => {
//         try {
//             await signInWithPopup(auth, googleProvider);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const logout = async () => {
//         try {
//             await signOut(auth);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <input placeholder = "Email"
//             onChange={(e) => setEmail(e.target.value)}/>

//             <input placeholder = "Password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}/>

//             <button onClick={signIn}>Sign Up With Google</button>

//             <button onClick={signInWithGoogle}>Sign In With Google</button>

//             <button onClick={logout}>Logout</button>
//         </div>
//     )
// }
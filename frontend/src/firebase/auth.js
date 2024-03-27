import { useState } from "react";
import { auth } from "./firebase";
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    sendPasswordResetEmail, 
    signInWithPopup, 
    signOut, 
    updatePassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider
} from "firebase/auth";

export const signUpWithEmailandPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result =  await signInWithPopup(auth, provider);
    return result;
};

export const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.error("Error signing in with Facebook:", error);
        throw error;
    }
};

export const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.error("Error signing in with GitHub:", error);
        throw error;
    }
};

export const signUserOut = () => {
    return signOut(auth);
};

export const signUpWithEmailAndPassword = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        return result;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

export const sendVerificationEmail = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

export const sendUserPasswordResetEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Reset email sent!");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};

export const updateUserPassword = async (newPassword) => {
    try {
        const user = auth.currentUser;
        await updatePassword(user, newPassword);
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
}; 
      
//  export const sendPasswordResetEmail = async (email) => {
//     try {
//          await sendPasswordResetEmail(auth, email);
//    } catch (error) {
//        console.error("Error sending password reset email:", error);
//         throw error;
//     }
// };

// function verifyPassword(password) {
//     //check for special characters
//     if(!specialCharacterRegex.test(password)) {
//         throw "Your password must contain at least 1 special character";
//     }
//     //check for a number
//     else if(!numberRegex.test(password)) {
//         throw "Your password must contain at least 1 number";
//     }
//     //check for required length
//     else if (password.length < 8) {
//         throw "Your password must be at least 8 characters long";
//     }
//     //an error isn't thrown, password is valid
// }

















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
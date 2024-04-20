import React, { useState } from 'react';
import { signUpWithEmailAndPassword, signInWithGoogle, signInWithFacebook, signInWithGithub } from "../firebase/auth"; // Import signInWithGithub
  /*
import React from 'react';
import { useState } from "react";
import { Alert } from 'react-bootstrap';
import { signUpWithEmailandPassword, signInWithGoogle,signInWithFacebook, signInWithMicrosoft } from "../firebase/auth";
*/
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import SignupForm from '../components/Forms/SignupForm';

import {
  AuthContainer,
  FormRow,
  ImgCol,
  FormCol,
} from '../styles/Auth-Styles';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // Should be false initially
    const [error, setError] = useState('');

    const { userLoggedIn } = useAuth();

    const signUp = async (e) => {
      e.preventDefault();
      if (!isRegistering) {
        setIsRegistering(true);
        try {
          const userCredential = await signUpWithEmailAndPassword(email, password);
          const uid = userCredential.user.uid; // Accessing the UID

          createUser(uid); //create new user for  user collection
        } catch (err) {
          console.error(err);
        } finally {
          setIsRegistering(false); // Ensure we reset isRegistering state
          //setError(err);
        }
      }
    };

    const createUser = async (uid) => {

      try {
        await axios.post(
          "http://localhost:4000/api/create-user", //the endpoint to create a user
          {
            //the response after sending a request to the backend

             userID: uid,
          }
        );
  
        console.log("new user created with uid:" + uid);
      } catch (err) {
        console.log(err);
      }
    }



    const signUpWithGoogle = async (e) => {
      e.preventDefault();
      if(!isRegistering) {
        setIsRegistering(true);
        signInWithGoogle().catch(err => {
          console.error(err);
        }).finally(() => {
          setIsRegistering(false); // Reset state
        });
      }
    };

    const signUpWithFacebook = async (e) => {
      e.preventDefault();
      if (!isRegistering) {
        setIsRegistering(true);
        signInWithFacebook().catch(err => {
          console.error(err);
        }).finally(() => {
          setIsRegistering(false); // Reset state
        });
      }
    };

    const signUpWithGithub = async (e) => { // Handle GitHub sign-up
      e.preventDefault();
      if (!isRegistering) {
        setIsRegistering(true);
        signInWithGithub().catch(err => {
          console.error(err);
        }).finally(() => {
          setIsRegistering(false); // Reset state
        });
      }
    };

    return (
      <AuthContainer fluid>
        {userLoggedIn && <Navigate to={'/Dashboard'} replace={true} />}
        <FormRow>
          <ImgCol />
          <FormCol>
            <SignupForm 
              signUp={signUp}
              signUpWithGoogle={signUpWithGoogle}
              signUpWithFacebook={signUpWithFacebook}
              signUpWithGithub={signUpWithGithub} // Pass the GitHub sign-up function as a prop
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </FormCol>
        </FormRow>
      </AuthContainer>
    );
};

export default SignUp;

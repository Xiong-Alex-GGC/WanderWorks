import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle, signInWithFacebook, signInWithGithub } from '../firebase/auth'; // Step 1: Import signInWithGithub
import { useAuth } from '../context/authContext';
import LoginForm from '../components/Forms/LoginForm';

import {
  AuthContainer,
  FormRow,
  ImgCol,
  FormCol,
} from '../styles/Auth-Styles';

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onEmailSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await signInWithEmail(email, password).catch(err => {
        setIsSigningIn(false); // Add catch to handle errors and stop the signing in process
      });
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const onFacebookSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithFacebook().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const onGithubSignIn = async (e) => {  
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithGithub().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <AuthContainer fluid>
      {userLoggedIn && <Navigate to={'/Dashboard'} replace={true} />}
      
      <FormRow>
        <ImgCol />

        <FormCol>
          <LoginForm
            onEmailSignIn={onEmailSignIn}
            onGoogleSignIn={onGoogleSignIn}
            onFacebookSignIn={onFacebookSignIn}
            onGithubSignIn={onGithubSignIn}  
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

export default Login;

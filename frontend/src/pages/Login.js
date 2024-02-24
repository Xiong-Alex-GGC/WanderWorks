import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle,signInWithFacebook, signInWithMicrosoft } from '../firebase/auth';
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
      await signInWithEmail(email, password);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const onFacebookSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithFacebook().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const onMicrosoftSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithMicrosoft().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <AuthContainer fluid>
      {userLoggedIn && <Navigate to={'/Dashboard'} replace={true} />}
      
      <FormRow>  
        {userLoggedIn && <Navigate to={'/Dashboard'} replace={true} />}

        <ImgCol />

        <FormCol>
          <LoginForm
            onEmailSignIn={onEmailSignIn}
            onGoogleSignIn={onGoogleSignIn}
            onFacebookSignIn={onFacebookSignIn} 
            onMicrosoftSignIn={onMicrosoftSignIn} 
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

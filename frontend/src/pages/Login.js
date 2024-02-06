import React, { useState } from 'react';
import {Navigate, Link } from 'react-router-dom';

import { signInWithEmail, signInWithGoogle} from '../firebase/auth';
import { useAuth } from '../context/authContext';

import { Row, Col, Typography, Card } from 'antd';



const { Title, Paragraph } = Typography;

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");
  const [isSigningIn, setIsSigningIn] = useState (false);
  const [errorMessage, setErrorMessage] = useState ("");

  const onEmailSignIn = async (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      setIsSigningIn(true);
      await signInWithEmail(email, password);
    }

  }

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      setIsSigningIn(true);
      signInWithGoogle().catch(err => {
        setIsSigningIn(false);
      })
    }
  }

  return (
    <div className="home-container">

      {userLoggedIn && (<Navigate to={'/Dashboard'} replace={true} />)} 


      <input placeholder = "Email"
      onChange={(e) => setEmail(e.target.value)}/>

      <input placeholder = "Password"
      type="password"
      onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={onEmailSignIn}>Sign In</button>
      <button onClick={onGoogleSignIn}>Sign In With Google</button>


      {/* <button onClick={logout}>Logout</button> */}

    </div>
  );
};

export default Login;

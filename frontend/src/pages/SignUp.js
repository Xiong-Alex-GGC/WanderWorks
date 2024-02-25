import React from 'react';
import { useState } from "react";
import { signUpWithEmailandPassword, signInWithGoogle,signInWithFacebook, signInWithMicrosoft } from "../firebase/auth";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import SignupForm from '../components/Forms/SignupForm';

import {
  AuthContainer,
  FormRow,
  ImgCol,
  FormCol,
} from '../styles/Auth-Styles';



import { Row, Col, Typography, Card } from 'antd';



const { Title, Paragraph } = Typography;

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState ("");
    const [isRegistering, setIsRegistering] = useState("");

    const { userLoggedIn } = useAuth();


    const signUp = async (e) => {
      e.preventDefault();
      if(!isRegistering) {
        setIsRegistering(true);

        try {
            await signUpWithEmailandPassword(email, password);
        } catch (err) {
            setIsRegistering(false);
            console.error(err);
        }
      }
  
    }

    const signUpWithGoogle = async (e) => {
      e.preventDefault();
      if(!isRegistering) {
        setIsRegistering(true);
        
        await signInWithGoogle().catch(err => {
          setIsRegistering(false);
        })      
      }
  
    }

    const signUpWithFacebook = async (e) => {
      e.preventDefault();
      if (!isRegistering) {
        setIsRegistering(true);
        try {
          await signInWithFacebook();
        } catch (err) {
          setIsRegistering(false);
          console.error(err);
        }
      }
    };
  
    const signUpWithMicrosoft = async (e) => {
      e.preventDefault();
      if (!isRegistering) {
        setIsRegistering(true);
        try {
          await signInWithMicrosoft();
        } catch (err) {
          setIsRegistering(false);
          console.error(err);
        }
      }
    };

  return (

    <AuthContainer fluid>
      {userLoggedIn && (<Navigate to={'/Dashboard'} replace={true} />)}
      <FormRow>
        <ImgCol />
        <FormCol>
          <SignupForm 
            signUp={signUp}
            signUpWithGoogle={signUpWithGoogle}
            signUpWithFacebook={signUpWithFacebook}
            signUpWithMicrosoft={signUpWithMicrosoft}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </FormCol>
      </FormRow>
    </AuthContainer>

    // <div className="home-container">
    //   {userLoggedIn && (<Navigate to={'/Dashboard'} replace={true} />)}



    //   <Row gutter={[16, 16]}>
    //     <Col span={12}>
    //       <Card>
    //         <div>
    //             <input placeholder = "Email"
    //             onChange={(e) => setEmail(e.target.value)}/>

    //             <input placeholder = "Password"
    //             type="password"
    //             onChange={(e) => setPassword(e.target.value)}/>

    //             <button onClick={signUp}>Sign Up</button>

    //             <button onClick={signUpWithGoogle}>Sign Up With Google</button>

    //         </div>


      
    // </div>
  );
};

export default SignUp;

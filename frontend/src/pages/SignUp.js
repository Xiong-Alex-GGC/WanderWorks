import React from 'react';
import { useState } from "react";
import { signUpWithEmailandPassword, signInWithGoogle } from "../firebase/auth";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';



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

  return (
    <div className="home-container">
      {userLoggedIn && (<Navigate to={'/Dashboard'} replace={true} />)}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title>SignUp</Title>
            <Paragraph>
              Plan your perfect trip with ease. Create and organize your itineraries,
              explore new destinations, and make your travel experiences memorable.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <div>
                <input placeholder = "Email"
                onChange={(e) => setEmail(e.target.value)}/>

                <input placeholder = "Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={signUp}>Sign Up</button>

                <button onClick={signUpWithGoogle}>Sign Up With Google</button>

            </div>
          </Card>
        </Col>
      </Row>

      
    </div>
  );
};

export default SignUp;

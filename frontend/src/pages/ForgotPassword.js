import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, } from 'react-bootstrap';
import { useAuth } from '../context/authContext';
import{sendUserPasswordResetEmail}from '../firebase/auth';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const currentUser = useAuth();




    const handleSubmit = async (event) => {
        event.preventDefault();

        // calls reset password method
        // passes in email and currentUser
        sendUserPasswordResetEmail(email);


    };



    return (

        <Container style={{
            width: 600,
            height: 800,
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.9)',
            borderRadius: '50px',
            padding: 50,
            backgroundColor: 'white'
        }}>

            <h2 style={{ textAlign: 'center' }}>FORGOT PASSWORD</h2>

            <Form onSubmit={handleSubmit} style={{
                marginLeft: 50,
                marginRight: 50,
                marginTop: 40,
                fontSize: '180%'
            }}>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>


                {error && <Alert variant="danger">{error}</Alert>}

                <Button variant="primary" type="submit">
                    Send Reset Link
                </Button>
            </Form>
        </Container>

    );
};

export default ForgotPassword;
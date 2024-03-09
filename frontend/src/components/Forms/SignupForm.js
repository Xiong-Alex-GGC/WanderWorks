import React from 'react';
import { Form, Button } from 'react-bootstrap';

import {
  StyledContainer,
  StyledForm,
  StyledHeading,
  StyledLink,
  StyledButtonContainer,
  StyledSeparator,
  StyledOrText,
  IconsContainer,
  IconButton,
  GoogleIcon,
  FacebookIcon,
  MicrosoftIcon,
  SeparatorContainer,
  SeparatorLine,
  SeparatorText,
  NameContainer
} from '../../styles/Auth-Styles';

const SignupForm = ({ signUp, signUpWithGoogle,signUpWithFacebook,signUpWithMicrosoft, email, setEmail, password, setPassword, fName, lName }) => {
  return (
    <StyledContainer>
      <StyledForm>
        <StyledHeading>SIGN UP</StyledHeading>

        {/* Username is non-functional atm */}
        <NameContainer>
            <Form.Group controlId="fName">
                <Form.Control
                    type="Name"
                    placeholder="First Name"
                    value={fName}
                    // onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            {/* add a space in here */}
            <Form.Group controlId="lName">
                <Form.Control
                    type="Name"
                    placeholder="Last Name"
                    value={lName}
                    // onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
        </NameContainer>

        <br />

        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <p>
          <StyledLink to="/Login">Already have an Account?</StyledLink>
        </p>

        <StyledButtonContainer>
          <Button variant="primary" onClick={signUp} style={{ width: '70%' }}>
            Sign Up
          </Button>
        </StyledButtonContainer>

        <SeparatorContainer>
            <SeparatorLine />
                <SeparatorText>or</SeparatorText>
            <SeparatorLine />
        </SeparatorContainer>

        <IconsContainer>
          <IconButton variant="" onClick={signUpWithGoogle} color="#4285F4">
            <GoogleIcon />
          </IconButton>

          <IconButton variant="" onClick={signUpWithFacebook} color="#4267B2">
            <FacebookIcon />
          </IconButton>

          <IconButton variant="" onClick={ signUpWithMicrosoft} color="#00A4EF">
            <MicrosoftIcon />
          </IconButton>
        </IconsContainer>
      </StyledForm>
    </StyledContainer>
  );
};

export default SignupForm;

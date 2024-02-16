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
  SeparatorText
} from '../../styles/Auth-Styles';

const LoginForm = ({ onEmailSignIn, onGoogleSignIn, email, setEmail, password, setPassword }) => {
  return (
    <StyledContainer>
      <StyledForm>
        <StyledHeading>LOG IN</StyledHeading>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <p>
          <StyledLink to="/Signup">Need an Account?</StyledLink>
        </p>

        <StyledButtonContainer>
          <Button variant="primary" onClick={onEmailSignIn} style={{ width: '70%' }}>
            Log In
          </Button>
        </StyledButtonContainer>

        <SeparatorContainer>
            <SeparatorLine />
                <SeparatorText>or</SeparatorText>
            <SeparatorLine />
        </SeparatorContainer>

        <IconsContainer>
          <IconButton variant="" onClick={onGoogleSignIn} color="#4285F4">
            <GoogleIcon />
          </IconButton>

          <IconButton variant="" onClick={onGoogleSignIn} color="#4267B2">
            <FacebookIcon />
          </IconButton>

          <IconButton variant="" onClick={onGoogleSignIn} color="#00A4EF">
            <MicrosoftIcon />
          </IconButton>
        </IconsContainer>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;

import React from 'react';
import { Form, Button } from 'react-bootstrap';

import {
  StyledContainer,
  StyledForm,
  StyledHeading,
  StyledLink,
  StyledButtonContainer,
  IconsContainer,
  IconButton,
  GoogleIcon,
  FacebookIcon,
  GithubIcon, 
  SeparatorContainer,
  SeparatorLine,
  SeparatorText,
} from '../../styles/Auth-Styles';

const LoginForm = ({
  onEmailSignIn,
  onGoogleSignIn,
  onFacebookSignIn,
  onGithubSignIn, // Add the function prop for GitHub sign-in
  email,
  setEmail,
  password,
  setPassword,
}) => {
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

          <IconButton variant="" onClick={onFacebookSignIn} color="#4267B2">
            <FacebookIcon />
          </IconButton>

          <IconButton variant="" onClick={onGithubSignIn} color="#333"> {/* Adjust GitHub button color if necessary */}
            <GithubIcon />
          </IconButton>
        </IconsContainer>

        <p>
          <StyledLink to="/ForgotPassword">Forgot Password?</StyledLink>
        </p>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;
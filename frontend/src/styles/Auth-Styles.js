import styled from 'styled-components';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import beachImage from '../images/beach.jpg';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaMicrosoft } from 'react-icons/fa';
import theme from './theme';


// Login & Signup Page
export const AuthContainer = styled(Container)`
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const FormRow = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const ImgCol = styled(Col)`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  background-image: url(${beachImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const FormCol = styled(Col)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-color: ${theme.colors.background};

  @media (max-width: 1000px) {
    background-image: url(${beachImage});
    background-position: center;
    background-size: cover;
  }
  `;

  //Form
  export const StyledContainer = styled.div`
  height: 60%;
  min-height: 400px; 
  max-height: 600px;
  width: 50%;
  min-width: 400px; 
  max-width: 400px;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #fff;
`;

export const StyledForm = styled(Form)`
  width: 100%;
`;

export const StyledHeading = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: black;
  padding-top: 10px;
  transition: color 0.3s ease, font-size 0.3s ease;

  &:hover {
    color: gray; 
    // font-size: 1.05em; 
  }

`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledSeparator = styled.div`
  flex: 1;
  height: 1px;
  background: #ccc;
`;

export const StyledOrText = styled.span`
  margin: 0 10px;
  color: #ccc;
  font-size: 0.8em;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconButton = styled(Button)`
  background-color: ${({ color }) => color};
  border: none;
  width: 30%;
`;

export const GoogleIcon = styled(FaGoogle)`
  color: #fff;
`;

export const FacebookIcon = styled(FaFacebook)`
  color: #fff;
`;

export const MicrosoftIcon = styled(FaMicrosoft)`
  color: #fff;
`;

/// ---- or -----

export const SeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const SeparatorLine = styled.div`
  flex: 1;
  height: 1px;
  background: #ccc;
`;

export const SeparatorText = styled.span`
  margin: 0 10px;
  color: #ccc;
  font-size: 0.8em;
`;
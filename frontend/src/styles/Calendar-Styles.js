import styled from "styled-components";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import theme from './theme';

export const ComponentContainer = styled(Container)`
    display: flex;
    flex: 1;
    justify-content: center;
    min-width: 550px;
    max-width: 850px;

`;


export const CalendarContainer = styled(Row)`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    min-width: 550px;
    max-width: 850px;

    margin-bottom: 10%;

    padding-right: 10px;

`;

export const InformationCol = styled(Col)`
  padding-top: 15px;
  padding-left: 15px;
  background-color: ${theme.colors.secondary};
  color: white;
  overflow: hidden;
`;

export const CalendarCol = styled(Col)`
  padding: 30px;  
  
  @media (max-width: 1000px) {
    padding: 0px;
  }


`;

export const DateButton = styled(Button)`
  flex: 1;
  border: none;
  border-radius: 30%;
  margin: 5px;
  
  height: 40px;


  @media (max-width: 1000px) {
    font-size: 10px;
  }

`;

export const MonthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: end;
    aspect-ratio: 10/8;
    margin-left: 20px;
    margin-right: 20px;


`;

export const WeekDaySpan = styled.span`
  display: flex; /* Use flexbox */
  align-items: center; /* Center the content vertically */
  justify-content: center; /* Center the content horizontally */
  flex: 1;
  border: none;
  border-radius: 30%;
  height: 15px;
  width: 15px;
  margin: 5px;
  text-align: center; /* Center the text horizontally */

  @media (max-width: 1000px) {
    font-size: 10px;
    height: 12px;
    width: 12px;
  }

`;

export const MonthLabel = styled.button`
  font-size: 12px;
  border: none;
  background-color: white;
  color: gray;


  @media (max-width: 1000px) {
    font-size: 9px;
  }

`;

export const MonthLabelContainer = styled.div`
    display: flex;
    justify-content: center;

    font-size: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 50px;
`;

export const YearButton = styled.button`
  border: none;
  background-color: white;
  color: gray;
  font-size: 25;

  @media (max-width: 1000px) {
    padding-top: 15px;
    padding-right: 15px;
  }
`;
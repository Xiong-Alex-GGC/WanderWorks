import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Container, Col } from 'react-bootstrap';
import ItineraryForm from '../components/Forms/ItineraryForm';
import ItinBackground from '../images/ItinBackground.jpg';

const EditItinerary = () => {
  const { currentUser } = useAuth();
  //const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const itineraryUpdated = () => {
    setIsUpdated(true);
  };

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/itinerary/${id}`
        );
        setItineraryData(response.data);
        setIsLoading(false); // Data is loaded, set isLoading to false
        //
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    };

    fetchItineraryData();
  }, [id]);

  return ( <Container> {isLoading ? (
      <Col>
        <p>Loading itinerary data...</p>
      </Col>
    ) : (
      <div style={{ 
        height: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundImage: `url(${ItinBackground})`, // Use the imported image variable here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        }}>

        {isUpdated && <Navigate to={`/Itinerary/${id}`} replace={true} />}

        <ItineraryForm itineraryData={itineraryData} onTripUpdated={itineraryUpdated} />
      </div>
    )} </Container>);
};

export default EditItinerary;
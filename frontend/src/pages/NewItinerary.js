import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Container } from 'react-bootstrap';
import ItineraryForm from '../components/Forms/ItineraryForm';
import ItinBackground from '../images/ItinBackground.jpg';

const NewItinerary = () => {
  const { currentUser } = useAuth();
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState('');
  const [tripID, setTripID] = useState(null);

  const itineraryCreated = (itineraryID) => {
    setTripID(itineraryID);
  };

  return (
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

      {tripID && <Navigate to={`/Itinerary/${tripID}`} replace={true} />}

      <ItineraryForm onTripIDReceived={itineraryCreated} />
    </div>
  );
};

export default NewItinerary;

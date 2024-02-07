import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import DatePicker from 'react-datepicker';

const NewItinerary = () => {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { currentUser } = useAuth();
  const [isCreated, setIsCreated] = useState (false);
  const [tripID, setTripID] = useState ("");



  const submitItinerary = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/api/create-itinerary', {
        tripName: tripName,
        startDate: startDate,
        endDate: endDate,
        userID: currentUser.uid
      });
  
      // Handle the response as needed (e.g., show a success message)
      await setTripID(response.data.id);
      await setIsCreated(true);
      console.log('API Response:', response.data);
    
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error posting data:', error);
    }
  };


  return (
    <div className="home-container">
      
      {isCreated && (<Navigate to={`/Itinerary/${tripID}`} replace={true} />)}

      <h2>New Itinerary</h2>

      <form onSubmit={submitItinerary}>
        <label>Trip Name:</label>
        <br />
        <input
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />
        <br/>

        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />

        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />

        <button type="submit">Create Itinerary</button>
      </form>

    </div>
  );
};

export default NewItinerary;

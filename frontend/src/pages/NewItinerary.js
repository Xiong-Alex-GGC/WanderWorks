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
      //ensure the start date isn't before the current date

      //ensure the end date isn't before the start date

      //ensure required fields aren't empty
      
      const response = await axios.post('http://localhost:4000/api/create-itinerary', {
        tripName: tripName,
        location: location,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
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

        <label>Location:</label> //attempt to rework as location name, and have the field double as a searchbar for mapbox; store address separately
        <br />
        <input
          type="text"
          value={location}
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

        <h3>Want to keep track of your budget for this trip? Add your ideal maximum spendings here!</h3>
        <label>Budget (optional):</label>
        <br />
        <input
          type="number"
          value={budget}
          onChange={(e) => setTripName(e.target.value)}
        />
        <br/>

        <button type="submit">Create Itinerary</button>
      </form>

    </div>
  );
};

export default NewItinerary;

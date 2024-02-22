import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import DatePicker from 'react-datepicker';

import ItineraryLocationSuggestion from '../components/Mapbox/ItineraryLocationSuggestion';

const NewItinerary = () => {
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { currentUser } = useAuth();
  const [isCreated, setIsCreated] = useState(false);
  const [budget, setBudget] = useState('');
  const [tripID, setTripID] = useState("");

  const [error, setError] = useState('');

  const submitItinerary = async (e) => {
    e.preventDefault();

    // ensure the start date isn't before the current date
    var curDate = new Date();
    var startDate = new Date(); // Assuming startDate and endDate are already defined elsewhere in your code
    var endDate = new Date();

    if (startDate.getTime() < curDate.getTime()) {
      setError('You cannot set the start date to before today');
      return;
    } else if (startDate.getTime() > endDate.getTime()) {
      setError('The end date cannot be before the start date');
      return;
    }
    try {

      const response = await axios.post('http://localhost:4000/api/create-itinerary', {
        tripName: tripName,
        location: location,
        startDate: startDate,
        endDate: endDate,
        // budget: budget,
        userID: currentUser.uid
      });

      // Handle the response as needed (e.g., show a success message)
      await setTripID(response.data.id);
      await setIsCreated(true);
      console.log('API Response:', response.data);

      //clear any previous errors
      setError('');
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error posting data:', error);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };


  return (
    <div className="home-container">

      {isCreated && (<Navigate to={`/Itinerary/${tripID}`} replace={true} />)}

      <h2>New Itinerary</h2>

      <form onSubmit={submitItinerary}>

        <label>Trip Name (Required):</label>
        <br />
        <input
          type="text"
          placeholder='Name your Trip'
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />

        <ItineraryLocationSuggestion onSuggestionSelect={handleLocationSelect} />


        <label>Start Date (Required):</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          required
        />

        <label>End Date (Required):</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          required
        />
        {/* 
        <h3>Want to keep track of your budget for this trip? Add your ideal maximum spendings here!</h3>
        <label>Budget (optional):</label>
        <br />
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <br/> */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Itinerary</button>
      </form>

    </div>
  );
};

export default NewItinerary;

//Notes:
/*
  allow the user to choose a location in mapbox and then auto-fill the location field


*/

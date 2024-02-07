import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DemoMap from '../components/Mapbox/DemoMap';

const containerStyle = {
  display: 'flex',
};

const leftContainerStyle = {
  flex: 1,
};

const rightContainerStyle = {
  flex: 1,
};

const Itinerary = () => {
  const { id } = useParams();
  const [itineraryData, setItineraryData] = useState(null);

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/itinerary/${id}`);
        setItineraryData(response.data);
      } catch (error) {
        console.error('Error fetching itinerary data:', error);
      }
    };

    fetchItineraryData();
  }, [id]);

  return (
    <div style={containerStyle}>
      <div style={leftContainerStyle}>
        {itineraryData ? (
          <>
            <h1>Trip Name: {itineraryData.tripName}</h1>
            <p>Start Date: {itineraryData.startDate}</p>
            <p>End Date: {itineraryData.endDate}</p>
          </>
        ) : (
          <p>Loading itinerary data...</p>
        )}
      </div>
      <div style={rightContainerStyle}>
        {itineraryData && <DemoMap />}
      </div>
    </div>
  );
};

export default Itinerary;

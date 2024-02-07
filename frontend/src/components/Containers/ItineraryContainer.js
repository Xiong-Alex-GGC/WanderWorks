import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItineraryCard from '../Cards/ItineraryCard';
import { useAuth } from '../../context/authContext';


const ItineraryContainer = () => {
  const [itineraries, setItineraries] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/itineraries/${currentUser.uid}`);
        setItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, []);

  return (
    <div>
        <h1>Your Itineraries</h1>
        <div className="itinerary-container">
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id} {...itinerary} />
      ))}

        <style jsx>{`
            .itinerary-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin: 20px;
            border: '1px solid #ccc';
            padding: '15px';
            margin: '10px';
            borderRadius: '8px';
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)';
            backgroundColor: '#fff';
            }
      `}</style>

    </div>
    </div>
  );
};

export default ItineraryContainer;

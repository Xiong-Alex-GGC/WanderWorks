import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransportationCard from '../Cards/TransportationCard';


const TransportationContainer = ({ itineraryData }) => {
  const [transportations, setTransportations] = useState([]);

  useEffect(() => {
    const fetchTransportations = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/transportations/${itineraryData.id}`);
        setTransportations(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchTransportations();
  }, []);

  return (
    <div>
        <h1>Your Transportations</h1>
        <div className="transportations-container">
        {transportations.map((transportation) => (
          <TransportationCard key={transportation.id} itineraryData={itineraryData} {...transportation} />
        ))}

        <style jsx>{`
            .transportations-container {
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

export default TransportationContainer;
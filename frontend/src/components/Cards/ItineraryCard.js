import React from 'react';
import { Link } from "react-router-dom";

const cardStyle = {
  border: '1px solid #ccc',
  padding: '15px',
  margin: '10px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const headingStyle = {
  color: '#333',
};

const textStyle = {
  margin: '8px 0',
  color: '#666',
};

const ItineraryCard = ({ id, tripName, startDate, endDate }) => { //renders the itinerary data
    return (
      <Link to={`/Itinerary/${id}`}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>{tripName}</h2>
          <p>ID: {id}</p>
          <p style={textStyle}>Start Date: {startDate}</p>
          <p style={textStyle}>End Date: {endDate}</p>
        </div>
      </Link>
    );
  };

export default ItineraryCard;
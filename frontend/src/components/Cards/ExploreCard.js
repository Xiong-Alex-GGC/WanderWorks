import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


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
  color: '#665',
};

///just copy and pasted the original ItineraryCard.js here

const ExploreCard = ({ id, tripName, startDate, endDate, imgURL }) => { //renders the itinerary data
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion

  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delete-itinerary`, {
        data: {
          itineraryID: id
        },
      });
      console.log('Delete request successful:', response.data);
      setIsDeleted(true); // Update state to trigger re-render
      // Optionally, you can update the UI or take further actions after successful deletion
    } catch (error) {
      console.error('Error making delete request:', error);
      // Handle errors or show user feedback if the deletion fails
    }
  };

  return (
    <div style={cardStyle}>
      <div style={{ height: 150, backgroundColor: 'yellow', backgroundImage: `url(${imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>


      </div>

      <Link to={`/Itinerary/${id}`}>
        <h2 style={headingStyle}>{tripName}</h2>
      </Link>

      <p>ID: {id}</p>
      <p style={textStyle}>Start Date: {startDate}</p>
      <p style={textStyle}>End Date: {endDate}</p>

      <button onClick={onDelete}>Delete</button>

    </div>
  );
};

export default ExploreCard;
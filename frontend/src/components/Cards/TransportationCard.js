import React, { useState } from 'react';
import axios from 'axios';


const TransportationCard = ({ name, type, departureDate, departureTime, arrivalTime, expense, notes, id }) => {
    const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  
    const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delete-transportation`, {
        data: {
            transportationID: id
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

  const renderAdditionalInformation = () => {
    if(type == 'plane' || type == 'train') {
        return (
            <>
                <p><strong>Departure Date:</strong> {departureDate}</p>
                <p><strong>Departure Time:</strong> {departureTime}</p>
                <p><strong>Estimated Arrival Time:</strong> {arrivalTime}</p>

            </>
        );
    }
    return null;
  }

  const renderType = () => {
    if(type == 'plane') {
        return (
            <>
                <p><strong>Type:</strong> Flight</p>
            </>
        );
    } else if(type == 'train') {
        return (
            <>
                <p><strong>Type:</strong> Train Ride</p>
            </>
        );
    } else if(type == 'publicTranspo') {
        return (
            <>
                <p><strong>Type:</strong> Public Transportation Pass</p>    
            </>
        );
    }
    return null; //unreachable statement
  }

  return (
    <div style={cardStyle}>
      <h2>{name}</h2>
      {renderType()}
      {renderAdditionalInformation()}
      <p><strong>Expenses:</strong> {expense}</p>
      <p><strong>Notes:</strong> {notes}</p>

      <button onClick={onDelete}>Delete</button>

      {/* <p><strong>Tags:</strong> {tags.join(', ')}</p> USE this for array*/}
      {/* Add more content as needed */}
    </div>
  );
};

export default TransportationCard;
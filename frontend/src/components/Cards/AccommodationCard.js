import React, { useState } from 'react';
import axios from 'axios';
import AccommodationsForm from '../Forms/AccommodationsForm';


const AccommodationCard = ({ name, address, startDate, endDate, expenses, confirmation, notes, id, itineraryData }) => {
    const accommodationData = { name, address, startDate, endDate, expenses, confirmation, notes, id };
    
    const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
    const [editMode, setEditMode] = useState(false);
    const [accommodationDataToEdit, setAccommodationDataToEdit] = useState(null);
  
    const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const onEdit = async () => {
    setEditMode(true);
    setAccommodationDataToEdit(accommodationData);
  }

  const handleCancelEdit = () => {
    setEditMode(false);
    setAccommodationDataToEdit(null);
  }

  const handleFormSubmit = () => {
    //handle submission logic done in form
    setEditMode(false);
    setAccommodationDataToEdit(null);
  }

  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delete-accommodation`, {
        data: {
            accommodationID: id
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

  function renderData() {
    return(
      <div style={cardStyle}>
        <h2>{name}</h2>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Check-in Date:</strong> {startDate}</p>
        <p><strong>Check-out Date:</strong> {endDate}</p>
        <p><strong>Total Cost:</strong> ${expenses}</p>
        <p><strong>Link to Confirmation Email:</strong> {confirmation}</p>
        <p><strong>Notes:</strong> {notes}</p>

        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
      </div>
    );
  }

  return (
    <div>
      {editMode ? (
        <AccommodationsForm itineraryData={itineraryData} accommodationData={accommodationDataToEdit} onClose={handleCancelEdit} onSubmit={handleFormSubmit} />
      ) : (
        renderData()
      )}
    </div>
  );
};

export default AccommodationCard;
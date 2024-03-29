import React, { useState } from 'react';
import axios from 'axios';
import ActivityForm from '../Forms/ActivityForm';


const ActivityCard = ({ address, date, endTime, expense, name, notes, startTime, tags, id, itineraryData }) => {
  const activityData = { address, date, endTime, expense, name, notes, startTime, tags, id };  
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  const [editMode, setEditMode] = useState(false);
  const [activityDataToEdit, setActivityDataToEdit] = useState(null);
  
    const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const onEdit = async() => {
    setEditMode(true);
    setActivityDataToEdit(activityData);
  }

  const handleCancelEdit = () => {
    setEditMode(false);
    setActivityDataToEdit(null);
  }

  const handleFormSubmit = () => {
    //submission logic handled in form
    setEditMode(false);
    setActivityDataToEdit(null);
  }
  
  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delete-activity`, {
        data: {
            activityID: id
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
      <h2>Activity ID: {id}</h2>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Start Time:</strong> {startTime}</p>
      <p><strong>End Time:</strong> {endTime}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Expense:</strong> {expense}</p>
      <p><strong>Notes:</strong> {notes}</p>
      <p><strong>Tags:</strong> {tags}</p>
      <p><strong>id:</strong> {id}</p>

      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
    </div>
    );
  }

  return (
    <div>
      {editMode ? (
        <ActivityForm itineraryData={itineraryData} activityData={activityDataToEdit} onClose={handleCancelEdit} onSubmit={handleFormSubmit}/>
      ) : (
        renderData()
      )}
    </div>
  );
};

export default ActivityCard;

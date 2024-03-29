import React, { useState } from 'react';
import axios from 'axios';
import ExpenseForm from '../Forms/ExpenseForm';


const ExpenseCard = ({ name, date, spendings, notes, id, itineraryData }) => {
  const expenseData = { name, date, spendings, notes, id };
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  const [editMode, setEditMode] = useState(false);
  const [expenseDataToEdit, setExpenseDataToEdit] = useState(null);
  
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
    setExpenseDataToEdit(expenseData);
  }

  const handleCancelEdit = () => {
    setEditMode(false);
    setExpenseDataToEdit(null);
  }

  const handleFormSubmit = () => {
    //submission logic handled in form
    setEditMode(false);
    setExpenseDataToEdit(null);
  }

  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delete-expense`, {
        data: {
            expenseID: id
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
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Amount Spent:$</strong> {spendings}</p>
      <p><strong>Notes:</strong> {notes}</p>

      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>

      {/* <p><strong>Tags:</strong> {tags.join(', ')}</p> USE this for array*/}
      {/* Add more content as needed */}
    </div>
    );
  }

  return (
    <div>
      {editMode ? (
        <ExpenseForm itineraryData={itineraryData} expenseData={expenseDataToEdit} onClose={handleCancelEdit} onSubmit={handleFormSubmit} />
      ) : (
        renderData()
      )}
    </div>
  );
};

export default ExpenseCard;
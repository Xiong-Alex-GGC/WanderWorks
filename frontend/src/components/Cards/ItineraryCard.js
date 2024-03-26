import React, {useState} from 'react';
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
  color: '#666',
};

const ItineraryCard = ({ id, tripName, startDate, endDate, budget, totalExpenses }) => { //renders the itinerary data
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

  const renderOverBudgetWarning = ({ remainingBudget }) => {
    if(remainingBudget < 0) {
      return (
        <>
          <p>You are expected to go over budget by {Math.abs(remainingBudget)}</p>
        </>
      );
    } else {
      return(<></>);
    }
  }

  const calculateRemainingBudget = () => {
    if(budget != null) {
      const remainingBudget = budget - totalExpenses; //need to delete any itineraries where budget and totalExpenses are currently strings
      return (
        <>
          <p>${remainingBudget} of ${budget} budget remaining</p>
          {renderOverBudgetWarning(remainingBudget)}
        </>
      );
    } else {
      return (
        <>
          <p>You have spent ${totalExpenses} on this trip</p>
        </>
      );
    }
  }

  return (
    <div style={cardStyle}>

      <Link to={`/Itinerary/${id}`}>
        <h2 style={headingStyle}>{tripName}</h2>
      </Link>
      <hr />

      {calculateRemainingBudget()}

      <hr />
      <p>ID: {id}</p>
      <p style={textStyle}>Start Date: {startDate}</p>
      <p style={textStyle}>End Date: {endDate}</p>

      <button onClick={onDelete}>Delete</button>

    </div>
  );
};

export default ItineraryCard;
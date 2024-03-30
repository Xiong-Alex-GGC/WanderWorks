import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  margin: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
};

const headingStyle = {
  color: "#333",
};

const textStyle = {
  margin: "8px 0",
  color: "#666",
};

const ItineraryCard = ({
  id,
  tripName,
  startDate,
  endDate,
  location,
  imgURL,
  budget,
  totalExpenses,
}) => {
  //renders the itinerary data
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete-itinerary`,
        {
          data: {
            itineraryID: id,
          },
        }
      );
      setIsDeleted(true); // Update state to trigger re-render
      // Optionally, you can update the UI or take further actions after successful deletion
    } catch (error) {
      console.error("Error making delete request:", error);
      // Handle errors or show user feedback if the deletion fails
    }
  };

  const renderOverBudgetWarning = ({ remainingBudget }) => {
    if (remainingBudget < 0) {
      return (
        <>
          <p>
            You are expected to go over budget by {Math.abs(remainingBudget)}
          </p>
        </>
      );
    } else {
      return <></>;
    }
  };

  const calculateRemainingBudget = () => {
    if (budget != null) {
      const remainingBudget = budget - totalExpenses; //need to delete any itineraries where budget and totalExpenses are currently strings
      return (
        <>
          <p>
            ${remainingBudget} of ${budget} budget remaining
          </p>
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
  };

  // Function to format date to "Month Day" format (e.g., "Jan 13")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., "Jan")
    const day = date.getDate(); // Get day of the month
    return `${month} ${day}`;
  };

  // Function to format date to "MM-DD-YYYY"
  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth(); // Get month
    const day = date.getDate(); // Get day
    const year = date.getFullYear(); // Get year
    return `${month}-${day}-${year}`;
  };

  // Calculate days until the itinerary starts
  const daysUntilStart = () => {
    const today = new Date();
    const start = new Date(startDate);
    const differenceInTime = start.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
    return differenceInDays;
  };

  // Determine if the itinerary is past
  const isPast = () => {
    const today = new Date();
    const start = new Date(startDate);
    return start < today;
  };

  // Log the calculated values for debugging
  console.log("Days Until Start:", daysUntilStart());
  console.log("Is Past:", isPast());

  // Render days until start or 'past'
  const renderDaysUntilStart = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if today's date is within the itinerary's duration
    if (today >= start && today <= end) {
      return "Active";
    } else if (today > end) {
      return "Past";
    } else {
      // Calculate days until the itinerary starts
      const differenceInTime = start.getTime() - today.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
      return `in ${differenceInDays} days`;
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Row style={{ padding: 15, width: 350 }}>
      <Link to={`/Itinerary/${id}`} style={{ textDecoration: "none" }}>
        <Row
          style={{
            height: 200,
            backgroundColor: "gray",
            backgroundImage: `url(${imgURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 20,
          }}
        >
          <div
            style={{
              color: "white",
              backgroundColor: "lightblue",
              padding: 5,
              borderRadius: 15,
              width: 60,
              height: 25,
              marginTop: 10,
              marginLeft: 10,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {renderDaysUntilStart()}
          </div>
        </Row>
      </Link>
      <hr />

      {calculateRemainingBudget()}

      <hr />
      {/* <p>ID: {id}</p> */}
      <p style={textStyle}>Start Date: {formatDate2(startDate)}</p>
      <p style={textStyle}>End Date: {formatDate2(endDate)}</p>
      <Row style={{ margin: 0, padding: 0 }}>
        <Col>
          <div style={{ fontSize: 16, marginTop: 10 }}>{tripName}</div>
          <button
            style={{
              fontSize: 10,
              padding: 4,
              borderRadius: 3,
              backgroundColor: "#f1f1f1",
              margin: 0,
              textDecoration: "none",
              border: "none",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            onClick={onDelete}
          >
            Delete Me
          </button>
        </Col>
        <Col>
          <div
            style={{
              fontSize: 12,
              marginTop: 10,
              textAlign: "right",
              color: "gray",
            }}
          >
            {location}
          </div>
          <div style={{ fontSize: 10, marginTop: 10, textAlign: "right" }}>
            {formattedStartDate} - {formattedEndDate}
          </div>
        </Col>
      </Row>

      {/* <Link to={`/Itinerary/${id}`}>
      </Link> */}

      {/* <p style={textStyle}>Start Date: {startDate}</p>
      <p style={textStyle}>End Date: {endDate}</p> */}
    </Row>
  );
};

export default ItineraryCard;

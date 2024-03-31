import React, { useState } from "react";
import axios from "axios";
import AccommodationsForm from "../Forms/AccommodationsForm";
import { Card, Button } from "react-bootstrap";

const AccommodationCard = ({
  name,
  address,
  startDate,
  endDate,
  expenses,
  confirmation,
  notes,
  id,
  itineraryData,
}) => {
  const accommodationData = {
    name,
    address,
    startDate,
    endDate,
    expenses,
    confirmation,
    notes,
    id,
  };

  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  const [editMode, setEditMode] = useState(false);
  const [accommodationDataToEdit, setAccommodationDataToEdit] = useState(null);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  };

  const onEdit = async () => {
    setEditMode(true);
    setAccommodationDataToEdit(accommodationData);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setAccommodationDataToEdit(null);
  };

  const handleFormSubmit = () => {
    //handle submission logic done in form
    setEditMode(false);
    setAccommodationDataToEdit(null);
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete-accommodation`,
        {
          data: {
            accommodationID: id,
          },
        }
      );
      console.log("Delete request successful:", response.data);
      setIsDeleted(true); // Update state to trigger re-render
      // Optionally, you can update the UI or take further actions after successful deletion
    } catch (error) {
      console.error("Error making delete request:", error);
      // Handle errors or show user feedback if the deletion fails
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-padding the month
    const day = String(date.getDate()).padStart(2, "0"); // Zero-padding the day
    const year = date.getFullYear(); // Get year
    return `${month}-${day}-${year}`;
  };

  function renderData() {
    return (
      <Card
        border="grey"
        style={{
          width: "30rem",
          boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
          <Card.Text>
            <p>
              <strong>Check-in Date:</strong> {formatDate(startDate)}
            </p>
            <p>
              <strong>Check-out Date:</strong> {formatDate(endDate)}
            </p>
            <p>
              <strong>Total Cost:</strong> ${expenses}
            </p>
            <p>
              <strong>Link to Confirmation Email:</strong> {confirmation}
            </p>
            <p>
              <strong>Notes:</strong> {notes}
            </p>
            <Button
              variant="outline-danger"
              style={{ margin: "0 0 0 300px" }}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              variant="outline-primary"
              style={{ margin: "0 0 0 10px" }}
              onClick={onEdit}
            >
              Edit
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {editMode ? (
        <AccommodationsForm
          itineraryData={itineraryData}
          accommodationData={accommodationDataToEdit}
          onClose={handleCancelEdit}
          onSubmit={handleFormSubmit}
        />
      ) : (
        renderData()
      )}
    </div>
  );
};

export default AccommodationCard;

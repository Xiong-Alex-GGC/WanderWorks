import React, { useState } from "react";
import axios from "axios";
import ActivityForm from "../Forms/ActivityForm";
import { Card, Button, Container, Col } from "react-bootstrap";

const ActivityCard = ({
  address,
  date,
  endTime,
  expense,
  name,
  notes,
  startTime,
  tags,
  id,
  itineraryData,
}) => {
  const activityData = {
    address,
    date,
    endTime,
    expense,
    name,
    notes,
    startTime,
    tags,
    id,
  };
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  const [editMode, setEditMode] = useState(false);
  const [activityDataToEdit, setActivityDataToEdit] = useState(null);

  const onEdit = async () => {
    setEditMode(true);
    setActivityDataToEdit(activityData);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setActivityDataToEdit(null);
  };

  const handleFormSubmit = () => {
    //submission logic handled in form
    setEditMode(false);
    setActivityDataToEdit(null);
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete-activity`,
        {
          data: {
            activityID: id,
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

  function renderData() {
    return (
      <Container>
        <Col>Testing</Col>
        <Col style={{ borderLeft: "1px solid black", height: "100%" }}>
          Testing
        </Col>
        <Col>
          <Card border="primary" style={{ width: "25rem" }}>
            <Card.Header>
              {date}: {startTime} - {endTime}
            </Card.Header>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <p>
                  <strong>Address:</strong> {address}
                </p>
                <p>
                  <strong>Expense:</strong> {expense}
                </p>
                <p>
                  <strong>Notes:</strong> {notes}
                </p>
                <p>
                  <strong>Tags:</strong> {tags}
                </p>
              </Card.Text>
              <Button onClick={onDelete}>Delete</Button>
              <Button onClick={onEdit}>Edit</Button>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    );
  }

  return (
    <div>
      {editMode ? (
        <ActivityForm
          itineraryData={itineraryData}
          activityData={activityDataToEdit}
          onClose={handleCancelEdit}
          onSubmit={handleFormSubmit}
        />
      ) : (
        renderData()
      )}
    </div>
  );
};

export default ActivityCard;

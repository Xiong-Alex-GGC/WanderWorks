import React, { useState } from "react";
import axios from "axios";
import ActivityForm from "../Forms/ActivityForm";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-padding the month
    const day = String(date.getDate()).padStart(2, "0"); // Zero-padding the day
    const year = date.getFullYear(); // Get year
    return `${month}-${day}-${year}`;
  };

  function renderData() {
    return (
      <Container>
        <Row>
          <Col
            xs
            lg="2"
            style={{
              backgroundColor: "#F48989",
              color: "#fff",
              padding: "0 10px",
              textAlign: "right",
              boxShadow: "6px 6px 2px 0px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Row style={{ justifyContent: "flex-end", padding: "5px" }}>
              <h5>{formatDate(date)}</h5>
            </Row>
            <Row
              style={{ justifyContent: "flex-end", padding: "10px 5px 0 0" }}
            >
              <h5>-- {startTime} --</h5>
            </Row>
            <Row
              style={{ justifyContent: "flex-end", padding: "150px 5px 0 0" }}
            >
              <h5>-- {endTime} --</h5>
            </Row>
          </Col>
          <Col
            style={{
              height: "100%",
              textAlign: "left",
            }}
          >
            <Card
              border="grey"
              style={{
                width: "25rem",
                margin: "10px",
                boxShadow: "10px 10px 3px 0px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Card.Header>{name}</Card.Header>
              <Card.Body>
                <Card.Title>{address}</Card.Title>
                <Card.Text>
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
                <Button
                  onClick={onDelete}
                  variant="outline-danger"
                  style={{ margin: "0 0 0 220px" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={onEdit}
                  variant="outline-primary"
                  style={{ margin: "0 0 0 10px" }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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

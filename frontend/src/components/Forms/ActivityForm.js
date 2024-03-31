import React, { useState, useEffect } from "react";
import { Button, Alert, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ActivityLocationSuggestion from "../Mapbox/ActivityLocationSuggeston";
import { ActRow, ActColLeft, ActColRight } from "../../styles/Forms-Styles";

const ActivityForm = ({ itineraryData, activityData, onClose }) => {
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState(new Date());
  const [type, setActivityType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [expenses, setExpenses] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [activityID, setActivityID] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (activityData) {
      setActivityName(activityData.name);
      setActivityDate(activityData.date);
      setActivityType(activityData.type);
      setStartTime(activityData.startTime);
      setEndTime(activityData.endTime);
      setExpenses(activityData.expense);
      setTags(activityData.tags);
      setLocation(activityData.address);
      setNotes(activityData.notes);
      setActivityID(activityData.id);
      setIsEditMode(true);
      //setError('In Edit mode');
    }
  }, [activityData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let numericExpense = null;
    if (expenses !== "") {
      numericExpense = parseFloat(expenses);

      if (isNaN(numericExpense) || numericExpense < 0) {
        setError("Please enter a valid positive number for expenses");
        return;
      }
    }

    //Check date to ensure it's within the confines of the itinerary it's on

    try {
      if (isEditMode) {
        const response = await axios.post(
          "http://localhost:4000/api/update-activity",
          {
            name: activityName,
            date: activityDate,
            type: type,
            startTime: startTime,
            endTime: endTime,
            expense: numericExpense,
            tags: tags,
            address: location,
            notes: notes,
            itineraryID: itineraryData.id,
            id: activityID,
          }
        );

        console.log("Activity updated successfully:", response.data);

        onClose();
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/create-activity",
          {
            //the response after sending a request to the backend
            name: activityName,
            date: activityDate,
            type: type,
            startTime: startTime,
            endTime: endTime,
            expense: numericExpense,

            tags: tags,
            address: location,
            notes: notes,
            itineraryID: itineraryData.id,
          }
        );

        // Handle successful response (if needed)
        console.log("Activity created successfully:", response.data);

        // Close the modal after successful form submission
        onClose();
      }
    } catch (error) {
      // Handle error
      console.error("Error creating activity:", error);
      setError(error);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  function renderActivityID() {
    if (isEditMode) {
      return <div>Activity ID: {activityID}</div>;
    }
  }

  return (
    <Form
      style={{
        background: "#ecf7fc",
        border: "1px solid grey",
        borderRadius: "5px",
        textAlign: "center",
        padding: "10px 0px 10px 0px",
        width: "460px",
      }}
      onSubmit={handleSubmit}
    >
      <ActRow>
        <ActColLeft sm={5}>Activity Name:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      {renderActivityID()}
      <ActRow>
        <ActColLeft sm={5}>Date:</ActColLeft>
        <ActColRight sm={7}>
          <DatePicker
            selected={activityDate}
            onChange={(date) => setActivityDate(date)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Type:</ActColLeft>
        <ActColRight sm={7}>
          <select
            value={type}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="transportation">Major Transportation</option>
            <option value="museum">Museum</option>
            <option value="restaurant">Restaurant</option>
            <option value="tour">Tour</option>
            <option value="other">Other</option>
          </select>
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Start Time:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>End Time:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Expenses:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Tags (custom):</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {/*change to process as a set of tags; */}
          {/* user should ideally hit enter, not submitting the form, and then rendering the tag as a removable item */}
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Address:</ActColLeft>
        <ActColRight sm={7}>
          <ActivityLocationSuggestion
            onSuggestionSelect={handleLocationSelect}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Notes:</ActColLeft>
        <ActColRight sm={7}>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </ActColRight>
      </ActRow>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" type="submit">
        {isEditMode ? "Update" : "Submit"}
      </Button>
    </Form>
  );
};

export default ActivityForm;

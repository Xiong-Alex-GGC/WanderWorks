import React, { useState, useEffect } from "react";
import { Button, Alert, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ActivityLocationSuggestion from "../Mapbox/ActivityLocationSuggeston";
import { ActRow, ActColLeft, ActColRight } from "../../styles/Forms-Styles";

import ItineraryLocationSuggestion from "../Mapbox/ItineraryLocationSuggestion";

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
  const [coords, setCoords] = useState([]);

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
    } else {
      numericExpense = 0;
    }

    //Make sure end time is not before start time

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
            coords: coords

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
            coords: coords
          }
        );

        console.log("Activity created successfully:", response.data);
        onClose();
      }
      window.location.reload();
    } catch (error) { //This block shouldn't be reachable now
      // Handle error
      if(error.response) {
        console.error("Error creating activity plan:", error.response.data);
        setError(error.response.data.error);
      } else {
        console.error("Error creating activity:", error);
        setError("An unexpected error has occured. Please try again.");
      }
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);

  };

  const handleCoordsSelect = (selectedCoords) => {
    setCoords(selectedCoords)
  }

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
          <Form.Control
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            style={{ width: "207px" }}
          />
        </ActColRight>
      </ActRow>
      {renderActivityID()}
      <ActRow>
        <ActColLeft sm={5}>Date:</ActColLeft>
        <ActColRight sm={7}>
          <DatePicker
            className="form-control"
            selected={activityDate}
            onChange={(date) => setActivityDate(date)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Type:</ActColLeft>
        <ActColRight sm={7}>
          <Form.Select
            value={type}
            onChange={(e) => setActivityType(e.target.value)}
            style={{ width: "207px" }}
          >
            <option value="">Select</option>
            <option value="transportation">Major Transportation</option>
            <option value="plane">Plane</option>
            <option value="driving">Driving</option>
            <option value="cycling">Cycling</option>
            <option value="cruise">Cruise</option>
            <option value="museum">Museum</option>
            <option value="restaurant">Restaurant</option>
            <option value="tour">Tour</option>
            <option value="other">Other</option>
          </Form.Select>
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Start Time:</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ width: "207px" }}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>End Time:</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ width: "207px" }}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Expenses:</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            style={{ width: "207px" }}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Tags (custom):</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={{ width: "207px" }}
          />
          {/*change to process as a set of tags; */}
          {/* user should ideally hit enter, not submitting the form, and then rendering the tag as a removable item */}
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Address:</ActColLeft>
        <ActColRight sm={7}>
          {/* ===============Broken atm================= */}
          {/* <ActivityLocationSuggestion
            onSuggestionSelect={handleLocationSelect}
            onCoordsSelect={handleCoordsSelect}
          /> */}
          <ItineraryLocationSuggestion 
            addressSelect={handleLocationSelect}
            coordsSelect={handleCoordsSelect}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Notes:</ActColLeft>
        <ActColRight sm={7}>
          <textarea
            class="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "207px" }}
          />
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

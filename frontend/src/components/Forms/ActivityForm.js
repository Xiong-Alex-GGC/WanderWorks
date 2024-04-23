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

  function extractDate(dateString) {
    return dateString.split("T")[0].split("-");
  }

  function compareDates(date1String, date2String) { //good cases: -1, 0
    const date1 = extractDate(date1String);
    const date2 = extractDate(date2String);

    if(date1[0] == date2[0]) {
        //years are equal
        if(date1[1] == date2[1]) {
            //months are equal
            if(date1[2] == date2[2]) {
                //days are equal
                return 0;
            } else if (date1[2] < date2[2]) {
                //day 1 is before day2
                return -1;
            } else {
                //day 1 is after day2
                return 1;
            }
        } else if (date1[1] < date2[1]) {
            //date1's month is before date2's
            return -1;
        } else {
            return 1;
        }
    } else if (date1[0] < date2[0]) {
        return -1;
    } else {
        return 1;
    }
  }

  function compareTimes(time1, time2) {

    const [time1Hours, time1Minutes] = time1.split(':');
    const [time2Hours, time2Minutes] = time2.split(':');

    if(parseInt(time1Hours) == parseInt(time2Hours)) {
      //same hour
      if(parseInt(time1Minutes) == parseInt(time2Minutes)) {
        return 0;
      } else if(parseInt(time1Minutes) > parseInt(time2Minutes)) {
        //time1 is after time2
        return 1;
      } else {
        //time 1 is before time 2
        return -1;
      }
    } else if(parseInt(time1Hours) > parseInt(time2Hours)) {
      //time 1 is after time2
      return 1;
    } else {
      return -1;
    }
  }

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

    const currentDay = new Date();
    const hours = currentDay.getHours().toString().padStart(2, '0');
    const minutes = currentDay.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    //Make sure end time is not before start time
    const startEndComparison = compareTimes(startTime, endTime);
    if(startEndComparison == 0) {
      setError("An activity cannot start and end at the same time.");
      return;
    } else if (startEndComparison == 1) {
      setError("The activity's end time cannot be before the start time.");
      return;
    } //else good
    const startCurrentDayComparison = compareDates(activityDate.toDateString(), currentDay.toDateString());
    if(startCurrentDayComparison == -1) {
      setError("The date for your activity has already passed");
      return;
    } else if(startCurrentDayComparison == 0) { //same day
      const startCurrentTimeComparison = compareTimes(startTime.toString(), currentTime);
      if(startCurrentTimeComparison == -1) {
        setError("It is already past " + startTime + ", please set the start time for later.\n" +
        "If this is something you're actively doing and want to track for budget purposes, you can\n" +
        "track it as an additional expense with the expense logger");
        return;
      } //ignore same time and later time
    }

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
          <ActivityLocationSuggestion
            onSuggestionSelect={handleLocationSelect}
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

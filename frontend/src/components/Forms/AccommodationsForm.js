import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ActRow, ActColLeft, ActColRight } from "../../styles/Forms-Styles";
import { Button, Alert, Form } from "react-bootstrap";

const AccommodationsForm = ({ itineraryData, accommodationData, onClose }) => {
  const [accommodationName, setAccommodationName] = useState("");
  const [address, setAccommodationAddress] = useState("");
  //const [rooms, setRooms] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //const [pricePerNight, setPricePerNight] = useState('');
  const [expenses, setExpenses] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [accommodationID, setAccommodationID] = useState(null);

  useEffect(() => {
    if (accommodationData) {
      setAccommodationName(accommodationData.name);
      setAccommodationAddress(accommodationData.address);
      setStartDate(accommodationData.startDate);
      setEndDate(accommodationData.endDate);
      setExpenses(accommodationData.expenses);
      setConfirmation(accommodationData.confirmation);
      setNotes(accommodationData.notes);
      setAccommodationID(accommodationData.id);
      setIsEditMode(true);
    }
  }, [accommodationData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let numericExpenses = parseFloat(expenses);
    if (isNaN(numericExpenses) || numericExpenses < 0) {
      setError(
        "Please enter a valid positive number for the cost of your stay\n, or 0 if you don't wish to track expenses"
      );
      return;
    }

    //const checkInDateObj = date ? new Date(startDate) : null;
    //const checkOutDateObj = date ? new Date(endDate) : null;
    //if for some reason the date being stored as a string in the database becomes a problem, this should fix it;
    //replace start and end date in the create-accommodation request with the objects above and handle as needed within the backend

    try {
      //const response = null;
      if (isEditMode) {
        //console.log("We are updating this accommodation");
        const response = await axios.post(
          "http://localhost:4000/api/update-accommodation",
          {
            name: accommodationName,
            address: address,
            startDate: startDate,
            endDate: endDate,
            expenses: numericExpenses,
            confirmation: confirmation,
            notes: notes,
            itineraryID: itineraryData.id,
            id: accommodationID,
          }
        );

        // Handle successful response (if needed)
        console.log("Accommodation plan updated successfully:", response.data);

        // Close the modal after successful form submission
        onClose();
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/create-accommodation",
          {
            //the response after sending a request to the backend
            name: accommodationName,
            address: address,
            //"rooms": rooms,
            startDate: startDate,
            endDate: endDate,
            //"pricePerNight": pricePerNight,
            expenses: numericExpenses,
            confirmation: confirmation,
            notes: notes,
            itineraryID: itineraryData.id,
          }
        );

        // Handle successful response (if needed)
        console.log("Accommodation plan created successfully:", response.data);

        // Close the modal after successful form submission
        onClose();
      }
    } catch (error) {
      // Handle error
      console.error("Error creating accommodation plan:", error);
    }
  };

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
        <ActColLeft sm={5}>Name:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="text"
            value={accommodationName}
            onChange={(e) => setAccommodationName(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Address:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAccommodationAddress(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Check-in Date:</ActColLeft>
        <ActColRight sm={7}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Check-out Date:</ActColLeft>
        <ActColRight sm={7}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Total Cost:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Confirmation #:</ActColLeft>
        <ActColRight sm={7}>
          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </ActColRight>
      </ActRow>
      <ActRow>
        <ActColLeft sm={5}>Notes:</ActColLeft>
        <ActColRight sm={7}>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </ActColRight>
      </ActRow>
      {error && (
        <ActRow>
          <Alert variant="danger">{error}</Alert>
        </ActRow>
      )}
      <Button variant="primary" type="submit">
        {isEditMode ? "Update" : "Submit"}
      </Button>
    </Form>
  );
};

export default AccommodationsForm;

/*
<div>
            <label>
              Number of rooms (remove later?):
              <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />
            </label>
          </div>

<div>
            <label>
              Price per night (Remove later?):
              <input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} />
            </label>
          </div>
*/

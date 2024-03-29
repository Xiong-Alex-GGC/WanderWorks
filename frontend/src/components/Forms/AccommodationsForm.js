import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Alert } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const AccommodationsForm = ({ itineraryData, accommodationData, onClose }) => {
    const [accommodationName, setAccommodationName] = useState('');
    const [address, setAccommodationAddress] = useState('');
    //const [rooms, setRooms] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    //const [pricePerNight, setPricePerNight] = useState('');
    const [expenses, setExpenses] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [accommodationID, setAccommodationID] = useState(null);

    useEffect(() => {
      if ( accommodationData ) {
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
      if(isNaN(numericExpenses) || numericExpenses < 0) {
        setError("Please enter a valid positive number for the cost of your stay\n, or 0 if you don't wish to track expenses");
        return;
      }

      //const checkInDateObj = date ? new Date(startDate) : null;
      //const checkOutDateObj = date ? new Date(endDate) : null;
      //if for some reason the date being stored as a string in the database becomes a problem, this should fix it;
      //replace start and end date in the create-accommodation request with the objects above and handle as needed within the backend
  
      try {
        //const response = null;
        if(isEditMode) {
          //console.log("We are updating this accommodation");
          const response = await axios.post('http://localhost:4000/api/update-accommodation', {
            "name": accommodationName,
            "address": address,
            "startDate": startDate,
            "endDate": endDate,
            "expenses": numericExpenses,
            "confirmation": confirmation,
            "notes": notes,
            "itineraryID": itineraryData.id,
            "id": accommodationID
          });
          
          // Handle successful response (if needed)
          console.log('Accommodation plan updated successfully:', response.data);
    
          // Close the modal after successful form submission
          onClose();
        } else {
          const response = await axios.post('http://localhost:4000/api/create-accommodation', { //the response after sending a request to the backend
            "name": accommodationName,
            "address": address,
            //"rooms": rooms,
            "startDate": startDate,
            "endDate": endDate,
            //"pricePerNight": pricePerNight,
            "expenses": numericExpenses,
            "confirmation": confirmation,
            "notes": notes,
            "itineraryID": itineraryData.id
          });
    
          // Handle successful response (if needed)
          console.log('Accommodation plan created successfully:', response.data);
    
          // Close the modal after successful form submission
          onClose();
        }
      } catch (error) {
        // Handle error
        console.error('Error creating accommodation plan:', error);
      }
    };

    const closeForum = () => {
      onClose();
    }

    return (
      <div> 
        <form onSubmit={handleSubmit}>
          <button onClick={closeForum}>Close</button>
          <div>
            <label>
              Name:
              <input type="text" value={accommodationName} onChange={(e) => setAccommodationName(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAccommodationAddress(e.target.value)} />
            </label>
          </div>
          <div>
              <label>
                Check-in Date:
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </label>
          </div>
          <div>
              <label>
                Check-out Date:
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
              </label>
          </div>
          <div>
            <label>
              Total Cost:
              <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
            </label>
            The total cost of your stay listed on your e-receipt
          </div>
          <div>
            <label>
              Confirmation number or link to email:
              <input type="text" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Notes:
              <br />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <button type="submit">{isEditMode ? 'Update' : 'Submit'}</button>
        </form>
      </div>  
      );
}

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
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

//Important Field:
/*
tripID (get from trip, copy from activity form, lol)
name
type - plane, train, public transportation pass >>
    if plane or train, include date, departure time, and expected arrival time. flights and trains will be rendered like an activity
    -when rendering these, attach an hour time-block to the end of expected arrival time
expected spending
confirmation email (optional)
*/

const TransportationForm = ({ itineraryData, onClose }) => {
    const [transportationName, setTransportationName] = useState('');
    const [type, setTransportationType] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [expenses, setExpenses] = useState('');
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [notes, setNotes] = useState('');
    //const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:4000/api/create-transportation', { //the response after sending a request to the backend
          "name": transportationName,
          "type": type,
          "departureDate": departureDate,
          "departureTime": departureTime,
          "arrivalTime": arrivalTime,
          "expense": expenses,
          "notes": notes,
          "itineraryID": itineraryData.id
        });
  
        // Handle successful response (if needed)
        console.log('Transportation plan created successfully:', response.data);
  
        // Close the modal after successful form submission
        onClose();
      } catch (error) {
        // Handle error
        console.error('Error creating transportation plan:', error);
      }
    };

    const closeForum = () => {
      onClose();
    }

    //Render additional fields as needed
    const renderAdditionalFields = () => {
      if(type == 'plane' || type == 'train') {
        return (
          <>
            <div>
              <label>
                Date:
                <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} />
              </label>
            </div>
            <div>
              <label>
                Departure Time:
                <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                End Time:
                <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
              </label>
            </div>
          </>
        );
      }
      return null;
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" value={transportationName} onChange={(e) => setTransportationName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Transportation Type:
            <select
              value={type}
              onChange={(e) => setTransportationType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="plane">Plane</option>
              <option value="train">Train</option>
              <option value="publicTranspo">Public Transportation Pass</option>
            </select>
          </label>
          {renderAdditionalFields()}
        </div>
        <div>
          <label>
            Expenses:
            <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Link to your confirmation email:
            <input type="text" value={confirmationEmail} onChange={(e) => setConfirmationEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Notes:
            <br />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>
        <button type="submit">Submit</button>
        <button onClick={closeForum}>Close</button>
      </form>
    );
  };
  
  export default TransportationForm;
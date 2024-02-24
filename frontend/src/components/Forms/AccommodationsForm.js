import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

/*Important Fields
name
address
rooms
pricePerNight
confirmationEmail
startDate
endDate
*/

const AccommodationsForm = ({ itineraryData, onClose }) => {
    const [accommodationName, setAccommodationName] = useState('');
    const [address, setAccommodationAddress] = useState('');
    const [rooms, setRooms] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [pricePerNight, setPricePerNight] = useState('');
    const [additionalExpenses, setAdditionalExpenses] = useState('');
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [notes, setNotes] = useState('');
    //const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:4000/api/create-accommodation', { //the response after sending a request to the backend
          "name": accommodationName,
          "address": address,
          "rooms": rooms,
          "startDate": startDate,
          "endDate": endDate,
          "pricePerNight": pricePerNight,
          "confirmationEmail": confirmationEmail,
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

    return (
        <form onSubmit={handleSubmit}>
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
              Number of rooms:
              <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />
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
              Price per night:
              <input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Additional Expenses:
              <input type="number" value={additionalExpenses} onChange={(e) => setAdditionalExpenses(e.target.value)} />
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
        </form>
      );
}

export default AccommodationsForm;
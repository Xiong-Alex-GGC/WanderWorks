import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const ActivityForm = ({ itineraryData, onClose }) => {
  const [activityName, setActivityName] = useState('');
  const [activityDate, setActivityDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [expenses, setExpenses] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/create-activity', {
        "name": activityName,
        "date": activityDate,
        "startTime": startTime,
        "endTime": endTime,
        "expense": expenses,
        
        "tags": tags,
        "address": location,
        "notes": notes,
        "itineraryID": itineraryData.id
      });

      // Handle successful response (if needed)
      console.log('Activity created successfully:', response.data);

      // Close the modal after successful form submission
      onClose();
    } catch (error) {
      // Handle error
      console.error('Error creating activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Activity Name:
          <input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Date:
          <DatePicker selected={activityDate} onChange={(date) => setActivityDate(date)} />
        </label>
      </div>
      <div>
        <label>
          Start Time:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          End Time:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Expenses:
          <input type="text" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Tags (custom):
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Location (Address):
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
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
};

export default ActivityForm;

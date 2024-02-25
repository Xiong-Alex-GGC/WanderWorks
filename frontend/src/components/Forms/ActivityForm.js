import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import ActivityLocationSuggestion from '../Mapbox/ActivityLocationSuggeston';
import { Row, Col, Button } from 'react-bootstrap';
import { ActRow, ActColLeft, ActColRight } from '../../styles/Forms-Styles';

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
      const response = await axios.post('http://localhost:4000/api/create-activity', { //the response after sending a request to the backend
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

  const closeForum = () => {
    onClose();
  }

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  return (
    <form style={{ background: '#ecf7fc', textAlign: 'center', padding: '10px 0px 10px 0px' }} onSubmit={handleSubmit}>
        <h3>Activity Form</h3>
        <ActRow>
            <ActColLeft sm={5}>
                Activity Name:
            </ActColLeft>
            <ActColRight sm={7}>
                <input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
            </ActColRight>
        </ActRow>
        <ActRow>
            <ActColLeft sm={5}>
                Date:
            </ActColLeft>
            <ActColRight sm={7}>
                <DatePicker selected={activityDate} onChange={(date) => setActivityDate(date)} />
            </ActColRight>
        </ActRow>
        <ActRow>
            <ActColLeft sm={5}>
                Start Time:
            </ActColLeft>
            <ActColRight sm={7}>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </ActColRight>
        </ActRow>
        <ActRow>
            <ActColLeft sm={5}>
                End Time:
            </ActColLeft>
            <ActColRight sm={7}>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </ActColRight>
        </ActRow>
        <ActRow>
            <ActColLeft sm={5}>
                Expenses:
            </ActColLeft>
            <ActColRight sm={7}>
                <input type="text" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
            </ActColRight>
        </ActRow>
        <ActRow>
            <ActColLeft sm={5}>
                Tags (custom):
            </ActColLeft>
            <ActColRight sm={7}>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} /> {/*change to process as a set of tags; */}
                {/* user should ideally hit enter, not submitting the form, and then rendering the tag as a removable item */}
            </ActColRight>
        </ActRow>
        <ActRow>
        <ActColLeft sm={5}>
          Location (address):
        </ActColLeft>
        <ActColRight sm={7}>
            <ActivityLocationSuggestion onSuggestionSelect={handleLocationSelect} />
        </ActColRight>
        </ActRow>
        <ActRow>
            <ActColLeft sm={5}>
                Notes:
            </ActColLeft>
            <ActColRight sm={7}>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </ActColRight>
        </ActRow>
        <Button type="submit" variant="outline-primary" className='mx-2'>Submit</Button>
        <Button onClick={closeForum} variant="outline-primary" className='mx-2'>Close</Button>
    </form>
);

};

export default ActivityForm;

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Import axios
import ItineraryLocationSuggestion from '../Mapbox/ItineraryLocationSuggestion';
import { useAuth } from '../../context/authContext';
import { fetchDefaultPhotoByLocation } from '../../pexels/pexels';

const ItineraryForm = ({ onTripIDReceived, itineraryData, onTripUpdated }) => {
    const [tripName, setTripName] = useState('');
    const [location, setLocation] = useState('');
    const [coords, setCoords] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [budget, setBudget] = useState('');
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [itineraryID, setItineraryID] = useState(null);

    const [backgroundImage, setBackgroundImage] = useState(''); // State to hold the background image URL
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
      if(itineraryData) {
        setStartDate(itineraryData.startDate);
        setEndDate(itineraryData.endDate);
        setLocation(itineraryData.location);
        setTripName(itineraryData.tripName);
        setBudget(itineraryData.budget);
        setItineraryID(itineraryData.id);
        setIsEditMode(true);
      }
      
        // Call the fetchPhotosByLocation function with the location
      fetchDefaultPhotoByLocation(location)
        .then(imageUrl => {
          setBackgroundImage(imageUrl);
        })
        .catch(error => {
          console.error('Error fetching photos:', error);
        });
    }, [location]);

    function extractDate(dateString) {
        const dateString1 = dateString.split("T")[0];
        return dateString1.split("-");
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        //convert budget to a float
        let numericBudget = null;
        if(budget !== '') {
            numericBudget = parseFloat(budget);

            if(isNaN(numericBudget) || numericBudget < 0) {
                setError('Please enter a valid positive budget');
                return;
            }
        }
        
        if (endDate < startDate) {
            setError("End date cannot be before the start date");
            return; // Exit the function early
        }
        //check the current date
        const currentDay = new Date().toDateString();
        if(compareDates(startDate.toDateString(), currentDay) == 1) {
            setError("Your trip cannot start before the current day");
            return;
        }

        try {
            if(isEditMode) {
                const response = await axios.post('http://localhost:4000/api/update', {
                tripName: tripName,
                location: location,
                coords: coords,
                startDate: startDate,
                endDate: endDate,

                budget: numericBudget,
                imgURL: backgroundImage,
                id: itineraryID
                });
                
                onTripUpdated();
            } else {
                const response = await axios.post('http://localhost:4000/api/create-itinerary', {
                tripName: tripName,
                location: location,
                coords: coords,
                startDate: startDate,
                endDate: endDate,

                budget: numericBudget,
                totalExpenses: 0,
                userID: currentUser.uid,
                imgURL: backgroundImage

                });

                // Return TripID
                onTripIDReceived(response.data.id)
            }

        } catch (error) {
            console.error('Error creating Itinerary:', error);
            // Handle error if needed
        }
    };

    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation);
    };

    const handleLocationCoords = (locationCoords) => {
        setCoords(locationCoords);
    };



    return (

<Container style={{ 
    width: 600, 
    height: 800, 
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.9)', 
    borderRadius: '50px', 
    padding: 50,
    backgroundColor: 'white' 
    }}>

            <h2 style={{textAlign: 'center'}}>NEW ITINERARY</h2>

            <Form onSubmit={handleSubmit} style={{
                marginLeft: 50, 
                marginRight: 50, 
                marginTop: 40,
                fontSize: '180%'
                }}>
                <Form.Group className="mb-3">
                    <Form.Label>Trip Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name your Trip"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        required
                    />
                </Form.Group>

                <ItineraryLocationSuggestion addressSelect={handleLocationSelect} coordsSelect={handleLocationCoords} />

                <Form.Group className="mb-3">
                    <Form.Label>Start Date:</Form.Label>
                    <DatePicker
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End Date:</Form.Label>
                    <DatePicker
                        className="form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Budget: $</Form.Label>
                    <Form.Control
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                {/* {tripID && <Alert variant="success">Trip created successfully. Trip ID: {tripID}</Alert>} */}

                <Button variant="primary" type="submit">
                    {isEditMode ? "Update" : "Submit"}
                </Button>
            </Form>
        </Container>

    );
};

export default ItineraryForm;

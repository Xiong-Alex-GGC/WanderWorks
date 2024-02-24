import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Import axios
import ItineraryLocationSuggestion from '../Mapbox/ItineraryLocationSuggestion';
import { useAuth } from '../../context/authContext';
import { fetchDefaultPhotoByLocation } from '../../pexels/pexels';

const ItineraryForm = ({ onTripIDReceived }) => {
    const [tripName, setTripName] = useState('');
    const [location, setLocation] = useState('');
    const [coords, setCoords] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [budget, setBudget] = useState('');
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    const [backgroundImage, setBackgroundImage] = useState(''); // State to hold the background image URL

    useEffect(() => {
      // Call the fetchPhotosByLocation function with the location
      fetchDefaultPhotoByLocation(location)
        .then(imageUrl => {
          setBackgroundImage(imageUrl);
        })
        .catch(error => {
          console.error('Error fetching photos:', error);
        });
    }, [location]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (endDate < startDate) {
            setError("End date cannot be before the start date");
            return; // Exit the function early
        }

        try {
            const response = await axios.post('http://localhost:4000/api/create-itinerary', {
                tripName: tripName,
                location: location,
                coords: coords,
                startDate: startDate,
                endDate: endDate,
                userID: currentUser.uid,
                imgURL: backgroundImage
            });

            // Return TripID
            onTripIDReceived(response.data.id)

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

                {error && <Alert variant="danger">{error}</Alert>}

                {/* {tripID && <Alert variant="success">Trip created successfully. Trip ID: {tripID}</Alert>} */}

                <Button variant="primary" type="submit">
                    Create Itinerary
                </Button>
            </Form>
        </Container>

    );
};

export default ItineraryForm;

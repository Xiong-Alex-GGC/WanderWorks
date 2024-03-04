import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Import axios
import ItineraryLocationSuggestion from '../Mapbox/ItineraryLocationSuggestion';
import { useAuth } from '../../context/authContext';

const ItineraryForm = ({ onTripIDReceived }) => {
    const [tripName, setTripName] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [budget, setBudget] = useState('');
    const { currentUser } = useAuth();

    const [error, setError] = useState('');



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
        
        //const curDate = new Date();
        if (endDate < startDate) {
            setError("End date cannot be before the start date");
            return; // Exit the function early
        }
        //check the current date

        try {
            const response = await axios.post('http://localhost:4000/api/create-itinerary', {
                tripName: tripName,
                location: location,
                startDate: startDate,
                endDate: endDate,
                budget: numericBudget,
                totalExpenses: 0,
                userID: currentUser.uid
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

                <ItineraryLocationSuggestion onSuggestionSelect={handleLocationSelect} />

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
                    Create Itinerary
                </Button>
            </Form>
        </Container>

    );
};

export default ItineraryForm;

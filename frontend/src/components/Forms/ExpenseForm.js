import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const ExpenseForm = ({ itineraryData, onClose }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [spendings, setSpendings] = useState('');
    const [notes, setNotes] = useState('');

    const [error, setError] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        //convert budget to a float
        let numericSpendings = null;
        if(spendings !== '') {
            numericSpendings = parseFloat(spendings);

            if(isNaN(numericSpendings) || numericSpendings < 0) {
                setError('Please enter a valid positive expenditure');
                return;
            }
        }

        try {
            const response = await axios.post('http://localhost:4000/api/create-expense', {
                "name": name,
                "date": date,
                "spendings": numericSpendings,
                "notes": notes,
                "itineraryID": itineraryData.id
                //userID: currentUser.uid
            });

            // Return TripID
            //onTripIDReceived(response.data.id)

        } catch (error) {
            console.error('Error creating Expense:', error);
            // Handle error if needed
        }
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

            <h2 style={{textAlign: 'center'}}>Additional Expenditure</h2>

            <Form onSubmit={handleSubmit} style={{
                marginLeft: 50, 
                marginRight: 50, 
                marginTop: 40,
                fontSize: '180%'
                }}>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of expenditure"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Purchase Date:</Form.Label>
                    <DatePicker
                        className="form-control"
                        selected={date}
                        onChange={(date) => setDate(date)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amount Spent: $</Form.Label>
                    <Form.Control
                        type="number"
                        value={spendings}
                        onChange={(e) => setSpendings(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Additional Notes:</Form.Label>
                    <Form.Control
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                {/* {tripID && <Alert variant="success">Trip created successfully. Trip ID: {tripID}</Alert>} */}

                <Button variant="primary" type="submit">
                    Add Expenditure
                </Button>
            </Form>
        </Container>

    );
};

export default ExpenseForm;
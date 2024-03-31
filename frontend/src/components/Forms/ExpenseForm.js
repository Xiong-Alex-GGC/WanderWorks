import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ActRow, ActColLeft, ActColRight } from "../../styles/Forms-Styles";

const ExpenseForm = ({ itineraryData, expenseData, onClose }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [spendings, setSpendings] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [expenseID, setExpenseID] = useState(null);

  useEffect(() => {
    if (expenseData) {
      setName(expenseData.name);
      setDate(expenseData.date);
      setSpendings(expenseData.spendings);
      setNotes(expenseData.notes);
      setExpenseID(expenseData.id);
      setIsEditMode(true);
    }
  }, [expenseData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //convert budget to a float
    let numericSpendings = null;
    if (spendings !== "") {
      numericSpendings = parseFloat(spendings);

      if (isNaN(numericSpendings) || numericSpendings < 0) {
        setError("Please enter a valid positive expenditure");
        return;
      }
    }

    try {
      if (isEditMode) {
        const response = await axios.post(
          "http://localhost:4000/api/update-expense",
          {
            name: name,
            date: date,
            spendings: numericSpendings,
            notes: notes,
            itineraryID: itineraryData.id,
            id: expenseID,
          }
        );

        console.log("Expense updated successfully:", response.data);
        onClose();
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/create-expense",
          {
            name: name,
            date: date,
            spendings: numericSpendings,
            notes: notes,
            itineraryID: itineraryData.id,
            //userID: currentUser.uid
          }
        );

        // Handle successful response (if needed)
        console.log("Expense added successfully:", response.data);

        // Close the modal after successful form submission
        onClose();
      }
    } catch (error) {
      console.error("Error creating Expense:", error);
      // Handle error if needed
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        background: "#ecf7fc",
        border: "1px solid grey",
        borderRadius: "5px",
        textAlign: "center",
        padding: "10px 0px 10px 0px",
        width: "460px",
      }}
    >
      <ActRow>
        <ActColLeft sm={5}>Name:</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "210px" }}
          />
        </ActColRight>
      </ActRow>

      <ActRow>
        <ActColLeft sm={5}>Purchase Date:</ActColLeft>
        <ActColRight sm={7}>
          <DatePicker
            className="form-control"
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </ActColRight>
      </ActRow>

      <ActRow>
        <ActColLeft sm={5}>Amount Spent: $</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="number"
            value={spendings}
            onChange={(e) => setSpendings(e.target.value)}
            required
            style={{ width: "210px" }}
          />
        </ActColRight>
      </ActRow>

      <ActRow>
        <ActColLeft sm={5}>Additional Notes:</ActColLeft>
        <ActColRight sm={7}>
          <Form.Control
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "210px" }}
          />
        </ActColRight>
      </ActRow>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" type="submit">
        {isEditMode ? "Update" : "Add"}
      </Button>
    </Form>
  );
};

export default ExpenseForm;

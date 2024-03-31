import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCard from "../Cards/ExpenseCard";
import { Alert } from "react-bootstrap";

const ExpenseContainer = ({ itineraryData }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/expenses/${itineraryData.id}`
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching Expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  function renderOverBudgetWarning(remainingBudget) {
    if (remainingBudget < 0) {
      return (
        <>
          <p>
            You are expected to go over budget by ${Math.abs(remainingBudget)}.
          </p>
        </>
      );
    } else {
      return <></>;
    }
  }

  const calculateRemainingBudget = () => {
    if (itineraryData.budget != null) {
      const remainingBudget =
        itineraryData.budget - itineraryData.totalExpenses; //need to delete any itineraries where budget and totalExpenses are currently strings
      return (
        <>
          <p>
            ${remainingBudget} of ${itineraryData.budget} budget remaining.
            {renderOverBudgetWarning(remainingBudget)}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>You have spent ${itineraryData.totalExpenses} on this trip</p>
        </>
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Your Expenses</h1>
      <Alert
        key="danger"
        variant="danger"
        style={{
          textAlign: "center",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {calculateRemainingBudget()}
      </Alert>

      <div className="expenses-container">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            itineraryData={itineraryData}
            {...expense}
          />
        ))}

        <style jsx>{`
          .expenses-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin: 20px;
            border: "1px solid #ccc";
            padding: "15px";
            margin: "10px";
            borderradius: "8px";
            boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)";
            backgroundcolor: "#fff";
          }
        `}</style>
      </div>
    </div>
  );
};

export default ExpenseContainer;

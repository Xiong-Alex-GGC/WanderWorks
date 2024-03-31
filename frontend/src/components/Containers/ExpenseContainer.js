import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCard from "../Cards/ExpenseCard";

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

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Your Expenses</h1>
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

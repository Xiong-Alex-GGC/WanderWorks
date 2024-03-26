import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExpenseContainer from '../components/Containers/ExpenseContainer';
import ExpenseForm from '../components/Forms/ExpenseForm';
import { Container, Row, Col } from 'react-bootstrap';

const Expenses = () => {
    const { id } = useParams();
    const [itineraryData, setItineraryData] = useState(null);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
  
    useEffect(() => {
        const fetchItineraryData = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/itinerary/${id}`);
            setItineraryData(response.data);
            //
          } catch (error) {
            console.error('Error fetching itinerary data:', error);
          }
        };
    
        fetchItineraryData();
    }, [id]);

    const openExpenseForm = () => {
        setShowExpenseForm(true);
    };
    
      const closeExpenseForm = () => {
        setShowExpenseForm(false);
    };
  
    function renderOverBudgetWarning( remainingBudget ) {
      if(remainingBudget < 0) {
        return (
          <>
            You are expected to go over budget by ${Math.abs(remainingBudget)}
          </>
        );
      } else {
        return(<></>);
      }
    }
  
    const calculateRemainingBudget = () => {
      if(itineraryData.budget != null) {
        const remainingBudget = itineraryData.budget - itineraryData.totalExpenses; //need to delete any itineraries where budget and totalExpenses are currently strings
        return (
          <>
            <p>${remainingBudget} of ${itineraryData.budget} budget remaining</p>
            <p>{renderOverBudgetWarning(remainingBudget)}</p>
          </>
        );
      } else {
        return (
          <>
            <p>You have spent ${itineraryData.totalExpenses} on this trip</p>
          </>
        );
      }
    }
  
    return (
      <Row>
        {itineraryData ? (
          <>
            <Col>
              <Row style={{ height: '100vh' }}>
                <Col xs={3} style={{ backgroundColor: '#f1f1f1', borderRight: '1px solid #ccc' }}>
                  Sidebar
                </Col>
                <Col>
                  <Row style={{ height: '150px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
                    image goes here
                  </Row>
                  <div style={{
                    margin: '-60px 30px 30px 30px',
                    backgroundColor: 'pink',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                  }}>
                    <h6>"Additional Purchases for : {itineraryData.tripName}</h6>
                
                    {calculateRemainingBudget()}
                  </div>
  
                  <hr />
                  <button onClick={openExpenseForm}>New Expense</button>
                  <hr />
                  {showExpenseForm && (
                    <ExpenseForm itineraryData={itineraryData} onClose={closeExpenseForm} />
                  )}
  
                  <ExpenseContainer itineraryData={itineraryData} />
  
                  <hr />
  
                </Col>
              </Row>
            </Col>
          </>
        ) : (
          <Col>
            <p>Loading itinerary data...</p>
          </Col>
        )}
      </Row>
    );
    
  };
  
  export default Expenses;
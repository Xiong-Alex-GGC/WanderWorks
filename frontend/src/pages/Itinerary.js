import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DemoMap from "../components/Mapbox/DemoMap";
import ActivityForm from "../components/Forms/ActivityForm";
import ActivityContainer from "../components/Containers/ActivityContainer";
import AccommodationForm from "../components/Forms/AccommodationsForm";
import AccommodationContainer from "../components/Containers/AccommodationContainer";
import ExpenseForm from "../components/Forms/ExpenseForm";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import WeatherComponent from "../components/Weather/DemoWeather";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Itinerary = () => {
  const { id } = useParams();
  const [itineraryData, setItineraryData] = useState(null);
  const [activitiesData, setActivitiesData] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showAccommodationForm, setShowAccommodationForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/itinerary/${id}`
        );
        setItineraryData(response.data);
        //
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    };

    fetchItineraryData();
  }, [id]);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      if (itineraryData) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/activities/${itineraryData.id}`
          );
          setActivitiesData(response.data);
          setIsLoading(false); // Data is loaded, set isLoading to false
        } catch (error) {
          console.error("Error fetching activity data:", error);
          setIsLoading(false); // Ensure to handle loading state even on error
        }
      }
    };

    fetchActivitiesData();
  }, [itineraryData]);

  const openActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeActivityForm = () => {
    setShowActivityForm(false);
  };

  const closeAccommodationForm = () => {
    setShowAccommodationForm(false);
  };

  const openExpenseForm = () => {
    setShowExpenseForm(true);
  };

  const closeExpenseForm = () => {
    setShowExpenseForm(false);
  };

  function renderOverBudgetWarning(remainingBudget) {
    if (remainingBudget < 0) {
      return (
        <>
          <p>
            You are expected to go over budget by {Math.abs(remainingBudget)}
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
            ${remainingBudget} of ${itineraryData.budget} budget remaining
          </p>
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
  };

  return (
    <Row>
      {isLoading ? (
        <Col>
          <p>Loading itinerary data...</p>
        </Col>
      ) : (
        <>
          <Col>
            <Row style={{ height: "100vh" }}>
              <Col>
                <Row
                  style={{
                    height: "150px",
                    backgroundColor: "#f4f4f4",
                    borderBottom: "1px solid #ccc",
                    backgroundImage: `url(${itineraryData.imgURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Row>
                <div
                  style={{
                    margin: "-50px 40px 30px 40px",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h6>{itineraryData.tripName}</h6>
                </div>

                {/* <p>Start Date: {itineraryData.startDate}</p>
                <p>End Date: {itineraryData.endDate}</p> */}
                <div>{calculateRemainingBudget()}</div>

                <div>{calculateRemainingBudget()}</div>

                <div>
                  <Link to={`/Expenses/${itineraryData.id}`}>
                    Click here to see your additional expenses
                  </Link>
                </div>
                <hr />

                {/* Use Modal to open popup */}
                <h3>Functions</h3>
                <Button
                  onClick={() => setShowActivityForm(true)}
                  className="me-2"
                  variant="success"
                >
                  New Activity
                </Button>
                <Modal
                  size="lg"
                  show={showActivityForm}
                  onHide={() => setShowActivityForm(false)}
                  aria-labelledby="activity-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="activity-modal">New Activity</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ActivityForm
                      itineraryData={itineraryData}
                      onClose={closeActivityForm}
                    />
                  </Modal.Body>
                </Modal>

                <Button
                  onClick={() => setShowAccommodationForm(true)}
                  className="me-2"
                  variant="success"
                >
                  New Accommodation
                </Button>
                <Modal
                  size="lg"
                  show={showAccommodationForm}
                  onHide={() => setShowAccommodationForm(false)}
                  aria-labelledby="accomodation-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="accomodation-modal">
                      New Accommodation
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <AccommodationForm
                      itineraryData={itineraryData}
                      onClose={closeAccommodationForm}
                    />
                  </Modal.Body>
                </Modal>

                <Button
                  onClick={() => setShowExpenseForm(true)}
                  className="me-2"
                  variant="success"
                >
                  New Expense
                </Button>
                <Modal
                  size="lg"
                  show={showExpenseForm}
                  onHide={() => setShowExpenseForm(false)}
                  aria-labelledby="expense-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="expense-modal">New Expense</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ExpenseForm
                      itineraryData={itineraryData}
                      onClose={closeExpenseForm}
                    />
                  </Modal.Body>
                </Modal>
                <hr />

                <ActivityContainer itineraryData={itineraryData} />

                <hr />

                <AccommodationContainer itineraryData={itineraryData} />

                <hr />
                <WeatherComponent itineraryData={itineraryData} />
              </Col>
            </Row>
          </Col>

          <Col>
            <DemoMap
              itineraryData={itineraryData}
              activitiesData={activitiesData}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default Itinerary;

//Notes: In the end, accommodations should be rendered differentl- well everything should be rendered differently,
//but an accommodation should not be rendered like an activity

/*
<h3>Transportation</h3>
  <button onClick={openTransportationForm}>New Transportation</button>
  <hr />
    {showTransportationForm && (
    <TransportationForm itineraryData={itineraryData} onClose={closeTransportationForm} />
    )}
  <hr />

<TransportationContainer itineraryData={itineraryData} />
*/

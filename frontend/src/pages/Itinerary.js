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
import WeatherComponent from "../components/Weather/WeatherComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import ExpenseContainer from "../components/Containers/ExpenseContainer";
import BackupActivityForm from "../components/Forms/BackupActivityForm";
import ItineraryCalendar from "../components/Calendar/ItineraryCalendar";
import TestWeather from "../components/Weather/TestWeatherAPI";

const Itinerary = () => {
  const { id } = useParams();
  const [itineraryData, setItineraryData] = useState(null);
  const [activitiesData, setActivitiesData] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showAccommodationForm, setShowAccommodationForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBackupActivityForm, setShowBackupActivityForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true

  const [isActive, setIsActive] = useState({ id: "schedule" }); // To handle different tabs

  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

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

  const closeActivityForm = () => {
    setShowActivityForm(false);
  };

  const closeAccommodationForm = () => {
    setShowAccommodationForm(false);
  };

  const closeExpenseForm = () => {
    setShowExpenseForm(false);
  };

  const closeBackupActivityForm = () => {
    setShowBackupActivityForm(false);
  };

  const hideShowDiv = (e) => {
    setIsActive({
      id: e.target.id,
    });
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

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <Container fluid>
      <Row>
        {isLoading ? (
          <Col>
            <p>Loading itinerary data...</p>
          </Col>
        ) : (
          <>
            <Col
              style={{
                height: "100vh",
                overflow: "auto",
                WebkitOverflowScrolling: "touch", // Optional: For smooth scrolling on iOS
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, and Opera
                },
              }}
            >
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

              <ItineraryCalendar onSelectDay={handleDaySelect} />

              {/* <p>Start Date: {itineraryData.startDate}</p>
                <p>End Date: {itineraryData.endDate}</p> */}
              {/* <div>{calculateRemainingBudget()}</div>

              <div>
                <Link to={`/Expenses/${itineraryData.id}`}>
                  Click here to see your additional expenses
                </Link>
              </div>
              <hr /> */}
              <TestWeather itineraryData={itineraryData} />

              <hr />
              <ButtonGroup vertical style={{ margin: "0 20px 0 18%" }}>
                <DropdownButton
                  as={ButtonGroup}
                  title="New"
                  id="bg-vertical-dropdown-1"
                  variant="success"
                >
                  <Dropdown.Item eventKey="1">
                    {" "}
                    <Button
                      onClick={() => setShowActivityForm(true)}
                      className="me-2"
                      variant="success"
                    >
                      Activity
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    <Button
                      onClick={() => setShowAccommodationForm(true)}
                      className="me-2"
                      variant="success"
                    >
                      Accommodation
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    <Button
                      onClick={() => setShowExpenseForm(true)}
                      className="me-2"
                      variant="success"
                    >
                      Expense
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="4">
                    <Button
                      onClick={() => setShowBackupActivityForm(true)}
                      className="me-2"
                      variant="success"
                    >
                      Backup
                    </Button>
                  </Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>

              <Button
                variant="outline-success"
                style={{ margin: "0 25px 0 25px" }}
                id="schedule"
                onClick={(e) => {
                  hideShowDiv(e);
                }}
              >
                Schedule
              </Button>
              <Button
                variant="outline-success"
                style={{ margin: "0 25px 0 25px" }}
                id="accomodation"
                onClick={(e) => {
                  hideShowDiv(e);
                }}
              >
                Accomodation
              </Button>
              <Button
                variant="outline-success"
                style={{ margin: "0 25px 0 25px" }}
                id="expense"
                onClick={(e) => {
                  hideShowDiv(e);
                }}
              >
                Expense
              </Button>
              {/* <Link to={`/Expenses/${itineraryData.id}`}>
                <Button
                  variant="outline-success"
                  style={{ margin: "0 20px 0 20%" }}
                >
                  More Expenses
                </Button>
              </Link> */}

              {/* Use Modal to open popup */}

              <Modal
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

              <Modal
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

              <Modal
                show={showExpenseForm}
                onHide={() => setShowExpenseForm(false)}
                aria-labelledby="expense-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="expense-modal">New Expenses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ExpenseForm
                    itineraryData={itineraryData}
                    onClose={closeExpenseForm}
                  />
                </Modal.Body>
              </Modal>

              <Modal
                show={showBackupActivityForm}
                onHide={() => setShowBackupActivityForm(false)}
                aria-labelledby="backup-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="backup-modal">
                    New Backup Activity
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <BackupActivityForm
                    itineraryData={itineraryData}
                    onClose={closeBackupActivityForm}
                  />
                </Modal.Body>
              </Modal>
              <hr />
              <div
                className={
                  isActive.id === "schedule" ? `schedule` : "schedule d-none"
                }
              >
                {/* d-none is a Bootstrap class that hides an element by setting display: none; */}
                <ActivityContainer itineraryData={itineraryData} />
              </div>
              <div
                className={
                  isActive.id === "accomodation"
                    ? `accomodation`
                    : "accomodation d-none"
                }
              >
                <AccommodationContainer itineraryData={itineraryData} />
              </div>

              <div
                className={
                  isActive.id === "expense" ? `expense` : "expense d-none"
                }
              >
                <ExpenseContainer itineraryData={itineraryData} />
              </div>
              {/* <WeatherComponent itineraryData={itineraryData} /> */}
            </Col>

            <Col>
              <DemoMap
                itineraryData={itineraryData}
                activitiesData={activitiesData}
                selectedDay={selectedDay}
              />
            </Col>
          </>
        )}
      </Row>
    </Container>
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

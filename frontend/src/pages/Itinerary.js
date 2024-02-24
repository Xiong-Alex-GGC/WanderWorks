import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DemoMap from '../components/Mapbox/DemoMap';
import ActivityForm from '../components/Forms/ActivityForm';
import ActivityContainer from '../components/Containers/ActivityContainer';
import TransportationForm from '../components/Forms/TransportationForm';
import TransportationContainer from '../components/Containers/TransportationContainer';
import AccommodationForm from '../components/Forms/AccommodationsForm';
import AccommodationContainer from '../components/Containers/AccommodationContainer';

import { Container, Row, Col } from 'react-bootstrap';

const Itinerary = () => {
  const { id } = useParams();
  const [itineraryData, setItineraryData] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showTransportationForm, setShowTransportationForm] = useState(false);
  const [showAccommodationForm, setShowAccommodationForm] = useState(false);

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/itinerary/${id}`);
        setItineraryData(response.data);
      } catch (error) {
        console.error('Error fetching itinerary data:', error);
      }
    };

    fetchItineraryData();
  }, [id]);

  const openActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeActivityForm = () => {
    setShowActivityForm(false);
  };

  const openTransportationForm = () => {
    setShowTransportationForm(true);
  };

  const closeTransportationForm = () => {
    setShowTransportationForm(false);
  };

  const openAccommodationForm = () => {
    setShowAccommodationForm(true);
  };

  const closeAccommodationForm = () => {
    setShowAccommodationForm(false);
  };

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
                <Row style={{ height: '150px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc', backgroundImage: `url(${itineraryData.imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </Row>
                <div style={{
                  margin: '-50px 40px 30px 40px',
                  backgroundColor: '#f4f4f4',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
                }}>
                  <h6>{itineraryData.tripName}</h6>
                </div>

                {/* <p>Start Date: {itineraryData.startDate}</p>
                <p>End Date: {itineraryData.endDate}</p> */}


                <hr />

                <h3>Activities</h3>
                <button onClick={openActivityForm}>New Activity</button>
                <hr />
                {showActivityForm && (
                  <ActivityForm itineraryData={itineraryData} onClose={closeActivityForm} />
                )}

                <ActivityContainer itineraryData={itineraryData} />

                <hr />

                <h3>Transportation</h3>
                <button onClick={openTransportationForm}>New Transportation</button>
                <hr />
                {showTransportationForm && (
                    <TransportationForm itineraryData={itineraryData} onClose={closeTransportationForm} />
                )}
                <hr />
                
                <TransportationContainer itineraryData={itineraryData} />

                <hr />

                <h3>Accommodation</h3>
                <button onClick={openAccommodationForm}>New Accommodation</button>
                <hr />
                {showAccommodationForm && (
                    <AccommodationForm itineraryData={itineraryData} onClose={closeAccommodationForm} />
                )}
                <hr />
                
                <AccommodationContainer itineraryData={itineraryData} />

              </Col>
            </Row>
          </Col>

          <Col>
            <DemoMap />
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

export default Itinerary;
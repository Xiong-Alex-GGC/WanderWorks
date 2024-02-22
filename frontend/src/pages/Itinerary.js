import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DemoMap from '../components/Mapbox/DemoMap';
import ActivityForm from '../components/Forms/ActivityForm';
import ActivityContainer from '../components/Containers/ActivityContainer';
import TransportationForm from '../components/Forms/TransportationForm';
import TransportationContainer from '../components/Containers/TransportationContainer';

import { Container, Row, Col } from 'react-bootstrap';

const Itinerary = () => {
  const { id } = useParams();
  const [itineraryData, setItineraryData] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showTransportationForm, setShowTransportationForm] = useState(false);

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

  return (
    <Row>
      {itineraryData ? (
        <>
          <Col>
            <Row style={{height: '100vh'}}>
              <Col xs={3} style={{ backgroundColor: '#f1f1f1', borderRight: '1px solid #ccc' }}>
                Sidebar
              </Col>
              <Col>
                <Row style={{height: '150px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc'}}>
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
                  <h6>{itineraryData.tripName}</h6>
                </div>

            
            <h3>Transportation</h3>
            <button onClick={openTransportationForm}>New Transportation</button>
            <hr />
            {showTransportationForm && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeTransportationForm}>&times;</span>
                  <TransportationForm itineraryData={itineraryData} onClose={closeTransportationForm} />
                </div>
              </div>
            )}
            <hr />
            
            <TransportationContainer itineraryData={itineraryData} />
            
          </>
        ) : (
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

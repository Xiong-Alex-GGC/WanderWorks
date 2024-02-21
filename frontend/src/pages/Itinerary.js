import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DemoMap from '../components/Mapbox/DemoMap';
import ActivityForm from '../components/Forms/ActivityForm';
import ActivityContainer from '../components/Containers/ActivityContainer';
import TransportationForm from '../components/Forms/TransportationForm';
import TransportationContainer from '../components/Containers/TransportationContainer';

const containerStyle = {
  display: 'flex',
};

const leftContainerStyle = {
  flex: 1,
};

const rightContainerStyle = {
  flex: 1,
};

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
    <div style={containerStyle}>
      <div style={leftContainerStyle}>
        {itineraryData ? (
          <>
            <h1>Trip Name: {itineraryData.tripName}</h1>
            <p>Start Date: {itineraryData.startDate}</p>
            <p>End Date: {itineraryData.endDate}</p>
            <hr />
            <h3>Activities</h3>
            <button onClick={openActivityForm}>New Activity</button>
            <hr />
            {showActivityForm && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeActivityForm}>&times;</span>
                  <ActivityForm itineraryData={itineraryData} onClose={closeActivityForm} />
                </div>
              </div>
            )}
            <hr />

            <ActivityContainer itineraryData={itineraryData} />

            
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
          <p>Loading itinerary data...</p>
        )}
      </div>
      <div style={rightContainerStyle}>
        {itineraryData && <DemoMap />}
      </div>
    </div>
  );
};

export default Itinerary;


//Notes
//Buttons for adding travel/transportation plans and hotel reservations are needed

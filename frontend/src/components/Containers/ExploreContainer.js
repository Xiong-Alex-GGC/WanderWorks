import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExploreCard from '../Cards/ExploreCard';
import { useAuth } from '../../context/authContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import theme from '../../styles/theme';

const ExploreContainer = () => {
  const [itineraries, setItineraries] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/itineraries/${currentUser.uid}`);
        const sortedItineraries = response.data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setItineraries(sortedItineraries);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1450 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1450, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div style={{ backgroundColor: theme.colors.background, paddingTop: 20, paddingLeft: 30 }}>
        <Carousel 
        responsive={responsive}
        >
          {itineraries.map((itinerary) => (
            <ExploreCard key={itinerary.id} {...itinerary} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ExploreContainer;

// Home.js

import React from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import HomeCarousel from '../components/Layout/Home-Carousel';
import theme from '../styles/theme';
import { Subtitle } from '../styles/Home-Styles';
const Home = () => {

  return (
    <div className="home-container">
      <Row>
        <HomeCarousel />
      </Row>
      <Container style={{ backgroundColor: theme.colors.background, paddingTop: 40, paddingBottom: 40, paddingLeft: 50, paddingRight: 50}} fluid>
      <Row>
        <h1 style={{ fontFamily: "Garamond, serif", fontWeight: "light", paddingLeft: 50 }}>Begin planning your next adventure with WanderWorks</h1>
      </Row>
      <Row className='mt-5'>
        <Col className='px-5'>
        <Subtitle>Map Integration</Subtitle>
        <p> Navigate your way to excitement with our state-of-the-art Map Integration.
           Zoom in on your next destination, find hidden gems, and plan your route with just a few clicks.
           Our interactive map not only guides you through the geography but also brings local weather, events, and traffic updates right at your fingertips.</p>
        </Col>
        <Col className='px-5'>
        <Subtitle>Travel With Friends</Subtitle>
        <p> Planning a group trip has never been easier. Invite your friends to join your travel plan directly on our platform.
           Vote on destinations, discuss accommodations, and build your itinerary together in real-time.
           With WanderWorks, every voice is heard, making travel planning a truly collaborative experience.</p></Col>
      </Row>
      <Row className='mt-5'>
        <Col className='px-5'>
        <Subtitle>Find Accomodations</Subtitle>
        <p> From luxury hotels to cozy homestays, find the perfect place to rest your head.
           Our comprehensive search filters let you tailor your search to fit your budget, preferences, and travel style.
            Read reviews, compare prices, and book your stay, all within WanderWorks. It's accommodation hunting made simple.</p>
        </Col>
        <Col className='px-5'>
        <Subtitle>Budget Like A Pro</Subtitle>
        <p>Keep your finances on track with our intuitive budgeting tools. Set a budget for your trip, track expenses, and manage your money with ease.
           WanderWorks helps you allocate your resources wisely, so you can spend less time worrying about costs and more time enjoying your journey. </p></Col>
      </Row>
    </Container>
    
    <Container style={{ paddingTop: 40, paddingBottom: 40, paddingLeft: 70, paddingRight: 50}} fluid>
      <Row>
      <Col className="px-5">
        <Image src="https://picsum.photos/id/342/700/400" thumbnail/>
      </Col>
      <Col className="p-5">
      <Subtitle>Visualize Your Trip</Subtitle>
      <p>Bring your travel plans to life with our Visualize Your Trip feature.
         Create a dynamic visual itinerary that outlines each step of your adventure. 
         From flights to accommodations to activities, see your trip unfold before your eyes, helping you to anticipate and plan for the journey ahead. </p>
      </Col>
      </Row>
    </Container>

    <Container style={{ backgroundColor: theme.colors.background, paddingBottom: 40, paddingLeft: 70, paddingRight: 50}} fluid>
      <Row className='pt-5'>
      <Col className="p-5">
      <Subtitle>Budget</Subtitle>
      <p>Embark on an adventure without worrying about overspending. With WanderWorks, crafting and sticking to your travel budget has never been easier or more intuitive. 
        Let's break down how our budget feature transforms your financial planning into a seamless part of the journey, ensuring you focus on the joy of discovery rather than the stress of expenses. </p>
      </Col>
      <Col className="px-5">
      <Image src="https://picsum.photos/id/309/700/400" thumbnail/>
      </Col>
      </Row>
    </Container>

    <Container style={{ paddingBottom: 40, paddingLeft: 70, paddingRight: 50}} fluid>
      <Row className='pt-5'>
      <Col className="px-5">
        <Image src="https://picsum.photos/id/57/700/400" thumbnail/>
      </Col>
      <Col className="p-5">
      <Subtitle>Explore</Subtitle>
      <p> Ready to step off the beaten path? Our Explore feature is your gateway to the extraordinary.
         Get personalized recommendations based on your interests, past travels, and what's trending among the WanderWorks community.
         Discover new cultures, cuisines, and experiences that await in every corner of the globe.</p>
      </Col>
      </Row>
    </Container>

    </div>
  );
};

export default Home;
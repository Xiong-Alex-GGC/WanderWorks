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
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
        </Col>
        <Col className='px-5'>
        <Subtitle>Travel With Friends</Subtitle>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p></Col>
      </Row>
      <Row className='mt-5'>
        <Col className='px-5'>
        <Subtitle>Find Accomodations</Subtitle>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
        </Col>
        <Col className='px-5'>
        <Subtitle>Budget Like A Pro</Subtitle>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p></Col>
      </Row>
    </Container>
    
    <Container style={{ paddingTop: 40, paddingBottom: 40, paddingLeft: 70, paddingRight: 50}} fluid>
      <Row>
      <Col className="px-5">
        <Image src="https://picsum.photos/id/342/700/400" thumbnail/>
      </Col>
      <Col className="p-5">
      <Subtitle>Visualize Your Trip</Subtitle>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
      </Col>
      </Row>
    </Container>

    <Container style={{ backgroundColor: theme.colors.background, paddingBottom: 40, paddingLeft: 70, paddingRight: 50}} fluid>
      <Row className='pt-5'>
      <Col className="p-5">
      <Subtitle>Budget</Subtitle>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
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
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
      </Col>
      </Row>
    </Container>

    </div>
  );
};

export default Home;

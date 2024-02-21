import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Image, Button, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function HomeCarousel() {
  return (
    <Carousel fade className="fullscreen-carousel">
      <Carousel.Item style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Image src="https://picsum.photos/id/17/2000/500" fluid rounded alt="First slide" style={{ height: '100%', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Nav.Link as={Link} to="Signup">
            <Button variant="success">Plan Today</Button>
          </Nav.Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Image src="https://picsum.photos/id/13/2000/500" fluid rounded alt="Second slide" style={{ height: '100%', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Nav.Link as={Link} to="Signup">
            <Button variant="light">Plan Today</Button>
          </Nav.Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Image src="https://picsum.photos/id/29/2000/500" fluid rounded alt="Third slide" style={{ height: '100%', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Nav.Link as={Link} to="Signup">
            <Button variant="secondary">Plan Today</Button>
          </Nav.Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;

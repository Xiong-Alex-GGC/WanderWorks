import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { HCarouseImage, HCarouselItem, HCaptionWrapper } from '../../styles/Home-Styles';
import photo1 from '../../images/HomeBackground1.jpg';
import photo2 from '../../images/HomeBackground2.jpg';
import photo3 from '../../images/HomeBackground3.jpg';

function HomeCarousel() {
  return (
    <Carousel fade className="fullscreen-carousel">
      <HCarouselItem>
        <HCarouseImage src={photo1} fluid rounded alt="First slide" />
        <HCaptionWrapper>
          <h1>First slide label</h1>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Nav.Link as={Link} to="Signup">
            <Button variant="primary">Plan Today</Button>
          </Nav.Link>
        </HCaptionWrapper>
      </HCarouselItem>
      <HCarouselItem>
        <HCarouseImage src={photo2} fluid rounded alt="Second slide" />
        <HCaptionWrapper>
          <h1>Second slide label</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Nav.Link as={Link} to="Signup">
            <Button variant="light">Plan Today</Button>
          </Nav.Link>
        </HCaptionWrapper>
      </HCarouselItem>
      <HCarouselItem>
        <HCarouseImage src={photo3} fluid rounded alt="Third slide" />
        <HCaptionWrapper>
          <h1>Third slide label</h1>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Nav.Link as={Link} to="Signup">
            <Button variant="secondary">Plan Today</Button>
          </Nav.Link>
        </HCaptionWrapper>
      </HCarouselItem>
    </Carousel>
  );
}

export default HomeCarousel;
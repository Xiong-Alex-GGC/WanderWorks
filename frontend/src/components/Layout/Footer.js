import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AppFooter = () => {
  return (
    <footer className="bg-light text-center">
      <Container>
        <Row className='pt-1'>
          <Col>
            <p> &copy; WanderWork {new Date().getFullYear()}. Plan With Us!</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;

// Home.js

import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
 
const Home = () => {
  const { Title, Paragraph } = Typography;


  return (
    <div className="home-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title>Welcome to Wander Works</Title>
            <Paragraph>
              Plan your perfect trip with ease. Create and organize your itineraries,
              explore new destinations, and make your travel experiences memorable.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Title level={2}>Key Features</Title>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Title level={2}>How It Works</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam eget venenatis turpis. Praesent tincidunt quam vel lorem sagittis,
              in egestas dui aliquet.
            </Paragraph>
            <Paragraph>
              Duis non ex id purus gravida malesuada. Proin quis metus vel nunc euismod
              congue non vel tortor.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

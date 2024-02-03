import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Row>
        <Col span={24}>
          <p>WonderWorks &copy; {new Date().getFullYear()}</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
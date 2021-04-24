import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const date = new Date();

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <strong>
              Designed and developed by{' '}
              <a
                href='mailto:akhtars10@uni.coventry.ac.uk'
                className='mail-link'
              >
                Sayyed Abrar Akhtar
              </a>
            </strong>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-2'>
            Copyright &copy; Online Clothing {date.getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

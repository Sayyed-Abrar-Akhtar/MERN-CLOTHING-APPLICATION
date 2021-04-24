import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ login, shipping, payment, order }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {login ? (
          <LinkContainer to='/login'>
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign in</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {shipping ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {payment ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {order ? (
          <LinkContainer to='/order'>
            <Nav.Link>Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;

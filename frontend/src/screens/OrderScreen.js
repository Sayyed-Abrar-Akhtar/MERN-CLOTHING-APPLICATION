import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import Loader from '../components/Loader';

const OrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // CALCULATE PRICES
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 25000 ? cart.itemsPrice * 0.02 : 0;

  console.log(cart.shippingPrice);

  cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const currencyDetails = useSelector((state) => state.currencyDetails);
  const { error: currencyDetailsError } = currencyDetails;

  const currencyPrice = useSelector((state) => state.currencyPrice);
  const {
    loading: loadingCurrencyPrice,
    error: errorCurrencyPrice,
    countrycode,
  } = currencyPrice;

  useEffect(() => {
    if (success) {
      history.push(`/ordersummary/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const orderHandler = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps login shipping payment order />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}.
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>&nbsp;
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {loadingCurrencyPrice ? (
                            <Loader />
                          ) : errorCurrencyPrice || currencyDetailsError ? (
                            `${item.qty} * Rs ${item.price} = Rs${' '}
                          ${item.qty * item.price}`
                          ) : (
                            `${item.qty} * ${countrycode.split('-')[0]} ${(
                              Number(countrycode.split('-')[1]) * item.price
                            ).toFixed(2)} = ${
                              countrycode.split('-')[0]
                            } ${' '} ${(
                              Number(countrycode.split('-')[1]) *
                              item.price *
                              item.qty
                            ).toFixed(2)}`
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    {loadingCurrencyPrice ? (
                      <Loader />
                    ) : errorCurrencyPrice || currencyDetailsError ? (
                      `Rs ${cart.itemsPrice}`
                    ) : (
                      `${countrycode.split('-')[0]} ${(
                        Number(countrycode.split('-')[1]) * cart.itemsPrice
                      ).toFixed(2)}`
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {cart.shippingPrice > 0 ? (
                    <Col>
                      {' '}
                      {loadingCurrencyPrice ? (
                        <Loader />
                      ) : errorCurrencyPrice || currencyDetailsError ? (
                        `Rs ${cart.shippingPrice}`
                      ) : (
                        `${countrycode.split('-')[0]} ${(
                          Number(countrycode.split('-')[1]) * cart.shippingPrice
                        ).toFixed(2)}`
                      )}
                    </Col>
                  ) : (
                    <Col>Free shipping</Col>
                  )}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    {loadingCurrencyPrice ? (
                      <Loader />
                    ) : errorCurrencyPrice || currencyDetailsError ? (
                      `Rs ${cart.taxPrice}`
                    ) : (
                      `${countrycode.split('-')[0]} ${(
                        Number(countrycode.split('-')[1]) * cart.taxPrice
                      ).toFixed(2)}`
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    {loadingCurrencyPrice ? (
                      <Loader />
                    ) : errorCurrencyPrice || currencyDetailsError ? (
                      `Rs ${cart.totalPrice}`
                    ) : (
                      `${countrycode.split('-')[0]} ${(
                        Number(countrycode.split('-')[1]) * cart.totalPrice
                      ).toFixed(2)}`
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={orderHandler}
                >
                  Complete Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;

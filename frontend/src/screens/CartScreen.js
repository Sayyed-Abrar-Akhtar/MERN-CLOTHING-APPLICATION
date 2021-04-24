import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';

import { addToCart, removeFromCart } from '../actions/cartActions';
import Loader from '../components/Loader';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const currencyDetails = useSelector((state) => state.currencyDetails);
  const { error: currencyDetailsError } = currencyDetails;

  const currencyPrice = useSelector((state) => state.currencyPrice);
  const {
    loading: loadingCurrencyPrice,
    error: errorCurrencyPrice,
    countrycode,
  } = currencyPrice;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removerFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Your shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your shopping cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    {loadingCurrencyPrice ? (
                      <Loader />
                    ) : errorCurrencyPrice || currencyDetailsError ? (
                      ` Rs ${item.price}`
                    ) : (
                      `${countrycode.split('-')[0]} ${(
                        Number(countrycode.split('-')[1]) * item.price
                      ).toFixed(2)}`
                    )}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removerFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash icon-delete'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, curItem) => acc + curItem.qty, 0)})
                items
              </h2>
              {loadingCurrencyPrice ? (
                <Loader />
              ) : errorCurrencyPrice || currencyDetailsError ? (
                `Rs ${cartItems
                  .reduce(
                    (acc, curItem) => acc + curItem.qty * curItem.price,
                    0
                  )
                  .toFixed(2)}`
              ) : (
                `${countrycode.split('-')[0]} ${(
                  Number(countrycode.split('-')[1]) *
                  cartItems
                    .reduce(
                      (acc, curItem) => acc + curItem.qty * curItem.price,
                      0
                    )
                    .toFixed(2)
                ).toFixed(2)}`
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;

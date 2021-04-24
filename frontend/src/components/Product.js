import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import Loader from './Loader';

const Product = ({ product }) => {
  const currencyDetails = useSelector((state) => state.currencyDetails);
  const { error: currencyDetailsError } = currencyDetails;

  const currencyPrice = useSelector((state) => state.currencyPrice);
  const {
    loading: loadingCurrencyPrice,
    error: errorCurrencyPrice,
    countrycode,
  } = currencyPrice;

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>
          {loadingCurrencyPrice ? (
            <Loader />
          ) : errorCurrencyPrice || currencyDetailsError ? (
            `Rs ${product.price}`
          ) : (
            `${countrycode.split('-')[0]} ${(
              Number(countrycode.split('-')[1]) * product.price
            ).toFixed(2)}`
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

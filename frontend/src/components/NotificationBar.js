import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Loader from './Loader';

const NotificationBar = () => {
  const currencyDetails = useSelector((state) => state.currencyDetails);
  const { error: currencyDetailsError } = currencyDetails;

  const currencyPrice = useSelector((state) => state.currencyPrice);
  const {
    loading: loadingCurrencyPrice,
    error: errorCurrencyPrice,
    countrycode,
  } = currencyPrice;

  return (
    <>
      <Alert variant='light' className='text-center notification-bar'>
        <h5>
          <strong>
            Free shipping on orders over{' '}
            {loadingCurrencyPrice ? (
              <Loader />
            ) : errorCurrencyPrice || currencyDetailsError ? (
              `Rs 25000`
            ) : (
              `${countrycode.split('-')[0]} ${(
                Number(countrycode.split('-')[1]) * 25000
              ).toFixed(2)}`
            )}{' '}
            &#128526;
          </strong>
        </h5>
      </Alert>
    </>
  );
};

export default NotificationBar;

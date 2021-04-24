import axios from 'axios';
import {
  CURRENCY_DETAILS_REQUEST,
  CURRENCY_DETAILS_SUCCESS,
  CURRENCY_DETAILS_FAIL,
  CURRENCY_VALUE_REQUEST,
  CURRENCY_VALUE_SUCCESS,
  CURRENCY_VALUE_FAIL,
} from '../constants/currencyConstants';

export const getCurrencyDetails = (countryCode) => async (dispatch) => {
  try {
    dispatch({
      type: CURRENCY_DETAILS_REQUEST,
    });

    const {
      data: { currency },
    } = await axios.get(`/api/currency/`);

    dispatch({
      type: CURRENCY_DETAILS_SUCCESS,
      payload: currency,
    });
    dispatch({
      type: CURRENCY_VALUE_SUCCESS,
      payload: countryCode,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const exchangeCurrencyPrice = (countryCode) => async (dispatch) => {
  try {
    dispatch({
      type: CURRENCY_VALUE_REQUEST,
    });

    dispatch({
      type: CURRENCY_VALUE_SUCCESS,
      payload: countryCode,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_VALUE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

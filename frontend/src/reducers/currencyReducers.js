import {
  CURRENCY_DETAILS_REQUEST,
  CURRENCY_DETAILS_SUCCESS,
  CURRENCY_DETAILS_FAIL,
  CURRENCY_VALUE_REQUEST,
  CURRENCY_VALUE_SUCCESS,
  CURRENCY_VALUE_FAIL,
} from '../constants/currencyConstants';

export const currencyDetailsReducer = (state = { currency: [] }, action) => {
  switch (action.type) {
    case CURRENCY_DETAILS_REQUEST:
      return { loading: true };
    case CURRENCY_DETAILS_SUCCESS:
      return { loading: false, currency: action.payload };
    case CURRENCY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const currencyPriceReducer = (state = { countrycode: '' }, action) => {
  switch (action.type) {
    case CURRENCY_VALUE_REQUEST:
      return { loading: true };
    case CURRENCY_VALUE_SUCCESS:
      return { loading: false, countrycode: action.payload };
    case CURRENCY_VALUE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

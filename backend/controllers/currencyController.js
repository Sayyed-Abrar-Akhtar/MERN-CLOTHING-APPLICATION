import asyncHandler from 'express-async-handler';
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import apiKey from '../utils/getApiKey.js';

/*--------------------------------------------------------------------------------------*/
// @desc    GET currency exchange rates
// @route   GET https://api.fastforex.io/fetch-all?api_key=
// @access  Public
const exchangeCurrency = asyncHandler(
  asyncHandler(async (req, res) => {
    const key = apiKey();

    const currencyDetailsArr = [];
    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${key}d/latest/NPR`
    );

    const { base_code, conversion_rates } = data;

    Object.entries(conversion_rates).map((currency) => {
      currencyDetailsArr.push({
        base_code,
        symbol: getSymbolFromCurrency(currency[0]),
        name: currency[0],
        rate: currency[1],
      });
    });
    currencyDetailsArr.map((currency) => {
      if (currency.name === 'NPR') {
        console.log(currency.rate);
      }
    });

    res.json({
      success: true,
      currency: currencyDetailsArr,
    });
  })
);

export { exchangeCurrency };

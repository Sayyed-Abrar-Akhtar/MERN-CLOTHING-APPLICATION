import express from 'express';

import { exchangeCurrency } from '../controllers/currencyController.js';

const router = express.Router();

// CHAINED ROUTE
router.route('/').get(exchangeCurrency);

export default router;

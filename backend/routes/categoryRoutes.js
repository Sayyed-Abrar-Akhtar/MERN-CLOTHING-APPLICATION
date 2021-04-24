import express from 'express';

import {
  getCategory,
  getCategoryName,
  getCategoryIdByName,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// CHAINED ROUTE
router.route('/').get(getCategory).post(protect, admin, createCategory);
router
  .route('/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

router.route('/name').get(getCategoryName);
router.route('/name/:name').get(getCategoryIdByName);

export default router;

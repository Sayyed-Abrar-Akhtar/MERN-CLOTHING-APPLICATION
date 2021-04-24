import express from 'express';

import {
  createProduct,
  getProducts,
  getPaginatedProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Chained route handler
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/paginated').get(getPaginatedProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/category/:id').get(getProductsByCategory);

export default router;

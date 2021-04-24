import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const sampleProduct = new Product({
      name: 'Example: Cotton white tshirt',
      price: 0,
      user: req.user._id,
      image: 'http://192.168.1.69:90/uploads/image-upload.png',
      brand: 'Example: JackJona',
      category: '606ec55e31c7433040170032',
      description: 'Example: Comfortable to wear. Regular fit. 100% cotton',
      numReviews: 0,
      countInStock: 0,
    });

    const productAdded = await sampleProduct.save();
    res.status(201).json({
      success: true,
      product: productAdded,
    });
  } catch (error) {
    console.error(error);
  }
});

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const products = await Product.find({ ...keyword }).sort({ _id: -1 });
    res.status(200).send({ success: true, product: products });
  } catch (error) {
    console.error(error);
  }
});

// @desc    Fetch all product of a category
// @route   Get /api/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id }).sort({
      _id: -1,
    });
    if (products) {
      res.status(200).send({ success: true, product: products });
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    Fetch single products
// @route   Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).send({
        success: true,
        product: product,
      });
    } else {
      res.status(404);
      throw new Error('Product not found!');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    Update a products
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      const updatedProduct = await product.save();
      res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (e) {
    console.error(e);
  }
});

// @desc    CREATE new review
// @route   PUT /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ success: true, message: 'Review Added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne({});
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      res.status(404);
      throw new Error('Product not found!');
    }
  } catch (error) {
    console.error(error);
  }
});

export {
  createProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
};

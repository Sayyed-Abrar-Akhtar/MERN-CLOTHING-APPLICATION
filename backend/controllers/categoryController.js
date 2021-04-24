import asyncHandler from 'express-async-handler';

import Category from '../models/categoryModel.js';

// @desc    Create new category
// @route   Get /api/category
// @access  Private/Admin
const createCategory = asyncHandler(
  asyncHandler(async (req, res) => {
    const { name, image } = req.body;

    const categoryCreated = await Category.create({
      name,
      image,
    });

    if (categoryCreated) {
      res.status(201).json({
        success: true,
        category: categoryCreated,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);

// @desc    Fetch all category
// @route   Get /api/category
// @access  Public
const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ _id: -1 });
  if (categories) {
    res.status(200).json({ success: true, category: categories });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Fetch all category name and id
// @route   Get /api/category/name
// @access  Public
const getCategoryName = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  const categoryName = categories.map((c) => c.name);

  if (categories) {
    res.status(200).json({ success: true, category: categoryName });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Fetch category id by id
// @route   Get /api/category/name/:name
// @access  Public
const getCategoryIdByName = asyncHandler(async (req, res) => {
  const category = await Category.find({ name: req.params.name });
  const categoryId = category[0]._id;

  if (categoryId) {
    res.status(200).json({ category: categoryId });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Update a category
// @route   PUT /api/category/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = name;
      category.image = image;
      const updatedCategory = await category.save();
      res.status(200).json({
        success: true,
        category: updatedCategory,
      });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    Delete a category
// @route   DELETE /api/category/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne({});
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Category not found!');
  }
});

export {
  getCategory,
  getCategoryName,
  getCategoryIdByName,
  createCategory,
  updateCategory,
  deleteCategory,
};

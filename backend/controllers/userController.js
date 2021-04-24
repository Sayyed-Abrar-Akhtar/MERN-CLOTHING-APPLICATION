import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

/*--------------------------------------------------------------------------------------*/
// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        userProfile: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          contact: user.contact,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password!');
    }

    res.status(200).send({ success: true, email, password });
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contact,
      username,
      email,
      password,
    } = req.body;

    const image = req.body.image || 'uploads/no-image.png';

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(401);
      throw new Error('User already exists');
    }

    const user = await User.create({
      firstName,
      lastName,
      image,
      contact,
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        userProfile: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          contact: user.contact,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        success: true,
        userProfile: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          contact: user.contact,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(401);
      throw new Error('User not found ):');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.contact = req.body.contact || user.contact;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.image = req.body.image ? req.body.image : user.image;
      user.password = req.body.password ? req.body.password : user.password;

      const updatedUser = await user.save();
      res.status(200).json({
        success: true,
        userProfile: {
          _id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          image: updatedUser.image,
          contact: updatedUser.contact,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found ):');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    if (users) {
      res.status(200).json({
        success: true,
        users: users,
      });
    } else {
      res.status(401);
      throw new Error('Users not found ):');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.status(200).json({
        success: true,
        userProfile: user,
      });
    } else {
      res.status(401);
      throw new Error('Users not found ):');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.image = req.body.image || user.image;
      user.contact = req.body.contact || user.contact;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();
      res.status(200).json({
        success: true,
        userProfile: {
          _id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          image: updatedUser.image,
          contact: updatedUser.contact,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found ):');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne({});
      res.status(200).json({
        success: true,
        message: `${user.firstName} deleted successfully`,
      });
    } else {
      res.status(404);
      throw new Error('User not found ):');
    }
  } catch (error) {
    console.error(error);
  }
});

/*--------------------------------------------------------------------------------------*/
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

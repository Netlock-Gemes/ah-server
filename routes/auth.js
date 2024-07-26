const express = require('express');
const router = express.Router();
const { register, login, getUser, getAllUsersData, updateUserRole } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user or admin
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login a user or admin
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/user
// @desc    Get the logged-in user's data
// @access  Private
router.get('/user', auth, getUser);

// @route   GET /api/auth/users
// @desc    Get all users' data (Admin only)
// @access  Private
router.get('/users', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, getAllUsersData);

// @route   PUT /api/auth/users/:id/role
// @desc    Update a user's role (Admin only)
// @access  Private
router.put('/users/:id/role', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, updateUserRole);

module.exports = router;

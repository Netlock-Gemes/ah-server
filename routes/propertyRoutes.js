const express = require('express');
const router = express.Router();
const { createProperty, expressInterest, getInterestedProperties } = require('../controllers/propertyController');
const auth = require('../middleware/auth');

// Admin route to create a new property
router.post('/create', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, createProperty);

// User expresses interest in a property
router.post('/interest', auth, expressInterest);

// Get all properties the user is interested in
router.get('/interested', auth, getInterestedProperties);

module.exports = router;

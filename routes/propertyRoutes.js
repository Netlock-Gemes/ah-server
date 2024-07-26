const express = require('express');
const router = express.Router();
const { createProperty, expressInterest, getInterestedProperties, getAllProperties } = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Admin route to create a new property
router.post('/create', auth, upload.array('images', 3), (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, createProperty);

// User expresses interest in a property
router.post('/interest', auth, expressInterest);

// Get properties a user is interested in
router.get('/interested', auth, getInterestedProperties);

// Get all properties
router.get('/all', getAllProperties);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createProperty, getInterestedProperties, getAllProperties, getPropertyById, toggleInterest, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Admin route to create a new property
router.post('/create', auth, upload.array('images', 3), (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, createProperty);

// Admin route to update a property
router.put('/:id', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, updateProperty);

// User expresses interest in a property (now toggles interest)
router.post('/interest', auth, toggleInterest);

// Get properties a user is interested in
router.get('/interested', auth, getInterestedProperties);

// Get all properties
router.get('/all', getAllProperties);

// Get a property by ID
router.get('/:id', getPropertyById);

// Admin route to delete a property
router.delete('/:id', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}, deleteProperty);

module.exports = router;

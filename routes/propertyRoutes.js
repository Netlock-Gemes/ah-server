const express = require('express');
const { getProperties, addProperty } = require('../controllers/propertyController');
const router = express.Router();

router.get('/', getProperties);
router.post('/', addProperty);

module.exports = router;

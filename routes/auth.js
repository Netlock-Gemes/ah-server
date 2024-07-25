const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, getUser, submitScore, getAllUsersData } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/getUsersData', getAllUsersData);
router.get('/profile', auth, getUser);
router.post('/submit-score', auth, submitScore);

module.exports = router;
// filepath: d:\1. CODING_SPACE\JPMC-PREP\JPMC-HACKATHON-PREP-PROJECT-1\backend\routes\authRoutes.js
const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
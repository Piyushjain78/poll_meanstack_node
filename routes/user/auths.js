const express = require('express');
const AuthController = require('../../controllers/AuthController');

const router = express.Router();

// for user signup
router.post('/signup', AuthController.user_Signup);

// for user login
router.post('/login', AuthController.user_Login);

module.exports = router;
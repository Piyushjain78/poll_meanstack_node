const express = require('express');
const VoteController = require('../../controllers/VoteController');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();

// adding a vote
router.post('/add', checkAuth.jwt_verify, VoteController.add_Vote);

module.exports = router;
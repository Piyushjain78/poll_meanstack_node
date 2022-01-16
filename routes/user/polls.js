const express = require('express');
const POllController = require("../../controllers/PollController");
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();

// get all polls
router.get('/', POllController.get_Polls);

// create a poll
router.post('/create', checkAuth.jwt_verify, POllController.create_Poll);

// get Poll item by id
router.get('/getItem/:poll_id', POllController.get_Item);

// update poll
router.patch('/update/:poll_id', checkAuth.jwt_verify, checkAuth.user_authorization, POllController.update_Poll);

// delete poll
router.delete('/delete/:poll_id', checkAuth.jwt_verify, checkAuth.user_authorization, POllController.delete_Poll);

module.exports = router;
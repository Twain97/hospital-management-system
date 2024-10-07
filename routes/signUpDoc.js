const express = require('express');
const router = express.Router();
const signUpDocController = require('../controllers/signUpDocController');


// Route for fetching all contact submissions
router.get('/', signUpDocController.getCreatePage);

router.post('/', signUpDocController.signup_post)
module.exports = router
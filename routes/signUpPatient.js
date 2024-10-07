const express = require('express');
const router = express.Router();
const signUpPatientController = require('../controllers/signUpPatientController');


// Route for fetching all contact submissions
router.get('/', signUpPatientController.getCreatePage);

router.post('/', signUpPatientController.signup_post)

module.exports = router
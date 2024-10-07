const express = require('express');
const router = express.Router();
const loginPatientController = require('../controllers/loginPatientController');

// Route for fetching all contact submissions
router.get('/', loginPatientController.getCreatePage);

router.post('/', loginPatientController.login_post)

router.get('/', loginPatientController.login_get)

module.exports = router;

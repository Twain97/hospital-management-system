const express = require('express');
const router = express.Router();
const loginDoctorController = require('../controllers/loginDoctorController');

// Route for fetching all contact submissions
router.get('/', loginDoctorController.getCreatePage);

router.post('/', loginDoctorController.login_post)

router.get('/', loginDoctorController.login_get)

module.exports = router;

const express = require('express');
const router = express.Router();
const bookAppointmentController = require('../controllers/bookAppointmentController');


// Route for fetching page

router.get('/', bookAppointmentController.getIndexPage)
module.exports = router
const express = require('express');
const router = express.Router();
const doctorAppointment = require('../controllers/doctorAppointmentController');


// Route for fetching page

router.get('/', doctorAppointment.getIndexPage)
module.exports = router
const express = require('express');
const router = express.Router();
const userAppointment = require('../controllers/userAppointmentController');


// Route for fetching page

router.get('/', userAppointment.getIndexPage)
module.exports = router
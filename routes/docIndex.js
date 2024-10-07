const express = require('express');
const router = express.Router();
const docIndexController = require('../controllers/docIndexController');


// Route for fetching page

router.get('/', docIndexController.getIndexPage)
module.exports = router
const express = require('express');
const router = express.Router();

// Index route
router.get('/', (req, res) => {
  // Handle the index route logic here
  res.render('/views/index', {
    title:"HOME"
  })
});

// Export the router
module.exports = router;

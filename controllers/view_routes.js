// Create an express router instance object
const router = require('express').Router();
const path = require('path');

// Add one test GET route at root - localhost:3333/
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/landing.html'));
});

// Export the router
module.exports = router;
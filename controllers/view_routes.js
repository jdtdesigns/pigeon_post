// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');

// Add one test GET route at root - localhost:3333/
router.get('/', async (req, res) => {
  const user = await User.findByPk(req.session.user_id);

  if (user) {
    res.render('landing', {
      user: {
        id: user.id,
        email: user.email
      }
    });
  } else {
    res.render('landing');
  }


});

// GET route to show the register form
router.get('/register', (req, res) => {
  // Render the register form template
  res.render('register_form');
});

// GET route to show the login form
router.get('/login', (req, res) => {
  // Render the register form template
  res.render('login_form');
});

// Export the router
module.exports = router;
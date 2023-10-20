const router = require('express').Router();

// Import the User model
const User = require('../models/User.js');

// localhost:3333/auth/register
// Post request route that retrieves the form data(email, password) and creates a new user in the database, using our User model
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);

    req.session.user_id = user.id;

    res.redirect('/');
  } catch (error) {
    // Set our session errors array to an array of just Sequelize error message strings
    req.session.errors = error.errors.map(errObj => errObj.message);
    res.redirect('/register');
  }
});

// Log in a user
router.post('/login', async (req, res) => {
  // Find the user by the email address provided on the form
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  // If user is not found with the email address provided, we redirect them back to the login page
  if (!user) {
    req.session.errors = ['No user found with that email address.'];

    return res.redirect('/login');
  }

  const pass_is_valid = await user.validatePass(req.body.password);

  // If the form provided password does not match the db hashed pass, we redirect them back to login
  if (!pass_is_valid) {
    req.session.errors = ['Password is incorrect.'];

    return res.redirect('/login');
  }

  // Everything checks out so we log the user in by storing their user id to the session
  // This generates a store item and will also send a cookie to the client on our response
  req.session.user_id = user.id;

  res.redirect('/');
});

// Log out a user
router.get('/logout', (req, res) => {
  // Deletes the session stored data attached to the client side cookie
  req.session.destroy();

  res.redirect('/');
})

module.exports = router;


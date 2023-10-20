const router = require('express').Router();
const User = require('../models/User');
const Coo = require('../models/Coo');

const { isLoggedIn, isAuthenticated, authenticate } = require('./helpers');

// Show Landing
router.get('/', authenticate, async (req, res) => {
  const coos = await Coo.findAll({
    include: {
      model: User,
      as: 'author'
    }
  });

  res.render('landing', {
    user: req.user,
    coos: coos.map(c => c.get({ plain: true }))
  });
});

// Show the register form
router.get('/register', isLoggedIn, authenticate, (req, res) => {
  // Render the register form template
  res.render('register_form', {
    errors: req.session.errors,
    user: req.user,
    register: true
  });

  req.session.errors = [];
});

// GET route to show the login form
router.get('/login', isLoggedIn, authenticate, (req, res) => {
  // Render the register form template
  res.render('login_form', {
    errors: req.session.errors,
    user: req.user,
    login: true
  });

  req.session.errors = [];
});

// Show Coo Form
router.get('/coo', isAuthenticated, authenticate, (req, res) => {
  res.render('coo_form', {
    user: req.user,
    coo_form: true
  });

  req.session.errors = [];
});

// Show Edit Form
router.get('/coo/edit/:id', isAuthenticated, authenticate, async (req, res) => {
  const coo = await Coo.findByPk(req.params.id);

  res.render('edit_coo_form', {
    user: req.user,
    coo: coo.get({ plain: true })
  })
})

// Show User Profile
router.get('/profile', isAuthenticated, authenticate, async (req, res) => {
  res.render('profile', {
    user: req.user,
    profile: true
  })
});

// Export the router
module.exports = router;
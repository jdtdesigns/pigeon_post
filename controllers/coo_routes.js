const router = require('express').Router();
const Coo = require('../models/Coo');

const { isAuthenticated, authenticate } = require('./helpers');

// Post a Coo
router.post('/coo', isAuthenticated, authenticate, async (req, res) => {
  try {
    const coo = await Coo.create(req.body);

    await req.user.addCoo(coo);

    res.redirect('/');
  } catch (error) {
    req.session.errors = error.errors.map(errObj => errObj.message);
    res.redirect('/coo');
  }
});

// Edit a Coo
router.put('/coo/:id', isAuthenticated, async (req, res) => {
  await Coo.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  res.redirect('/profile');
});

// Delete a Coo
router.delete('/coo/:id', isAuthenticated, async (req, res) => {
  await Coo.destroy({
    where: { id: req.params.id }
  });

  res.redirect('/profile');
})

module.exports = router;
const router = require('express').Router();
const Coo = require('../models/Coo');
const User = require('../models/User');

const { isAuthenticated } = require('./helpers');

// Post a Coo
router.post('/coo', isAuthenticated, async (req, res) => {
  try {
    const coo = await Coo.create(req.body);
    const user = await User.findByPk(req.session.user_id);

    await user.addCoo(coo);

    res.redirect('/');
  } catch (error) {
    console.log(error);

    if (error.errors) {
      req.session.errors = error.errors.map(errObj => errObj.message);
    }

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
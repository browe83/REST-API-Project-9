const express = require('express');

const router = express.Router();

const { User } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

router
// GET a list of all users
  .get('/', asyncHandler(async (req, res) => {
    console.log('users route hit');
    const users = await User.findAll();
    res.json(users);
  }))
// GET a user by id
  .get('/:id', asyncHandler(async (req, res) => {
    console.log('user by id route hit');
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    res.json(user);
  }));

module.exports = router;

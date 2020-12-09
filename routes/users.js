const express = require('express');

const router = express.Router();

const { User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

router
// GET a current user.
  .get('/', authenticateUser, asyncHandler(async (req, res) => {
    res.status(200).json({
      user: {
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        emailAddress: req.currentUser.emailAddress,
      },
    });
  }))
  .post('/', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.redirect(201, '/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }));

module.exports = router;

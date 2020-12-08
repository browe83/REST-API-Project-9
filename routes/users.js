const express = require('express');

const router = express.Router();

const { User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

router
// GET a current user.
  .get('/', authenticateUser, asyncHandler(async (req, res) => {
    res.json({
      user: req.currentUser,
    });
  }));

module.exports = router;

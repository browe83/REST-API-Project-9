const express = require('express');

const router = express.Router();

const { User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

/* Handler function to wrap each route. */
// function asyncHandler(cb) {
//   return async (req, res, next) => {
//     try {
//       await cb(req, res, next);
//     } catch (error) {
//       // Forward error to the global error handler
//       next(error);
//     }
//   };
// }

router
// GET a list of all users
  .get('/', authenticateUser, asyncHandler(async (req, res) => {
    console.log('users route hit');
    res.json({
      message: 'made it thru auth handler',
    });
  }));

module.exports = router;

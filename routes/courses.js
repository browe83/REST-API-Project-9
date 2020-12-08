const express = require('express');

const router = express.Router();

const { asyncHandler } = require('../middleware/async-handler');
const { Course } = require('../models');

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
// GET a list of all courses
  .get('/', asyncHandler(async (req, res) => {
    console.log('coures route hit');
    const courses = await Course.findAll();
    res.json(courses);
  }))
// GET a course by id
  .get('/:id', asyncHandler(async (req, res) => {
    console.log('course by id route hit');
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);
    res.json(course);
  }));

module.exports = router;

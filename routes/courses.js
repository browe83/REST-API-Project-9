const express = require('express');

const router = express.Router();

const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');
const { Course, User } = require('../models');


router
// GET a list of all courses
  .get('/', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: {
        model: User,
      },
    });
    res.json({ courses });
  }))
// GET retrieves a course by id
  .get('/:id', asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId, {
      include: {
        model: User,
      },
    });
    res.json(course);
  }))
// POST creates a new course.
  .post('/', authenticateUser, asyncHandler(async (req, res) => {
    try {
      await Course.create(req.body);
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

const express = require('express');

const router = express.Router();

const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');
const { Course, User } = require('../models');

router
// GET retrieves a list of all courses
  .get('/', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: {
        model: User,
      },
    });
    const filteredCoursesInfo = courses.map((course) => ({
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        userId: course.userId,
        userFirstName: course.User.firstName,
        userLastName: course.User.lastName,
        userEmailAddress: course.User.emailAddress,
      },
    }));
    res.json({ filteredCoursesInfo });
  }))
// GET retrieves a course by id
  .get('/:id', asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId, {
      include: {
        model: User,
      },
    });
    if (course === null || course === undefined) {
      const error = new Error('Course not found');
      error.status = 404;
      throw error;
    } else {
      res.json({
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          userId: course.userId,
          userFirstName: course.User.firstName,
          userLastName: course.User.lastName,
          userEmailAddress: course.User.emailAddress,
        },
      });
    }
  }))
// POST creates a new course
  .post('/', authenticateUser, asyncHandler(async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.redirect(201, `/courses/${course.id}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }))
// PUT updates a course with id
  .put('/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      const { title } = req.body;
      const { description } = req.body;
      if (course === null || course === undefined) {
        const error = new Error('Course not found');
        error.status = 404;
        throw error;
      } else if (req.currentUser.id !== course.userId) {
        return res.sendStatus(403);
      } else if (title === null || title === undefined || title === ''
        || description === null || description === undefined || description === '') {
        const err = new Error('Please provide a valid title and description');
        err.status = 400;
        throw err;
      }
      await course.update(req.body);
      return res.redirect(204, '/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      throw error;
    }
  }))
// DELETE removes course by id
  .delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course === null || course === undefined) {
      const err = new Error('Course not found');
      err.status = 404;
      throw err;
    } else if (req.currentUser.id !== course.userId) {
      return res.sendStatus(403);
    } else {
      await course.destroy(req.body);
      return res.sendStatus(204);
    }
  }));

module.exports = router;

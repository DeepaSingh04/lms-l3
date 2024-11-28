const express = require('express');
const {
    getAllCourses,
    getCourseById,
    updateCourse,
    getCourseSummary
} = require('../controllers/coursesController');

const router = express.Router();

// GET all courses with advanced search and pagination
router.get('/', getAllCourses);

// GET a single course by ID
router.get('/:id', getCourseById);

// PUT to update a course
router.put('/:id', updateCourse);

// GET summary of courses
router.get('/summary', getCourseSummary);

module.exports = router;

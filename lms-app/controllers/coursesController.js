const courseService = require('../services/courseService');

// Get all courses with advanced search and pagination
const getAllCourses = (req, res) => {
    const { page, limit, title, level } = req.query;

    const result = courseService.getFilteredCourses({ page, limit, title, level });
    res.status(200).json(result);
};

// Get a single course by ID
const getCourseById = (req, res) => {
    const course = courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course);
};

// Update a course with validation
const updateCourse = (req, res) => {
    const { id } = req.params;
    const { name, description, level, enrollments } = req.body;

    const validation = courseService.validateCourseUpdate({ name, description, level, enrollments });
    if (!validation.isValid) return res.status(400).json({ message: validation.message });

    const updatedCourse = courseService.updateCourse(id, { name, description, level, enrollments });
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(updatedCourse);
};

// Get course summary
const getCourseSummary = (req, res) => {
    const summary = courseService.getCourseSummary();
    res.status(200).json(summary);
};

module.exports = { getAllCourses, getCourseById, updateCourse, getCourseSummary };

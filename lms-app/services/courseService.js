const courses = require('../data/courses.json');

// Filter courses with pagination and advanced search
const getFilteredCourses = ({ page = 1, limit = 5, title, level }) => {
    let filtered = courses;

    if (title) {
        filtered = filtered.filter(course =>
            course.name.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (level) {
        filtered = filtered.filter(course => course.level.toLowerCase() === level.toLowerCase());
    }

    const start = (page - 1) * limit;
    const end = start + parseInt(limit);

    return {
        total: filtered.length,
        courses: filtered.slice(start, end)
    };
};

// Retrieve a single course by ID
const getCourseById = (id) => {
    return courses.find(course => course.id === parseInt(id));
};

// Validate course updates
const validateCourseUpdate = ({ name, description, level, enrollments }) => {
    if (!name || name.length < 3) return { isValid: false, message: 'Invalid name' };
    if (!description || description.length < 5) return { isValid: false, message: 'Invalid description' };
    if (!level || !['Beginner', 'Intermediate', 'Advanced'].includes(level))
        return { isValid: false, message: 'Invalid level' };
    if (enrollments < 0 || isNaN(enrollments)) return { isValid: false, message: 'Invalid enrollments' };

    return { isValid: true };
};

// Update a course
const updateCourse = (id, updates) => {
    const course = courses.find(course => course.id === parseInt(id));
    if (!course) return null;

    Object.assign(course, updates);
    return course;
};

// Calculate course summary
const getCourseSummary = () => {
    const totalCourses = courses.length;
    const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollments, 0);
    const averageDuration = courses.reduce((sum, course) => sum + course.duration, 0) / totalCourses;

    return {
        totalCourses,
        averageEnrollments: totalEnrollments / totalCourses,
        averageDuration
    };
};

module.exports = {
    getFilteredCourses,
    getCourseById,
    validateCourseUpdate,
    updateCourse,
    getCourseSummary
};

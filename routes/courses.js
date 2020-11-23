const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController');


// newsController.index

router.get('/login', CourseController.backlogin);
router.get('/courses', CourseController.back);
router.get('/:slug', CourseController.show);

module.exports = router;

const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController');


// newsController.index
router.get('/logout', CourseController.backlogout);
router.get('/login', CourseController.backlogin);
router.get('/course', CourseController.back);
router.get('/:slug', CourseController.show);

module.exports = router;

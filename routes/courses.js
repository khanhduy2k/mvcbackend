const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController');

router.get('/feedback', CourseController.feedback);
router.post('/feedback', CourseController.send);
router.get('/:slug', CourseController.show);
module.exports = router;

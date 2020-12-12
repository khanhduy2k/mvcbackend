const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController');


// newsController.indexs
router.get('/backend', CourseController.backend);
router.get('/frontend', CourseController.frontend);
router.get('/:slug/:id/:bai', CourseController.show2);
router.get('/:slug', CourseController.show);
module.exports = router;

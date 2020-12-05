const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController');


// newsController.index
router.get('/logout', CourseController.backlogout);
router.get('/profile', CourseController.backset);
router.get('/admin', CourseController.backadmin);
router.get('/course', CourseController.back);
router.get('/:slug/:id/profile', CourseController.backset);
router.get('/:slug/:id/logout', CourseController.backlogout);
router.get('/:slug/:id/admin', CourseController.backadmin);
router.get('/:slug/:id/course', CourseController.back);
router.get('/:slug/:id/:bai', CourseController.show2);
router.get('/:slug', CourseController.show);
module.exports = router;

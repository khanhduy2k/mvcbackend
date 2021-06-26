const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const profileController = require('../controller/profileController');

router.post('/password', profileController.changepass);
router.get('/password', profileController.password);
router.get('/email', profileController.email);
router.put('/email', profileController.changeemail);
router.get('/my-courses', profileController.myCourse);

module.exports = router;

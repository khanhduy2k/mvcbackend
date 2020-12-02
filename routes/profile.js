const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const profileController = require('../controller/profileController');



router.get('/logout', profileController.backlogout);
router.get('/login', profileController.backlogin);
router.get('/course', profileController.backcourse);
router.get('/profile', profileController.back);
router.post('/password', profileController.changepass);
router.get('/password', profileController.password);

module.exports = router;
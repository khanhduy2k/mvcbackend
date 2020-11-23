const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const siteController = require('../controller/siteController');

router.post('/login', siteController.checklogin);
router.post('/signup', siteController.checksignup);
router.get('/signup', siteController.signup);
router.get('/login', siteController.login);
router.get('/courses', siteController.course);
router.get('/', siteController.index);

module.exports = router;
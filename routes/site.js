const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const siteController = require('../controller/siteController');
const authMiddlewares = require('../middlewares/authmiddlewares');

router.get('/logout', siteController.logout);
router.post('/login', siteController.checklogin);
router.post('/signup', siteController.checksignup);
router.get('/signup',authMiddlewares.requirelogin, siteController.signup);
router.get('/login',authMiddlewares.requirelogin, siteController.login);
router.get('/course', siteController.course);
router.get('/', siteController.index);

module.exports = router;
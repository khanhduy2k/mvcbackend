const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const siteController = require('../controller/siteController');
const authMiddlewares = require('../middlewares/authmiddlewares');


router.get('/profile',authMiddlewares.requireAuth,siteController.profile);
router.get('/backend', siteController.backend);
router.get('/frontend', siteController.frontend);
router.get('/logout', siteController.logout);
router.post('/login', siteController.checklogin);
router.post('/signup', siteController.checksignup);
router.get('/course', siteController.course);
router.get('/signup',authMiddlewares.requireLogin, siteController.signup);
router.get('/login',authMiddlewares.requireLogin, siteController.login);
router.get('/account', siteController.account);
router.get('/seemore/:course', siteController.seemore);
router.get('/', siteController.index);

module.exports = router;
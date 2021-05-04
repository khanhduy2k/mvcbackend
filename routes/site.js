const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const siteController = require('../controller/siteController');
const authMiddlewares = require('../middlewares/authmiddlewares');

router.get('/profile',
    authMiddlewares.requireAuth,
siteController.profile);

router.get('/backend', 
    authMiddlewares.maintenance,
siteController.backend);

router.get('/frontend', 
    authMiddlewares.maintenance,
siteController.frontend);

router.get('/logout', 
    authMiddlewares.maintenance,
siteController.logout);

router.post('/login', 
    authMiddlewares.maintenance,
siteController.checklogin);

router.post('/signup', 
    authMiddlewares.maintenance,
siteController.checksignup);

router.get('/course', 
    authMiddlewares.maintenance,
siteController.course);

router.get('/signup',
    authMiddlewares.maintenance,
    authMiddlewares.requireLogin, 
siteController.signup);

router.get('/login',
    authMiddlewares.maintenance,
    authMiddlewares.requireLogin, 
siteController.login);

router.get('/account', 
    authMiddlewares.maintenance,
siteController.account);

router.get('/seemore/:course', 
    authMiddlewares.maintenance,
siteController.seemore);

router.get('/',
    authMiddlewares.maintenance, 
siteController.index);

router.get('/maintenance', siteController.maintenance);

module.exports = router;
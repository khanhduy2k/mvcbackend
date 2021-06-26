const express = require('express');
const router = express.Router();
const siteController = require('../controller/siteController');
const authMiddlewares = require('../middlewares/authmiddlewares');
const passport = require('passport');

router.get('/profile', authMiddlewares.requireAuth, siteController.profile);
router.get('/backend', siteController.backend);
router.get('/frontend', siteController.frontend);
router.get('/logout', siteController.logout);
router.post('/login', authMiddlewares.requireLogin, siteController.checklogin);
router.post(
    '/admin-login',
    authMiddlewares.requireLogin,
    siteController.pageLoginAdmin,
);
router.post(
    '/signup',
    authMiddlewares.requireLogin,
    siteController.checksignup,
);
router.get('/course', siteController.course);
router.get('/signup', authMiddlewares.requireLogin, siteController.signup);
router.get('/login', authMiddlewares.requireLogin, siteController.login);
router.get('/account', siteController.account);
router.get('/seemore/:course', siteController.seemore);
router.get(
    '/login/facebook',
    passport.authenticate('facebook', { scope: 'email' }),
);
router.get('/loginFacebookUser', siteController.loginFacebookUser);
router.get('/login/google', siteController.loginGoogleUser);
router.get('/login/email/link', siteController.checkEmailLoginLink);
router.get('/login/email/link/type', siteController.loginLinkTypeEmail);
router.post('/login/email/link', siteController.sendEmailLinkLogin);

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/loginFacebookUser',
        failureRedirect: '/login',
    }),
    function (req, res) {
        res.redirect('/');
    },
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);
// the callback after google has authenticated the user
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/login/google',
        failureRedirect: '/login',
    }),
);
router.get(
    '/admin-login',
    authMiddlewares.requireLogin,
    siteController.adminPage,
);
router.get('/', siteController.index);

router.use(siteController.page404);

module.exports = router;

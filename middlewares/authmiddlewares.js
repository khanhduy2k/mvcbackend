const { signedCookies } = require('cookie-parser');
const User = require('../controller/model/user');

module.exports.requireAuth = function (req, res, next) {
    if (!req.signedCookies.userId) {
        res.redirect('/login');
        return;
    }
    next();
};

module.exports.requireAdminLimit = function (req, res, next) {
    if (req.signedCookies.userPosition === 'admin') {
        next();
    } else {
        res.redirect('/');
        return;
    }
};

module.exports.requireAdminLv1 = function (req, res, next) {
    if (
        req.signedCookies.userPosition === 'admin' ||
        req.signedCookies.userPosition === 'adminLv1'
    ) {
        next();
    } else {
        res.redirect('/');
        return;
    }
};

module.exports.requireCollaborators = function (req, res, next) {
    if (
        req.signedCookies.userPosition === 'collaborators' ||
        req.signedCookies.userPosition === 'admin' ||
        req.signedCookies.userPosition === 'adminLv1'
    ) {
        next();
    } else {
        res.redirect('/');
        return;
    }
};

module.exports.requireLogin = function (req, res, next) {
    if (req.signedCookies.userId || req.signedCookies.userPosition) {
        res.redirect('/');
        return;
    }
    next();
};

module.exports.requireUserlogin = function (req, res, next) {
    if (req.signedCookies.userId) {
        res.locals.login = true;
        res.locals.name = req.signedCookies.userName;
        if (req.signedCookies.userPosition === 'admin') {
            res.locals.adminLimit = true;
        }
        if (
            req.signedCookies.userPosition === 'admin' ||
            req.signedCookies.userPosition === 'adminLv1'
        ) {
            res.locals.admin = true;
            res.locals.collaborators = true;
        } else if (req.signedCookies.userPosition === 'collaborators') {
            res.locals.collaborators = true;
        }
    }
    next();
};

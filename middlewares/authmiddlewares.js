
const { find } = require('../controller/model/user');
const User = require('../controller/model/user');
module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/login');
        return;
    }
    else {
        User.find({ _id: req.signedCookies.userId })
        .then(user =>{
            if(!user){
                res.redirect('/');
                return;
                }
            }); 
    }
    
    next();
};

module.exports.requireAdmin = function(req, res, next){
    User.findOne({_id: req.signedCookies.userId})
    .then(user => {
        if (user.position !== 'admin') {
            redirect('/')
            return;
        }
    })
    next();
};

module.exports.requireLogin = function(req, res, next){
    if(req.signedCookies.userId){
        res.redirect('/');
        return;
    }
    next();
};

module.exports.requireUser = function(req, res, next){
    if(req.signedCookies.userId){
        User.findOne({_id: req.signedCookies.userId})
        .then(data=> {
            res.locals.name = data.user;
        })
    }
    next();
};

module.exports.requireAdminLogin = function(req, res, next){
    if(req.signedCookies.userId){
        User.findOne({_id: req.signedCookies.userId})
        .then(data=> {
            if (data.position == 'admin') res.locals.admin = true;
        })
    }
    next();
};

module.exports.requireUserlogin = function(req, res, next){
    if (req.signedCookies.userId){
        res.locals.login = true;
    }
    next();
};
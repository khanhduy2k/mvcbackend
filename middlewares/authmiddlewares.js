const User = require('../controller/model/user');
module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/login');
        return;
    }
    else if(req.signedCookies.userId) {
        User.find({ _id: req.signedCookies.userId })
        .then(user =>{
            if(!user){
                res.redirect('/');
                return;
            }else {
                next()
            }
        }); 
    }
    
};

module.exports.requireAdmin = function(req, res, next){
    User.findOne({_id: req.signedCookies.userId})
    .then(user => {
        if (user.position !== 'admin') {
            res.redirect('/');
            return;
        }
        next()
    })
};

module.exports.requireLogin = function(req, res, next){
    if(req.signedCookies.userId || req.signedCookies.userPosition){
        res.redirect('/');
        return;
    }
    next();
};

module.exports.requireUserlogin = function(req, res, next){
    if (req.signedCookies.userId){
        res.locals.login = true;
        res.locals.name = req.signedCookies.userName;
        if (req.signedCookies.userPosition === 'admin') {
            res.locals.admin = true;
        }
    }
    next();
};
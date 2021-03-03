
const Post = require('../controller/model/posts');
module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/login');
        return;
    }
    else {
        Post.find({ _id: req.signedCookies.userId })
        .then(user =>{
            if(!user){
                res.redirect('/');
                return;
                }
            }); 
    }
    
    next();
};

module.exports.requireadmin = function(req, res, next){
    if (req.signedCookies.userId !== '5fec63433abf7b3828ae4bae'){
        res.redirect('/');
    }
    next();
};

module.exports.requirelogin = function(req, res, next){
    if(req.signedCookies.userId){
        res.redirect('/');
        return;
    }
    next();
};

module.exports.requireUser = function(req, res, next){
    if(req.signedCookies.userId){
        Post.findOne({_id: req.signedCookies.userId})
        .then(data=> {
            res.locals.name = data.name1;
        })
    }
    next();
};

module.exports.requireadminlogin = function(req, res, next){
    if (req.signedCookies.userId == '5fec63433abf7b3828ae4bae'){
        res.locals.admin = true;
    }
    next();
};

module.exports.requireUserlogin = function(req, res, next){
    if (req.signedCookies.userId){
        res.locals.login = true;
    }
    next();
};
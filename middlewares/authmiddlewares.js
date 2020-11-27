
const Post = require('../controller/model/posts');
module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/login');
        return;
    }
        Post.find({ _id: req.signedCookies.userId })
        .then(user =>{
            if(!user){
                res.redirect('/');
                }
            });
    next();
};
module.exports.requirelogin = function(req, res, next){
    if(req.signedCookies.userId){
        res.redirect('/');
        return;
    }
    next();
};
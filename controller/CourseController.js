const { mongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');

class CourseController{
    show(req, res, next){
        Course.findOne({ slug: req.params.slug })
            .then(course =>{
                if(course){
                if (!req.signedCookies.userId) {
                    const title = 'Khóa học '+req.params.slug;
                    res.render('show', { course: mongooseToObject(course), title,cast:false})
                }
                if (req.signedCookies.userId) {
                    const title = 'Khóa học '+req.params.slug;
                    res.render('show', { course: mongooseToObject(course), title,cast:'yehh'})
                }
                }else{
                    res.redirect('/');
                }
            })
            .catch(next);   
            return;
    }
    
    back(req, res){
        res.redirect('/course');
    }
    backlogin(req, res){
        res.redirect('/login');
}   backlogout(req, res){
    res.cookie('userId','logout');
    res.redirect('/');
}
}
module.exports = new CourseController();
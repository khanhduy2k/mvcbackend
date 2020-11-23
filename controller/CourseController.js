const { mongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');

class CourseController{
    show(req, res, next){
        Course.findOne({ slug: req.params.slug })
            .then(course =>{
                if(course){
                    res.render('show', { course: mongooseToObject(course) })
                }else{
                    res.render('home');
                }
            })
            .catch(next);   
            return;
    }
    
    back(req, res){
        res.redirect('/courses');
    }
    backlogin(req, res){
        res.redirect('/login');
}
}
module.exports = new CourseController();
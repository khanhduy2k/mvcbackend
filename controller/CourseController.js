const { mongooseToObject } = require('../ulti/mongoose');
const course = require('./model/course');
const Course = require('./model/course');

class CourseController{
    show(req, res, next){
        const title = 'Khóa học '+req.params.slug;
        Course.findOne({ slug: req.params.slug })
            .then(course =>{
                if(course){
                    res.cookie('khoahoc',course.slug)
                    const name = req.cookies.username;
                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                        res.render('show', { course: mongooseToObject(course), title,cast:'yehh',admin:'done', name})
                    }else{
                        res.render('show', { course: mongooseToObject(course), title,cast:'yehh', name})
                    }
                }else{
                    res.redirect('/');
                }
            })
            .catch(next);   
            return;
    }
    show2(req, res, next){
        const title = 'Khóa học '+req.cookies.khoahoc;
        
        Course.findOne({ slug: req.cookies.khoahoc})
            .then(course =>{
                if(course){
                    const name = req.cookies.username;
                    const Idslug = req.params.id;
                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                        res.render('show2', { course: mongooseToObject(course), title,cast:'yehh',admin: 'done', name, Idslug})
                    }else{
                        res.render('show2', { course: mongooseToObject(course), title,cast:'yehh', name, Idslug})
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
    backset(req, res){
        res.redirect('/profile');
    } 
    backlogin(req, res){
        res.redirect('/login');
    }   
    backlogout(req, res){
    res.cookie('userId','logout');
    res.redirect('/');
    }
}
module.exports = new CourseController();
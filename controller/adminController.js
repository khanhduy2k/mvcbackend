const { mutipleMongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');
class adminController{

    admin(req, res, next){
        const title = 'Admin';
        const name = req.cookies.username;
        Course.find({})
        .then(courses =>{
            res.render('admin', {
                courses: mutipleMongooseToObject(courses), title, cast:'yehh',admin:'done', name});
        })
        .catch(next);     
    }
    insert(req, res, next){
        const title = 'Insert Course';
        const name = req.cookies.username;
        res.render('insert',{title, cast:'yehh',admin:'done', name});
    }
    insertup(req, res){
        const {name, mota, img, slug} = req.body;
        const newCourseData = req.body;
        const newCourse = new Course(newCourseData);
        newCourse.save();
        res.redirect('/admin');
    }
    delete(req, res){
        res.json(req.params.id);
    }
    back(req, res){
        res.redirect('/profile');
    }
    backadmin(req, res){
        res.redirect('/admin');
    }
    backcourse(req, res){
        res.redirect('/course');
    }  
    backlogout(req, res){
    res.cookie('userId','logout');
    res.redirect('/');
    }       
}

module.exports = new adminController();
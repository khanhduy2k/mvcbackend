const { mutipleMongooseToObject } = require('../ulti/mongoose');
const { mongooseToObject } = require('../ulti/mongoose');
const { updateOne } = require('./model/course');

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
    edit(req, res, next){
        const title = 'Sửa khóa học';
        const name = req.cookies.username;
        Course.findOne({ _id: req.params.id})
        .then(courses =>{
            res.render('edit', {
                courses: mongooseToObject(courses), title, cast:'yehh',admin:'done', name});
        })
        .catch(next);      
    }
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/admin'))
        .catch(next);
    }
    addvideo(req, res, next){
        const title = 'Thêm video khóa học';
        const name = req.cookies.username;
        Course.findOne({ _id: req.params.id})
        .then(courses =>{
            res.render('addvideo', {
                courses: mongooseToObject(courses), title, cast:'yehh',admin:'done', name});
        })
        .catch(next);
    }
    deletevideo(req, res, next){
        const title = 'Thêm video khóa học';
        const name = req.cookies.username;
        Course.update({_id: req.params.id}, { $pop:{videoId1: 1, bai: 1} })
        .then(() => res.redirect('/admin'))
        .catch(next)
    }
    postvideo(req, res, next){
        const title = 'Thêm video khóa học';
        const name = req.cookies.username;
        const {videoId1, bai} = req.body;
        Course.update({_id: req.params.id}, { $push:{videoId1: videoId1, bai: bai} })
        .then(() => 
        Course.findOne({ _id: req.params.id})
        .then(courses =>{
            res.render('addvideo', {
                courses: mongooseToObject(courses), title, cast:'yehh',admin:'done', name});
        }))
        .catch(next)
    }
    delete(req, res, next){
        Course.deleteMany({_id: req.params.id})
        .then(() => res.redirect('/admin'))
        .catch(next)  
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
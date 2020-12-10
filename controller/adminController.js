const { mutipleMongooseToObject } = require('../ulti/mongoose');
const { mongooseToObject } = require('../ulti/mongoose');
const { updateOne } = require('./model/course');

const Course = require('./model/course');
const Post = require('./model/posts');
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
        .then(() => res.redirect('/admin/'+req.params.id+'/addvideo'))
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
    thanhvien(req, res, next){
        const name = req.cookies.username;
        const title = 'Quản lí thành viên';
        Post.find({})
        .then(user =>{
            Post.countDocuments({})
            .then(num=>{
               res.render('thanhvien',{title,name, cast:'yehh',admin:'done',num, user: mutipleMongooseToObject(user)}) 
            });
        })
        .catch(next);
    }
    deleteuser(req, res, next){
        Post.deleteMany({_id: req.params.id})
        .then(() => res.redirect('/admin/thanhvien'))
        .catch(next)  
    }
    chitiet(req, res, next){
        const name = req.cookies.username;
        const title = 'Quản lí thành viên';
        Post.findOne({name1: req.params.name})
        .then(info=>{
            if (info){
                res.render('chitiet',{title,name, cast:'yehh',admin:'done',info:mongooseToObject(info)});
            }else{
                res.redirect('/admin/thanhvien');
            }
        })
        .catch(next);       
    }
    
}

module.exports = new adminController();
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
                courses: mutipleMongooseToObject(courses), title, cast:true,admin:true, name});
        })
        .catch(next);     
    }
    insert(req, res, next){
        const title = 'Insert Course';
        const name = req.cookies.username;
        res.render('insert',{title, cast:true,admin:true, name});
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
                courses: mongooseToObject(courses), title, cast:true,admin:true, name});
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
                courses: mongooseToObject(courses), title, cast:true,admin:true, name});
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
                courses: mongooseToObject(courses), title, cast:true,admin:true, name});
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
        var page = req.query.page || 1;
        var perpage = 10;
        Post.find({})
        .sort({date: 1})
        .skip((perpage*page)-perpage)
        .limit(perpage)
        .then(user =>{
            Post.countDocuments({})
            .then(num=>{
               res.render('thanhvien',{title, name, cast:true, admin:true, user: mutipleMongooseToObject(user), num, page, perpage}) 
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
                res.render('chitiet',{title,name, cast:true,admin:true,info:mongooseToObject(info)});
            }else{
                res.redirect('/admin/thanhvien');
            }
        })
        .catch(next);       
    }
    
}

module.exports = new adminController();
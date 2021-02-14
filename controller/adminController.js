const { mutipleMongooseToObject } = require('../ulti/mongoose');
const { mongooseToObject } = require('../ulti/mongoose');
const { updateOne } = require('./model/course');

const Course = require('./model/course');
const Post = require('./model/posts');
const Feed = require('./model/feedback')
class adminController{

    admin(req, res, next){
        const title = 'Admin';
        Course.find({})
        .then(courses =>{
            Feed.countDocuments({new:'chưa đọc'})
            .then(news =>{
                if (news) {
                    res.render('admin/admin', {
                    courses: mutipleMongooseToObject(courses), title, news, yesnew: true});
                }
                else {
                    res.render('admin/admin', {
                    courses: mutipleMongooseToObject(courses), title});
                }
            })
        })
        .catch(next);     
    }
    insert(req, res, next){
        const title = 'Insert Course';
        res.render('admin/insert',{title});
    }
    insertup(req, res){
        const img = 'img/'+req.file.filename;
        const {name, phanloai, mota} = req.body;
        const newCourse = new Course({name:name, phanloai:phanloai, mota:mota, img:img});
        newCourse.save();
        res.redirect('/admin');
    }
    edit(req, res, next){
        const title = 'Sửa khóa học';    
        Course.findOne({ _id: req.params.id})
        .then(courses =>{
            res.render('admin/edit', {
                courses: mongooseToObject(courses), title});
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
        Course.findOne({ _id: req.params.id})
        .then(courses =>{
            res.render('admin/addvideo', {
                courses: mongooseToObject(courses), title});
        })
        .catch(next);
    }
    deletevideo(req, res, next){
        const title = 'Thêm video khóa học';
        Course.updateMany({_id: req.params.id}, { $pop:{videoId1: 1, bai: 1} })
        .then(() => res.redirect('/admin/'+req.params.id+'/addvideo'))
        .catch(next)
    }
    postvideo(req, res, next){
        const title = 'Thêm video khóa học';
        const {videoId1, bai} = req.body;
        Course.update({_id: req.params.id}, { $push:{videoId1: videoId1, bai: bai} })
        .then(() => 
        Course.findOne({ _id: req.params.id})
        .then(courses =>{
            res.render('admin/addvideo', {
                courses: mongooseToObject(courses), title});
        }))
        .catch(next)
    }
    delete(req, res, next){
        Course.deleteMany({_id: req.params.id})
        .then(() => res.redirect('/admin'))
        .catch(next)  
    }
    thanhvien(req, res, next){
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
               res.render('admin/thanhvien',{title, user: mutipleMongooseToObject(user), num, page, perpage}) 
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
        const title = 'Quản lí thành viên';
        Post.findOne({name1: req.params.name})
        .then(info=>{
            if (info){
                res.render('admin/chitiet',{title, info:mongooseToObject(info)});
            }else{
                res.redirect('/admin/thanhvien');
            }
        })
        .catch(next);       
    }
    timkiem(req, res, next){
        const title = 'Quản lí thành viên';
        const tukhoa = req.query.tukhoa;
        if (tukhoa === ''){
            var warning = "Nhập tên thành viên muốn tìm kiếm!";
            res.render('admin/timkiem',{title, warning})
        }else{
            Post.find({ $text:{ $search: "\""+tukhoa+"\""}})
            .then(user =>{
                res.render('admin/timkiem',{title, user: mutipleMongooseToObject(user)}) 
            })
            .catch(next);
        }
    }
    thongbao(req, res, next) {
        const title = 'Thông báo';
        Feed.find({})
        .then(news =>{
            Feed.countDocuments({})
            .then(num =>{
                Feed.countDocuments({new: 'chưa đọc'})
                .then(newnum => {
                    res.render('admin/thongbao',{title, newnum, num, news: mutipleMongooseToObject(news)})
                })
            }) 
        }) 
        .catch(next);
    }
    read(req, res, next) {
        const title = 'Thông báo';
        Feed.updateMany({name: req.params.name}, {new: 'đã đọc'})
        .then()
        Feed.find({})
        .then(news =>{
            Feed.findOne({name: req.params.name})
            .then(readin =>{
                res.render('admin/thongbao',{title, read:true,
                     news: mutipleMongooseToObject(news), readin: mongooseToObject(readin)}) 
            })
        }) 
        .catch(next);
    }

    delletter(req, res, next) {
        const title = 'Thông báo';
        Feed.deleteOne({_id: req.params.id})
        .then()
        res.redirect('/admin/thongbao')
    }

    pinread( req, res, next){
        Feed.updateMany({new: 'chưa đọc'}, {new: 'đã đọc'})
        .then()
        res.redirect('/admin/thongbao')
    }
    
}

module.exports = new adminController();
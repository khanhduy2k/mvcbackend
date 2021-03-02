const { mutipleMongooseToObject } = require('../ulti/mongoose');
const { mongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');
const Post = require('./model/posts');
const md5 = require('md5');
class SiteController{

    index(req, res){
        const title = 'Course Online';
            Course.countDocuments({})
            .then(num =>{
                    res.render('home', {title, num});
            })             
    }
    course(req, res, next){
        const title = 'Khóa học';
        Course.find({})
            .then(courses => {
                    Post.findOne({_id: req.signedCookies.userId})
                    .then(data=>{
                        Course.countDocuments({})
                        .then(num =>{
                    if (!req.signedCookies.userId) {
                    res.render('course',{ 
                        courses: mutipleMongooseToObject(courses), title, num});
                    }
                    if (req.signedCookies.userId) {
                            res.render('course',{ 
                                courses: mutipleMongooseToObject(courses), num, data: mongooseToObject(data), title});            
                    }  
                    })
                })  
            })
            .catch(next);  
    }
    frontend(req, res, next){
        const title = 'Frontend';
        Course.find({phanloai: 'Frontend'})
                .then(courses => {
                    Post.findOne({_id: req.signedCookies.userId})
                    .then(data=>{
                        res.render('course',{ 
                            courses: mutipleMongooseToObject(courses), data: mongooseToObject(data), title, cast:true});             
                    });  
                })
                .catch(next);
    }
    backend(req, res, next){
        const title = 'Backend';
        Course.find({phanloai: 'Backend'})
                .then(courses => {
                    Post.findOne({_id: req.signedCookies.userId})
                    .then(data=>{
                        res.render('course',{ 
                            courses: mutipleMongooseToObject(courses), data: mongooseToObject(data), title, cast:true});           
                    });  
                })
                .catch(next);
    }
    login(req, res){
        const title ='Đăng nhập';
        res.render('login', {title});
    }
    checklogin(req, res){
    const name1 = req.body.name1;
    const pass = md5(req.body.pass);
    const check = req.body.mact;
    const check2 = req.body.mact2;
    if (name1 ===''||pass===''){
        const msg ='Vui lòng nhập đầy đủ!';
        res.render('login',{msg});
        return;
    }
    if(check == check2){
        Post.findOne({name1: name1,pass: pass})
        .then(data=>{
            if(data){
                res.cookie('userId', data._id,{
                    signed: true
                });
                res.redirect('/');
            }else{
                const msg ='Tài khoản hoặc mật khẩu không chính xác!!';
                res.render('login',{msg});
            }
    })
    }else{
        const msg ='Mã xác thực không chính xác!!';
        res.render('login',{msg});
    }
    }
    signup(req, res){  
        const title='Đăng ký';
        res.render('signup', {title});
    }
    checksignup(req, res){ 
        const title='Đăng ký';
        const { name_user, name1, email, pass, pass2} = req.body;
            if (name1 === ''|| name_user === ''||email=== ''||pass=== ''){
                const msg = 'Vui lòng nhập đầy đủ thông tin!';
                res.render('signup',{msg, title , name_user, name1, email, erro_up: true});
                return;
            }
            if (name1.includes(" ")){
                const msg = 'Tên đăng nhập phải viết liền';
                res.render('signup',{msg, title , name_user, email, erro_up: true});
                return;
            }
            if (email) {
                const test = (value) => {
                    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
                    return regex.test(value) ? true : false;
                }
                if (!test(email)) {
                    const msg = 'Sai định dạng Email'
                    res.render('signup',{msg, title , name_user, name1, erro_up: true});
                    return;  
                }
            }
            if (name1.length < 4){
                const msg = 'Tên đăng nhập từ 4 kí tự trở lên';
                res.render('signup',{msg, title , name_user, email, erro_up: true});
                return;
            }
            if (pass.length < 5 || pass.length >20 ){
                const msg = 'Mật khẩu gồm 5-20 kí tự';
                res.render('signup',{msg, title , name_user, name1, email, erro_up: true});
                return;
           }
            if(pass == pass2){
                Post.findOne({email: email})
                .then(dataemail =>{
                    if(dataemail){
                        const msg = 'Email đã được sử dụng!';
                        res.render('signup',{msg, title , name_user, name1, erro_up: true});
                        return;
                    }else{
                        Post.findOne({name1: name1})
                        .then(data=>{
                        if(data){
                            const msg = 'Tài khoản đã tồn tại!';
                            res.render('signup',{msg, title , name_user, email, erro_up: true});
                            return;

                        }else{
                            let errors = [];
                            if(!name1){
                                errors.push({ msg: 'Nhập tên tài khoản!' });
                            }else{
                                const md5pass = md5(pass);
                                const newPost = new Post({name1: name1, name_user: name_user, email: email, pass: md5pass});
                                newPost.save();
                                res.render('signup',{success: true});
                                }
                                }
                            });
                    }
                    
                });   
            }
            else{
                const msg = 'Mật khẩu không trùng khớp!';
                res.render('signup',{msg, name_user, name1, email, erro_up: true});
            }
    }
    
    logout(req, res){
        res.clearCookie('userId')
        res.redirect('/');
    }
    profile(req, res, next){
        const title = 'Setting';
            Post.findOne({_id: req.signedCookies.userId})
            .then(profile =>{
                res.render('profile', {profile: mongooseToObject(profile),title}); 
            })
            .catch(next);
        }     
}

module.exports = new SiteController();
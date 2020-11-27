const { mutipleMongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');
const Post = require('./model/posts');
class SiteController{

    index(req, res){
        const title = 'Course Online';
        if (!req.signedCookies.userId) {
            res.render('home', {title, cast:false});
            return;
        }
        if (req.signedCookies.userId) {
            const name = req.cookies.username;
            res.render('home', {title, cast:'yehh',name});
        }      
    }
    course(req, res, next){
        const title = 'Khóa học';
    Course.find({})
        .then(courses => {
            if (!req.signedCookies.userId) {
            res.render('course',{ 
                courses: mutipleMongooseToObject(courses), title, cast:false});
            }
            if (req.signedCookies.userId) {
            const name = req.cookies.username;
            res.render('course',{ 
                courses: mutipleMongooseToObject(courses), title, cast:'yehh',name});
            }
            
        })
        .catch(next);
        
    }
    login(req, res){
        const title ='Đăng nhập';
        res.render('login', {title});
    }
    checklogin(req, res){
    const name1 = req.body.name1;
    const pass = req.body.pass;
    const check = req.body.mact;
    const check2 = req.body.mact2;
    const msg = '';
    if(check == check2){
      Post.findOne({name1: name1,pass: pass})
    .then(data=>{
        if(data){
            res.cookie('userId', data._id,{
                signed: true
            });
            res.cookie('username', data.name1);
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
            const { name1, name_user, email, pass, pass2 } = req.body;
            const msg ='';
            if(pass == pass2){
                Post.findOne({name1: name1})
                .then(data=>{
                if(data){
                    const msg = 'Tài khoản đã tồn tại!';
                    res.render('signup',{msg});
                }else{
                    let errors = [];
                    if(!name1){
                        errors.push({ msg: 'Nhập tên khoản!' });
                    }else{
                            const newPostData = req.body;
                            const newPost = new Post(newPostData);
                            newPost.save();
                            res.redirect('/login');
                    }
                }
            })
            }
            else{
                const msg = 'Mật khẩu không trùng khớp!';
                res.render('signup',{msg});
            }
    }
    logout(req, res){
        res.cookie('userId','logout');
        res.redirect('/');
    }
}

module.exports = new SiteController();
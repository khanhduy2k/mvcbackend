const { mutipleMongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');
const Post = require('./model/posts');
class SiteController{

    index(req, res){
            res.render('home');
    }
    course(req, res, next){
    Course.find({})
        .then(courses => {
            res.render('courses',{ 
                courses: mutipleMongooseToObject(courses)
            });
        })
        .catch(next);
        
    }
    login(req, res){
        res.render('login');
    }
    checklogin(req, res){
    const name1 = req.body.name1;
    const pass = req.body.pass;
    const check = req.body.mact;
    const check2 = req.body.mact2;
    const msg = '';
    if(check == check2){
       const user = Post.findOne({name1: name1,pass: pass})
    .then(data=>{
        if(data){
            res.cookie('user',name1);
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
        res.render('signup');
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
                        errors.push({ msg: 'Nhap ten us' });
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
}

module.exports = new SiteController();
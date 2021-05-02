const { mongooseToObject } = require('../ulti/mongoose');
const { mutipleMongooseToObject } = require('../ulti/mongoose');
const md5 = require('md5');
const Post = require('./model/user');
const Progress = require('../controller/model/lessonProgress');
const Course = require('../controller/model/course');

class profileController{
    password(req, res, next){
        const title = 'Setting - password';
            Post.findOne({_id: req.signedCookies.userId})
            .then(profile =>{
                res.render('profile/password', {profile: mongooseToObject(profile), title, success:true});
            })
            .catch(next);
    }

    changepass(req, res){
       const  {pass, pass2} = req.body; 
       const title = 'Đổi mật khẩu';
       if (pass === ''){
            const msg = 'Vui lòng nhập mật khẩu mới!';
            res.render('profile/password',{msg, title, success:true});
            return;
       }
       if (pass.length < 5 || pass.length >20 ){
            const msg = 'Mật khẩu gồm 5-20 kí tự!';
            res.render('profile/password',{msg, title, success:true});
            return;
       }
       if (pass === pass2){
            Post.findOne({_id: req.signedCookies.userId})
            .then(data =>{
                if (data.pass === md5(pass2)){
                    const msg = 'Sử dụng mật khẩu khác với mật khẩu hiện tại!';
                    res.render('profile/password',{msg, title, success:true});
                    return;
                }   else {
                        const md5pass = md5(pass);
                        const msg2 = 'Đổi mật khẩu thành công!';
                        Post.updateOne({_id: req.signedCookies.userId}, {pass: md5pass})
                        .then(() => res.render('profile/password',{msg2, title, success:false})) 
                    }
                });
        }
        else{
            const msg = 'Mật khẩu không trùng khớp!';
            res.render('profile/password',{msg, title, success:true});  
       }
    } 

    myCourse(req, res, next){
        const title = 'Khóa học của tôi';
        Progress.find({idUser: req.signedCookies.userId})
        .then(data=> {
            Course.find({})
            .then(courses=> {
                res.render('profile/mycourses', {title, data: mutipleMongooseToObject(data), courses: mutipleMongooseToObject(courses)})
            })
        })
    }
}

module.exports = new profileController();
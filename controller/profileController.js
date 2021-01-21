const { mongooseToObject } = require('../ulti/mongoose');
const { exists, remove } = require('./model/posts');
const md5 = require('md5');
const Post = require('./model/posts');
class profileController{
    password(req, res, next){
        const title = 'Setting - password';
            Post.findOne({_id: req.cookies.user_i})
                .then(profile =>{
                    const name = req.cookies.username;
                    if (req.cookies.user_i === '5fec63433abf7b3828ae4bae'){
                        res.render('password', {profile: mongooseToObject(profile),title, cast:true,success:true,admin:true, name});
                    } else{
                        res.render('password', {profile: mongooseToObject(profile),title, cast:true,success:true,name});
                    } 
            })
                .catch(next);
        }
    changepass(req, res){
       const  {pass, pass2} = req.body; 
       const title = 'Đổi mật khẩu';
       const name = req.cookies.username;
       if (pass === ''){
            const msg = 'Vui lòng nhập mật khẩu mới!';
            if (req.cookies.user_i === '5fec63433abf7b3828ae4bae'){
                res.render('password',{msg,title,cast:true,success:true,admin:true, name});
            }else{
                res.render('password',{msg,title,cast:true,success:true,name});
            }
            return;
       }
       if (pass.length < 5 || pass.length >20 ){
            const msg = 'Mật khẩu gồm 5-20 kí tự!';
            if (req.cookies.user_i === '5fec63433abf7b3828ae4bae'){
                res.render('password',{msg,title,cast:true,success:true,admin:true, name});
            }else{
                res.render('password',{msg,title,cast:true,success:true,name});
            } 
            return;
       }
       if (pass === pass2){
            Post.findOne({_id: req.cookies.user_i})
            .then(data =>{
                if (data.pass === md5(pass2)){
                    const msg = 'Sử dụng mật khẩu khác với mật khẩu hiện tại!';
                    if (req.cookies.user_i === '5fec63433abf7b3828ae4bae'){
                        res.render('password',{msg,title,cast:true,success:true, admin:true, name});
                        return;
                    }else{
                        res.render('password',{msg,title,cast:true,success:true,name});
                        return;
                    }
                }   else {
                        const md5pass = md5(pass);
                        const msg2 = 'Đổi mật khẩu thành công!';
                        if (req.cookies.user_i === '5fec63433abf7b3828ae4bae'){
                            Post.updateOne({_id: req.cookies.user_i}, {pass: md5pass})
                        .then(() => res.render('password',{msg2,title,cast:true,success:false,admin:true, name}))
                        }else{
                        Post.updateOne({_id: req.cookies.user_i}, {pass: md5pass})
                        .then(() => res.render('password',{msg2,title,cast:true,success:false,name})) 
                        }
                    }
                });
        }
        else{
            const msg = 'Mật khẩu không trùng khớp!';
            if (req.cookies.user_i === '5fec63433abf7b3828ae4bae'){
                res.render('password',{msg,title,cast:true,success:true, admin:true, name});
            }else{
                res.render('password',{msg,title,cast:true,success:true,name});
            }    
       }
    } 
}

module.exports = new profileController();
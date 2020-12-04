const { mongooseToObject } = require('../ulti/mongoose');
const { exists, remove } = require('./model/posts');
const Post = require('./model/posts');
class profileController{
    password(req, res, next){
        const title = 'Setting - password';
            Post.findOne({_id: req.cookies.user_i})
                .then(profile =>{
                    const name = req.cookies.username;
                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                        res.render('password', {profile: mongooseToObject(profile),title, cast:'yehh',success:'done',admin:'done', name});
                    } else{
                        res.render('password', {profile: mongooseToObject(profile),title, cast:'yehh',success:'done',name});
                    } 
            })
                .catch(next);
        }
    changepass(req, res){
       const  {pass, pass2} = req.body; 
       const title = 'Đổi mật khẩu';
       const name = req.cookies.username;
       Post.findOne({_id: req.cookies.user_i})
       .then(data =>{
           if (data.pass === pass2){
            const msg = 'Sử dụng mật khẩu khác với mật khẩu hiện tại!';
            if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                res.render('password',{msg,title,cast:'yehh',success:'done', admin:'done', name});
                return;
            }else{
                res.render('password',{msg,title,cast:'yehh',success:'done',name});
                return;
            }
           }
       })
       if (pass === ''){
            const msg = 'Vui lòng nhập mật khẩu mới!';
            if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                res.render('password',{msg,title,cast:'yehh',success:'done',admin:'done', name});
            }else{
                res.render('password',{msg,title,cast:'yehh',success:'done',name});
            }
            return;
       }
       if (pass.length < 5 || pass.length >20 ){
            const msg = 'Mật khẩu gồm 5-20 kí tự!';
            if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                res.render('password',{msg,title,cast:'yehh',success:'done',admin:'done', name});
            }else{
                res.render('password',{msg,title,cast:'yehh',success:'done',name});
            } 
            return;
       }
       if (pass === pass2){
            const msg2 = 'Đổi mật khẩu thành công!';
            if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                Post.updateOne({_id: req.cookies.user_i}, {pass: pass})
            .then(() => res.render('password',{msg2,title,cast:'yehh',success:false,admin:'done', name}))
            }else{
               Post.updateOne({_id: req.cookies.user_i}, {pass: pass})
            .then(() => res.render('password',{msg2,title,cast:'yehh',success:false,name})) 
            }
       }else{
            const msg = 'Mật khẩu không trùng khớp!';
            if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                res.render('password',{msg,title,cast:'yehh',success:'done', admin:'done', name});
            }else{
                res.render('password',{msg,title,cast:'yehh',success:'done',name});
            }    
       }
    }
    back(req, res){
        res.redirect('/profile');
    }
    backcourse(req, res){
        res.redirect('/course');
    }
    backadmin(req, res){
        res.redirect('/admin');
    }
    backlogin(req, res){
        res.redirect('/login');
    }   
    backlogout(req, res){
    res.cookie('userId','logout');
    res.redirect('/');
    }       
}

module.exports = new profileController();
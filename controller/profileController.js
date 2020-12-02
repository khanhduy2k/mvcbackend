const { mongooseToObject } = require('../ulti/mongoose');
const Post = require('./model/posts');
class profileController{
    password(req, res, next){
        const title = 'Setting - password';
            Post.findOne({name1: req.cookies.username})
                .then(profile =>{
                    const name = req.cookies.username;
                    res.render('password', {profile: mongooseToObject(profile),title, cast:'yehh',success:'done',name});  
            })
                .catch(next);
        }
    changepass(req, res){
       const  {pass, pass2} = req.body; 
       const msg ='';
       const title = 'Đổi mật khẩu';
       const name = req.cookies.username;
       Post.findOne({name1: name})
       .then(data =>{
           if (pass === data.pass){
            const msg = 'Vui sử dụng mật khẩu khác với mật khẩu hiện tại!';
            res.render('password',{msg,title,cast:'yehh',success:'done',name});
            return;
           }
       });
       if (pass === ''){
            const msg = 'Vui lòng nhập mật khẩu mới!';
            res.render('password',{msg,title,cast:'yehh',success:'done',name});
            return;
       }
       if (pass.length < 5 || pass.length >20 ){
            const msg = 'Mật khẩu gồm 5-20 kí tự!';
            res.render('password',{msg,title,cast:'yehh',success:'done',name});
            return;
       }
       if (pass === pass2){
            const msg2 = 'Đổi mật khẩu thành công!';
            Post.updateOne({name1: name}, {pass: pass})
            .then(() => res.render('password',{msg2,title,cast:'yehh',success:false,name}))
       }else{
            const msg = 'Mật khẩu không trùng khớp!';
            res.render('password',{msg,title,cast:'yehh',success:'done',name});
       }
    }
    back(req, res){
        res.redirect('/profile');
    }
    backcourse(req, res){
        res.redirect('/course');
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
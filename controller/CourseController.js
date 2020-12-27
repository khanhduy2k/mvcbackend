const { mutipleMongooseToObject } = require('../ulti/mongoose');
const { mongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');
const Post = require('./model/posts');
const Feed = require('./model/feedback');
const { count } = require('./model/course');

class CourseController{
    show(req, res, next){
        const title = 'Khóa học '+req.params.slug;
        Course.findOne({ slug: req.params.slug })
            .then(course =>{
                if(course){
                    Post.findOne({_id: req.cookies.user_i})
                    .then(data=>{
                        if (data.learning.includes(req.params.slug) == false){
                            Post.update({_id: req.cookies.user_i}, {$push:{learning: req.params.slug}})
                            .then()
                            Course.updateOne({slug: req.params.slug}, {__v: course.__v+1})
                            .then()                            
                        }
                    });
                    res.cookie('khoahoc',course.slug)
                    const name = req.cookies.username;
                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                        res.render('show', { course: mongooseToObject(course), title,cast:true,admin:true, name})
                    }else{
                        res.render('show', { course: mongooseToObject(course), title,cast:true, name})
                    }
                }else{
                    res.redirect('/');
                }
            })
            .catch(next);   
            return;
    }
    show2(req, res, next){
        const title = 'Khóa học '+req.cookies.khoahoc;
        Course.findOne({ slug: req.cookies.khoahoc})
            .then(course =>{
                if(course){
                    const name = req.cookies.username;
                    const Idslug = req.params.id;
                    const bai = req.params.bai;
                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                        res.render('show2', { course: mongooseToObject(course), title,cast:true,admin: true, name, Idslug, bai})
                    }else{
                        res.render('show2', { course: mongooseToObject(course), title,cast:true, name, Idslug, bai})
                    }
                }else{
                    res.redirect('/');
                }
            })
            .catch(next);   
            return;      
    }
    feedback(req, res, next) {
            const title = 'Góp ý';
                const name = req.cookies.username;
                Feed.findOne({_id: req.cookies.user_i})
                .then(info =>{
                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                        res.render('feedback', {title, info: mongooseToObject(info), cast:true,admin:true,name});
                    }else{
                        res.render('feedback', {title, info: mongooseToObject(info), cast:true,name});  
                    }  
                })
                .catch(next)      
    } 
    send(req, res, next) {
            const title = 'Góp ý';
            const feedback = req.body.feedback;
            const lengthfeed = feedback.length;
            const id = req.cookies.user_i;
            const date = Date.now();
                Post.findOne({_id: req.cookies.user_i})
                .then(name1 =>{
                    const name = name1.name1;
                    const newPost = new Feed({_id: id, name: name, feedback: feedback});
                    Feed.findOne({name: name})
                    .then(info =>{
                        if (lengthfeed == 0) {
                            const msg = 'Nội dung góp ý không được để trống!'
                                if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                                    res.render('feedback', {title, msg, info: mongooseToObject(info), cast:true,admin:true,name});
                                }else{
                                    res.render('feedback', {title, msg, info: mongooseToObject(info), cast:true,name});  
                                }
                        }
                        else if (lengthfeed > 600) {
                            const msg = 'Nội dung góp ý không vượt quá 600 kí tự!'
                                if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                                    res.render('feedback', {title, msg, info: mongooseToObject(info), cast:true,admin:true,name});
                                }else{
                                    res.render('feedback', {title, msg, info: mongooseToObject(info), cast:true,name});  
                                }
                        }
                        else {
                            if (!info){
                                newPost.save();
                                if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                                    res.render('feedback', {title, info: mongooseToObject(info), cast:true,admin:true,name, success: true});
                                }else{
                                    res.render('feedback', {title, info: mongooseToObject(info), cast:true,name, success: true});  
                                } 
                            }
                            else {
                                const time = Number(info.date2);
                                const counttime = date - time;
                                if (counttime < 1800000) {
                                    const msg = 'Mỗi lần góp ý cách nhau 30 phút!'
                                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                                        res.render('feedback', {title, msg, info: mongooseToObject(info), cast:true,admin:true,name});
                                    }else{
                                        res.render('feedback', {title, msg, info: mongooseToObject(info), cast:true,name});  
                                    } 
                                }
                                else {
                                    Feed.updateMany({name: name}, { $push:{feedback: feedback, date: date}, date2: date, new: 'chưa đọc' })
                                    .then()
                                    if (req.cookies.user_i === '5fc8f00e4ea1953d84276696'){
                                        res.render('feedback', {title, info: mongooseToObject(info), cast:true,admin:true,name, success: true});
                                    }else{
                                        res.render('feedback', {title, info: mongooseToObject(info), cast:true,name, success: true});  
                                    } 
                                }
                            }
                        }
                    })
                      
                })
                .catch(next)       
    } 
}
module.exports = new CourseController();
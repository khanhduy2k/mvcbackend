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
                Post.findOne({_id: req.signedCookies.userId})
                .then(data=>{
                    if (data.learning.includes(req.params.slug) == false){
                        Post.update({_id: req.signedCookies.userId}, {$push:{learning: req.params.slug}})
                        .then()
                        Course.updateOne({slug: req.params.slug}, {__v: course.__v+1})
                        .then()                            
                    }
                });
                res.cookie('khoahoc',course.slug)
                res.render('show', { course: mongooseToObject(course), title})
            }else{
                res.redirect('/');
            }
        })
        .catch(next);   
        return;
    }
    feedback(req, res, next) {
            const title = 'Góp ý';
                Feed.findOne({_id: req.signedCookies.userId})
                .then(info =>{
                    res.render('feedback', {title, info: mongooseToObject(info)});   
                })
                .catch(next)      
    } 
    send(req, res, next) {
            const title = 'Góp ý';
            const feedback = req.body.feedback;
            const lengthfeed = feedback.length;
            const id = req.signedCookies.userId;
            const date = Date.now();
                Post.findOne({_id: req.signedCookies.userId})
                .then(name1 =>{
                    const name = name1.name1;
                    const newPost = new Feed({_id: id, name: name, feedback: feedback});
                    Feed.findOne({name: name})
                    .then(info =>{
                        if (lengthfeed == 0) {
                            const msg = 'Nội dung góp ý không được để trống!';
                            res.render('feedback', {title, msg, info: mongooseToObject(info)});  
                        }
                        else if (lengthfeed > 600) {
                            const msg = 'Nội dung góp ý không vượt quá 600 kí tự!';
                            res.render('feedback', {title, msg, info: mongooseToObject(info)});
                        }
                        else {
                            if (!info){
                                newPost.save();
                                res.render('feedback', {title, info: mongooseToObject(info), success: true});  
                            }
                            else {
                                const time = Number(info.date2);
                                const counttime = date - time;
                                if (counttime < 1800000) {
                                    const msg = 'Mỗi lần góp ý cách nhau 30 phút!';
                                    res.render('feedback', {title, msg, info: mongooseToObject(info)});  
                                }
                                else {
                                    Feed.updateMany({name: name}, { $push:{feedback: feedback, date: date}, date2: date, new: 'chưa đọc' })
                                    .then()
                                    res.render('feedback', {title, info: mongooseToObject(info), success: true});  
                                }
                            }
                        }
                    })
                      
                })
                .catch(next)       
    } 
}
module.exports = new CourseController();
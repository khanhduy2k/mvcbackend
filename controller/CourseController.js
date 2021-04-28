const { mutipleMongooseToObject } = require('../ulti/mongoose');
const { mongooseToObject } = require('../ulti/mongoose');
const Course = require('./model/course');
const Progress = require('./model/lessonProgress');
const User = require('./model/user');
const Feed = require('./model/feedback');
const { count } = require('./model/course');

class CourseController{
    show(req, res, next){
        const title = 'Khóa học '+req.params.slug;
        Course.findOne({ slug: req.params.slug })
        .then(course =>{
            if(course){
                User.findOne({_id: req.signedCookies.userId})
                .then(data=>{
                    if (data.learning.includes(req.params.slug) == false){
                        if (data.position !== 'admin') {
                            const newProgress = new Progress({idUser: data._id, idCourse: course._id});
                            newProgress.save();
                        }
                        User.updateOne({_id: req.signedCookies.userId}, {$push:{learning: req.params.slug}})
                        .then()
                        Course.updateOne({slug: req.params.slug}, {numberStudents: course.numberStudents+1})
                        .then()                            
                    }
                    Progress.findOne({idUser: data._id, idCourse: course._id})
                    .then(lesson =>{
                        res.cookie('khoahoc',course.slug)
                        res.render('show', { course: mongooseToObject(course), title, lesson: mongooseToObject(lesson)})
                    })
                });
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
            const feedBack = req.body.feedBack;
            const lengthLetter = feedBack.length;
            const id = req.signedCookies.userId;
            const date = Date.now();
                User.findOne({_id: req.signedCookies.userId})
                .then(data =>{
                    const name = data.user;
                    const newPost = new Feed({_id: id, name: name, feedBack: feedBack});
                    Feed.findOne({name: name})
                    .then(info =>{
                        if (lengthLetter == 0) {
                            const msg = 'Nội dung góp ý không được để trống!';
                            res.render('feedback', {title, msg, info: mongooseToObject(info)});  
                        }
                        else if (lengthLetter > 600) {
                            const msg = 'Nội dung góp ý không vượt quá 600 kí tự!';
                            res.render('feedback', {title, msg, info: mongooseToObject(info)});
                        }
                        else {
                            if (!info){
                                newPost.save();
                                res.render('feedback', {title, info: mongooseToObject(info), success: true});  
                            }
                            else {
                                const time = Number(info.dateLast);
                                const counttime = date - time;
                                if (counttime < 1800000) {
                                    const msg = 'Mỗi lần góp ý cách nhau 30 phút!';
                                    res.render('feedback', {title, msg, info: mongooseToObject(info)});  
                                }
                                else {
                                    Feed.updateMany({name: name}, { $push:{feedBack: feedBack, dateWrite: date}, dateLast: date, new: 'chưa đọc' })
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
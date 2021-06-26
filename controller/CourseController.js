const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
const Course = require('./model/course');
const Progress = require('./model/lessonProgress');
const User = require('./model/user');
const Feed = require('./model/feedback');

class CourseController {
    show(req, res, next) {
        const idUser = req.signedCookies.userId;
        const title = 'Khóa học ' + req.params.slug;
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                if (course) {
                    if (course.priceCourse > 0) {
                        Progress.findOne({
                            idUser: req.signedCookies.userId,
                            idCourse: course._id,
                            status: 'unlock',
                        }).then((lesson) => {
                            if (lesson) {
                                res.cookie('khoahoc', course.slug);
                                res.render('show', {
                                    course: mongooseToObject(course),
                                    title,
                                    lesson: mongooseToObject(lesson),
                                    idUser,
                                });
                            } else {
                                User.findOne({
                                    _id: req.signedCookies.userId,
                                }).then((user) => {
                                    const title = `Khóa học ${course.nameCourse}`;
                                    if (
                                        user.position === 'admin' ||
                                        user.position === 'adminLv1' ||
                                        user.position === 'collaborators'
                                    ) {
                                        res.cookie('khoahoc', course.slug);
                                        res.render('show', {
                                            course: mongooseToObject(course),
                                            title,
                                            lesson: mongooseToObject(lesson),
                                            idUser,
                                        });
                                    } else {
                                        res.render('course/seemore', {
                                            title,
                                            course: mongooseToObject(course),
                                            user: mongooseToObject(user),
                                            idUser,
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        User.findOne({ _id: req.signedCookies.userId }).then(
                            (data) => {
                                if (
                                    data.learning.includes(req.params.slug) ==
                                    false
                                ) {
                                    User.updateOne(
                                        { _id: req.signedCookies.userId },
                                        {
                                            $push: {
                                                learning: req.params.slug,
                                            },
                                        },
                                    ).then();
                                    Course.updateOne(
                                        { slug: req.params.slug },
                                        {
                                            numberStudents:
                                                course.numberStudents + 1,
                                        },
                                    ).then();
                                    if (
                                        data.position === 'admin' ||
                                        data.position === 'adminLv1' ||
                                        data.position === 'collaborators'
                                    ) {
                                        res.cookie('khoahoc', course.slug);
                                        res.render('show', {
                                            course: mongooseToObject(course),
                                            title,
                                            lesson: mongooseToObject(lesson),
                                        });
                                    } else {
                                        const newProgress = new Progress({
                                            idUser: data._id,
                                            idCourse: course._id,
                                            nameCourse: course.nameCourse,
                                        });
                                        newProgress.save().then(() => {
                                            Progress.findOne({
                                                idUser: data._id,
                                                idCourse: course._id,
                                            }).then((lesson) => {
                                                res.cookie(
                                                    'khoahoc',
                                                    course.slug,
                                                );
                                                res.render('show', {
                                                    course: mongooseToObject(
                                                        course,
                                                    ),
                                                    title,
                                                    lesson: mongooseToObject(
                                                        lesson,
                                                    ),
                                                    idUser,
                                                });
                                            });
                                        });
                                    }
                                } else {
                                    Progress.findOne({
                                        idUser: data._id,
                                        idCourse: course._id,
                                    }).then((lesson) => {
                                        if (lesson) {
                                            res.cookie('khoahoc', course.slug);
                                            res.render('show', {
                                                course: mongooseToObject(
                                                    course,
                                                ),
                                                title,
                                                lesson: mongooseToObject(
                                                    lesson,
                                                ),
                                                idUser,
                                            });
                                        } else {
                                            const newProgress = new Progress({
                                                idUser: data._id,
                                                idCourse: course._id,
                                                nameCourse: course.nameCourse,
                                            });
                                            newProgress.save().then(() => {
                                                Progress.findOne({
                                                    idUser: data._id,
                                                    idCourse: course._id,
                                                }).then((lessonNew) => {
                                                    res.cookie(
                                                        'khoahoc',
                                                        course.slug,
                                                    );
                                                    res.render('show', {
                                                        course: mongooseToObject(
                                                            course,
                                                        ),
                                                        title,
                                                        lesson: mongooseToObject(
                                                            lessonNew,
                                                        ),
                                                        idUser,
                                                    });
                                                });
                                            });
                                        }
                                    });
                                }
                            },
                        );
                    }
                } else {
                    res.redirect('/');
                }
            })
            .catch(next);
        return;
    }

    feedback(req, res, next) {
        const title = 'Góp ý';
        Feed.findOne({ _id: req.signedCookies.userId })
            .then((info) => {
                res.render('feedback', { title, info: mongooseToObject(info) });
            })
            .catch(next);
    }

    send(req, res, next) {
        const title = 'Góp ý';
        const feedBack = req.body.feedBack;
        const lengthLetter = feedBack.length;
        const id = req.signedCookies.userId;
        const date = Date.now();
        User.findOne({ _id: req.signedCookies.userId })
            .then((data) => {
                const name = data.user;
                const newPost = new Feed({
                    _id: id,
                    name: name,
                    feedBack: feedBack,
                });
                Feed.findOne({ name: name }).then((info) => {
                    if (lengthLetter == 0) {
                        const msg = 'Nội dung góp ý không được để trống!';
                        res.render('feedback', {
                            title,
                            msg,
                            info: mongooseToObject(info),
                        });
                    } else if (lengthLetter > 600) {
                        const msg = 'Nội dung góp ý không vượt quá 600 kí tự!';
                        res.render('feedback', {
                            title,
                            msg,
                            info: mongooseToObject(info),
                        });
                    } else {
                        if (!info) {
                            newPost.save();
                            res.render('feedback', {
                                title,
                                info: mongooseToObject(info),
                                success: true,
                            });
                        } else {
                            const time = Number(info.dateLast);
                            const counttime = date - time;
                            if (counttime < 1800000) {
                                const msg = 'Mỗi lần góp ý cách nhau 30 phút!';
                                res.render('feedback', {
                                    title,
                                    msg,
                                    info: mongooseToObject(info),
                                });
                            } else {
                                Feed.updateOne(
                                    { name: name },
                                    {
                                        $push: {
                                            feedBack: feedBack,
                                            dateWrite: date,
                                        },
                                        dateLast: date,
                                        new: 'chưa đọc',
                                    },
                                ).then();
                                res.render('feedback', {
                                    title,
                                    info: mongooseToObject(info),
                                    success: true,
                                });
                            }
                        }
                    }
                });
            })
            .catch(next);
    }
}
module.exports = new CourseController();

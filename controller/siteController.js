const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
const Course = require('./model/course');
const User = require('./model/user');
const md5 = require('md5');
global.crypto = require('crypto');
const mailer = require('../util/mailer');

class SiteController {
    index(req, res, next) {
        const title = 'Cnow team';
        Course.find({})
            .then((courses) => {
                User.findOne({ _id: req.signedCookies.userId }).then((data) => {
                    Course.countDocuments({}).then((num) => {
                        if (!req.signedCookies.userId) {
                            res.render('home', {
                                courses: mutipleMongooseToObject(courses),
                                title,
                                num,
                            });
                        }
                        if (req.signedCookies.userId) {
                            res.render('home', {
                                courses: mutipleMongooseToObject(courses),
                                num,
                                data: mongooseToObject(data),
                                title,
                            });
                        }
                    });
                });
            })
            .catch(next);
    }
    course(req, res, next) {
        const title = 'Khóa học';
        Course.find({})
            .then((courses) => {
                User.findOne({ _id: req.signedCookies.userId }).then((data) => {
                    Course.countDocuments({}).then((num) => {
                        if (!req.signedCookies.userId) {
                            res.render('course', {
                                courses: mutipleMongooseToObject(courses),
                                title,
                                num,
                            });
                        }
                        if (req.signedCookies.userId) {
                            res.render('course', {
                                courses: mutipleMongooseToObject(courses),
                                num,
                                data: mongooseToObject(data),
                                title,
                            });
                        }
                    });
                });
            })
            .catch(next);
    }

    seemore(req, res, next) {
        User.findOne({ _id: req.signedCookies.userId }).then((user) => {
            Course.findOne({ slug: req.params.course }).then((course) => {
                const idUser = req.signedCookies.userId;
                const title = `Khóa học ${course.nameCourse}`;
                res.render('course/seemore', {
                    title,
                    course: mongooseToObject(course),
                    user: mongooseToObject(user),
                    idUser,
                });
            });
        });
    }

    frontend(req, res, next) {
        const title = 'Frontend';
        Course.find({ classify: 'Frontend' })
            .then((courses) => {
                User.findOne({ _id: req.signedCookies.userId }).then((data) => {
                    res.render('course', {
                        courses: mutipleMongooseToObject(courses),
                        data: mongooseToObject(data),
                        title,
                        cast: true,
                    });
                });
            })
            .catch(next);
    }

    backend(req, res, next) {
        const title = 'Backend';
        Course.find({ classify: 'Backend' })
            .then((courses) => {
                User.findOne({ _id: req.signedCookies.userId }).then((data) => {
                    res.render('course', {
                        courses: mutipleMongooseToObject(courses),
                        data: mongooseToObject(data),
                        title,
                        cast: true,
                    });
                });
            })
            .catch(next);
    }

    login(req, res) {
        const title = 'Đăng nhập';
        res.render('login', { title });
    }

    checklogin(req, res) {
        const user = req.body.user;
        const passWord = md5(req.body.passWord);
        const check = req.body.mact;
        const check2 = req.body.mact2;
        if (user === '' || passWord === '') {
            const msg = 'Vui lòng nhập đầy đủ!';
            res.render('login', { msg });
            return;
        }
        if (check == check2) {
            User.findOne({ user: user, passWord: passWord }).then((data) => {
                if (data) {
                    if (data.status == 'open') {
                        res.cookie('userId', data._id, {
                            signed: true,
                        });
                        res.cookie('userName', data.fullName, {
                            signed: true,
                        });
                        res.cookie('userPosition', data.position, {
                            signed: true,
                        });
                        res.redirect('/');
                    } else {
                        const msg =
                            'Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên!';
                        res.render('login', { msg });
                    }
                } else {
                    const msg = 'Tài khoản hoặc mật khẩu không chính xác!!';
                    res.render('login', { msg });
                }
            });
        } else {
            const msg = 'Mã xác thực không chính xác!!';
            res.render('login', { msg });
        }
    }

    signup(req, res) {
        const title = 'Đăng ký';
        res.render('signup', { title });
    }

    checksignup(req, res) {
        const title = 'Đăng ký';
        const { fullName, user, email, passWord, passWord2 } = req.body;
        if (
            user == undefined ||
            fullName == undefined ||
            email == undefined ||
            passWord == undefined
        ) {
            const msg = 'Vui lòng nhập đầy đủ thông tin!';
            res.render('signup', {
                msg,
                title,
                fullName,
                user,
                email,
                erro_up: true,
            });
            return;
        }
        if (user.includes(' ')) {
            const msg = 'Tên đăng nhập phải viết liền';
            res.render('signup', {
                msg,
                title,
                fullName,
                email,
                erro_up: true,
            });
            return;
        }
        if (email) {
            const test = (value) => {
                var regex =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return regex.test(value) ? true : false;
            };
            if (!test(email)) {
                const msg = 'Sai định dạng Email';
                res.render('signup', {
                    msg,
                    title,
                    fullName,
                    user,
                    erro_up: true,
                });
                return;
            }
        }
        if (user.length < 4) {
            const msg = 'Tên đăng nhập từ 4 kí tự trở lên';
            res.render('signup', {
                msg,
                title,
                fullName,
                email,
                erro_up: true,
            });
            return;
        }
        if (passWord.length < 5 || passWord.length > 20) {
            const msg = 'Mật khẩu gồm 5-20 kí tự';
            res.render('signup', {
                msg,
                title,
                fullName,
                user,
                email,
                erro_up: true,
            });
            return;
        }
        if (user && fullName && email && passWord) {
            if (passWord == passWord2) {
                User.findOne({ email: email }).then((dataemail) => {
                    if (dataemail) {
                        const msg = 'Email đã được sử dụng!';
                        res.render('signup', {
                            msg,
                            title,
                            fullName,
                            user,
                            erro_up: true,
                        });
                        return;
                    } else {
                        User.findOne({ user: user }).then((data) => {
                            if (data) {
                                const msg = 'Tài khoản đã tồn tại!';
                                res.render('signup', {
                                    msg,
                                    title,
                                    fullName,
                                    email,
                                    erro_up: true,
                                });
                                return;
                            } else {
                                let errors = [];
                                if (!user) {
                                    errors.push({ msg: 'Nhập tên tài khoản!' });
                                } else {
                                    const md5passWord = md5(passWord);
                                    const newUser = new User({
                                        user: user,
                                        fullName: fullName,
                                        email: email,
                                        passWord: md5passWord,
                                    });
                                    newUser.save();
                                    res.render('signup', { success: true });
                                }
                            }
                        });
                    }
                });
            } else {
                const msg = 'Mật khẩu không trùng khớp!';
                res.render('signup', {
                    msg,
                    fullName,
                    user,
                    email,
                    erro_up: true,
                });
            }
        } else {
            const msg = 'Có lỗi xảy ra vui lòng thử lại!';
            res.render('signup', { erro_up: true });
        }
    }

    // code cnow login
    loginLinkTypeEmail(req, res) {
        const title = 'Đăng nhập';
        res.render('loginLinkEmail', { title });
    }

    loginFacebookUser(req, res) {
        if (req.user) {
            User.findOne({ facebookId: req.user.id }).then((data) => {
                if (data) {
                    res.cookie('userName', data.fullName, {
                        signed: true,
                    });
                    res.cookie('userPosition', data.position, {
                        signed: true,
                    });
                    res.cookie('userId', data._id, {
                        signed: true,
                    });
                    res.redirect('/');
                } else {
                    const newUser = new User({
                        user: req.user.displayName,
                        fullName: req.user.displayName,
                        email: null,
                        passWord: null,
                        facebookId: req.user.id,
                    });
                    newUser.save().then((data) => {
                        res.cookie('userId', data._id, {
                            signed: true,
                        });
                        res.redirect('/');
                    });
                }
            });
        } else {
            const msg = 'Tài khoản hoặc mật khẩu không chính xác!!';
            res.render('login', { msg });
        }
    }
    loginGoogleUser(req, res) {
        if (req.user) {
            const email = req.user._json.email;
            User.findOne({ email: email }).then((data) => {
                if (data) {
                    res.cookie('userName', data.fullName, {
                        signed: true,
                    });
                    res.cookie('userPosition', data.position, {
                        signed: true,
                    });
                    res.cookie('userId', data._id, {
                        signed: true,
                    });
                    res.redirect('/');
                } else {
                    const newUser = new User({
                        user: null,
                        fullName: req.user.displayName,
                        email: email,
                        passWord: nulll,
                    });
                    newUser.save().then((data) => {
                        res.cookie('userName', data.fullName, {
                            signed: true,
                        });
                        res.cookie('userPosition', data.position, {
                            signed: true,
                        });
                        res.cookie('userId', data._id, {
                            signed: true,
                        });
                        res.redirect('/');
                    });
                }
            });
        } else {
            const msg = 'Tài khoản hoặc mật khẩu không chính xác!!';
            res.render('login', { msg });
        }
    }
    async sendEmailLinkLogin(req, res) {
        const email = req.body.email;
        if (email) {
            const test = (value) => {
                var regex =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return regex.test(value) ? true : false;
            };
            if (!test(email)) {
                const msg = 'Sai định dạng Email';
                res.render('loginLinkEmail', { msg, title });
                return;
            }
        }
        try {
            var token = crypto.randomBytes(64).toString('hex');

            User.findOne({ email: email }).then((data) => {
                console.log('date:', data);
                if (!data) {
                    const newUser = new User({
                        email: email,
                        passWord: null,
                        secret: token,
                    });
                    newUser.save().then();
                } else {
                    User.updateOne(
                        { _id: data._id },
                        { $set: { secret: token } },
                    ).then();
                }
            });
            await mailer.sendMail(
                email,
                'Login vào học lập trình trực tuyến với gmail',
                `<a href='http://cnow.asia/login/email/link?token=${token}&email=${email}' class="login-with-facebook">Đăng nhập site</a>`,
            );
            const msg = 'Link đăng nhập đã được gửi đến gmail của bạn';
            res.render('loginLinkEmail', { msg });
        } catch (error) {
            // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
            const msg = 'Thao tác thất bại, vui lòng thử lại!';
            res.render('login', { msg });
        }
    }
    async checkEmailLoginLink(req, res) {
        try {
            const token = req.query.token;
            const email = req.query.email;
            User.findOne({ email: email }).then((data) => {
                if (data.secret == token) {
                    res.cookie('userName', data.fullName, {
                        signed: true,
                    });
                    res.cookie('userPosition', data.position, {
                        signed: true,
                    });
                    res.cookie('userId', data._id, {
                        signed: true,
                    });
                    res.redirect('/');
                } else {
                    const msg = 'Đăng nhập không thành công xin thử lại!';
                    res.render('login', { msg });
                }
            });
        } catch (error) {
            // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
            const msg = 'Đăng nhập không thành công xin thử lại!';
            res.render('login', { msg });
        }
    }
    loginFacebookUser(req, res) {
        if (req.user) {
            User.findOne({ facebookId: req.user.id }).then((data) => {
                if (data) {
                    res.cookie('userId', data._id, {
                        signed: true,
                    });
                    res.redirect('/');
                } else {
                    const newUser = new User({
                        user: null,
                        fullName: req.user.displayName,
                        email: null,
                        passWord: null,
                        facebookId: req.user.id,
                    });
                    newUser.save().then((data) => {
                        res.cookie('userName', data.fullName, {
                            signed: true,
                        });
                        res.cookie('userPosition', data.position, {
                            signed: true,
                        });
                        res.cookie('userId', data._id, {
                            signed: true,
                        });
                        res.redirect('/');
                    });
                }
            });
        } else {
            const msg = 'Tài khoản hoặc mật khẩu không chính xác!!';
            res.render('login', { msg });
        }
    }

    logout(req, res) {
        res.clearCookie('userId');
        res.clearCookie('userPosition');
        res.clearCookie('userName');
        res.clearCookie('IdCourseBuy');
        res.clearCookie('slugCourse');
        res.redirect('/');
    }

    profile(req, res, next) {
        const title = 'Setting';
        User.findOne({ _id: req.signedCookies.userId })
            .then((profile) => {
                res.render('profile', {
                    profile: mongooseToObject(profile),
                    title,
                });
            })
            .catch(next);
    }

    account(req, res, next) {
        res.render('account/account');
    }

    adminPage(req, res, next) {
        const title = 'Đăng nhập trang quản trị';
        res.render('login', { title, hiddenHeader: true });
    }

    pageLoginAdmin(req, res) {
        const title = 'Đăng nhập trang quản trị';
        const user = req.body.user;
        const passWord = md5(req.body.passWord);
        const check = req.body.mact;
        const check2 = req.body.mact2;
        if (user === '' || passWord === '') {
            const msg = 'Vui lòng nhập đầy đủ!';
            res.render('login', { title, msg, hiddenHeader: true });
            return;
        }
        if (check == check2) {
            User.findOne({ user: user, passWord: passWord }).then((data) => {
                if (
                    data.position === 'admin' ||
                    data.position === 'adminLv1' ||
                    data.position === 'collaborators'
                ) {
                    res.cookie('userId', data._id, {
                        signed: true,
                    });
                    res.cookie('userName', data.fullName, {
                        signed: true,
                    });
                    res.cookie('userPosition', data.position, {
                        signed: true,
                    });
                    res.redirect('/admin');
                } else {
                    const msg = 'Tài khoản hoặc mật khẩu không chính xác!!';
                    res.render('login', { msg, title, hiddenHeader: true });
                }
            });
        } else {
            const msg = 'Mã xác thực không chính xác!!';
            res.render('login', { msg, title, hiddenHeader: true });
        }
    }

    page404(req, res) {
        const title = 'Not Found';
        res.status(404).render('page404', { title });
    }
}

module.exports = new SiteController();

const paypal = require('paypal-rest-sdk');
const Course = require('./model/course');
const User = require('./model/user');
const Progress = require('./model/lessonProgress');
const Payments = require('./model/paymentpaypal');

class PayController {
    pay(req, res, next) {
        Course.findOne({ _id: req.params.id }).then((data) => {
            if (data) {
                res.cookie('IdCourseBuy', data._id, {
                    signed: true,
                });
                res.cookie('slugCourse', data.slug, {
                    signed: true,
                });
                const create_payment_json = {
                    intent: 'sale',
                    payer: {
                        payment_method: 'paypal',
                    },
                    redirect_urls: {
                        return_url: 'http://localhost:8800/pay/success',
                        cancel_url: 'http://localhost:8800/pay/cancel',
                    },
                    transactions: [
                        {
                            item_list: {
                                items: [
                                    {
                                        name: `Khóa ${data.nameCourse}`,
                                        sku: '001',
                                        price: `${data.priceCourse}`,
                                        currency: 'USD',
                                        quantity: 1,
                                    },
                                ],
                            },
                            amount: {
                                currency: 'USD',
                                total: `${data.priceCourse}`,
                            },
                            description: `Thanh toán khóa học ${data.nameCourse} cho Cnow`,
                        },
                    ],
                };
                paypal.payment.create(
                    create_payment_json,
                    function (error, payment) {
                        if (error) {
                            throw error;
                        } else {
                            for (let i = 0; i < payment.links.length; i++) {
                                if (payment.links[i].rel === 'approval_url') {
                                    res.redirect(payment.links[i].href);
                                }
                            }
                        }
                    },
                );
            } else {
                res.send('Đã có lỗi xảy ra!');
            }
        });
    }

    success(req, res, next) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            payer_id: payerId,
        };

        paypal.payment.execute(
            paymentId,
            execute_payment_json,
            function (error, payment) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    const newPayment = new Payments({
                        idCourse: req.signedCookies.IdCourseBuy,
                        idUser: req.signedCookies.userId,
                        details: payment,
                    });
                    newPayment.save().then(() => res.redirect(`/pay/save`));
                }
            },
        );
    }

    cancel(req, res) {
        res.send('Thanh toán thất bại!');
    }

    save(req, res) {
        Course.findOne({ _id: req.signedCookies.IdCourseBuy }).then(
            (course) => {
                if (course) {
                    Payments.findOne({
                        idCourse: course._id,
                        idUser: req.signedCookies.userId,
                    }).then((payment) => {
                        if (payment) {
                            User.findOne({
                                _id: req.signedCookies.userId,
                            }).then((user) => {
                                if (
                                    user.learning.includes(course.slug) == false
                                ) {
                                    if (user.position !== 'admin') {
                                        Progress.findOne({
                                            idUser: user._id,
                                            idCourse: course._id,
                                        }).then((processData) => {
                                            if (!processData) {
                                                const newProgress =
                                                    new Progress({
                                                        idUser: user._id,
                                                        idCourse: course._id,
                                                        price: course.priceCourse,
                                                        nameCourse:
                                                            course.nameCourse,
                                                    });
                                                newProgress.save();
                                                Course.updateOne(
                                                    { slug: course.slug },
                                                    {
                                                        numberStudents:
                                                            course.numberStudents +
                                                            1,
                                                    },
                                                ).then();
                                                User.updateOne(
                                                    { _id: user._id },
                                                    {
                                                        $push: {
                                                            learning:
                                                                course.slug,
                                                        },
                                                    },
                                                ).then(() =>
                                                    res.redirect(
                                                        `/courses/${course.slug}`,
                                                    ),
                                                );
                                            } else {
                                                res.send('Đã xảy ra lỗi !!');
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            res.send('Đã xảy ra lỗi !!');
                        }
                    });
                } else {
                    res.send('Đã xảy ra lỗi !');
                }
            },
        );
    }
}

module.exports = new PayController();

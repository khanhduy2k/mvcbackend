const dbProgress = require('../controller/model/lessonProgress');
const dbPayments = require('../controller/model/paymentpaypal');
const dbUser = require('../controller/model/user');
const dbCourse = require('../controller/model/course');
const dbComment = require('../controller/model/commentCourse');

module.exports.start = (io) => {
    let numberUserOnline = 0;

    io.on('connection', (socket) => {
        socket.on('Lesson-finished', (data) => {
            dbProgress.findOne({ _id: data[0] }).then((user) => {
                if (user.position == 'admin' || user.position == 'adminLv1') {
                    socket.emit('reset-view', data[1]);
                } else {
                    if (user.progress <= data[1] && user.price < data[2]) {
                        dbProgress
                            .updateOne(
                                { _id: data[0] },
                                { progress: data[1] + 1 },
                            )
                            .then();
                        socket.emit('reset-view', data[1] + 1);
                    }
                }
            });
            socket.emit('Stop-count-time');
        });

        socket.on('start-count-time', () => {
            socket.emit('Resume-count-time');
        });

        socket.on('reset-count-time', () => {
            socket.emit('Reset-time');
        });

        socket.on('search-course', (data) => {
            dbCourse.findOne({ _id: data.idCourse }).then((course) => {
                socket.emit('price-course', course);
            });
        });

        socket.on('search-name-course', (data) => {
            dbCourse.findOne({ _id: data }).then((course) => {
                if (course) socket.emit('data-course', course);
            });
        });

        socket.on('details-payments', (data) => {
            dbCourse.findOne({ _id: data.idCourse }).then((course) => {
                dbUser.findOne({ _id: data.idUser }).then((user) => {
                    socket.emit('get-data-payment', {
                        course: course,
                        user: user,
                        date: data.date,
                    });
                });
            });
        });

        numberUserOnline++;
        io.sockets.emit('get-number-online', numberUserOnline);
        socket.on('disconnect', () => {
            numberUserOnline > 0 ? numberUserOnline-- : (numberUserOnline = 0);
            io.sockets.emit('get-number-online', numberUserOnline);
        });

        socket.on('call-get-cmt', () => {
            dbComment
                .find({})
                .then((data) => io.sockets.emit('get-data-cmt', data));
        });

        socket.on('add-cmt-to-array', (data) => {
            dbCourse.findOne({ _id: data[1] }).then((course) => {
                if (course) {
                    dbUser.findOne({ _id: data[2] }).then((user) => {
                        if (user) {
                            const newComment = new dbComment({
                                idUser: data[2],
                                idCourse: data[1],
                                nameUser: user.fullName,
                                contentComment: data[0],
                                lesson: data[3],
                            });
                            newComment.save().then(() => {
                                dbComment
                                    .find({})
                                    .then((data) =>
                                        io.sockets.emit('get-data-cmt', data),
                                    );
                            });
                        }
                    });
                }
            });
        });

        socket.on('get-index-lesson', (index) => {
            socket.emit('index-lesson', index);
        });

        socket.on('del-comment', (data) => {
            dbComment.deleteOne({ _id: data[0], idUser: data[1] }).then(() => {
                dbComment
                    .find({})
                    .then((data) => io.sockets.emit('get-data-cmt', data));
            });
        });

        socket.on('add-reply', (data) => {
            const random = Math.random();
            dbUser.findOne({ _id: data[2] }).then((user) => {
                if (user) {
                    dbComment
                        .updateOne(
                            { _id: data[1] },
                            {
                                $push: {
                                    reply: {
                                        _idCmt: new Date() + String(random),
                                        idUser: data[2],
                                        nameUser: user.fullName,
                                        date: Number(new Date()),
                                        contentComment: data[0],
                                    },
                                },
                            },
                        )
                        .then(() => {
                            dbComment
                                .find({})
                                .then((data) =>
                                    io.sockets.emit('get-data-cmt', data),
                                );
                        });
                }
            });
        });

        socket.on('del-comment-reply', (data) => {
            dbComment.findOne({ _id: data.id }).then((cmt) => {
                if (cmt) {
                    dbComment
                        .updateOne(
                            { _id: data.id },
                            {
                                $pull: {
                                    reply: {
                                        idUser: data.idUser,
                                        _idCmt: data.index,
                                    },
                                },
                            },
                        )
                        .then(() => {
                            dbComment
                                .find({})
                                .then((data) =>
                                    io.sockets.emit('get-data-cmt', data),
                                );
                        });
                }
            });
        });
    });
};

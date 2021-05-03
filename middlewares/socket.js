const User = require('../controller/model/user');
const Progress = require('../controller/model/lessonProgress');
const Payments = require('../controller/model/paymentpaypal');
const Course = require('../controller/model/course');
const course = require('../controller/model/course');

module.exports.socket = function(socket) {
    socket.on('nghe', ()=> {
        console.log('nghe')
    });

    socket.on('Lesson-finished', (data)=>{
        Progress.findOne({_id: data[0]})
        .then(user=> {
            if (user) {
                if(user.progress <= data[1] && user.price < data[2]) {
                    Progress.updateOne({_id: data[0]}, {progress: data[1]+1})
                    .then()
                    socket.emit('reset-view', data[1]+1);
                }
            }
        })
        socket.emit('Stop-count-time');
    });

    socket.on('start-count-time', ()=> {
        socket.emit('Resume-count-time')
    });

    socket.on('reset-count-time', ()=> {
        socket.emit('Reset-time')
    });

    socket.on('payment-completed', (data)=> {
        Course.findOne({_id: data.idCourse})
        .then(course=> {
            if (course) {
                const newPayment = new Payments({idCourse: data.idCourse, idUser: data.idUser, details: data.details});
                newPayment.save()
                .then(()=> {
                    User.findOne({_id: data.idUser})
                    .then(user=>{
                        if (user.learning.includes(data.slug) == false){
                            if (user.position !== 'admin') {
                                const newProgress = new Progress({idUser: user._id, idCourse: data.idCourse, price: course.priceCourse, nameCourse: course.nameCourse});
                                newProgress.save();
                            }
                            User.updateOne({_id: user._id}, {$push:{learning: data.slug}})
                            .then()
                            Course.updateOne({slug: data.slug}, {numberStudents: course.numberStudents+1})
                            .then()  
                            socket.emit('user-learning', data.slug)                          
                            socket.emit('payment-saved')                          
                        }
                    });
                });
            }
        })
    });

    socket.on('search-course', (data)=> {
        Course.findOne({_id: data.idCourse})
        .then(course => {
            socket.emit('price-course', course)
        })
    });
 
    socket.on('search-name-course', (data)=> {
        Course.findOne({_id: data})
        .then(course => {
            if(course) socket.emit('data-course', course)
        })
    });

    socket.on('details-payments', (data)=> {
        Course.findOne({_id: data.idCourse})
        .then(course => {
            User.findOne({_id: data.idUser})
            .then(user=> {
                socket.emit('get-data-payment', {course: course, user: user, date: data.date})
            })
        })
    });
    
}
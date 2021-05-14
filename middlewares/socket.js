const User = require('../controller/model/user');
const Progress = require('../controller/model/lessonProgress');
const Payments = require('../controller/model/paymentpaypal');
const Course = require('../controller/model/course');
const express = require('express');
const app = express();
const sever = require('http').createServer(app);
const io = require('socket.io')(sever);
module.exports.socket = (socket)=> {

    socket.on('Lesson-finished', (data)=>{
        Progress.findOne({_id: data[0]})
        .then(user=> {
            if (user.position == 'admin'||user.position == 'adminLv1') {
                socket.emit('reset-view', data[1]);
            }else{
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
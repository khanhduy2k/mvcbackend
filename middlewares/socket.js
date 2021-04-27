const User = require('../controller/model/user');
const Progress = require('../controller/model/lessonProgress');

module.exports.socket = function(socket) {
    socket.on('nghe', ()=>{
        console.log('nghe')
    });

    socket.on('Lesson-finished', (data)=>{
        Progress.findOne({_id: data[0]})
        .then(user=>{
            if (user) {
                if(user.progress <= data[1]) {
                    Progress.updateOne({_id: data[0]}, {progress: data[1]+1})
                    .then()
                    socket.emit('reset-view', data[1]+1);
                }
            }
        })
        socket.emit('Stop-count-time');
    })

    socket.on('start-count-time', ()=>{
        socket.emit('Resume-count-time')
    })

}
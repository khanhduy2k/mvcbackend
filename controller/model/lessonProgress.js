const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchame = new Schema({
    idUser: { type: String, required: true},
    idCourse: { type: String, required: true},
    progress: {type: Number, required: true, default: 0}
}, {
    timestamps:true,
});

module.exports = mongoose.model('progresses', progressSchame);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema(
    {
        idUser: { type: String, required: true },
        idCourse: { type: String, required: true },
        lesson: { type: String, required: true },
        nameUser: { type: String, required: true },
        contentComment: { type: String, required: true },
        reply: { type: Array },
        date: { type: Number, default: Date.now },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('comments', comment);

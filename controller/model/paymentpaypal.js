const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paypalSchame = new Schema(
    {
        idUser: { type: String, required: true },
        idCourse: { type: String, required: true },
        details: { type: Object, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('payments', paypalSchame);

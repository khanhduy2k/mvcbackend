const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedback = new Schema(
    {
        name: { type: String, required: true },
        feedBack: { type: Array, required: true },
        new: { type: String, default: 'chưa đọc' },
        dateWrite: { type: Array, default: Date.now },
        dateLast: { type: String, default: Date.now },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('feedbacks', feedback);

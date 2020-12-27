const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedback = new Schema({
    name: { type: String, required: true },
    feedback: { type: Array, required: true },
    new: {type: String, default: 'chưa đọc'},
    date: {type: Array, default: Date.now},
    date2: {type: String, default: Date.now}
}, {
    timestamps:true,
});

module.exports = mongoose.model('feedbacks', feedback);
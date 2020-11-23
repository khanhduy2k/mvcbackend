const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Tao model
const Course = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    mota:{ type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('courses', Course);
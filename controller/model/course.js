const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

//Tao model
const Course = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    mota:{ type: String, required: true },
    slug: { type: String, slug: 'name' },
    videoId1: { type: Array},
    bai: { type: Array},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('courses', Course);
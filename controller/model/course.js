const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    img: { type: String},
    name: { type: String, required: true },
    mota:{ type: String, required: true },
    phanloai:{ type: String, required: true },
    slug: { type: String, slug: 'name' },
    videoId1: { type: Array},
    bai: { type: Array},
    __v: Number,
},{
    timestamps:true,
});

module.exports = mongoose.model('courses', Course);
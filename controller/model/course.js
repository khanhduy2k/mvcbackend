const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        img: { type: String },
        nameCourse: { type: String, required: true },
        description: { type: String, required: true },
        classify: { type: String, required: true },
        slug: { type: String, slug: 'nameCourse', unique: true },
        idVideo: { type: Array },
        nameLesson: { type: Array },
        timeVideo: { type: Array },
        numberStudents: { type: Number, default: 0 },
        priceCourse: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('courses', Course);

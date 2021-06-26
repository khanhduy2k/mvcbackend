const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const progressSchame = new Schema(
    {
        idUser: { type: String, required: true },
        idCourse: { type: String, required: true },
        nameCourse: { type: String, required: true },
        slug: { type: String, slug: 'nameCourse', unique: false },
        progress: { type: Number, required: true, default: 0 },
        status: { type: String, required: true, default: 'unlock' },
        price: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('progresses', progressSchame);

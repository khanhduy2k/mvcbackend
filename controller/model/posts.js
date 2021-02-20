const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchame = new Schema({
    name_user: { type: String, required: true},
    name1: { type: String, required: true },
    email:{ type: String, required: true },
    pass: { type: String, required: true },
    learning: { type: Array},
    date: {type:String, default: Date.now}
}, {
    timestamps:true,
});

module.exports = mongoose.model('post', postSchame);
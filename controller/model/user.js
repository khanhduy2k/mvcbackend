const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchame = new Schema({
    user: { type: String, required: true},
    fullName: { type: String, required: true },
    email:{ type: String, required: true, },
    passWord: { type: String, required: true,},
    learning: { type: Array},
    position: {type: String, required: true, default: 'user'},
    date: {type:String, default: Date.now}
}, {
    timestamps:true,
});

module.exports = mongoose.model('users', userSchame);
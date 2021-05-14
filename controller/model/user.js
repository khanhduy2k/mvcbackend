const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchame = new Schema({
    user: { type: String,},
    fullName: { type: String, required: true },
    email:{ type: String,},
    passWord: { type: String,},
    facebookId: { type: String },
    learning: { type: Array },
    secret: { type: String },
    position: {type: String, required: true, default: 'user'},
    date: {type:String, default: Date.now}
}, {
    timestamps:true,
});

module.exports = mongoose.model('users', userSchame);
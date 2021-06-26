const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitedSchame = new Schema(
    {
        date: { type: String, require: true },
        number: { type: Number, required: true, default: 1 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('visiteds', visitedSchame);
